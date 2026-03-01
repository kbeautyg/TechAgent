#!/usr/bin/env python3
"""
TechAgent — поиск и скачивание РЕАЛЬНЫХ фотографий товаров.

Запуск:
  pip install icrawler Pillow
  python generate_images.py

Что делает:
1. Читает products_list.json (294 товара)
2. Для каждого товара формирует СТРОГИЙ поисковый запрос
3. Ищет реальные фото через Bing Images
4. Скачивает первую подходящую картинку
5. Обрезает до квадрата, ресайзит до 400x400
6. Сохраняет PNG в public/images/{category}/{id}.png
7. Пропускает уже скачанные — можно перезапускать
"""

import json, os, sys, time, re
from pathlib import Path

try:
    from icrawler.builtin import BingImageCrawler, GoogleImageCrawler
except ImportError:
    print("❌ Установи icrawler: pip install icrawler")
    sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("❌ Установи Pillow: pip install Pillow")
    sys.exit(1)

# ==================== НАСТРОЙКИ ====================
SKIP_EXISTING = True       # пропускать если файл уже скачан
IMAGE_SIZE = 400           # финальный размер квадрата (400x400)
MAX_DOWNLOAD = 3           # скачать до 3 вариантов, выбрать лучший
SEARCH_ENGINE = "bing"     # "bing" или "google"
SLEEP_BETWEEN = 0.3        # пауза между запросами
OUTPUT_DIR = Path("public/images")
TEMP_DIR = Path("_temp_images")

# Маппинг категорий
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


# ==================== ПОИСКОВЫЕ ЗАПРОСЫ ====================

def make_search_query(name: str, brand: str, category: str, color: str) -> str:
    """
    Строгий поисковый запрос для каждого товара.
    Критерии:
    - Точное название продукта
    - Цвет если указан
    - Тип устройства
    - "product photo white background" для каталожных фото
    """

    # Убираем объём памяти из запроса (не влияет на внешний вид)
    clean_name = re.sub(r'\d+GB|\d+TB', '', name).strip()
    clean_name = re.sub(r'\s+', ' ', clean_name)

    # Цвет
    color_part = f" {color}" if color and color.lower() not in clean_name.lower() else ""

    # Тип устройства для уточнения
    device_type = get_device_keyword(name, category)

    query = f"{brand} {clean_name}{color_part} {device_type} product photo white background png"

    return query.strip()


def get_device_keyword(name: str, category: str) -> str:
    """Ключевое слово типа устройства для уточнения поиска."""
    n = name.lower()

    if category == 'Наушники':
        if any(k in n for k in ['partybox', 'charge 5', 'flip 6', 'flip 5']):
            return 'bluetooth speaker'
        if any(k in n for k in ['bar', 'soundbar', 'hw-q']):
            return 'soundbar'
        if any(k in n for k in ['airpods', 'buds', 'wf-', 'tune buds', 'dime', 'fit pro', 'powerbeats']):
            return 'earbuds'
        return 'headphones'

    if category == 'Часы':
        if 'band' in n:
            return 'fitness band'
        return 'smartwatch'

    if category == 'Камеры':
        if any(k in n for k in ['mini', 'mavic', 'avata', 'air 3']):
            return 'drone'
        if any(k in n for k in ['gopro', 'hero', 'insta360']):
            return 'action camera'
        if any(k in n for k in ['streamcam', 'brio', 'facecam']):
            return 'webcam'
        if any(k in n for k in ['ring light']):
            return 'ring light'
        if any(k in n for k in ['microphone', 'sm7b', 'at2020']):
            return 'microphone'
        if 'tripod' in n:
            return 'tripod'
        if 'osmo' in n:
            return 'gimbal'
        return 'camera'

    if category == 'Игровые консоли':
        if 'controller' in n or 'dualsense' in n:
            return 'controller'
        if 'switch' in n:
            return 'console'
        return 'console'

    if category == 'Бытовая техника':
        if any(k in n for k in ['v15', 'v12', 'vacuum', 'navigator']):
            return 'vacuum'
        if 'airwrap' in n:
            return 'hair styler'
        if 'supersonic' in n:
            return 'hair dryer'
        if 'purifier' in n:
            return 'air purifier'
        if any(k in n for k in ['echo', 'hub', 'nest']):
            return 'smart speaker'
        if 'coffee' in n or 'nespresso' in n or 'lattissima' in n:
            return 'coffee machine'
        if 'lamp' in n or 'light' in n:
            return 'lamp'
        if 'lock' in n:
            return 'smart lock'
        return ''

    if category == 'Телевизоры':
        if any(k in n for k in ['monitor', 'predator', 'proart', 'ultrawide']):
            return 'monitor'
        return 'TV'

    if category == 'Аксессуары' or category == 'Аксcessуары':
        if 'ssd' in n or 'nvme' in n:
            return 'SSD'
        if 'keyboard' in n:
            return 'keyboard'
        if 'mouse' in n:
            return 'mouse'
        if 'scooter' in n:
            return 'electric scooter'
        if 'chair' in n:
            return 'gaming chair'
        if 'hub' in n:
            return 'USB hub'
        if 'case' in n:
            return 'phone case'
        if 'airtag' in n:
            return 'tracker'
        if 'router' in n or 'wifi' in n:
            return 'router'
        return ''

    return ''  # смартфоны, ноутбуки, планшеты — название и так достаточно


# ==================== СКАЧИВАНИЕ ====================

def download_image(query: str, save_dir: Path, filename: str) -> bool:
    """
    Ищет изображение через Bing/Google Images и скачивает.
    Возвращает True если успешно.
    """
    temp = TEMP_DIR / filename.replace('.png', '')
    temp.mkdir(parents=True, exist_ok=True)

    # Очистим temp
    for f in temp.glob('*'):
        f.unlink()

    try:
        if SEARCH_ENGINE == "google":
            crawler = GoogleImageCrawler(
                storage={'root_dir': str(temp)},
                log_level='ERROR'  # тихий режим
            )
            crawler.crawl(
                keyword=query,
                max_num=MAX_DOWNLOAD,
                min_size=(150, 150),
                file_idx_offset=0
            )
        else:
            crawler = BingImageCrawler(
                storage={'root_dir': str(temp)},
                log_level='ERROR'
            )
            crawler.crawl(
                keyword=query,
                max_num=MAX_DOWNLOAD,
                min_size=(150, 150),
                file_idx_offset=0
            )
    except Exception as e:
        print(f"  ⚠️  Ошибка поиска: {e}")
        return False

    # Находим скачанные файлы
    downloaded = sorted(temp.glob('*'))
    if not downloaded:
        print(f"  ❌ Ничего не найдено")
        return False

    # Берём первую картинку, обрабатываем
    best = None
    best_score = 0

    for img_path in downloaded:
        try:
            img = Image.open(img_path)

            # Пропускаем слишком маленькие
            w, h = img.size
            if w < 100 or h < 100:
                continue

            # Оценка: предпочитаем квадратные и достаточно большие
            ratio = min(w, h) / max(w, h)  # 1.0 = идеальный квадрат
            size_score = min(w, h) / 400    # чем ближе к 400, тем лучше
            score = ratio * 0.7 + min(size_score, 1.0) * 0.3

            if score > best_score:
                best_score = score
                best = img_path

        except Exception:
            continue

    if not best:
        print(f"  ❌ Нет подходящих картинок")
        return False

    # Обработка: обрезка до квадрата + ресайз
    try:
        img = Image.open(best).convert('RGB')
        w, h = img.size

        # Обрезка до квадрата (по центру)
        if w != h:
            size = min(w, h)
            left = (w - size) // 2
            top = (h - size) // 2
            img = img.crop((left, top, left + size, top + size))

        # Ресайз до 400x400
        img = img.resize((IMAGE_SIZE, IMAGE_SIZE), Image.LANCZOS)

        # Сохраняем
        out_path = save_dir / filename
        img.save(out_path, 'PNG', quality=95)
        return True

    except Exception as e:
        print(f"  ⚠️  Ошибка обработки: {e}")
        return False

    finally:
        # Чистим temp
        for f in temp.glob('*'):
            try:
                f.unlink()
            except:
                pass
        try:
            temp.rmdir()
        except:
            pass


# ==================== MAIN ====================

def main():
    with open("products_list.json", "r", encoding="utf-8") as f:
        products = json.load(f)

    print(f"📦 Всего товаров: {len(products)}")
    print(f"🔍 Поисковик: {SEARCH_ENGINE}")
    print(f"📐 Размер: {IMAGE_SIZE}x{IMAGE_SIZE}")
    print(f"📂 Папка: {OUTPUT_DIR}")
    print()

    # Создаём папки
    for folder in set(CAT_MAP.values()):
        (OUTPUT_DIR / folder).mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(exist_ok=True)

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
        print(f"  🔍 \"{query}\"")

        ok = download_image(query, OUTPUT_DIR / folder, f"{pid}.png")

        if ok:
            size = filepath.stat().st_size
            print(f"  ✅ {filepath} ({size:,} bytes)")
            success += 1
        else:
            failed += 1
            failed_list.append({'id': pid, 'name': name, 'query': query})

        time.sleep(SLEEP_BETWEEN)

    # Чистим temp
    try:
        import shutil
        shutil.rmtree(TEMP_DIR, ignore_errors=True)
    except:
        pass

    print()
    print("=" * 60)
    print(f"✅ Скачано:    {success}")
    print(f"⏭️  Пропущено: {skipped}")
    print(f"❌ Не найдено: {failed}")

    if failed_list:
        print(f"\nНе удалось найти фото для:")
        for item in failed_list:
            print(f"  - {item['name']} (запрос: {item['query']})")

        # Сохраняем список неудач для повторной попытки
        with open("failed_images.json", "w") as f:
            json.dump(failed_list, f, ensure_ascii=False, indent=2)
        print(f"\nСписок сохранён в failed_images.json — можно поправить запросы и перезапустить")

    print()
    print("Готово! Запусти: npm run build")


if __name__ == "__main__":
    main()
