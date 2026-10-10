#!/bin/sh
# Ключ HTTP Геокодера Яндекса (адрес → координаты) — для добавления пунктов партнёров на карту. Ввод скрыт.
#   ssh -t srv91 sh /opt/techagent-api/set-geocoder.sh
set -e
ENV=/etc/techagent-api.env
printf 'Ключ HTTP Геокодера Яндекса: ' > /dev/tty
stty -echo < /dev/tty; read -r K < /dev/tty; stty echo < /dev/tty; echo > /dev/tty
[ -n "$K" ] || { echo 'Ключ пустой — ничего не изменено.'; exit 1; }
grep -q '^YGEOCODER_KEY=' "$ENV" || echo 'YGEOCODER_KEY=' >> "$ENV"
sed -i "s|^YGEOCODER_KEY=.*|YGEOCODER_KEY=$(printf '%s' "$K" | sed 's/[|&\\]/\\&/g')|" "$ENV"
if curl -s -G -H 'Referer: https://techagent.pro/' https://geocode-maps.yandex.ru/1.x/ --data-urlencode "apikey=$K" \
   --data-urlencode 'geocode=Москва, Пятницкое шоссе, 18' --data-urlencode format=json --data-urlencode results=1 | grep -q '"Point"'; then
  echo 'Готово: геокодер Яндекса отвечает, ключ сохранён.'
else
  echo 'Ключ сохранён, но геокодер пока не отвечает. Новые ключи Яндекс включает до 15 минут — проверим чуть позже.'
fi
