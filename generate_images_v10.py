#!/usr/bin/env python3
"""
v10: Download product images via Google Images search.
Uses undetected-chromedriver to bypass bot protection.
Searches for exact product name + "product photo png" to get accurate results.
Overwrites ALL existing images to fix mismatches from v9 (M.Video).
"""

import json, os, time, re, hashlib
from pathlib import Path
from io import BytesIO

import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
import urllib.parse

# ── Config ──
PRODUCTS_FILE = "products_list.json"
OUTPUT_BASE   = "public/images"
SKIP_EXISTING = False   # Overwrite ALL to fix mismatches

CATEGORY_FOLDERS = {
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
}

# Words that indicate the image is NOT the product itself
JUNK_INDICATORS = [
    'чехол', 'case', 'cover', 'стекло', 'protector', 'защитн',
    'пленк', 'наклейк', 'ремешок', 'strap', 'band', 'зарядк',
    'кабель', 'cable', 'адаптер', 'adapter', 'подставк',
]

def detect_chrome_version():
    """Auto-detect installed Chrome version."""
    import subprocess
    for cmd in [
        ['google-chrome', '--version'],
        ['google-chrome-stable', '--version'],
        ['chromium', '--version'],
        ['chromium-browser', '--version'],
    ]:
        try:
            out = subprocess.check_output(cmd, stderr=subprocess.DEVNULL).decode()
            m = re.search(r'(\d+)\.', out)
            if m:
                return int(m.group(1))
        except Exception:
            pass
    return None

def create_driver():
    """Create undetected Chrome driver."""
    opts = uc.ChromeOptions()
    opts.add_argument('--headless=new')
    opts.add_argument('--no-sandbox')
    opts.add_argument('--disable-dev-shm-usage')
    opts.add_argument('--window-size=1920,1080')
    opts.add_argument('--disable-gpu')
    opts.add_argument('--lang=ru-RU')

    ver = detect_chrome_version()
    kwargs = {}
    if ver:
        kwargs['version_main'] = ver
        print(f"[Chrome] Detected version {ver}")

    driver = uc.Chrome(options=opts, **kwargs)
    driver.set_page_load_timeout(30)
    return driver

def build_search_query(product):
    """Build a precise Google Images search query for a product."""
    name = product['name']
    brand = product['brand']

    # Build query: brand + product name + "product photo"
    query = f"{brand} {name} product photo transparent background"
    return query

def get_image_urls_from_google(driver, query, max_results=10):
    """Search Google Images and return image URLs."""
    encoded_q = urllib.parse.quote(query)
    url = f"https://www.google.com/search?q={encoded_q}&tbm=isch&tbs=isz:m"

    try:
        driver.get(url)
        time.sleep(2)
    except Exception as e:
        print(f"  [!] Failed to load Google: {e}")
        return []

    # Try to get image URLs from thumbnails
    urls = []

    # Method 1: Click on images and get full-size URL
    try:
        thumbnails = driver.find_elements(By.CSS_SELECTOR, 'img.YQ4gaf, img.Q4LuWd, div[data-tbnid] img')
        for i, thumb in enumerate(thumbnails[:max_results]):
            try:
                # Get the src or data-src
                src = thumb.get_attribute('src') or thumb.get_attribute('data-src') or ''
                if src.startswith('http') and 'google' not in src and 'gstatic' not in src:
                    urls.append(src)

                # Click to get full resolution
                thumb.click()
                time.sleep(0.8)

                # Find the full-size image in the side panel
                full_imgs = driver.find_elements(By.CSS_SELECTOR,
                    'img[jsname="kn3ccd"], img.sFlh5c.FyHeAf, img.iPVvYb, a[role="link"] img[src^="http"]')
                for fi in full_imgs:
                    fsrc = fi.get_attribute('src') or ''
                    if fsrc.startswith('http') and 'google' not in fsrc and 'gstatic' not in fsrc and len(fsrc) > 30:
                        if fsrc not in urls:
                            urls.append(fsrc)
                            break
            except Exception:
                continue

            if len(urls) >= max_results:
                break
    except Exception as e:
        print(f"  [!] Method 1 failed: {e}")

    # Method 2: Extract from page source via regex
    if len(urls) < 3:
        try:
            source = driver.page_source
            # Find image URLs in the page
            img_urls = re.findall(r'https?://[^"\s<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^"\s<>]*)?', source, re.IGNORECASE)
            for u in img_urls:
                if 'google' not in u and 'gstatic' not in u and 'youtube' not in u and u not in urls:
                    urls.append(u)
                    if len(urls) >= max_results:
                        break
        except Exception as e:
            print(f"  [!] Method 2 failed: {e}")

    return urls

def download_image_via_browser(driver, url):
    """Download image by navigating to it and taking a screenshot."""
    try:
        driver.get(url)
        time.sleep(1.5)

        # Try to find the image element
        try:
            img_elem = driver.find_element(By.TAG_NAME, 'img')
            png_data = img_elem.screenshot_as_png
            return Image.open(BytesIO(png_data)).convert('RGBA')
        except Exception:
            pass

        # Fallback: full page screenshot
        png_data = driver.get_screenshot_as_png()
        return Image.open(BytesIO(png_data)).convert('RGBA')
    except Exception as e:
        print(f"  [!] Browser download failed: {e}")
        return None

def download_image_direct(url):
    """Download image directly via requests."""
    import requests
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        'Accept': 'image/*,*/*',
        'Referer': 'https://www.google.com/',
    }
    try:
        resp = requests.get(url, headers=headers, timeout=15, stream=True)
        if resp.status_code == 200 and len(resp.content) > 5000:
            img = Image.open(BytesIO(resp.content)).convert('RGBA')
            return img
    except Exception:
        pass
    return None

def is_valid_product_image(img):
    """Check if image looks like a real product photo (not too small, not a placeholder)."""
    if img is None:
        return False
    w, h = img.size
    if w < 100 or h < 100:
        return False
    # Check it's not mostly one color (placeholder)
    colors = img.getcolors(maxcolors=100)
    if colors and len(colors) < 5:
        return False
    return True

def autocrop(img, bg_threshold=240):
    """Remove white/near-white borders from image."""
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    # Convert to RGB for analysis
    rgb = img.convert('RGB')
    pixels = rgb.load()
    w, h = rgb.size

    top, bottom, left, right = 0, h, 0, w

    # Find top
    for y in range(h):
        row_has_content = False
        for x in range(0, w, 3):
            r, g, b = pixels[x, y]
            if r < bg_threshold or g < bg_threshold or b < bg_threshold:
                row_has_content = True
                break
        if row_has_content:
            top = y
            break

    # Find bottom
    for y in range(h - 1, -1, -1):
        row_has_content = False
        for x in range(0, w, 3):
            r, g, b = pixels[x, y]
            if r < bg_threshold or g < bg_threshold or b < bg_threshold:
                row_has_content = True
                break
        if row_has_content:
            bottom = y + 1
            break

    # Find left
    for x in range(w):
        col_has_content = False
        for y in range(top, bottom, 3):
            r, g, b = pixels[x, y]
            if r < bg_threshold or g < bg_threshold or b < bg_threshold:
                col_has_content = True
                break
        if col_has_content:
            left = x
            break

    # Find right
    for x in range(w - 1, -1, -1):
        col_has_content = False
        for y in range(top, bottom, 3):
            r, g, b = pixels[x, y]
            if r < bg_threshold or g < bg_threshold or b < bg_threshold:
                col_has_content = True
                break
        if col_has_content:
            right = x + 1
            break

    if right > left and bottom > top:
        return img.crop((left, top, right, bottom))
    return img

def fit_in_square(img, size=500):
    """Fit image in a white square while maintaining aspect ratio."""
    img = autocrop(img)

    # Add some padding
    w, h = img.size
    padding = int(max(w, h) * 0.05)

    # Calculate new size
    max_dim = size - padding * 2
    ratio = min(max_dim / w, max_dim / h)
    new_w = int(w * ratio)
    new_h = int(h * ratio)

    img_resized = img.resize((new_w, new_h), Image.LANCZOS)

    # Create white square
    result = Image.new('RGBA', (size, size), (255, 255, 255, 255))
    offset_x = (size - new_w) // 2
    offset_y = (size - new_h) // 2
    result.paste(img_resized, (offset_x, offset_y), img_resized if img_resized.mode == 'RGBA' else None)

    return result.convert('RGB')

def process_product(driver, product, output_dir):
    """Download and process image for a single product."""
    pid = product['id']
    name = product['name']
    brand = product['brand']
    out_path = os.path.join(output_dir, f"{pid}.png")

    if SKIP_EXISTING and os.path.exists(out_path):
        return True

    query = build_search_query(product)
    print(f"\n[{pid}] Searching: {query}")

    urls = get_image_urls_from_google(driver, query)
    print(f"  Found {len(urls)} image URLs")

    for i, url in enumerate(urls[:8]):
        print(f"  Trying URL {i+1}: {url[:80]}...")

        # Try direct download first (faster)
        img = download_image_direct(url)

        # Fallback to browser
        if not is_valid_product_image(img):
            img = download_image_via_browser(driver, url)

        if is_valid_product_image(img):
            result = fit_in_square(img)
            result.save(out_path, 'PNG', optimize=True)
            print(f"  ✓ Saved {out_path}")
            return True
        else:
            print(f"  ✗ Invalid image, trying next...")

    print(f"  ✗ FAILED - no valid image found for {name}")
    return False

def main():
    # Load products
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        products = json.load(f)

    print(f"Total products: {len(products)}")

    # Create output directories
    for folder in CATEGORY_FOLDERS.values():
        os.makedirs(os.path.join(OUTPUT_BASE, folder), exist_ok=True)

    # Create driver
    driver = create_driver()

    success = 0
    failed = []

    try:
        for i, product in enumerate(products):
            category = product.get('category', '')
            folder = CATEGORY_FOLDERS.get(category, 'smartphones')
            output_dir = os.path.join(OUTPUT_BASE, folder)

            print(f"\n{'='*60}")
            print(f"[{i+1}/{len(products)}] {product['brand']} {product['name']}")

            if process_product(driver, product, output_dir):
                success += 1
            else:
                failed.append(product)

            # Brief pause to not get rate-limited
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n\nInterrupted by user!")
    finally:
        driver.quit()

    print(f"\n{'='*60}")
    print(f"Results: {success}/{len(products)} successful")
    if failed:
        print(f"Failed ({len(failed)}):")
        for p in failed:
            print(f"  - {p['id']}: {p['name']}")
        with open('failed_products.json', 'w', encoding='utf-8') as f:
            json.dump(failed, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    main()
