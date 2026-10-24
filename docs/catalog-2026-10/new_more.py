import json,sys,time,random
sys.path.insert(0,'.')
from bg_lib import get, parse
d=json.load(open('bg.json'))
items=d['new']['items']; urls={i['url'] for i in items}
for page in range(41,121):
    st,t=get(f'https://biggeek.ru/catalog/new?page={page}')
    got=[g for g in parse(t) if g['url'] not in urls]
    for g in got: urls.add(g['url']); items.append(g)
    print(page,len(got),file=sys.stderr)
    time.sleep(2.5+random.random()*1.5)
    if not got or f'page={page+1}' not in t: break
json.dump(d,open('bg.json','w'),ensure_ascii=False)
print('DONE',len(items),file=sys.stderr)
