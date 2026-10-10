#!/bin/sh
# Локальный запуск сервера заказов для разработки (vite проксирует /api сюда). Пароль сотрудника в разработке — test-staff-pass
cd "$(dirname "$0")"
[ -f data/dev.env ] && . ./data/dev.env
export STAFF_PASSWORD_HASH DEV=1 PORT=8787
exec "${NODE:-node}" --disable-warning=ExperimentalWarning server.mjs
