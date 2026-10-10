<?php
/**
 * Заказы покупателей с сайта TechAgent (корзина → оформление).
 * Браузер (techagent.pro/checkout) → POST /api/order-request (JSON) → журнал + письмо ТехЭйджент.
 *
 * Лежит на srv91 в /var/www/techagent-api/public/order-request.php; nginx отдаёт его по точному адресу
 * /api/order-request (deploy/srv91-proxy.snippet.conf). Настройки — тот же /var/www/techagent-api/config.php,
 * что у заявок партнёров (пример: deploy/api/config.example.php).
 *
 * Пока банк не подключён, это заявка: ТехЭйджент проверяет наличие и присылает покупателю ссылку на оплату.
 * Заказ сначала пишется в журнал ORDERS_LOG_FILE — он не теряется, даже если письмо не ушло.
 * Сервер в России (LiteHost): персональные данные покупателей остаются в РФ.
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
$EMAIL_TO = (string) $cfg('ORDERS_EMAIL_TO', 'help@techagent.pro');
$MAIL_FROM = (string) $cfg('MAIL_FROM', '');
$MSMTP_ACCOUNT = (string) $cfg('MSMTP_ACCOUNT', 'techagent');
$LOG_FILE = (string) $cfg('ORDERS_LOG_FILE', '/var/log/techagent-orders.log');
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

function rateLimited(int $limit): bool
{
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '0');
    $file = sys_get_temp_dir() . '/techagent_orl_' . hash('sha256', $ip) . '.json';
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

function clean(mixed $v, int $max): string
{
    $v = is_string($v) ? trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v) ?? '') : '';
    return mb_substr($v, 0, $max);
}

function mimeWord(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function rub(int $n): string
{
    return number_format($n, 0, ',', ' ') . ' ₽';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}
if (rateLimited($RATE_LIMIT)) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}

$raw = (string) file_get_contents('php://input', false, null, 0, 30000);
$in = json_decode($raw, true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'json']);
}

$d = [
    'buyerName' => clean($in['buyerName'] ?? '', 200),
    'buyerPhone' => clean($in['buyerPhone'] ?? '', 40),
    'buyerEmail' => clean($in['buyerEmail'] ?? '', 200),
    'city' => clean($in['city'] ?? '', 120),
    'sdekPoint' => clean($in['sdekPoint'] ?? '', 300),
    'comment' => clean($in['comment'] ?? '', 1000),
];
$errors = [];
foreach (['buyerName', 'city', 'sdekPoint'] as $k) {
    if ($d[$k] === '') $errors[] = $k;
}
$digits = preg_replace('/\D/', '', $d['buyerPhone']) ?? '';
if (!preg_match('/^[78]?\d{10}$/', $digits)) $errors[] = 'buyerPhone';
if (!filter_var($d['buyerEmail'], FILTER_VALIDATE_EMAIL)) $errors[] = 'buyerEmail';

$items = [];
$goods = 0;
foreach (is_array($in['items'] ?? null) ? array_slice($in['items'], 0, 30) : [] as $it) {
    if (!is_array($it)) continue;
    $qty = (int) ($it['qty'] ?? 0);
    $price = (int) ($it['price'] ?? 0);
    $id = clean($it['productId'] ?? '', 80);
    $name = clean($it['name'] ?? '', 200);
    if ($id === '' || $name === '' || $qty < 1 || $qty > 5 || $price < 1) continue;
    $items[] = compact('id', 'name', 'qty', 'price');
    $goods += $qty * $price;
}
if ($items === []) $errors[] = 'items';
if ($errors !== []) {
    respond(422, ['ok' => false, 'error' => 'fields', 'fields' => $errors]);
}
$delivery = isset($in['delivery']) && is_int($in['delivery']) && $in['delivery'] >= 0 ? $in['delivery'] : null;

// Номер выдаёт сервер: S — заказ с сайта, дата, четыре случайные цифры
$number = 'S-' . date('ymd') . '-' . random_int(1000, 9999);

$lines = [];
foreach ($items as $i => $it) {
    $lines[] = ($i + 1) . '. ' . $it['name'] . ' (' . $it['id'] . ') × ' . $it['qty'] . ' — ' . rub($it['qty'] * $it['price']);
}
$text = "Новый заказ с сайта techagent.pro — {$number}\n\n"
    . "Товары:\n" . implode("\n", $lines) . "\n\n"
    . 'Товары на сумму: ' . rub($goods) . "\n"
    . 'Доставка в пункт СДЭК: ' . ($delivery === null ? 'сумма не назначена — сообщить покупателю' : rub($delivery)) . "\n"
    . 'Итого к оплате: ' . rub($goods + (int) $delivery) . "\n\n"
    . "Получатель: {$d['buyerName']}\nТелефон: {$d['buyerPhone']}\nEmail: {$d['buyerEmail']}\n"
    . "Город: {$d['city']}\nПункт СДЭК: {$d['sdekPoint']}\n"
    . ($d['comment'] !== '' ? "Комментарий: {$d['comment']}\n" : '')
    . "\nДата: " . date('d.m.Y H:i') . " (МСК)\n\n"
    . "Что дальше: сверить цены с каталогом, проверить наличие у поставщика и отправить покупателю ссылку на оплату через СБП "
    . "на email и телефон. Покупатель уже отметил согласие с офертой и на обработку персональных данных.\n";

// Сначала журнал: заказ не теряется, даже если почта не настроена или письмо не ушло
if (@file_put_contents($LOG_FILE, date('c') . "\t" . ($TEST_MODE ? 'TEST' : 'NEW') . "\n" . $text . "----\n", FILE_APPEND | LOCK_EX) === false) {
    respond(500, ['ok' => false, 'error' => 'log']);
}
if ($TEST_MODE) {
    respond(200, ['ok' => true, 'orderNumber' => $number, 'test' => true]);
}

$subject = 'Заказ с сайта ' . $number . ': ' . rub($goods + (int) $delivery);
$headers = [
    'MIME-Version: 1.0',
    'From: ' . mimeWord('Сайт TechAgent') . ' <' . $MAIL_FROM . '>',
    'Reply-To: ' . $d['buyerEmail'],
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
];
$params = '-a ' . escapeshellarg($MSMTP_ACCOUNT) . ' -f' . escapeshellarg($MAIL_FROM);
$sent = @mail($EMAIL_TO, mimeWord($subject), chunk_split(base64_encode($text)), implode("\r\n", $headers), $params);
if (!$sent) {
    @file_put_contents($LOG_FILE, date('c') . "\tMAIL FAILED {$number}\n", FILE_APPEND | LOCK_EX);
}
// Заказ уже в журнале — покупателю отвечаем «принят» в любом случае
respond(200, ['ok' => true, 'orderNumber' => $number]);
