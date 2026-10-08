<?php
/**
 * Заявки партнёров TechAgent.
 * Браузер (techagent.pro/register) → POST /api/partner-application (JSON) → письмо на partners@techagent.pro.
 *
 * Лежит на srv91 в /var/www/techagent-api/public/partner-application.php; nginx отдаёт его по точному адресу
 * /api/partner-application (deploy/srv91-proxy.snippet.conf), всё остальное уходит на Railway.
 * Настройки — /var/www/techagent-api/config.php (вне публичной папки, пример: deploy/api/config.example.php).
 * Письмо отправляет msmtp через ящик домена techagent.pro (аккаунт MSMTP_ACCOUNT в /etc/msmtprc).
 *
 * Пока почта не настроена (TEST_MODE), заявка целиком пишется в журнал LOG_FILE — ни одна не теряется.
 * Сервер в России (LiteHost): персональные данные остаются в РФ, как обещает политика конфиденциальности.
 */
declare(strict_types=1);

date_default_timezone_set('Europe/Moscow');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

$configPath = dirname(__DIR__) . '/config.php';
if (is_file($configPath)) {
    require $configPath;
}
$cfg = static fn(string $name, mixed $default = null): mixed => defined($name) ? constant($name) : $default;
$TEST_MODE = (bool) $cfg('TEST_MODE', true);
$EMAIL_TO = (string) $cfg('EMAIL_TO', 'partners@techagent.pro');
$MAIL_FROM = (string) $cfg('MAIL_FROM', '');
$MSMTP_ACCOUNT = (string) $cfg('MSMTP_ACCOUNT', 'techagent');
$LOG_FILE = (string) $cfg('LOG_FILE', '/var/log/techagent-applications.log');
$RATE_LIMIT = (int) $cfg('RATE_LIMIT_PER_10_MIN', 5);
if ($MAIL_FROM === '') {
    $TEST_MODE = true; // без ящика-отправителя письмо не уйдёт — только журнал
}

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function logLine(string $file, string $text): void
{
    @file_put_contents($file, date('c') . "\t" . $text . "\n", FILE_APPEND | LOCK_EX);
}

function rateLimited(int $limit): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0');
    $file = sys_get_temp_dir() . '/techagent_rl_' . hash('sha256', $ip) . '.json';
    $now = time();
    $times = is_file($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    $times = array_values(array_filter($times, static fn($t) => is_int($t) && $t > $now - 600));
    if (count($times) >= $limit) {
        return true;
    }
    $times[] = $now;
    @file_put_contents($file, json_encode($times), LOCK_EX);
    return false;
}

function mimeWord(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}
if (rateLimited($RATE_LIMIT)) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}

$raw = (string) file_get_contents('php://input', false, null, 0, 20000);
$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

/** Поля заявки: подпись в письме и предел длины. Проверки содержимого — на сайте (src/utils/validate.ts) */
$fields = [
    'companyName' => ['Наименование', 300],
    'inn' => ['ИНН', 12],
    'ogrn' => ['ОГРН / ОГРНИП', 15],
    'pointAddress' => ['Адрес пункта выдачи', 500],
    'contactName' => ['Контактное лицо', 200],
    'phone' => ['Телефон', 40],
    'email' => ['Email', 200],
    'bankName' => ['Банк', 300],
    'bik' => ['БИК', 9],
    'account' => ['Расчётный счёт', 20],
    'comment' => ['Комментарий', 1000],
];
$data = [];
foreach ($fields as $key => [$label, $max]) {
    $v = $in[$key] ?? '';
    $v = is_string($v) ? trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v) ?? '') : '';
    $data[$key] = mb_substr($v, 0, $max);
}
$errors = [];
foreach (['companyName', 'pointAddress', 'contactName', 'phone', 'bankName'] as $k) {
    if ($data[$k] === '') $errors[] = $k;
}
if (!preg_match('/^(\d{10}|\d{12})$/', $data['inn'])) $errors[] = 'inn';
if (!preg_match('/^(\d{13}|\d{15})$/', $data['ogrn'])) $errors[] = 'ogrn';
if (!preg_match('/^\d{9}$/', $data['bik'])) $errors[] = 'bik';
if (!preg_match('/^\d{20}$/', $data['account'])) $errors[] = 'account';
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($errors !== []) {
    respond(422, ['ok' => false, 'error' => 'fields', 'fields' => $errors]);
}

$lines = [];
foreach ($fields as $key => [$label]) {
    if ($data[$key] !== '') $lines[] = $label . ': ' . $data[$key];
}
$text = "Новая заявка партнёра с сайта techagent.pro\n\n" . implode("\n", $lines)
    . "\n\nДата: " . date('d.m.Y H:i') . " (МСК)\n\n"
    . "Что дальше: проверить данные, при необходимости запросить документы (оферта, п. 4.2), "
    . "завести партнёра в кабинете и отправить ему email для входа и временный пароль.\n";

if ($TEST_MODE) {
    logLine($LOG_FILE, "TEST\n" . $text . "----");
    respond(200, ['ok' => true, 'test' => true]);
}

$subject = 'Заявка партнёра: ' . $data['companyName'];
$headers = [
    'MIME-Version: 1.0',
    'From: ' . mimeWord('Сайт TechAgent') . ' <' . $MAIL_FROM . '>',
    'Reply-To: ' . $data['email'],
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
];
$params = '-a ' . escapeshellarg($MSMTP_ACCOUNT) . ' -f' . escapeshellarg($MAIL_FROM);
$sent = @mail($EMAIL_TO, mimeWord($subject), chunk_split(base64_encode($text)), implode("\r\n", $headers), $params);
if (!$sent) {
    // Письмо не ушло — заявка не теряется: она в журнале, а человеку предлагаем написать самому
    logLine($LOG_FILE, "MAIL FAILED\n" . $text . "----");
    respond(502, ['ok' => false, 'error' => 'mail']);
}
logLine($LOG_FILE, 'mailed ' . hash('sha256', $data['inn']));
respond(200, ['ok' => true]);
