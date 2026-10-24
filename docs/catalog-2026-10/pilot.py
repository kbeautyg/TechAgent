"""Проба на 50 моделях: цена BigGeek (минимум по цветам), наша = BigGeek −5 %, Яндекс Маркет (медиана и минимум
предложений этой модели и памяти из schema.org ItemList). Запуск: python3.12 -I pilot.py groups.json pilot.json"""
import json, re, sys, time, random, statistics, urllib.request, urllib.parse

UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
JUNK = re.compile(r'чехол|стекл|плёнк|пленк|накладк|б/у|восстановл|уценк|ремешок|кабель для|зарядк[аи] для|для iphone|для samsung|для galaxy|для airpods|для apple watch|копия|реплика|муляж|аналог', re.I)

# (ключ группы BigGeek, запрос на Маркет, обязательные слова в названии предложения, слова-исключения)
P = [
  ('Смартфон Apple iPhone 18 Pro Max 256 ГБ', 'iPhone 18 Pro Max 256 ГБ', [r'18 pro max', r'256'], []),
  ('Смартфон Apple iPhone 18 Pro 256 ГБ', 'iPhone 18 Pro 256 ГБ', [r'18 pro\b', r'256'], [r'max']),
  ('Смартфон Apple iPhone Duo 256 ГБ', 'iPhone Duo 256 ГБ', [r'iphone duo', r'256'], []),
  ('Смартфон Apple iPhone Air 256 ГБ', 'iPhone Air 256 ГБ', [r'iphone air', r'256'], []),
  ('Смартфон Apple iPhone 17 256 ГБ', 'iPhone 17 256 ГБ', [r'iphone 17\b', r'256'], [r'pro', r'air', r'17e', r'max']),
  ('Смартфон Apple iPhone 17e 256 ГБ', 'iPhone 17e 256 ГБ', [r'17e', r'256'], []),
  ('Смартфон Apple iPhone 16 128 ГБ', 'iPhone 16 128 ГБ', [r'iphone 16\b', r'128'], [r'pro', r'plus', r'16e']),
  ('Смартфон Samsung Galaxy S26 Ultra, 12 ГБ + 256 ГБ', 'Samsung Galaxy S26 Ultra 256 ГБ', [r's26 ultra', r'256'], []),
  ('Смартфон Samsung Galaxy S26+, 12 ГБ + 256 ГБ', 'Samsung Galaxy S26+ 256 ГБ', [r's26\s?(\+|plus)', r'256'], [r'ultra']),
  ('Смартфон Samsung Galaxy S26, 12 ГБ + 256 ГБ', 'Samsung Galaxy S26 256 ГБ', [r's26\b', r'256'], [r'ultra', r'\+', r'plus', r'\bfe\b', r'edge']),
  ('Смартфон Samsung Galaxy S26 FE, 8 ГБ + 256 ГБ', 'Samsung Galaxy S26 FE 256 ГБ', [r's26 fe', r'256'], []),
  ('Смартфон Google Pixel 11 Pro, 12 ГБ + 256 ГБ (версия Global)', 'Google Pixel 11 Pro 256 ГБ', [r'pixel 11 pro\b', r'256'], [r'\bxl\b', r'fold']),
  ('Смартфон Google Pixel 11, 12 ГБ + 256 ГБ (версия Global)', 'Google Pixel 11 256 ГБ', [r'pixel 11\b', r'256'], [r'pro', r'11a']),
  ('Смартфон Xiaomi 15T Pro, 12 ГБ + 256 ГБ (версия Global)', 'Xiaomi 15T Pro 256 ГБ', [r'15t pro', r'256'], []),
  ('Смартфон Xiaomi POCO F8 Ultra, 12 ГБ + 256 ГБ (версия Global)', 'POCO F8 Ultra 256 ГБ', [r'f8 ultra', r'256'], []),
  ('Планшет Apple iPad Pro 11", 256 ГБ, Wi-Fi', 'iPad Pro 11 M5 256 ГБ Wi-Fi', [r'ipad pro', r'11', r'256'], [r'cellular', r'lte', r'5g', r'm4\b', r'm2\b']),
  ('Планшет Apple iPad Air 11”, 128 ГБ, Wi-Fi', 'iPad Air 11 M4 128 ГБ Wi-Fi', [r'ipad air', r'11', r'128'], [r'cellular', r'lte', r'5g', r'm2\b', r'm3\b']),
  ('Планшет Apple iPad 11”, 128 ГБ, Wi-Fi', 'iPad A16 128 ГБ Wi-Fi', [r'ipad\b', r'128'], [r'air', r'pro', r'mini', r'cellular', r'lte']),
  ('Планшет Apple iPad mini, 128 ГБ, Wi-Fi (A17 Pro, 2024)', 'iPad mini A17 Pro 128 ГБ Wi-Fi', [r'ipad mini', r'128'], [r'cellular', r'lte', r'2021']),
  ('Планшет Samsung Galaxy Tab S11, 12 ГБ + 256 ГБ, Wi-Fi', 'Samsung Galaxy Tab S11 256 ГБ Wi-Fi', [r'tab s11\b', r'256'], [r'ultra', r'5g', r'lte']),
  ('Ноутбук Apple MacBook Air 13” MDHA4 (M5 10-Core, GPU 8-Core, 16GB, 512GB)', 'MacBook Air 13 M5 16 512', [r'macbook air', r'13', r'm5', r'512'], [r'15']),
  ('Ноутбук Apple MacBook Pro 14" MDE04 (M5 10-Core, GPU 10-Core, 16GB, 512GB)', 'MacBook Pro 14 M5 16 512', [r'macbook pro', r'14', r'm5\b', r'512'], [r'pro\)', r'm5 pro', r'm5 max', r'max']),
  ('Часы Apple Watch Series 12, 42 мм, алюминий чёрного цвета, ремешок Sport Band чёрного цвета', 'Apple Watch Series 12 42 мм', [r'series 12', r'42'], [r'титан', r'titan', r'ремешок для']),
  ('Беспроводные наушники Apple AirPods Pro 3 (2025)', 'AirPods Pro 3', [r'airpods pro 3'], [r'чехол']),
  ('Беспроводные наушники Apple AirPods Max 2 (2026)', 'AirPods Max 2', [r'airpods max 2'], []),
  ('Беспроводные наушники Samsung Galaxy Buds4 Pro (TWS)', 'Samsung Galaxy Buds4 Pro', [r'buds\s?4 pro'], []),
  ('Беспроводные наушники Sony WH-1000XM6', 'Sony WH-1000XM6', [r'wh-?1000xm6'], []),
  ('Игровая консоль Sony PlayStation 5 Pro (2 ТБ)', 'PlayStation 5 Pro', [r'playstation 5 pro|ps5 pro'], [r'геймпад', r'джойстик', r'подставк']),
  ('Игровая консоль Sony PlayStation 5 Slim (1 ТБ)', 'PlayStation 5 Slim с дисководом', [r'slim'], [r'digital', r'цифров', r'без дисковод', r'pro']),
  ('Игровая консоль XBOX Series S (512 ГБ)', 'Xbox Series S 512 ГБ', [r'series s\b', r'512'], [r'series x']),
  ('Портативная игровая консоль Nintendo Switch (OLED-модель)', 'Nintendo Switch OLED', [r'switch', r'oled'], [r'switch 2', r'lite', r'чехол']),
  ('Экшн-камера DJI Osmo Action 6 (Standard Combo)', 'DJI Osmo Action 6 Standard Combo', [r'action 6'], []),
  ('Беспроводной вертикальный пылесос Dyson V16 (DS60) Piston Animal (SV53-A) (Copper/Black) (2025)', 'Dyson V16 Piston Animal', [r'v16'], []),
  ('Беспроводная метка Apple AirTag 2-го поколения (комплект — 1 шт.)', 'Apple AirTag 2', [r'airtag'], [r'4 шт', r'4 pack', r'брелок', r'чехол', r'1-го|1 поколен']),
  ('Зарядное устройство Apple MagSafe Charger (Qi2.2) (1 м) (версия 2025)', 'Apple MagSafe Charger 1 м 2025', [r'magsafe'], [r'2 м', r'чехол']),
  ('Умные часы Samsung Galaxy Watch8, 44 мм, Bluetooth/Wi-Fi', 'Samsung Galaxy Watch8 44 мм', [r'watch\s?8\b', r'44'], [r'classic', r'lte']),
  ('Смартфон Apple iPhone 18 Pro Max 512 ГБ', 'iPhone 18 Pro Max 512 ГБ', [r'18 pro max', r'512'], []),
  ('Смартфон Apple iPhone Air 512 ГБ', 'iPhone Air 512 ГБ', [r'iphone air', r'512'], []),
  ('Смартфон Samsung Galaxy S26 Ultra, 12 ГБ + 512 ГБ', 'Samsung Galaxy S26 Ultra 512 ГБ', [r's26 ultra', r'512'], []),
  ('Смартфон Google Pixel 11 Pro XL, 12 ГБ + 256 ГБ (версия Global)', 'Google Pixel 11 Pro XL 256 ГБ', [r'pixel 11 pro xl', r'256'], []),
  ('Смартфон Xiaomi 15T, 12 ГБ + 256 ГБ (версия Global)', 'Xiaomi 15T 256 ГБ', [r'15t\b', r'256'], [r'15t pro']),
  ('Планшет Apple iPad Pro 13", 256 ГБ, Wi-Fi', 'iPad Pro 13 M5 256 ГБ Wi-Fi', [r'ipad pro', r'13', r'256'], [r'cellular', r'lte', r'5g', r'm4\b', r'12[.,]9']),
  ('Планшет Samsung Galaxy Tab S11 Ultra, 12 ГБ + 256 ГБ, Wi-Fi', 'Samsung Galaxy Tab S11 Ultra 256 ГБ Wi-Fi', [r'tab s11 ultra', r'256'], [r'5g', r'lte']),
  ('Ноутбук Apple MacBook Neo 13" MHFF4 (A18 Pro 6-Core, GPU 5-Core, 8GB, 256GB)', 'MacBook Neo 13 256 ГБ', [r'macbook neo', r'256'], []),
  ('Часы Apple Watch Ultra 4, 49 мм, титан чёрного цвета, ремешок Ocean цвета «полупрозрачный чёрный» (2026)', 'Apple Watch Ultra 4 49 мм', [r'ultra 4'], [r'ремешок для', r'чехол']),
  ('Часы Apple Watch SE 3, 40 мм, алюминий цвета «тёмная ночь», ремешок Sport Band цвета «тёмная ночь» (2025)', 'Apple Watch SE 3 40 мм', [r'se 3|se \(3', r'40'], [r'44', r'ремешок для']),
  ('Беспроводные наушники Apple AirPods 5 (USB-C) (2026)', 'AirPods 5', [r'airpods 5'], [r'чехол']),
  ('Беспроводные наушники Apple AirPods 4 с активным шумоподавлением (ANC) и беспроводным зарядным футляром (2024)', 'AirPods 4 ANC', [r'airpods 4', r'шумопод|anc'], [r'без']),
  ('Беспроводные наушники Samsung Galaxy Buds4 (TWS)', 'Samsung Galaxy Buds4', [r'buds\s?4\b'], [r'pro']),
  ('Игровая консоль Sony PlayStation 5 Slim Digital Edition (825 ГБ)', 'PlayStation 5 Slim Digital Edition', [r'slim', r'digital|цифров|без дисковод'], [r'pro']),
  ('Фен Dyson HD16 Supersonic Nural Hair Dryer Straight+Wavy (Prussian Blue/Rich Copper) (2025)', 'Dyson Supersonic Nural HD16', [r'nural|hd16'], []),
  ('Спортивные часы Garmin fenix 9 Pro, 47 мм, AMOLED, титан, сапфир, силиконовый ремешок цвета «графитовый/чёрный» (без inReach)', 'Garmin fenix 9 Pro 47 мм AMOLED', [r'fenix 9 pro', r'47'], [r'solar']),
  ('Умные часы Samsung Galaxy Watch8 Classic, 46 мм, Bluetooth/Wi-Fi', 'Samsung Galaxy Watch8 Classic 46 мм', [r'watch\s?8 classic', r'46'], [r'lte']),
]

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'ru-RU,ru;q=0.9'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.geturl(), r.read().decode('utf-8', 'ignore')

def market(q):
    u, t = get('https://market.yandex.ru/search?text=' + urllib.parse.quote(q))
    if 'showcaptcha' in u or 'showcaptcha' in t[:4000]:
        return None
    items = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', t, re.S):
        try:
            d = json.loads(m.group(1))
        except Exception:
            continue
        if d.get('@type') != 'ItemList':
            continue
        for el in d.get('itemListElement', []):
            it = el.get('item', {}); off = it.get('offers', {}) or {}
            p = off.get('price') or off.get('lowPrice')
            if it.get('name') and p:
                items.append({'name': it['name'], 'price': int(float(p)), 'url': it.get('@id') or it.get('url')})
    return items

groups = json.load(open(sys.argv[1]))
try:
    out = json.load(open(sys.argv[2]))
except Exception:
    out = []
done = {r['key'] for r in out}
for key, q, must, excl in P:
    if key in done:
        continue
    g = groups.get(key)
    if not g:
        print('нет группы', key, file=sys.stderr); continue
    inst = [x for x in g if x['price']]
    bg = min(x['price'] for x in inst)
    best = min(inst, key=lambda x: x['price'])
    items = market(q)
    if items is None:
        print('КАПЧА на Маркете — стоп', file=sys.stderr); break
    ok = [i for i in items if not JUNK.search(i['name'])
          and all(re.search(r, i['name'].lower()) for r in must)
          and not any(re.search(r, i['name'].lower()) for r in excl)]
    pr = [i['price'] for i in ok]
    out.append({'key': key, 'query': q, 'bg': bg, 'bg_url': best['url'], 'ours': ((bg * 95 // 100) - 90) // 100 * 100 + 90,
                'mk_n': len(pr), 'mk_found': len(items), 'mk_median': int(statistics.median(pr)) if pr else None,
                'mk_min': min(pr) if pr else None, 'mk_max': max(pr) if pr else None, 'mk_offers': ok[:8]})
    print(f"{key[:60]:60} bg={bg} mk={out[-1]['mk_median']} ({len(pr)}/{len(items)})", file=sys.stderr)
    json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False, indent=1)
    time.sleep(45 + random.random() * 20)
