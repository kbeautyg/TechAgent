# SEO: что уже сделано и что нужно сделать руками

Код закрывает техническую часть SEO полностью. Ниже — шаги, которые может выполнить
только владелец (аккаунты, DNS), и порядок действий после деплоя.

## Что уже в коде (ничего делать не нужно)

- **Пререндер**: 226 статических HTML-страниц (`npm run build` → `scripts/prerender.mjs`).
  Яндекс и Google видят текст, ссылки и мету без исполнения JS.
- **sitemap.xml**: генерируется на каждой сборке (`scripts/generate-sitemap.mjs`), отдаётся по
  `https://techagent.pro/sitemap.xml` (адрес уже прописан в `robots.txt`).
- **Уникальные title/description/canonical/OG/Twitter** на каждом маршруте — реестр в `src/seo/meta.ts`.
- **JSON-LD**: Organization + WebSite (главная), Product + Offer + BreadcrumbList (карточки),
  FAQPage (главная), ItemList (категории), Article (блог).
- **OG-картинка** 1200×630: `public/og/og-default.png`; у товаров — их фото.
- **Категорийные посадочные**: `/catalog/smartfony`, `/catalog/noutbuki` и ещё 8 — с уникальными текстами.
- **Блог**: `/blog` + 3 статьи под информационные запросы ниши.
- **Калькулятор**: отдельный индексируемый `/calculator`.
- **Скорость**: приватные разделы в lazy-чанках, шрифты self-hosted (без Google Fonts),
  все фото каталога в WebP (25 МБ → 2.4 МБ), заголовки кэширования и HSTS в `serve.json`.
- **Комиссия**: везде единая цифра — **3%** (совпадает с расчётом в коде и офертой).

## Шаг 1. Яндекс.Вебмастер

1. Зайти на [webmaster.yandex.ru](https://webmaster.yandex.ru) → «Добавить сайт» → `https://techagent.pro`.
2. Способ подтверждения — **HTML-файл**: скачать файл вида `yandex_xxxx.html`,
   положить его в `public/` этого репозитория, закоммитить и задеплоить. После деплоя нажать «Проверить».
3. После подтверждения: **Индексирование → Файлы Sitemap** → добавить `https://techagent.pro/sitemap.xml`.
4. Там же: **Индексирование → Переобход страниц** → отправить главную, `/catalog` и 2–3 категории.

## Шаг 2. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console) → «Добавить ресурс» → тип «Префикс URL» → `https://techagent.pro`.
2. Подтверждение — тоже **HTML-файл** в `public/` (или DNS-запись TXT, если есть доступ к DNS).
3. После подтверждения: **Файлы Sitemap** → отправить `https://techagent.pro/sitemap.xml`.
4. **Проверка URL** → вставить главную → «Запросить индексирование».

## Шаг 3. Яндекс.Метрика

1. [metrika.yandex.ru](https://metrika.yandex.ru) → «Добавить счётчик» → домен `techagent.pro`. Получить **номер счётчика** (число).
2. В Railway: **Variables** → добавить `VITE_METRIKA_ID = <номер>` → Redeploy.
   Код подключения уже в проекте (`src/lib/metrika.ts`): без переменной счётчик не грузится вовсе.
3. В интерфейсе Метрики создать цели типа **«JavaScript-событие»** с идентификаторами
   (события уже отправляются из кода):
   - `register_submit` — успешная регистрация партнёра
   - `login_submit` — вход в кабинет
   - `order_created` — создан заказ в ЛК
   - `calc_used` — воспользовались калькулятором (главная или /calculator)
   - `support_click` — клик по «Написать в поддержку»
4. Вебвизор при желании включить в настройках счётчика (в коде выключен по умолчанию).

## Шаг 4. Судьба www

Canonical везде указывает на `https://techagent.pro` (без www). Два корректных варианта:

- **Проще (рекомендуется)**: www не использовать вообще — не заводить DNS-запись, нигде не публиковать.
- **Полный**: добавить в DNS `CNAME www → <домен Railway>`, в Railway добавить домен `www.techagent.pro`,
  и настроить 301-редирект www → apex на уровне DNS-провайдера (у Cloudflare — Redirect Rule).
  Без 301 www-версию заводить нельзя — это дубль сайта.

## Шаг 5. После деплоя — проверить

```bash
curl -s https://techagent.pro/sitemap.xml | head          # 200, XML на 226 URL
curl -s https://techagent.pro/robots.txt                   # один блок User-agent + Sitemap
curl -s https://techagent.pro/catalog | grep '<title>'     # «Каталог электроники … | TechAgent»
curl -s https://techagent.pro/catalog/iph15pm256w | grep og:image   # фото товара
curl -sI https://techagent.pro/ | grep -i cache-control    # no-cache (не будет белого экрана после деплоя)
```

Превью ссылок: вставить `https://techagent.pro/catalog/iph15pm256w` в Telegram —
должна появиться карточка с фото товара и заголовком.

## Шаг 6. Внешние сигналы (P5, по мере сил)

- Статья на vc.ru про агентскую схему закупки (материал можно взять из `/blog`).
- Профили в B2B-каталогах и справочниках поставщиков со ссылкой на сайт.
- Соцпрофили компании (Telegram-канал в первую очередь) со ссылкой в описании.
- Ссылки с партнёрских сайтов-магазинов.

## Заметки для разработки

- `npm run build` включает пререндер и sitemap (Railway соберёт всё сам).
  Локально на Windows скрипт запускается из **Git Bash** (в cmd не работает `chmod`/`;`).
- Одноразовые генераторы ассетов: `scripts/assets/` (иконки, OG-картинка, конвертация WebP) —
  в сборку не входят, нужны только при смене брендинга/картинок.
- Единая цифра комиссии живёт в текстах и в `COMMISSION_RATE` (`src/utils/calculate.ts`).
  Меняется — менять везде.
