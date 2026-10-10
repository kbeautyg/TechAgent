<?php
// Настройки приёма заявок. На сервере: /var/www/techagent-api/config.php (права root:www-data 640).
const TEST_MODE = true;                         // true — заявки только в журнал, без письма
const EMAIL_TO = 'partners@techagent.pro';      // куда приходят заявки
const MAIL_FROM = '';                           // ящик-отправитель на techagent.pro (тот же, что в /etc/msmtprc)
const MSMTP_ACCOUNT = 'techagent';              // аккаунт в /etc/msmtprc
const LOG_FILE = '/var/log/techagent-applications.log';
const ORDERS_EMAIL_TO = 'help@techagent.pro';     // куда приходят заказы покупателей с сайта
const ORDERS_LOG_FILE = '/var/log/techagent-orders.log';
const RATE_LIMIT_PER_10_MIN = 5;
