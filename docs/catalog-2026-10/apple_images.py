"""Официальные фото Apple (store.storeimages.cdn-apple.com) вместо фото BigGeek с их обоями и надписями.
Для каждого семейства Apple и цвета подбирает адрес по шаблону Apple и проверяет, что он отдаёт картинку.
Меняет img у цветов в catalog-merged.json; что не нашлось — печатает. python3.12 -I apple_images.py"""
import json, re, urllib.request

B = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/'
Q = '?wid=1800&hei=1800&fmt=png-alpha'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'

T = {  # семейство → шаблоны ({c} — цвет)
    'iphone-18-pro-max': ['iphone-18-pro-max-finish-select-{c}-202609'],
    'iphone-18-pro': ['iphone-18-pro-finish-select-{c}-202609'],
    'iphone-duo': ['iphone-duo-finish-select-{c}-202609'],
    'iphone-air': ['iphone-air-finish-select-{c}-202509'],
    'iphone-17-pro-max': ['iphone-17-pro-finish-select-202509-6-9inch-{c}'],
    'iphone-17-pro': ['iphone-17-pro-finish-select-202509-6-3inch-{c}'],
    'iphone-17': ['iphone-17-finish-select-{c}-202509'],
    'iphone-17e': ['iphone-17e-finish-select-{c}-202603'],
    'iphone-16': ['iphone-16-{c}-select-202409', 'iphone-16-finish-select-202409-6-1inch-{c}'],
    'ipad-pro-11': ['ipad-pro-11-select-wifi-{c}-202510', 'ipad-pro-11-select-wifi-{c}-202405'],
    'ipad-pro-13': ['ipad-pro-13-select-wifi-{c}-202510', 'ipad-pro-13-select-wifi-{c}-202405'],
    'ipad-air-11': ['ipad-air-select-11in-wifi-{c}-202603', 'ipad-air-select-11in-wifi-{c}-202503', 'ipad-air-select-11in-wifi-{c}-202405'],
    'ipad-air-13': ['ipad-air-select-13in-wifi-{c}-202603', 'ipad-air-select-13in-wifi-{c}-202503', 'ipad-air-select-13in-wifi-{c}-202405'],
    'ipad-11': ['ipad-select-wifi-{c}-202503', 'ipad-2022-hero-{c}-wifi-select'],
    'ipad-mini': ['ipad-mini-select-wifi-{c}-202410'],
    'macbook-air-13': ['mba13-{c}-select-202603', 'mba13-{c}-select-202503'],
    'macbook-air-15': ['mba15-{c}-select-202603', 'mba15-{c}-select-202503'],
    'macbook-pro-14': ['mbp14-{c}-select-202510', 'mbp14-{c}-select-202410'],
    'macbook-pro-16': ['mbp16-{c}-select-202603', 'mbp16-{c}-select-202410'],
    'macbook-neo': ['macbook-neo-{c}-select-202603', 'macbook-neo-{c}-cto-hero-202603'],
    'airpods-max-2': ['airpods-max-2-select-{c}-202604', 'airpods-max-select-202409-{c}'],
}
SINGLE = {  # одно фото на всю карточку
    'airpods-pro-3': 'airpods-pro-3-hero-select-202509', 'airpods-5': 'airpods-5-select-202609',
    'airpods-5-wireless': 'airpods-5-wcc-select-202609',
    'apple-watch-series-12': 'watch-compare-series-12-202609', 'apple-watch-ultra-4': 'watch-compare-ultra-4-202609',
    'apple-watch-se-3': 'watch-compare-se-3-202609',
}
ALIAS = {'cosmic-orange': ['cosmicorange'], 'deep-blue': ['deepblue'], 'sky-blue': ['skyblue'], 'space-black': ['spaceblack'],
         'space-gray': ['spacegray'], 'mist-blue': ['mistblue'], 'soft-pink': ['softpink'], 'cloud-white': ['cloudwhite'],
         'light-gold': ['lightgold'], 'night-sky': ['night-sky', 'nightsky'], 'star-white': ['star-white', 'starwhite']}

def ok(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': UA}, method='HEAD')
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status == 200 and 'image' in r.headers.get('Content-Type', '')
    except Exception:
        return False

def variants(en):
    base = re.sub(r'[^a-z ]', '', (en or '').lower()).strip()
    hy, flat = base.replace(' ', '-'), base.replace(' ', '')
    out = ALIAS.get(hy, []) + [flat, hy]
    return list(dict.fromkeys(x for x in out if x))

cat = json.load(open('catalog-merged.json'))
found, miss, cache = 0, [], {}
for p in cat:
    f = p['family']
    if f in SINGLE:
        url = B + SINGLE[f] + Q
        if ok(url):
            for c in p['colors']: c['img'] = url; c['official'] = True
            found += 1
        else:
            miss.append((f, '*'))
        continue
    if f not in T:
        continue
    for c in p['colors']:
        key = (f, c.get('en'))
        if key not in cache:
            cache[key] = None
            for tpl in T[f]:
                for v in variants(c.get('en')):
                    url = B + tpl.format(c=v) + Q
                    if ok(url):
                        cache[key] = url; break
                if cache[key]: break
        if cache[key]:
            c['img'] = cache[key]; c['official'] = True; found += 1
        else:
            miss.append(key)
json.dump(cat, open('catalog-merged.json', 'w'), ensure_ascii=False, indent=1)
print('заменено', found)
print('не нашлось:', sorted(set(miss)))
