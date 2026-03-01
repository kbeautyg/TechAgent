#!/usr/bin/env python3
"""
TechAgent — скачивание реальных фото товаров с DNS-shop.ru

Запуск:
  pip install requests beautifulsoup4 Pillow lxml
  python generate_images.py

Как работает:
1. Для каждого товара ищет на dns-shop.ru
2. Берёт первый результат
3. Скачивает главное фото товара (большое, на белом фоне)
4. Обрезает до квадрата 400x400
5. Сохраняет в public/images/{category}/{id}.png
"""

import json, os, sys, time, re, io
from pathlib import Path
from urllib.parse import quote_plus

try:
    import requests
    from bs4 import BeautifulSoup
    from PIL import Image
except ImportError:
    print("Установи зависимости:")
    print("  pip install requests beautifulsoup4 Pillow lxml")
    sys.exit(1)

# ==================== НАСТРОЙКИ ====================
SKIP_EXISTING = True
IMAGE_SIZE = 400
SLEEP_BETWEEN = 1.5  # пауза между запросами к DNS (не спамить)
OUTPUT_DIR = Path("public/images")

CAT_MAP = {
    'Смартфоны': 'smartphones',
    'Ноутбуки': 'laptops',
    'Планшеты': 'tablets',
    'Наушники': 'headphones',
    'Часы': 'watches',
    'Камеры': 'cameras',
    'Игровые консоли': 'consoles',
    'Бытовая техника': 'appliances',
    'Телевизоры': 'tvs',
    'Аксессуары': 'accessories',
    'Аксcessуары': 'accessories',
}

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
}


# ==================== ПОИСКОВЫЕ ЗАПРОСЫ ====================

def make_search_query(name: str, brand: str, category: str, color: str) -> str:
    """Формирует запрос для поиска на DNS."""
    # Убираем объём — не влияет на внешний вид
    clean = re.sub(r'\s*\d+GB|\d+TB', '', name).strip()
    clean = re.sub(r'\s+', ' ', clean)
    return clean


# ==================== СКАЧИВАНИЕ С DNS ====================

def create_session():
    """Создаёт сессию с правильными headers."""
    s = requests.Session()
    s.headers.update(HEADERS)
    # Сначала зайдём на главную чтобы получить куки
    try:
        s.get('https://www.dns-shop.ru/', timeout=15)
        time.sleep(1)
    except:
        pass
    return s


def search_dns(session: requests.Session, query: str) -> str | None:
    """
    Ищет товар на DNS, возвращает URL главного фото первого результата.
    Фото из поисковой выдачи маленькие — переходим на страницу товара.
    """
    search_url = f"https://www.dns-shop.ru/search/?q={quote_plus(query)}"

    try:
        resp = session.get(search_url, timeout=15)
        if resp.status_code != 200:
            print(f"  ⚠️  DNS ответил {resp.status_code}")
            return None

        soup = BeautifulSoup(resp.text, 'lxml')

        # Ищем ссылки на товары в результатах поиска
        # DNS использует разные классы, пробуем несколько вариантов
        product_link = None

        # Вариант 1: catalog-product__name (основной каталог)
        link = soup.select_one('a.catalog-product__name')
        if link and link.get('href'):
            product_link = link['href']

        # Вариант 2: product-card__name
        if not product_link:
            link = soup.select_one('a[data-id]')
            if link and link.get('href'):
                product_link = link['href']

        # Вариант 3: любая ссылка на /product/
        if not product_link:
            for a in soup.find_all('a', href=True):
                if '/product/' in a['href']:
                    product_link = a['href']
                    break

        if not product_link:
            # Попробуем найти картинку прямо в результатах
            img = soup.select_one('img.catalog-product__image')
            if img:
                src = img.get('data-src') or img.get('src') or ''
                if src and 'dns-shop' in src:
                    # Увеличиваем размер в URL
                    src = re.sub(r'/fit/\d+/\d+/', '/fit/500/500/', src)
                    src = re.sub(r'/wm/\d+/\d+/', '/fit/500/500/', src)
                    return src if src.startswith('http') else f"https:{src}"
            print(f"  ❌ Товар не найден в результатах DNS")
            return None

        # Переходим на страницу товара
        if not product_link.startswith('http'):
            product_link = f"https://www.dns-shop.ru{product_link}"

        time.sleep(0.5)
        resp2 = session.get(product_link, timeout=15)
        if resp2.status_code != 200:
            return None

        soup2 = BeautifulSoup(resp2.text, 'lxml')

        # Ищем главное фото товара на странице
        # Вариант 1: основной слайдер
        img = soup2.select_one('img.product-images-slider__main-img')
        if img:
            src = img.get('src') or img.get('data-src') or ''
            if src:
                src = re.sub(r'/fit/\d+/\d+/', '/fit/500/500/', src)
                return src if src.startswith('http') else f"https:{src}"

        # Вариант 2: галерея
        img = soup2.select_one('img.product-images-slider__img')
        if img:
            src = img.get('data-src') or img.get('src') or ''
            if src:
                src = re.sub(r'/fit/\d+/\d+/', '/fit/500/500/', src)
                return src if src.startswith('http') else f"https:{src}"

        # Вариант 3: OpenGraph image
        og = soup2.select_one('meta[property="og:image"]')
        if og and og.get('content'):
            return og['content']

        # Вариант 4: любая картинка с dns-shop CDN
        for img in soup2.find_all('img'):
            src = img.get('data-src') or img.get('src') or ''
            if 'c.dns-shop.ru' in src or 'c1.dns-shop.ru' in src:
                src = re.sub(r'/fit/\d+/\d+/', '/fit/500/500/', src)
                return src if src.startswith('http') else f"https:{src}"

        print(f"  ❌ Фото не найдено на странице товара")
        return None

    except requests.Timeout:
        print(f"  ⚠️  Таймаут")
        return None
    except Exception as e:
        print(f"  ⚠️  Ошибка: {e}")
        return None


def download_and_crop(session: requests.Session, url: str, save_path: Path) -> bool:
    """Скачивает картинку, обрезает до квадрата, ресайзит до 400x400."""
    try:
        resp = session.get(url, timeout=30)
        if resp.status_code != 200 or len(resp.content) < 1000:
            return False

        img = Image.open(io.BytesIO(resp.content)).convert('RGB')
        w, h = img.size

        if w < 50 or h < 50:
            return False

        # Обрезка до квадрата по центру
        if w != h:
            size = min(w, h)
            left = (w - size) // 2
            top = (h - size) // 2
            img = img.crop((left, top, left + size, top + size))

        # Ресайз
        img = img.resize((IMAGE_SIZE, IMAGE_SIZE), Image.LANCZOS)

        save_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(save_path, 'PNG', quality=95)
        return True

    except Exception as e:
        print(f"  ⚠️  Ошибка загрузки: {e}")
        return False


# ==================== MAIN ====================

def main():
    with open("products_list.json", "r", encoding="utf-8") as f:
        products = json.load(f)

    print(f"📦 Всего товаров: {len(products)}")
    print(f"🔍 Источник: dns-shop.ru")
    print(f"📐 Размер: {IMAGE_SIZE}x{IMAGE_SIZE}")
    print(f"📂 Папка: {OUTPUT_DIR}")
    print()

    # Создаём папки
    for folder in set(CAT_MAP.values()):
        (OUTPUT_DIR / folder).mkdir(parents=True, exist_ok=True)

    # Создаём сессию
    print("🌐 Подключаюсь к dns-shop.ru...")
    session = create_session()
    print("✅ Подключено")
    print()

    success = 0
    skipped = 0
    failed = 0
    failed_list = []

    for i, p in enumerate(products):
        pid = p["id"]
        name = p["name"]
        brand = p["brand"]
        category = p["category"]
        color = p.get("color", "")

        folder = CAT_MAP.get(category, "accessories")
        filepath = OUTPUT_DIR / folder / f"{pid}.png"

        # Пропуск если уже скачан
        if SKIP_EXISTING and filepath.exists() and filepath.stat().st_size > 1000:
            skipped += 1
            continue

        query = make_search_query(name, brand, category, color)

        print(f"[{i+1}/{len(products)}] {name}")
        print(f"  🔍 DNS: \"{query}\"")

        img_url = search_dns(session, query)

        if img_url:
            print(f"  📥 {img_url[:80]}...")
            ok = download_and_crop(session, img_url, filepath)
            if ok:
                size = filepath.stat().st_size
                print(f"  ✅ {filepath} ({size:,} bytes)")
                success += 1
            else:
                print(f"  ❌ Не удалось скачать")
                failed += 1
                failed_list.append({'id': pid, 'name': name, 'query': query})
        else:
            failed += 1
            failed_list.append({'id': pid, 'name': name, 'query': query})

        time.sleep(SLEEP_BETWEEN)

    print()
    print("=" * 60)
    print(f"✅ Скачано:    {success}")
    print(f"⏭️  Пропущено: {skipped}")
    print(f"❌ Не найдено: {failed}")

    if failed_list:
        print(f"\nНе удалось найти фото для:")
        for item in failed_list[:20]:
            print(f"  - {item['name']}")
        if len(failed_list) > 20:
            print(f"  ... и ещё {len(failed_list) - 20}")

        with open("failed_images.json", "w", encoding="utf-8") as f:
            json.dump(failed_list, f, ensure_ascii=False, indent=2)
        print(f"\nСписок сохранён в failed_images.json")

    print()
    print("Готово! Запусти: npm run build")


if __name__ == "__main__":
    main()
