"""catalog-merged.json + specs.json (+ market.json) → src/data/products.ts и images-map.json (откуда брать фото).
Описания собираются только из характеристик (факты), без рекламных слов.
python3.12 -I emit_products.py"""
import json, re, html, os, hashlib

ROOT = os.path.expanduser('~/TechAgent')
cat = json.load(open('catalog-merged.json'))
specs_all = json.load(open('specs.json')) if os.path.exists('specs.json') else {}

def slug(s):
    tr = dict(zip('абвгдеёжзийклмнопрстуфхцчшщъыьэюя', ['a','b','v','g','d','e','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u','f','h','c','ch','sh','sch','','y','','e','yu','ya']))
    s = ''.join(tr.get(ch, ch) for ch in (s or '').lower().replace('+', ' plus '))
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-') or 'main'

SKIP = re.compile(r'^(Артикул|Срок службы|Гарантийный срок|Страна производства|Цвет|Поддержка диапазонов|Возможности Bluetooth|Автоматический поворот|'
                  r'Режим полета|Громкая связь|Geo Tagging|HDR|Фотовспышка|Объем встроенной памяти|Тип SIM|Режим работы нескольких SIM|Система A-GPS|'
                  r'Функции |Управление|Расположение сканера|Соотношение сторон|Число пикселей|Макс. частота кадров|Возможности Wi-Fi|Сверхзамедленная|'
                  r'Модель$|Комплектация|Количество основных)', re.I)
ORDER = ['Экран', 'Тип экрана', 'Частота обновления экрана', 'Разрешение экрана', 'Процессор', 'Система на чипе (SoC)', 'Объем оперативной памяти',
         'Основная камера', 'Сверхширокоугольная камера', 'Телефото-камера', 'Фронтальная камера', 'Макс. разрешение видео',
         'Ёмкость аккумулятора', 'Время работы', 'Максимальная мощность зарядки', 'Беспроводная зарядка', 'Класс водонепроницаемости',
         'Материал корпуса', 'Вес (грамм)', 'Размеры', 'Операционная система', 'Год релиза']

def clean_val(v):
    v = html.unescape(v).replace('&quot;', '″').replace('"', '″').strip()
    return re.sub(r'\s*\|\s*', '; ', v)

def pick_specs(fid):
    opts = specs_all.get(fid) or []
    seen, rows = set(), []
    for g, k, v in opts:
        k = html.unescape(k).strip()
        if k in seen or SKIP.search(k) or not v.strip():
            continue
        seen.add(k)
        rows.append((k, clean_val(v)))
    rows.sort(key=lambda kv: ORDER.index(kv[0]) if kv[0] in ORDER else 100)
    out = {}
    for k, v in rows:
        if len(out) >= 14 or len(v) > 90:
            continue
        out[k.replace('Вес (грамм)', 'Вес, г')] = v
    return out

YES_NO = {'да', 'нет', 'есть'}

def summary(p, sp):
    if p['category'] in ('Смартфоны', 'Планшеты'):
        # У моделей, собранных помощниками, ключи английские: display / chip / camera
        parts = [sp.get('Экран') or sp.get('display'), sp.get('Процессор') or sp.get('Система на чипе (SoC)') or sp.get('chip')]
        cam = sp.get('Основная камера') or sp.get('camera')
        if cam:
            m = re.match(r'(\d+)\s*МП', cam)
            parts.append(f'{m.group(1)} Мп' if m else None)
        return ' · '.join(x for x in parts if x)[:70]
    # «да», «есть» без подписи в плитке ничего не говорят; конфигурация уже в названии
    vals = [v for k, v in sp.items() if len(v) <= 28 and k not in ('Конфигурация', 'Память') and v.lower() not in YES_NO][:3]
    return ' · '.join(vals)

def describe(p, sp):
    if p.get('description'):
        return p['description']
    m = p['model']
    if p['category'] in ('Смартфоны', 'Планшеты') and sp:
        screen = ' '.join(x for x in [sp.get('Экран'), sp.get('Тип экрана')] if x)
        hz = sp.get('Частота обновления экрана')
        chip = sp.get('Процессор') or sp.get('Система на чипе (SoC)')
        s1 = f'{m}: экран {screen}' + (f', {hz}' if hz else '') + (f', процессор {chip}' if chip else '') + '.'
        extra = []
        if sp.get('Основная камера'): extra.append(f'основная камера {sp["Основная камера"].split(",")[0]}')
        if sp.get('Ёмкость аккумулятора'): extra.append(f'аккумулятор {sp["Ёмкость аккумулятора"]}')
        if sp.get('Класс водонепроницаемости'): extra.append(f'защита {sp["Класс водонепроницаемости"]}')
        tail = ', '.join(extra)
        return s1 + (' ' + tail[:1].upper() + tail[1:] + '.' if extra else '')
    if sp:
        items = [f'{k[:1].lower() + k[1:]} — {v}' for k, v in sp.items() if k not in ('Конфигурация', 'Память') and v.lower() not in YES_NO][:3]
        if not items:
            return m
        return f'{m}: ' + '; '.join(items) + '.'
    return m

def storage_of(v):
    # «256 ГБ», «256 ГБ · Wi‑Fi»; у планшетов память после оперативной: «Wi-Fi 12/256 ГБ», «12/256 ГБ, Wi-Fi»
    m = re.match(r'(\d+ (ГБ|ТБ))', v or '') or re.search(r'\b\d+/(\d+ (ГБ|ТБ))', v or '')
    return m.group(1) if m else None

COLOR_RU = {'Black': 'Чёрный', 'Grey': 'Серый', 'Gray': 'Серый', 'White': 'Белый', 'Silver': 'Серебристый', 'Blue': 'Синий',
            'Green': 'Зелёный', 'Pink': 'Розовый', 'Red': 'Красный', 'Purple': 'Фиолетовый', 'Gold': 'Золотой', 'Navy': 'Тёмно-синий',
            'Titanium': 'Титан', 'Graphite': 'Графитовый', 'Midnight': 'Тёмная ночь', 'Starlight': 'Сияющая звезда'}
# Порядок в каталоге: разделы, внутри — новинки первыми (остальные — как в выгрузке)
CAT_ORDER = ['Смартфоны', 'Планшеты', 'Ноутбуки', 'Наушники', 'Часы', 'Игровые консоли', 'Камеры и дроны', 'Для дома', 'Телевизоры', 'Аксессуары']
FIRST = ['iphone-18-pro-max', 'iphone-18-pro', 'iphone-duo', 'galaxy-s26-ultra', 'galaxy-z-fold8-ultra', 'galaxy-z-fold8', 'galaxy-z-flip8',
         'pixel-11-pro-xl', 'pixel-11-pro', 'pixel-11-pro-fold', 'pixel-11', 'iphone-air', 'iphone-17', 'iphone-17e', 'galaxy-s26-plus', 'galaxy-s26',
         'galaxy-s26-fe', 'xiaomi-17-ultra', 'xiaomi-17', 'huawei-pura-90s-pro-max', 'huawei-pura-90s-pro', 'honor-magic-v6',
         'ipad-pro-13', 'ipad-pro-11', 'ipad-air-13', 'ipad-air-11', 'galaxy-tab-s12-ultra', 'galaxy-tab-s12-plus',
         'macbook-pro-16', 'macbook-pro-14', 'macbook-air-15', 'macbook-air-13', 'macbook-neo',
         'airpods-pro-3', 'airpods-max-2', 'airpods-5', 'airpods-5-wireless', 'apple-watch-ultra-4', 'apple-watch-series-12', 'galaxy-watch9',
         'playstation-5-pro', 'ps5-pro', 'switch-2', 'dji-mini-5-pro', 'osmo-action-6', 'dyson-airwrap-coanda-2x', 'samsung-s95h', 'lg-g6', 'airtag-2']
RENAME = {'MacBook Air 13" (M5)': 'MacBook Air 13"', 'MacBook Air 15" (M5)': 'MacBook Air 15"'}
products, imgmap = [], {}
# Характеристики собраны по модели, а не по варианту: у часов 42/46 мм, Garmin AMOLED/Solar экран, вес, батарея у вариантов
# разные. В таких моделях эти строки не показываем, чтобы не написать покупателю чужие цифры
SIZE_VARIANT = re.compile(r'\d+(?:[.,]\d+)?\s?мм|AMOLED|Solar|\d+(?:[.,]\d+)?(?:"|″)')
SIZE_SPEC = re.compile(r'Экран|экрана|Диагональ|Разрешение|Время работы|Аккумулятор|Ёмкость|Вес|Размер|Материал корпуса', re.I)
fam_vars = {}
for p in cat:
    fam_vars.setdefault(p['family'], set()).add(p.get('variant') or '')
size_families = {f for f, vs in fam_vars.items() if len(vs) > 1 and any(SIZE_VARIANT.search(v) for v in vs)}
for p in cat:
    sp = pick_specs(p['family']) if p.get('source') != 'agent' else {k: v for k, v in (p.get('specs') or {}).items() if isinstance(v, str)}
    var = p.get('variant')
    if p['family'] in size_families:
        sp = {k: v for k, v in sp.items() if not SIZE_SPEC.search(k)}
    if var:
        sp = {('Память' if re.match(r'\d+ (ГБ|ТБ)', var) else 'Конфигурация'): var, **{k: v for k, v in sp.items() if k != 'Объем встроенной памяти'}}
    colors = []
    for c in p['colors']:
        name = (c.get('ru') or '').strip()
        name = COLOR_RU.get(name, name)
        if name and c.get('en') and c['en'] != name and not re.search(r'[А-Яа-я]', c['en']):
            name = f'{name}'
        path = f'/images/p/{p["family"]}/{slug(name)}.webp'
        # У Galaxy Watch8 в выгрузке на месте цвета — связь («Bluetooth/Wi-Fi + 4G LTE»): это не цвет, связь уже в конфигурации
        if re.match(r'(Bluetooth|Wi-?Fi|LTE)', name):
            name = ''
        if c.get('img'):
            imgmap[path] = hashlib.sha1(c['img'].encode()).hexdigest()[:16]
        colors.append({'name': name, 'image': path if c.get('img') else ''})
    p['model'] = RENAME.get(p['model'], p['model'])
    name = p['model'] + (f' {var}' if var else '')
    p['id'] = slug(name.replace('″', ' ').replace('"', ' '))
    products.append({
        'id': p['id'], 'name': name, 'model': p['model'], 'variant': var, 'storage': storage_of(var), 'family': p['family'],
        'brand': p['brand'], 'category': p['category'], 'price': p['price'],
        'image': next((c['image'] for c in colors if c['image']), ''),
        'colors': [c for c in colors if c['name'] or len(colors) == 1],
        'specs': sp, 'summary': summary(p, sp), 'inStock': True, 'description': describe(p, sp),
    })

head = '''/* Каталог TechAgent. Файл собирается скриптом docs/catalog-2026-10/emit_products.py из выгрузки BigGeek
 * и линеек производителей — руками не править: правки цен и состава делаются в сборке.
 * Карточка = модель + конфигурация (память / размер / комплектация); цвета — внутри карточки (colors). */

export interface ProductColor {
  name: string
  /** Фото этого цвета, /images/p/<семейство>/<цвет>.webp */
  image: string
}

export interface Product {
  id: string
  /** Модель и конфигурация: «iPhone 18 Pro 256 ГБ» */
  name: string
  model: string
  /** Конфигурация внутри модели: «256 ГБ», «256 ГБ · Wi‑Fi», «M5 10/10 · 16 ГБ · 1 ТБ»; null — у модели одна конфигурация */
  variant: string | null
  /** Память, если конфигурация — это объём памяти (для фильтра) */
  storage: string | null
  /** Карточки одной модели — одно семейство */
  family: string
  brand: string
  category: string
  price: number
  /** Фото первого цвета */
  image: string
  colors: ProductColor[]
  specs: Record<string, string>
  /** Короткая строка характеристик для плиток каталога */
  summary: string
  inStock: boolean
  description: string
}

export const products: Product[] = '''
rank = {f: i for i, f in enumerate(FIRST)}
orig = {f: i for i, f in enumerate(dict.fromkeys(x['family'] for x in products))}
products.sort(key=lambda x: (CAT_ORDER.index(x['category']) if x['category'] in CAT_ORDER else 99, rank.get(x['family'], 1000 + orig[x['family']]), x['price']))
ids = [x['id'] for x in products]
assert len(ids) == len(set(ids)), [i for i in ids if ids.count(i) > 1]
body = json.dumps(products, ensure_ascii=False, indent=1)
open(os.path.join(ROOT, 'src/data/products.ts'), 'w').write(head + body + '\n')
json.dump(imgmap, open('images-map.json', 'w'), ensure_ascii=False, indent=0)
print(len(products), 'товаров;', len(imgmap), 'фото;', sum(1 for p in products if not p['image']), 'без фото;',
      sum(1 for p in products if not p['specs'] or len(p['specs']) < 3), 'почти без характеристик')
