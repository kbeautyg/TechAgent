"""Скачивает исходные фото каталога в ~/TechAgent/.img-raw/<sha1>.<ext> (папка не в git). Повторный запуск докачивает."""
import json, hashlib, os, sys, time, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor
RAW = os.path.expanduser('~/TechAgent/.img-raw')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36'
cat = json.load(open(sys.argv[1]))
urls = sorted({c['img'] for p in cat for c in p['colors'] if c.get('img')})
have = {f.split('.')[0] for f in os.listdir(RAW)}
todo = [u for u in urls if hashlib.sha1(u.encode()).hexdigest()[:16] not in have]
print('нужно скачать', len(todo), 'из', len(urls), file=sys.stderr)

def one(u):
    h = hashlib.sha1(u.encode()).hexdigest()[:16]
    parts = urllib.parse.urlsplit(u)
    safe = urllib.parse.urlunsplit((parts.scheme, parts.netloc, urllib.parse.quote(parts.path), parts.query, ''))
    for attempt in range(3):
        try:
            req = urllib.request.Request(safe, headers={'User-Agent': UA, 'Referer': 'https://' + parts.netloc + '/'})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read(); ct = r.headers.get('Content-Type', '')
            ext = 'png' if 'png' in ct else 'webp' if 'webp' in ct else 'avif' if 'avif' in ct else 'jpg'
            open(os.path.join(RAW, f'{h}.{ext}'), 'wb').write(data)
            return True
        except Exception as e:
            err = e; time.sleep(2)
    print('ERR', u, err, file=sys.stderr)
    return False

with ThreadPoolExecutor(6) as ex:
    res = list(ex.map(one, todo))
print('DONE ok', sum(res), 'bad', len(res) - sum(res), file=sys.stderr)
