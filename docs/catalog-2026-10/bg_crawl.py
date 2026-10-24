"""Сбор ассортимента BigGeek по выбранным разделам: название, цена, старая цена, наличие, ссылка, картинка.
python3.12 bg_crawl.py out.json  — разделы ниже. Пауза 2.5–4 с между страницами."""
import json, re, sys, time, random, html, urllib.request

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'

# наш раздел -> разделы BigGeek (текущее и прошлое поколение)
SECTIONS = {
  'Смартфоны': [
    'apple-iphone-17-pro-max', 'apple-iphone-17-pro', 'apple-iphone-17', 'iphone-17e', 'apple-iphone-air',
    'iphone-16-pro-max', 'iphone-16-pro', 'iphone-16-plus', 'iphone-16', 'iphone-16e',
    'samsung-galaxy-s26-ultra', 'samsung-galaxy-s26plus', 'samsung-galaxy-s26', 'samsung-galaxy-s25-edge',
    'samsung-galaxy-s25-ultra', 'samsung-galaxy-s25-fe', 'samsung-galaxy-s25plus', 'samsung-galaxy-s25',
    'samsung-galaxy-z-fold7', 'samsung-galaxy-z-flip7', 'samsung-galaxy-z-flip7-fe',
    'samsung-galaxy-a56-5g', 'samsung-galaxy-a36-5g', 'samsung-galaxy-a26-5g', 'galaxy-a17', 'samsung-galaxy-a07',
    'google-pixel-10-pro-fold', 'google-pixel-10-pro-xl', 'google-pixel-10-pro', 'google-pixel-10', 'google-pixel-10a',
    'xiaomi-15', 'xiaomi-15t', 'xiaomi-15t-pro', 'xiaomi-mix-flip', 'poco-f8-ultra', 'poco-f8-pro', 'poco-x7-pro', 'poco-x7',
    'poco-m8-pro-5g', 'redmi-note-15-pro-4g', 'redmi-note-15-4g', 'redmi-15-4g',
    'oneplus-15', 'oneplus-15r', 'oneplus-13s', 'oneplus-nord-5', 'nothing-phone-3', 'nothing-phone-3a-pro', 'nothing-phone-3a',
    'huawei-pura-80-ultra', 'huawei-pura-80-pro', 'huawei-pura-80', 'huawei-mate-70-pro', 'huawei-mate-x7', 'huawei-mate-x6',
    'honor-magic8-pro', 'honor-magic-v5', 'honor-400-pro', 'honor-400', 'smartfony-vivo',
  ],
  'Планшеты': [
    'ipad-pro-13-2025', 'ipad-pro-11-2025', 'ipad-air-13-2026', 'ipad-air-11-2026', 'ipad-2025', 'ipad-mini-2024',
    'samsung-galaxy-tab-s11-ultra', 'samsung-galaxy-tab-s11', 'samsung-galaxy-tab-s10-fe-plus', 'samsung-galaxy-tab-s10-fe',
    'samsung-galaxy-tab-s10-lite', 'samsung-galaxy-tab-a11-plus', 'xiaomi-pad-7', 'xiaomi-redmi-pad-2-pro', 'xiaomi-redmi-pad-2', 'poco-pad-m1',
  ],
  'Ноутбуки': [
    'macbook-air-13-m5-2026', 'macbook-air-15-m5-2026', 'macbook-air-13-m4-2025', 'macbook-air-15-m4-2025',
    'macbook-pro-14-m5-max-2026', 'macbook-pro-14-m5-pro-2026', 'macbook-pro-14-m5-2025',
    'macbook-pro-16-m5-max-2026', 'macbook-pro-16-m5-pro-2026-preorder', 'macbook-neo',
  ],
  'Наушники': [
    'apple-airpods-pro-3', 'apple-airpods-4-2024', 'apple-airpods-max', 'naushniki-beats', 'naushniki-samsung',
    'besprovodnye-naushniki-i-garnitury', 'portativnye-akusticheskie-sistemy',
  ],
  'Часы': [
    'apple-watch-ultra-3-titan', 'apple-watch-series-11-titan', 'apple-watch-series-11-alyuminij', 'apple-watch-se-3-2025-alyuminij',
    'apple-watch-ultra-2-titan', 'apple-watch-series-10-alyuminij',
    'umnye-chasy-samsung', 'umnye-chasy-google', 'umnye-chasy-garmin', 'umnye-chasy-xiaomi', 'fitnes-braslety-xiaomi', 'umnye-koltsa',
  ],
  'Игровые консоли': ['sony-playstation', 'microsoft-xbox', 'nintendo-switch', 'steam-deck', 'asus-rog-ally', 'igrovye-kontrollery'],
  'Камеры и дроны': ['ekshn-kamery', 'podvesy-stedikamy-i-aksessuary', 'fotoapparaty-momentalnoj-pechati'],
  'Для дома': [
    'stajlery-dyson', 'feny-dyson', 'vypryamiteli-dlya-volos-dyson', 'besprovodnye-pylesosy-dyson', 'ochistiteli-vozdukha-dyson',
    'roboty-pylesosy-xiaomi', 'ruchnye-pylesosy', 'ochistiteli-vozdukha', 'umnye-nastolnye-lampy',
  ],
  'Телевизоры': ['televizory', 'monitory-apple', 'monitory-xiaomi'],
  'Новинки': ['new'],
  'Аксессуары': [
    'apple-airtag', 'zaryadnye-ustrojstva-apple', 'kabeli-apple', 'myshi-i-klaviatury-apple', 'stilusy-i-klaviatury-apple-dlya-ipad',
    'zaryadnye-ustrojstva-magsafe', 'vneshnie-akkumulyatory-s-podderzhkoj-magsafe', 'portativnye-akkumulyatory', 'usb-khaby',
    'ssd-nakopiteli', 'routery', 'chekhly-dlya-iphone-17-pro-max', 'chekhly-dlya-iphone-17-pro',
  ],
}

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'ru-RU,ru;q=0.9'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.status, r.read().decode('utf-8', 'ignore')

def num(s):
    d = re.sub(r'[^\d]', '', s or '')
    return int(d) if d else None

def parse(t):
    out = []
    for c in t.split('<div class="catalog-card">')[1:]:
        title = re.search(r'class="catalog-card__title[^"]*">(.*?)</a>', c, re.S)
        if not title:
            continue
        price = re.search(r'cart-modal-count">(.*?)<span', c, re.S)
        old = re.search(r'class="old-price">([^<]*)<', c)
        href = re.search(r'href="(/products/[^"]+)"', c)
        img = re.search(r'<img src="([^"]+)"', c)
        sub = re.search(r'catalog-card__subname[^>]*>([^<]*)<', c)
        out.append({
            'title': html.unescape(re.sub(r'<[^>]+>', '', title.group(1))).strip(),
            'price': num(price.group(1)) if price else None,
            'from': bool(price and 'от' in price.group(1)),
            'old': num(old.group(1)) if old else None,
            'cart': 'catalog-card__cart' in c,
            'url': 'https://biggeek.ru' + href.group(1) if href else None,
            'img': ('https:' + img.group(1)) if img and img.group(1).startswith('//') else (img.group(1) if img else None),
            'note': html.unescape(sub.group(1)).strip() if sub else '',
        })
    return out

def main(path):
    res = {}
    try:
        res = json.load(open(path))
    except Exception:
        pass
    for cat, slugs in SECTIONS.items():
        for slug in slugs:
            if slug in res:
                continue
            items, page = [], 1
            while page <= (40 if slug == 'new' else 8):
                url = f'https://biggeek.ru/catalog/{slug}' + (f'?page={page}' if page > 1 else '')
                try:
                    st, t = get(url)
                except Exception as e:
                    print(slug, page, 'ERR', e, file=sys.stderr)
                    break
                if 'showcaptcha' in t[:5000].lower():
                    print('CAPTCHA, стоп', file=sys.stderr); json.dump(res, open(path, 'w'), ensure_ascii=False); return
                got = parse(t)
                new = [g for g in got if g['url'] not in {i['url'] for i in items}]
                items += new
                has_next = f'page={page + 1}' in t
                time.sleep(2.5 + random.random() * 1.5)
                if not new or not has_next:
                    break
                page += 1
            res[slug] = {'category': cat, 'items': items}
            print(f'{cat} / {slug}: {len(items)}', file=sys.stderr)
            json.dump(res, open(path, 'w'), ensure_ascii=False)
    print('DONE', file=sys.stderr)

main(sys.argv[1])
