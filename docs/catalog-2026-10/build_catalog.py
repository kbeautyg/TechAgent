"""Сборка каталога TechAgent из выгрузки BigGeek (bg.json).
Карточка = модель + конфигурация (память / размер / комплектация); цвета — внутри карточки.
Цена = минимальная цена BigGeek по цветам этой конфигурации минус 5 %, округление вниз до …90.
python3.12 -I build_catalog.py  →  catalog.json (+ отчёт в stdout)"""
import json, re, collections, hashlib

d = json.load(open('bg.json'))
items = {}
for slug, v in d.items():
    for i in v['items']:
        if i.get('url') and i.get('price') and i['url'] not in items:
            items[i['url']] = i

def colors_of(t):
    """«(«Космический оранжевый» | Cosmic Orange)» → ('Космический оранжевый', 'Cosmic Orange')"""
    out = []
    for c in re.findall(r'\(([^()|]*\|[^()]*)\)', t):
        ru, en = [x.strip(' «»"') for x in c.split('|', 1)]
        out.append((ru, en))
    return out

def mem(t):
    """«12 ГБ + 256 ГБ» → '256 ГБ'; «1 ТБ» → '1 ТБ'"""
    m = re.findall(r'(\d+)\s*(ГБ|ТБ)', t)
    if not m:
        return None
    n, u = m[-1]
    return f'{n} {u}'

# ---------- семейства ----------
# (id, категория, бренд, модель на сайте, регэксп по названию BigGeek, способ разбора варианта)
F = []
def fam(fid, cat, brand, model, rx, kind='mem', exclude=None):
    F.append(dict(fid=fid, cat=cat, brand=brand, model=model, rx=re.compile(rx), kind=kind,
                  ex=re.compile(exclude) if exclude else None))

S, T, N, W, H, G, C, D, TV, A = ('Смартфоны', 'Планшеты', 'Ноутбуки', 'Часы', 'Наушники', 'Игровые консоли',
                                 'Камеры и дроны', 'Для дома', 'Телевизоры', 'Аксессуары')
# Apple iPhone
fam('iphone-18-pro-max', S, 'Apple', 'iPhone 18 Pro Max', r'^Смартфон Apple iPhone 18 Pro Max \d')
fam('iphone-18-pro', S, 'Apple', 'iPhone 18 Pro', r'^Смартфон Apple iPhone 18 Pro \d')
fam('iphone-duo', S, 'Apple', 'iPhone Duo', r'^Смартфон Apple iPhone Duo \d')
fam('iphone-air', S, 'Apple', 'iPhone Air', r'^Смартфон Apple iPhone Air \d')
fam('iphone-17-pro-max', S, 'Apple', 'iPhone 17 Pro Max', r'^Смартфон Apple iPhone 17 Pro Max \d')
fam('iphone-17-pro', S, 'Apple', 'iPhone 17 Pro', r'^Смартфон Apple iPhone 17 Pro \d')
fam('iphone-17', S, 'Apple', 'iPhone 17', r'^Смартфон Apple iPhone 17 \d')
fam('iphone-17e', S, 'Apple', 'iPhone 17e', r'^Смартфон Apple iPhone 17e \d')
fam('iphone-16', S, 'Apple', 'iPhone 16', r'^Смартфон Apple iPhone 16 \d')
# Samsung
for fid, model, rx in [
    ('galaxy-s26-ultra', 'Galaxy S26 Ultra', r'Galaxy S26 Ultra,'), ('galaxy-s26-plus', 'Galaxy S26+', r'Galaxy S26\+,'),
    ('galaxy-s26', 'Galaxy S26', r'Galaxy S26,'), ('galaxy-s26-fe', 'Galaxy S26 FE', r'Galaxy S26 FE,'),
    ('galaxy-s25-ultra', 'Galaxy S25 Ultra', r'Galaxy S25 Ultra,'), ('galaxy-s25-edge', 'Galaxy S25 Edge', r'Galaxy S25 Edge,'),
    ('galaxy-s25', 'Galaxy S25', r'Galaxy S25,'), ('galaxy-s25-fe', 'Galaxy S25 FE', r'Galaxy S25 FE,'),
    ('galaxy-z-fold8-ultra', 'Galaxy Z Fold8 Ultra', r'Galaxy Z Fold8 Ultra,'), ('galaxy-z-fold8', 'Galaxy Z Fold8', r'Galaxy Z Fold8,'),
    ('galaxy-z-flip8', 'Galaxy Z Flip8', r'Galaxy Z Flip8,'), ('galaxy-z-flip7-fe', 'Galaxy Z Flip7 FE', r'Galaxy Z Flip7 FE,'),
    ('galaxy-a57', 'Galaxy A57', r'Galaxy A57 5G'), ('galaxy-a37', 'Galaxy A37', r'Galaxy A37 5G'), ('galaxy-a27', 'Galaxy A27', r'Galaxy A27 5G'),
    ('galaxy-a56', 'Galaxy A56', r'Galaxy A56 5G'), ('galaxy-a36', 'Galaxy A36', r'Galaxy A36 5G'),
]:
    fam(fid, S, 'Samsung', model, r'^Смартфон Samsung ' + rx)
# Google
for fid, model, rx in [('pixel-11-pro-fold', 'Pixel 11 Pro Fold', r'Pixel 11 Pro Fold,'), ('pixel-11-pro-xl', 'Pixel 11 Pro XL', r'Pixel 11 Pro XL,'),
                       ('pixel-11-pro', 'Pixel 11 Pro', r'Pixel 11 Pro,'), ('pixel-11', 'Pixel 11', r'Pixel 11,'),
                       ('pixel-10a', 'Pixel 10a', r'Pixel 10a,'), ('pixel-10-pro', 'Pixel 10 Pro', r'Pixel 10 Pro,')]:
    fam(fid, S, 'Google', model, r'^Смартфон Google ' + rx)
# Xiaomi
for fid, model, rx in [('xiaomi-15t-pro', 'Xiaomi 15T Pro', r'Xiaomi 15T Pro,'), ('xiaomi-15t', 'Xiaomi 15T', r'Xiaomi 15T,'),
                       ('xiaomi-15', 'Xiaomi 15', r'Xiaomi 15,'), ('poco-f8-ultra', 'POCO F8 Ultra', r'POCO F8 Ultra,'),
                       ('poco-f8-pro', 'POCO F8 Pro', r'POCO F8 Pro,'), ('poco-x7-pro', 'POCO X7 Pro', r'POCO X7 Pro,'),
                       ('redmi-note-17-pro-max', 'Redmi Note 17 Pro Max', r'REDMI Note 17 Pro Max 5G'),
                       ('redmi-note-17-pro', 'Redmi Note 17 Pro', r'REDMI Note 17 Pro 5G'), ('redmi-17', 'Redmi 17', r'REDMI 17 4G')]:
    fam(fid, S, 'Xiaomi', model, r'^Смартфон (Xiaomi )?' + rx)
# Другие
for fid, brand, model, rx in [
    ('honor-magic-v6', 'Honor', 'Honor Magic V6', r'HONOR Magic V6'), ('honor-magic8-pro', 'Honor', 'Honor Magic8 Pro', r'HONOR Magic8 Pro'),
    ('honor-400-pro', 'Honor', 'Honor 400 Pro', r'HONOR 400 Pro'),
    ('huawei-pura-90s-pro-max', 'Huawei', 'Huawei Pura 90s Pro Max', r'HUAWEI Pura 90s Pro Max'),
    ('huawei-pura-90s-pro', 'Huawei', 'Huawei Pura 90s Pro', r'HUAWEI Pura 90s Pro(?! Max)'),
    ('huawei-mate-x7', 'Huawei', 'Huawei Mate X7', r'HUAWEI Mate X7'), ('huawei-nova-15-pro', 'Huawei', 'Huawei nova 15 Pro', r'HUAWEI nova 15 Pro'),
    ('oneplus-15', 'OnePlus', 'OnePlus 15', r'OnePlus 15(?!R)\b'), ('oneplus-15r', 'OnePlus', 'OnePlus 15R', r'OnePlus 15R'),
    ('oneplus-nord-ce6', 'OnePlus', 'OnePlus Nord CE6', r'OnePlus Nord CE6'),
    ('nothing-phone-3', 'Nothing', 'Nothing Phone (3)', r'Nothing Phone \(3\)'), ('nothing-phone-4b', 'Nothing', 'Nothing Phone (4b)', r'Nothing Phone \(4b\)'),
    ('vivo-x300-ultra', 'Vivo', 'Vivo X300 Ultra', r'Vivo X300 Ultra'), ('vivo-x300-pro', 'Vivo', 'Vivo X300 Pro', r'Vivo X300 Pro'),
    ('realme-gt-7t', 'Realme', 'Realme GT 7T', r'Realme GT 7T'),
]:
    fam(fid, S, brand, model, r'^Смартфон ' + rx, exclude=r'индийская')

# Планшеты
fam('ipad-pro-13', T, 'Apple', 'iPad Pro 13" (M5)', r'^Планшет Apple iPad Pro 13", \d', 'ipad')
fam('ipad-pro-11', T, 'Apple', 'iPad Pro 11" (M5)', r'^Планшет Apple iPad Pro 11", \d', 'ipad')
fam('ipad-air-13', T, 'Apple', 'iPad Air 13" (M4)', r'^Планшет Apple iPad Air 13”', 'ipad')
fam('ipad-air-11', T, 'Apple', 'iPad Air 11" (M4)', r'^Планшет Apple iPad Air 11”', 'ipad')
fam('ipad-11', T, 'Apple', 'iPad 11" (A16)', r'^Планшет Apple iPad 11”', 'ipad')
fam('ipad-mini', T, 'Apple', 'iPad mini (A17 Pro)', r'^Планшет Apple iPad mini,', 'ipad')
for fid, model, rx in [('galaxy-tab-s11-ultra', 'Galaxy Tab S11 Ultra', r'Tab S11 Ultra,'), ('galaxy-tab-s11', 'Galaxy Tab S11', r'Tab S11,'),
                       ('galaxy-tab-s10-fe-plus', 'Galaxy Tab S10 FE+', r'Tab S10 FE\+,'), ('galaxy-tab-s10-fe', 'Galaxy Tab S10 FE', r'Tab S10 FE,')]:
    fam(fid, T, 'Samsung', model, r'^Планшет Samsung Galaxy ' + rx, 'tab')
fam('xiaomi-pad-8-pro', T, 'Xiaomi', 'Xiaomi Pad 8 Pro', r'^Планшет Xiaomi Pad 8 Pro', 'tab')
fam('xiaomi-pad-7', T, 'Xiaomi', 'Xiaomi Pad 7', r'^Планшет Xiaomi Pad 7', 'tab')
fam('redmi-pad-2-pro', T, 'Xiaomi', 'Redmi Pad 2 Pro', r'^Планшет Xiaomi REDMI Pad 2 Pro', 'tab')
fam('matepad-pro-max', T, 'Huawei', 'Huawei MatePad Pro Max', r'^Планшет HUAWEI MatePad Pro Max', 'tab')
fam('matepad-11-5-s', T, 'Huawei', 'Huawei MatePad 11.5" S', r'^Планшет HUAWEI MatePad 11,5” S', 'tab')

# Ноутбуки (без «кастомных» сборок)
fam('macbook-pro-16', N, 'Apple', 'MacBook Pro 16"', r'^Ноутбук Apple MacBook Pro 16" [A-Z0-9]{5} \(', 'mac', exclude=r'кастом|нанотекст')
fam('macbook-pro-14', N, 'Apple', 'MacBook Pro 14"', r'^Ноутбук Apple MacBook Pro 14" [A-Z0-9]{5} \(', 'mac', exclude=r'кастом|нанотекст')
fam('macbook-air-15', N, 'Apple', 'MacBook Air 15" (M5)', r'^Ноутбук Apple MacBook Air 15” [A-Z0-9]{5} \(M5', 'mac', exclude=r'кастом')
fam('macbook-air-13', N, 'Apple', 'MacBook Air 13" (M5)', r'^Ноутбук Apple MacBook Air 13” [A-Z0-9]{5} \(M5', 'mac', exclude=r'кастом')
fam('macbook-neo', N, 'Apple', 'MacBook Neo 13"', r'^Ноутбук Apple MacBook Neo 13"', 'mac')
fam('galaxy-book6-pro-16', N, 'Samsung', 'Galaxy Book6 Pro 16"', r'^Ноутбук Samsung Galaxy Book6 Pro 16"', 'paren')
fam('galaxy-book6-pro-14', N, 'Samsung', 'Galaxy Book6 Pro 14"', r'^Ноутбук Samsung Galaxy Book6 Pro 14"', 'paren')
fam('galaxy-book6-14', N, 'Samsung', 'Galaxy Book6 14"', r'^Ноутбук Samsung Galaxy Book6 14"', 'paren')

# Часы
fam('apple-watch-ultra-4', W, 'Apple', 'Apple Watch Ultra 4', r'^Часы Apple Watch Ultra 4,', 'watch')
fam('apple-watch-series-12', W, 'Apple', 'Apple Watch Series 12', r'^Часы Apple Watch Series 12,', 'watch')
fam('apple-watch-se-3', W, 'Apple', 'Apple Watch SE 3', r'^Часы Apple Watch SE 3,', 'watch')
fam('galaxy-watch8-classic', W, 'Samsung', 'Galaxy Watch8 Classic', r'Galaxy Watch8 Classic,', 'conn')
fam('galaxy-watch8', W, 'Samsung', 'Galaxy Watch8', r'Galaxy Watch8,', 'conn')
fam('galaxy-ring', W, 'Samsung', 'Galaxy Ring', r'^Умное кольцо Samsung Galaxy Ring', 'paren')
fam('oura-ring-5', W, 'Oura', 'Oura Ring 5', r'^Умное кольцо Oura Ring 5', 'paren')
fam('garmin-fenix-9-pro', W, 'Garmin', 'Garmin fenix 9 Pro', r'^Спортивные часы Garmin fenix 9 Pro,', 'garmin')
fam('garmin-forerunner-970', W, 'Garmin', 'Garmin Forerunner 970', r'Garmin Forerunner 970', 'garmin')
fam('garmin-forerunner-570', W, 'Garmin', 'Garmin Forerunner 570', r'Garmin Forerunner 570', 'garmin')
fam('garmin-venu-x1', W, 'Garmin', 'Garmin Venu X1', r'Garmin Venu X1', 'single')
fam('huawei-watch-gt-6-pro', W, 'Huawei', 'Huawei Watch GT 6 Pro', r'HUAWEI WATCH GT 6 Pro', 'single')
fam('huawei-watch-gt-6', W, 'Huawei', 'Huawei Watch GT 6', r'HUAWEI WATCH GT 6,', 'hsize')
fam('huawei-watch-fit-5', W, 'Huawei', 'Huawei Watch Fit 5', r'HUAWEI WATCH FIT 5', 'single')
fam('xiaomi-smart-band-10', W, 'Xiaomi', 'Xiaomi Smart Band 10', r'^Фитнес-браслет Xiaomi Smart Band 10', 'single')

# Наушники и звук
fam('airpods-pro-3', H, 'Apple', 'AirPods Pro 3', r'^Беспроводные наушники Apple AirPods Pro 3', 'single')
fam('airpods-5-wireless', H, 'Apple', 'AirPods 5 с беспроводным футляром', r'^Беспроводные наушники Apple AirPods 5 с беспроводным', 'single')
fam('airpods-5', H, 'Apple', 'AirPods 5', r'^Беспроводные наушники Apple AirPods 5 \(USB-C\)', 'single')
fam('airpods-max-2', H, 'Apple', 'AirPods Max 2', r'^Беспроводные наушники Apple AirPods Max 2', 'single')
fam('beats', H, 'Beats', None, r'^Беспроводные наушники Beats ', 'model', exclude=r'Special Edition')
fam('galaxy-buds4-pro', H, 'Samsung', 'Galaxy Buds4 Pro', r'Galaxy Buds4 Pro', 'single')
fam('galaxy-buds4', H, 'Samsung', 'Galaxy Buds4', r'Galaxy Buds4 \(', 'single')
fam('galaxy-buds3-fe', H, 'Samsung', 'Galaxy Buds3 FE', r'Galaxy Buds3 FE', 'single')
fam('sony-wh-1000xm6', H, 'Sony', 'Sony WH-1000XM6', r'Sony WH-1000XM6', 'single')
fam('sony-wf-1000xm6', H, 'Sony', 'Sony WF-1000XM6', r'Sony WF-1000XM6', 'single')
fam('bose', H, 'Bose', None, r'^Беспроводные наушники Bose QuietComfort Ultra', 'model')
fam('huawei-freeclip-2', H, 'Huawei', 'Huawei FreeClip 2', r'HUAWEI FreeClip 2', 'single')
fam('marshall', H, 'Marshall', None, r'^(Беспроводные наушники|Портативная колонка) Marshall ', 'model', exclude=r'Emberton II\b|Kilburn II\b|Middleton$|Middleton \(')
fam('jbl', H, 'JBL', None, r'^Портативная колонка JBL (Flip 7|Charge 6|Clip 5|Go 4)', 'model')

# Консоли
fam('ps5-pro', G, 'Sony', 'PlayStation 5 Pro', r'^Игровая консоль Sony PlayStation 5 Pro', 'single')
fam('ps5-slim', G, 'Sony', 'PlayStation 5 Slim', r'^Игровая консоль Sony PlayStation 5 Slim \(', 'paren')
fam('ps5-slim-digital', G, 'Sony', 'PlayStation 5 Slim Digital Edition', r'^Игровая консоль Sony PlayStation 5 Slim Digital Edition', 'paren')
fam('dualsense-edge', G, 'Sony', 'DualSense Edge', r'DualSense Edge', 'single')
fam('dualsense', G, 'Sony', 'DualSense', r'^Беспроводной геймпад Sony DualSense для PlayStation 5(?!,)', 'single')
fam('xbox-series-x', G, 'Microsoft', 'Xbox Series X', r'^Игровая консоль XBOX Series X', 'paren')
fam('xbox-series-s', G, 'Microsoft', 'Xbox Series S', r'^Игровая консоль XBOX Series S', 'paren')
fam('switch-2', G, 'Nintendo', 'Nintendo Switch 2', r'^(Портативная игровая|Игровая) консоль Nintendo Switch 2', 'model')
fam('switch-oled', G, 'Nintendo', 'Nintendo Switch OLED', r'Nintendo Switch \(OLED-модель\)$', 'single')
fam('switch-lite', G, 'Nintendo', 'Nintendo Switch Lite', r'Nintendo Switch Lite$', 'single')
fam('steam-deck', G, 'Valve', 'Steam Deck OLED', r'Steam Deck OLED', 'paren')
fam('rog-ally', G, 'ASUS', None, r'(?i)консоль ASUS ROG (XBOX )?Ally', 'model')

# Камеры
fam('osmo-action-6', C, 'DJI', 'DJI Osmo Action 6', r'^Экшн-камера DJI Osmo Action 6', 'paren')
fam('osmo-pocket-4p', C, 'DJI', 'DJI Osmo Pocket 4P', r'DJI Osmo Pocket 4P', 'paren')
fam('osmo-360', C, 'DJI', 'DJI Osmo 360', r'DJI Osmo 360', 'paren')
fam('gopro-hero13', C, 'GoPro', 'GoPro HERO13 Black', r'GoPro HERO13 Black', 'paren')
fam('insta360-x6', C, 'Insta360', 'Insta360 X6', r'Insta360 X6', 'paren')
fam('osmo-mobile-8', C, 'DJI', 'DJI Osmo Mobile 8', r'DJI Osmo Mobile 8', 'paren')

# Для дома
fam('dyson-airwrap-coanda-2x', D, 'Dyson', 'Dyson Airwrap Co-anda 2x', r'Airwrap Air Lab Coanda 2x', 'dyson')
fam('dyson-airwrap-id', D, 'Dyson', 'Dyson Airwrap i.d.', r'Airwrap i\.d\.', 'dyson')
fam('dyson-supersonic-nural', D, 'Dyson', 'Dyson Supersonic Nural', r'Supersonic Nural', 'dyson')
fam('dyson-supersonic-r', D, 'Dyson', 'Dyson Supersonic r', r'Supersonic r\b', 'dyson')
fam('dyson-airstrait', D, 'Dyson', 'Dyson Airstrait', r'Airstrait', 'dyson')
fam('dyson-v16', D, 'Dyson', 'Dyson V16 Piston Animal', r'Dyson V16', 'dyson')
fam('dyson-v15', D, 'Dyson', 'Dyson V15 Detect', r'Dyson V15 Detect', 'dyson')
fam('dyson-pencilvac', D, 'Dyson', 'Dyson PencilVac', r'PencilVac', 'dyson')
fam('dyson-purifier', D, 'Dyson', None, r'^Очиститель воздуха Dyson', 'dysonmodel')
fam('dreame-x60', D, 'Dreame', 'Dreame X60 Ultra Complete', r'Dreame X60 Ultra Complete', 'single')
fam('dreame-l50s', D, 'Dreame', 'Dreame L50s Pro Ultra', r'Dreame L50s Pro Ultra', 'single')
fam('dreame-z40', D, 'Dreame', 'Dreame Z40 Aqua Cycle Pro', r'Dreame Z40 Aqua Cycle Pro', 'single')

# Аксессуары
fam('airtag-2', A, 'Apple', 'AirTag (2-го поколения)', r'Apple AirTag 2-го поколения', 'pack')
fam('magsafe-charger', A, 'Apple', 'Зарядное устройство MagSafe (Qi2.2)', r'MagSafe Charger \(Qi2\.2\)', 'len')
fam('apple-pencil-pro', A, 'Apple', 'Apple Pencil Pro', r'^Стилус Apple Pencil Pro', 'single')
fam('magic-keyboard-touch-id', A, 'Apple', None, r'^Беспроводная клавиатура Apple Magic Keyboard с Touch ID', 'model', exclude=r'Lightning')
fam('magic-mouse', A, 'Apple', 'Magic Mouse (USB-C)', r'Apple Magic Mouse', 'paren')
fam('apple-35w', A, 'Apple', None, r'^Сетевое зарядное устройство Apple (Compact )?мощностью 35 Вт', 'model')
fam('apple-20w', A, 'Apple', 'Сетевое зарядное устройство Apple 20 Вт (USB-C)', r'^Сетевое зарядное устройство Apple мощностью 20 Вт', 'single')

fam_by_id = {f['fid']: f for f in F}

def variant(f, t):
    k = f['kind']
    if k == 'mem':
        return mem(t)
    if k == 'ipad':
        m = mem(t); cell = 'Wi‑Fi + Cellular' if 'Cellular' in t else 'Wi‑Fi'
        return f'{m} · {cell}' if m else cell
    if k == 'tab':
        m = mem(t); cell = '5G' if re.search(r'5G|LTE|Cellular', t) else 'Wi‑Fi'
        return f'{m} · {cell}' if m else cell
    if k == 'mac':
        c = re.search(r'\(([^)]*Core[^)]*)\)', t).group(1)
        chip = re.match(r'(M5(?: Pro| Max)?|A18 Pro)\s+(\d+)-Core', c)
        gpu = re.search(r'GPU (\d+)-Core', c); ram, ssd = re.findall(r'(\d+)(GB|TB)', c)[-2:]
        return f'{chip.group(1)} {chip.group(2)}/{gpu.group(1)} · {ram[0]} ГБ · {ssd[0]} {"ТБ" if ssd[1] == "TB" else "ГБ"}'
    if k == 'watch':
        size = re.search(r'(\d+) мм', t).group(1)
        mat = 'титан' if 'титан' in t else 'керамика' if 'керамика' in t else 'алюминий'
        cell = ' · LTE' if re.search(r'Cellular|LTE', t) else ''
        return f'{size} мм · {mat}{cell}'
    if k == 'conn':
        size = re.search(r'(\d+) мм', t).group(1)
        return f'{size} мм' + (' · LTE' if 'LTE' in t else '')
    if k == 'hsize':
        m = re.search(r'(\d+) мм', t)
        return f'{m.group(1)} мм' if m else None
    if k == 'garmin':
        size = re.search(r'(\d+) мм', t)
        solar = 'Solar' if 'Solar' in t else ('AMOLED' if 'AMOLED' in t else '')
        ir = ' · inReach' if 'с inReach' in t else ''
        v = ' · '.join(x for x in [size.group(1) + ' мм' if size else '', solar] if x) + ir
        return v or None
    if k == 'pack':
        return '4 шт.' if '4 шт' in t else '1 шт.'
    if k == 'len':
        m = re.search(r'\((\d) м\)', t); return f'{m.group(1)} м' if m else None
    if k == 'paren' and re.search(r'Intel Core', t):
        m = re.search(r'\((Intel Core Ultra \d+ \w+), (\d+)GB, (\d+)(GB|TB)\)', t)
        return f'{m.group(1)} · {m.group(2)} ГБ · {m.group(3)} {"ТБ" if m.group(4) == "TB" else "ГБ"}' if m else None
    if k == 'paren':
        ps = [p for p in re.findall(r'\(([^()]*)\)', t) if '|' not in p and not re.fullmatch(r'\d{4}', p) and 'версия' not in p]
        return ps[0] if ps else None
    if k == 'dyson':
        m = re.search(r'Dyson\s+(.*?)\s*\((?:[A-Z][a-z]+(?: [A-Z][a-z]+)?/[A-Za-z ]+|[A-Z][a-z]+ [A-Z][a-z]+)\)', t)
        return None
    return None  # single / model

def dyson_color(t):
    ps = re.findall(r'\(([^()]*)\)', t)
    for p in ps:
        if '/' in p or re.fullmatch(r'[A-Z][a-z]+( [A-Z][a-z]+)*', p):
            return (p, p)
    return None

def model_name(f, t):
    if f['model']:
        return f['model']
    b = re.sub(r'^(Беспроводные наушники|Портативная колонка|Игровая консоль|Портативная игровая консоль|Очиститель воздуха|Беспроводная клавиатура|Сетевое зарядное устройство)\s+', '', t)
    b = re.sub(r'\s*\([^()]*\|[^()]*\)', '', b)
    b = re.sub(r'\s*\((\d{4}|TWS)\)', '', b)
    if f['kind'] == 'dysonmodel':
        b = re.sub(r'\s*\([A-Za-z]+(?: [A-Za-z]+)?/[A-Za-z]+(?: [A-Za-z]+)?\)', '', b)
    return b.strip()

JUNK = re.compile(r'\(OEM\)|Левый наушник|Правый наушник|футляр для|уценк|б/у|Восстановлен|витрин|^\S*\s*чехол|чехол для|стекл|^Ремеш|брелок|кастом', re.I)

cards = collections.OrderedDict()
unused = collections.Counter()
for i in items.values():
    t = i['title']
    if JUNK.search(t):
        continue
    f = next((f for f in F if f['rx'].search(t) and not (f['ex'] and f['ex'].search(t))), None)
    if not f:
        continue
    model = model_name(f, t)
    var = variant(f, t)
    cols = colors_of(t) or ([dyson_color(t)] if f['kind'] in ('dyson', 'dysonmodel') and dyson_color(t) else [])
    if f['kind'] == 'watch':
        # цвет часов = всё после размера и материала: «алюминий чёрного цвета, ремешок Sport Band чёрного цвета»
        rest = re.sub(r'^.*?\d+ мм,\s*', '', t)
        rest = re.sub(r'\s*\(\d{4}\)$', '', rest)
        cols = [(rest, rest)]
    if f['kind'] in ('garmin', 'conn', 'hsize') and not cols:
        rest = re.sub(r'^.*?мм,\s*', '', t)
        cols = [(rest, rest)] if rest != t else []
    key = (f['fid'], model, var)
    c = cards.setdefault(key, dict(fid=f['fid'], cat=f['cat'], brand=f['brand'], model=model, variant=var, offers=[]))
    c['offers'].append(dict(price=i['price'], old=i.get('old'), url=i['url'], img=i.get('img'),
                            color=cols[0] if cols else None, title=t, note=i.get('note', '')))

def our_price(p):
    return ((p * 95 // 100) - 90) // 100 * 100 + 90

def slug(s):
    tr = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a','b','v','g','d','e','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','c','ch','sh','sch','','y','','e','yu','ya']))
    s = ''.join(tr.get(ch, ch) for ch in s.lower().replace('+', ' plus '))
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

out = []
for (fid, model, var), c in cards.items():
    best = min(c['offers'], key=lambda o: o['price'])
    colors = collections.OrderedDict()
    for o in sorted(c['offers'], key=lambda o: o['price']):
        name = o['color'] or ('', '')
        colors.setdefault(name, dict(ru=name[0], en=name[1], img=o['img'], bg_url=o['url'], bg_price=o['price']))
    pid = slug(f'{model} {var or ""}')
    out.append(dict(id=pid, family=fid, category=c['cat'], brand=c['brand'], model=model, variant=var,
                    bg_price=best['price'], price=our_price(best['price']), bg_url=best['url'],
                    colors=[v for k, v in colors.items()], titles=sorted({o['title'] for o in c['offers']})[:3]))

ids = collections.Counter(p['id'] for p in out)
dups = [k for k, v in ids.items() if v > 1]
json.dump(out, open('catalog.json', 'w'), ensure_ascii=False, indent=1)
cnt = collections.Counter(p['category'] for p in out)
print(len(out), dict(cnt), 'дубли id:', dups[:10])
fams = collections.Counter(p['family'] for p in out)
print('семейства без карточек:', [f['fid'] for f in F if f['fid'] not in fams])
