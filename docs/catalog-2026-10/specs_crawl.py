"""Характеристики с карточек BigGeek: по одной странице на семейство (data-group-name / data-option-name / data-option-value).
Это справочные факты (экран, процессор, вес…), тексты обзоров не берём. python3.12 -I specs_crawl.py catalog-merged.json specs.json"""
import json, re, sys, time, random, html
sys.path.insert(0, '.')
from bg_lib import get  # noqa

cat = json.load(open(sys.argv[1]))
try:
    res = json.load(open(sys.argv[2]))
except Exception:
    res = {}
fams = {}
for p in cat:
    if p.get('bg_url') and p['family'] not in fams:
        fams[p['family']] = p['bg_url']
for n, (fid, url) in enumerate(fams.items(), 1):
    if fid in res:
        continue
    try:
        st, t = get(url)
    except Exception as e:
        print(fid, 'ERR', e, file=sys.stderr); continue
    opts = [(html.unescape(g), html.unescape(k), html.unescape(v)) for g, k, v in
            re.findall(r'data-group-name="([^"]+)" data-option-name="([^"]+)" data-option-value="([^"]*)"', t)]
    res[fid] = opts
    json.dump(res, open(sys.argv[2], 'w'), ensure_ascii=False)
    print(f'{n}/{len(fams)} {fid}: {len(opts)}', file=sys.stderr)
    time.sleep(2.5 + random.random() * 1.5)
print('DONE', file=sys.stderr)
