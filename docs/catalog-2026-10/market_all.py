"""Цены Яндекс Маркета для всех карточек каталога (кроме аксессуаров). Медленно: 50–70 с между запросами,
иначе Маркет показывает капчу. Можно прерывать и запускать снова — продолжит с места остановки.
python3.12 -I market_all.py catalog-merged.json market.json"""
import json, re, sys, time, random, statistics
sys.path.insert(0, '.')
from pilot import market, JUNK  # noqa

VARIANTS = ['pro', 'max', 'ultra', 'plus', 'mini', 'fe', 'lite', 'edge', 'air', 'se', 'classic', 'xl', 'fold', 'flip', 'slim', 'digital', 'cellular', 'neo', 'nural', 'x']
STOP = {'apple', 'samsung', 'galaxy', 'google', 'xiaomi', 'huawei', 'honor', 'sony', 'dyson', 'garmin', 'монитор', 'саундбар', 'роутер', 'кофемашина',
        'клавиатура', 'ssd', 'очиститель', 'воздуха', 'настольная', 'лампа', 'чехол', 'для', 'подставка-зарядка', 'microsoft', 'lenovo', 'dell', 'hp', 'msi', 'asus'}

def words(model):
    w = re.sub(r'[()"”,]', ' ', model.lower()).replace('+', ' plus ').split()
    return [x for x in w if x not in STOP]

def check(p):
    mw = words(p['model'])
    mem = re.match(r'(\d+) (ГБ|ТБ)', p['variant'] or '')
    q = p['model'] + (f" {mem.group(0)}" if mem else '')
    if 'Wi‑Fi + Cellular' in (p['variant'] or ''): q += ' Cellular'
    items = market(q)
    if items is None:
        return None, q
    def ok(name):
        t = re.sub(r'[()"”,]', ' ', name.lower()).replace('+', ' plus ')
        if JUNK.search(name): return False
        for w in mw:
            if w == 'plus' and re.search(r's2\d\s*plus|\+', name.lower()): continue
            if not re.search(r'(^|[^a-zа-я0-9])' + re.escape(w) + r'($|[^a-zа-я0-9])', t): return False
        for v in VARIANTS:
            if v in mw: continue
            if re.search(r'(^|[^a-zа-я0-9])' + v + r'($|[^a-zа-я0-9])', t): return False
        if mem:
            n = mem.group(1)
            unit = 'tb|тб' if mem.group(2) == 'ТБ' else 'gb|гб'
            if not re.search(r'(^|[^0-9])' + n + r'\s?(' + unit + r')|/\s?' + n + r'(\s|$|[^0-9])|\+\s?' + n, t): return False
        return True
    good = [i for i in items if ok(i['name'])]
    return good, q

cat = json.load(open(sys.argv[1]))
try:
    res = json.load(open(sys.argv[2]))
except Exception:
    res = {}
todo = [p for p in cat if p['category'] != 'Аксессуары' and p['id'] not in res]
print('осталось', len(todo), file=sys.stderr)
for n, p in enumerate(todo, 1):
    good, q = check(p)
    if good is None:
        print('КАПЧА — пауза 15 мин', file=sys.stderr); time.sleep(900); continue
    pr = [g['price'] for g in good]
    res[p['id']] = dict(q=q, n=len(pr), median=int(statistics.median(pr)) if pr else None, min=min(pr) if pr else None,
                        max=max(pr) if pr else None, offers=good[:6])
    json.dump(res, open(sys.argv[2], 'w'), ensure_ascii=False)
    print(f"{n}/{len(todo)} {p['id']}: {len(pr)} → {res[p['id']]['median']}", file=sys.stderr)
    time.sleep(50 + random.random() * 20)
print('DONE', file=sys.stderr)
