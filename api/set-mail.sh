#!/bin/sh
# Почта сервера заказов: ящик на techagent.pro, с которого уходят коды входа и письма о заказах.
# Запускает владелец, пароль ящика вводится скрыто и попадает только в /etc/techagent-msmtprc (techagent, 600).
#   ssh -t srv91 sh /opt/techagent-api/set-mail.sh orders@techagent.pro
set -e
BOX="${1:-orders@techagent.pro}"
printf 'Пароль ящика %s: ' "$BOX"
stty -echo; read -r PASS; stty echo; echo
[ -n "$PASS" ] || { echo 'Пароль пустой — ничего не изменено.'; exit 1; }
ESC=$(printf '%s' "$PASS" | sed 's/\\/\\\\/g; s/"/\\"/g')
umask 027
cat > /etc/techagent-msmtprc <<CONF
# Почта сервера заказов TechAgent (api/set-mail.sh). Отдельно от /etc/msmtprc — тот для других сайтов
defaults
auth on
tls on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile /var/lib/techagent-api/msmtp.log

account techagent
host smtp.lite-host.in
port 465
tls_starttls off
from $BOX
user $BOX
password "$ESC"
CONF
# msmtp читает файл с паролем, только если он принадлежит тому, от чьего имени запущен, и закрыт от остальных
chown techagent:techagent /etc/techagent-msmtprc
chmod 600 /etc/techagent-msmtprc
sed -i "s|^MAIL_ACCOUNT=.*|MAIL_ACCOUNT=techagent|; s|^MAIL_FROM=.*|MAIL_FROM=$BOX|; s|^ORDERS_EMAIL_TO=.*|ORDERS_EMAIL_TO=$BOX|" /etc/techagent-api.env
if printf 'Subject: TechAgent: проверка почты\nContent-Type: text/plain; charset=utf-8\n\nПочта сервера заказов настроена: с этого ящика уходят коды входа и письма о заказах.\n' \
  | runuser -u techagent -- msmtp -C /etc/techagent-msmtprc -a techagent "$BOX"; then
  systemctl restart techagent-api
  echo "Готово: проверочное письмо отправлено на $BOX, сервер заказов перезапущен."
else
  echo 'Письмо не ушло — скорее всего, неверный пароль. Запустите команду ещё раз.'
  exit 1
fi
