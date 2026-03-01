#!/usr/bin/env python3
"""
TechAgent — скачивание реальных фото товаров с DNS-shop.ru

Запуск:
  pip install undetected-chromedriver selenium Pillow requests
  python generate_images.py

Как работает:
1. Открывает Chrome через undetected-chromedriver (обходит защиту DNS)
2. Для каждого товара ищет на dns-shop.ru
3. Заходит на карточку первого результата
4. Берёт главное фото из product-images-slider__main-img
5. Скачивает, обрезает до квадрата 400x400
6. Сохраняет в public/images/{category}/{id}.png
"""

import json, os, sys, time, re, io
from pathlib import Path
from urllib.parse import quote_plus

try:
    import undetected_chromedriver as uc
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
except ImportError:
    print("Установи зависимости:")
    print("  pip install undetected-chromedriver selenium")
    sys.exit(1)

try:
    import requests
    from PIL import Image
except ImportError:
    print("Установи зависимости:")
    print("  pip install requests Pillow")
    sys.exit(1)

# ==================== НАСТРОЙКИ ====================
SKIP_EXISTING = True
IMAGE_SIZE = 400
SLEEP_BETWEEN = 2        # пауза между товарами
SLEEP_PAGE_LOAD = 3      # ждать загрузку страницы
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


# ==================== ПОИСКОВЫЙ ЗАПРОС ====================

def make_search_query(name: str, brand: str, category: str, color: str) -> str:
    """Убираем объём памяти — не влияет на внешний вид."""
    clean = re.sub(r'\s*\d+GB|\d+TB', '', name).strip()
    clean = re.sub(r'\s+', ' ', clean)
    return clean


# ==================== БРАУЗЕР ====================

def create_driver():
    """Создаёт Chrome через undetected-chromedriver."""
    options = uc.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    # Убираем headless — DNS лучше работает с видимым окном
    # Если хочешь без окна — раскомментируй:
    # options.add_argument('--headless=new')

    driver = uc.Chrome(options=options)
    driver.set_page_load_timeout(30)
    return driver


def get_image_from_dns(driver, query: str) -> str | None:
    """
    1. Ищет товар на DNS
    2. Кликает на первый результат
    3. Берёт src из product-images-slider__main-img
    4. Заменяет размер на 500x500
    """
    search_url = f"https://www.dns-shop.ru/search/?q={quote_plus(query)}"

    try:
        driver.get(search_url)
        time.sleep(SLEEP_PAGE_LOAD)

        # Ищем первую ссылку на товар в результатах
        product_link = None

        # Пробуем найти ссылку на карточку товара
        selectors = [
            'a.catalog-product__name',
            'a[data-id]',
            '.catalog-product a[href*="/product/"]',
            'a[href*="/product/"]',
        ]

        for sel in selectors:
            try:
                links = driver.find_elements(By.CSS_SELECTOR, sel)
                for link in links:
                    href = link.get_attribute('href')
                    if href and '/product/' in href:
                        product_link = href
                        break
            except:
                pass
            if product_link:
                break

        if not product_link:
            print("  ❌ Товар не найден в поиске")
            return None

        # Переходим на карточку товара
        driver.get(product_link)
        time.sleep(SLEEP_PAGE_LOAD)

        # Берём главное фото: product-images-slider__main-img
        img_url = None

        try:
            main_img = driver.find_element(By.CSS_SELECTOR, 'img.product-images-slider__main-img')
            img_url = main_img.get_attribute('src')
        except:
            pass

        # Fallback: первая картинка из слайдера
        if not img_url:
            try:
                slider_img = driver.find_element(By.CSS_SELECTOR, 'img.product-images-slider__img')
                img_url = slider_img.get_attribute('src') or slider_img.get_attribute('data-src')
            except:
                pass

        # Fallback: og:image
        if not img_url:
            try:
                og = driver.find_element(By.CSS_SELECTOR, 'meta[property="og:image"]')
                img_url = og.get_attribute('content')
            except:
                pass

        if not img_url:
            print("  ❌ Фото не найдено на карточке")
            return None

        # Увеличиваем размер в URL: /fit/45/45/ -> /fit/500/500/
        img_url = re.sub(r'/fit/\d+/\d+/', '/fit/500/500/', img_url)

        # Убираем .webp если есть
        img_url = img_url.replace('.jpg.webp', '.jpg').replace('.png.webp', '.png')

        if not img_url.startswith('http'):
            img_url = f"https:{img_url}"

        return img_url

    except Exception as e:
        print(f"  ⚠️  Ошибка: {e}")
        return None


def download_and_crop(url: str, save_path: Path) -> bool:
    """Скачивает картинку, обрезает до квадрата 400x400."""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Referer': 'https://www.dns-shop.ru/'
        }
        resp = requests.get(url, headers=headers, timeout=30)
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

        # Ресайз до 400x400
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
    print(f"🔍 Источник: dns-shop.ru (через Chrome)")
    print(f"📐 Размер: {IMAGE_SIZE}x{IMAGE_SIZE}")
    print(f"📂 Папка: {OUTPUT_DIR}")
    print()

    # Создаём папки
    for folder in set(CAT_MAP.values()):
        (OUTPUT_DIR / folder).mkdir(parents=True, exist_ok=True)

    # Считаем сколько нужно скачать
    to_download = 0
    for p in products:
        folder = CAT_MAP.get(p["category"], "accessories")
        filepath = OUTPUT_DIR / folder / f"{p['id']}.png"
        if not (SKIP_EXISTING and filepath.exists() and filepath.stat().st_size > 1000):
            to_download += 1

    if to_download == 0:
        print("✅ Все картинки уже скачаны!")
        return

    print(f"📥 Нужно скачать: {to_download} картинок")
    print(f"⏱️  Примерное время: ~{to_download * (SLEEP_BETWEEN + SLEEP_PAGE_LOAD) // 60} мин")
    print()

    # Запускаем Chrome
    print("🌐 Запускаю Chrome...")
    driver = create_driver()
    print("✅ Chrome запущен")
    print()

    # Сначала зайдём на главную DNS чтобы получить куки
    try:
        driver.get('https://www.dns-shop.ru/')
        time.sleep(5)
        print("✅ DNS-shop.ru загружен")
        print()
    except Exception as e:
        print(f"⚠️  Не удалось загрузить DNS: {e}")

    success = 0
    skipped = 0
    failed = 0
    failed_list = []

    try:
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

            img_url = get_image_from_dns(driver, query)

            if img_url:
                print(f"  📥 {img_url[:80]}...")
                ok = download_and_crop(img_url, filepath)
                if ok:
                    size = filepath.stat().st_size
                    print(f"  ✅ {filepath} ({size:,} bytes)")
                    success += 1
                else:
                    print(f"  ❌ Не удалось скачать картинку")
                    failed += 1
                    failed_list.append({'id': pid, 'name': name, 'query': query})
            else:
                failed += 1
                failed_list.append({'id': pid, 'name': name, 'query': query})

            time.sleep(SLEEP_BETWEEN)

    except KeyboardInterrupt:
        print("\n\n⏹️  Остановлено пользователем (Ctrl+C)")
    except Exception as e:
        print(f"\n⚠️  Ошибка: {e}")
    finally:
        # Закрываем браузер
        try:
            driver.quit()
        except:
            pass

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
