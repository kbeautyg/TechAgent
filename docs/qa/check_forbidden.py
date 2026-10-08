"""Поиск формулировок старой модели TechAgent (ТЗ, раздел 4). Аргументы — файлы или папки."""
import re, sys, os
PATTERNS = [
    r'импорт', r'принципал(?!\))', r'по поручению', r'техническ\w* агент', r'\b3\s?%', r'комисси',
    r'агентск\w* закупк', r'агентск\w* схем', r'карго', r'продав\w* — партн', r'партн[её]р — продав',
    r'партн[её]р\s*=\s*', r'картой', r'банковск\w* карт', r'(?<![А-Яа-яЁё])ИП(?![А-Яа-яЁё])', r'trade.?in', r'оптом',
    r'кутуков', r'демонов', r'cargo express', r'fastcargo', r'волков', r'глав[аеы] 52',
]
rx = [re.compile(p, re.I) for p in PATTERNS]
EXT = ('.ts', '.tsx', '.html', '.mjs', '.js', '.json', '.ps1', '.txt', '.xml', '.md', '.css')
hits = 0
def scan(path):
    global hits
    try:
        text = open(path, encoding='utf-8').read()
    except Exception:
        return
    for n, line in enumerate(text.splitlines(), 1):
        for r in rx:
            m = r.search(line)
            if m:
                # «ТехЭйджент (Принципал)» — допустимо: принципал здесь ТехЭйджент
                if r.pattern.startswith('принципал') and re.search(r'ТехЭйджент[^.]{0,40}Принципал|Принципал[^.]{0,5}ОсОО|Заказчик \(Принципал\)|Принципал выплачивает|Принципал:|принял услуги|Принципал принял', line):
                    continue
                s = line.strip()
                i = max(0, m.start() - 60)
                print(f'{path}:{n}: [{m.group(0)}] …{line[i:m.end()+60].strip()}…')
                hits += 1
                break
for a in sys.argv[1:]:
    if os.path.isdir(a):
        for root, _, files in os.walk(a):
            if 'node_modules' in root:
                continue
            for f in files:
                if f.endswith(EXT):
                    scan(os.path.join(root, f))
    else:
        scan(a)
print(f'— найдено: {hits}')
