#!/bin/sh
# Установка и обновление сервера заказов на srv91. Запуск с мака из папки проекта:
#   sh deploy/install-api.sh
# Код и каталог копируются в /opt/techagent-api, база (/var/lib/techagent-api) и настройки (/etc/techagent-api.env) не трогаются.
set -e
cd "$(dirname "$0")/.."
"${NODE:-node}" scripts/export-catalog.mjs
COPYFILE_DISABLE=1 tar -C api -czf - server.mjs mail.mjs letters.mjs backup.mjs set-staff-password.mjs catalog.json techagent-api.env.example \
  | ssh srv91 'set -e
    id techagent >/dev/null 2>&1 || useradd --system --home /nonexistent --shell /usr/sbin/nologin techagent
    mkdir -p /opt/techagent-api/bin /var/lib/techagent-api /var/backups/techagent-api
    tar -C /opt/techagent-api -xzf -
    NODE_SRC=/home/app/.nvm/versions/node/v22.23.1/bin/node
    [ -x /opt/techagent-api/bin/node ] || cp "$NODE_SRC" /opt/techagent-api/bin/node
    chown -R root:root /opt/techagent-api && chmod 755 /opt/techagent-api /opt/techagent-api/bin
    chown techagent:techagent /var/lib/techagent-api /var/backups/techagent-api && chmod 750 /var/lib/techagent-api /var/backups/techagent-api
    if [ ! -f /etc/techagent-api.env ]; then
      cp /opt/techagent-api/techagent-api.env.example /etc/techagent-api.env
    fi
    chown root:techagent /etc/techagent-api.env && chmod 640 /etc/techagent-api.env'
scp -q deploy/systemd/techagent-api.service deploy/systemd/techagent-api-backup.service deploy/systemd/techagent-api-backup.timer srv91:/etc/systemd/system/
ssh srv91 'set -e
  systemctl daemon-reload
  systemctl enable --now techagent-api-backup.timer >/dev/null
  systemctl enable techagent-api >/dev/null 2>&1
  systemctl restart techagent-api
  sleep 1.5
  systemctl is-active techagent-api
  curl -s http://127.0.0.1:8787/api/health; echo'
