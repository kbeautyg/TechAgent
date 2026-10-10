#!/bin/sh
# Ключи для карты пунктов СДЭК на оформлении заказа. Запускает владелец, ввод ключей скрыт.
#   ssh -t srv91 sh /opt/techagent-api/set-sdek.sh
set -e
ENV=/etc/techagent-api.env
ask() { printf '%s' "$1"; stty -echo; read -r V; stty echo; echo; printf '%s' "$V"; }
ID=$(ask 'Идентификатор (Account) из СДЭК: ')
SECRET=$(ask 'Пароль (Secure password) из СДЭК: ')
YKEY=$(ask 'Ключ JavaScript API Яндекс Карт: ')
[ -n "$ID" ] && [ -n "$SECRET" ] || { echo 'Ключи СДЭК пустые — ничего не изменено.'; exit 1; }
for k in CDEK_CLIENT_ID CDEK_CLIENT_SECRET YMAPS_KEY; do grep -q "^$k=" "$ENV" || echo "$k=" >> "$ENV"; done
esc() { printf '%s' "$1" | sed 's/[|&\\]/\\&/g'; }
sed -i "s|^CDEK_CLIENT_ID=.*|CDEK_CLIENT_ID=$(esc "$ID")|; s|^CDEK_CLIENT_SECRET=.*|CDEK_CLIENT_SECRET=$(esc "$SECRET")|" "$ENV"
[ -n "$YKEY" ] && sed -i "s|^YMAPS_KEY=.*|YMAPS_KEY=$(esc "$YKEY")|" "$ENV"
systemctl restart techagent-api
sleep 1.5
if curl -sf "http://127.0.0.1:8787/api/sdek/cities?q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0" | grep -q '"code"'; then
  echo 'Готово: СДЭК отвечает, карта пунктов на оформлении включена.'
else
  echo 'СДЭК не принял ключи — проверьте Account и Secure password и запустите команду ещё раз.'
  exit 1
fi
