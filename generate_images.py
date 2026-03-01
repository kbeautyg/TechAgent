#!/usr/bin/env python3
"""
TechAgent — генерация картинок товаров через OpenAI DALL-E API.

Запуск:
  pip install openai requests
  python generate_images.py

Скрипт:
1. Читает products_list.json (294 товара)
2. Для каждого товара генерирует промпт с точным описанием
3. Вызывает OpenAI DALL-E API (low cost, square)
4. Скачивает PNG в public/images/{category}/{id}.png
5. Пропускает уже скачанные (можно перезапускать)
"""

import json, os, sys, time, requests, base64
from pathlib import Path

# ==================== НАСТРОЙКИ ====================
API_KEY = "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"

# dall-e-2: дешевле, 256x256 = $0.016/img, всего ~$4.70
# dall-e-3: качественнее, 1024x1024 = $0.04/img, всего ~$11.76
MODEL = "dall-e-2"
SIZE = "256x256"        # dall-e-2: 256x256 / 512x512 / 1024x1024
QUALITY = "standard"    # dall-e-3 поддерживает "hd"
SLEEP_BETWEEN = 0.5     # секунд между запросами (rate limit)
SKIP_EXISTING = True    # пропускать если файл уже есть

# Папка куда сохранять
OUTPUT_DIR = Path("public/images")

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

# ==================== ПРОМПТЫ ====================
# Единый стиль: продукт на белом фоне, студийное фото, как в каталоге

def make_prompt(name: str, brand: str, category: str, color: str) -> str:
    """Строгий промпт: точное название + цвет + тип устройства + белый фон."""

    # Определяем тип устройства для более точного промпта
    device_hints = {
        'Смартфоны': 'smartphone mobile phone',
        'Ноутбуки': 'laptop notebook computer',
        'Планшеты': 'tablet device',
        'Наушники': get_headphone_type(name),
        'Часы': get_watch_type(name),
        'Камеры': get_camera_type(name),
        'Игровые консоли': get_console_type(name),
        'Бытовая техника': get_appliance_type(name),
        'Телевизоры': get_tv_type(name),
        'Аксессуары': get_accessory_type(name),
    }

    device_type = device_hints.get(category, 'electronic device')
    color_part = f", {color} color" if color else ""

    prompt = (
        f"Professional product photography of {brand} {name}{color_part}, "
        f"{device_type}, centered on pure white background, "
        f"studio lighting, high-end e-commerce catalog style, "
        f"clean minimal composition, no text, no watermarks, square format"
    )

    return prompt[:1000]  # DALL-E limit


def get_headphone_type(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['partybox', 'charge', 'flip', 'bar', 'soundbar', 'hw-q']):
        return 'portable bluetooth speaker'
    if any(k in n for k in ['airpods', 'buds', 'wf-', 'tune', 'dime', 'fit pro', 'powerbeats']):
        return 'true wireless earbuds with charging case'
    return 'over-ear wireless headphones'


def get_watch_type(name: str) -> str:
    n = name.lower()
    if 'band' in n:
        return 'fitness tracker band'
    return 'smartwatch with sport band'


def get_camera_type(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['dji', 'mini', 'mavic', 'avata', 'air 3']):
        return 'drone quadcopter'
    if any(k in n for k in ['gopro', 'hero', 'insta360']):
        return 'action camera'
    if any(k in n for k in ['streamcam', 'brio', 'facecam']):
        return 'webcam'
    if any(k in n for k in ['ring light', 'neewer']):
        return 'ring light for photography'
    if any(k in n for k in ['microphone', 'sm7b', 'at2020']):
        return 'studio microphone'
    if any(k in n for k in ['tripod', 'manfrotto']):
        return 'camera tripod'
    if 'osmo' in n:
        return 'handheld gimbal stabilizer'
    return 'mirrorless digital camera'


def get_console_type(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['controller', 'dualsense']):
        return 'gaming controller gamepad'
    if 'switch' in n:
        return 'Nintendo Switch portable gaming console'
    return 'gaming console'


def get_appliance_type(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['v15', 'v12', 'vacuum', 'navigator']):
        return 'cordless stick vacuum cleaner'
    if 'airwrap' in n:
        return 'hair styling tool curling iron'
    if 'supersonic' in n:
        return 'hair dryer'
    if 'purifier' in n:
        return 'air purifier'
    if any(k in n for k in ['echo', 'hub']):
        return 'smart display speaker'
    if 'nest audio' in n or 'nest speaker' in n:
        return 'smart speaker'
    if 'humidifier' in n:
        return 'humidifier'
    if 'dehumidifier' in n:
        return 'dehumidifier'
    if any(k in n for k in ['nespresso', 'coffee', 'lattissima']):
        return 'coffee machine'
    if any(k in n for k in ['lamp', 'light']):
        return 'desk lamp'
    if any(k in n for k in ['lock']):
        return 'smart door lock'
    if 'washer' in n or 'detergent' in n:
        return 'washing machine accessory'
    return 'home appliance'


def get_tv_type(name: str) -> str:
    n = name.lower()
    if any(k in n for k in ['monitor', 'predator', 'proart', 'ultrawide']):
        return 'computer monitor display'
    return 'flat screen television TV'


def get_accessory_type(name: str) -> str:
    n = name.lower()
    if 'hub' in n or 'usb' in n:
        return 'USB hub adapter'
    if 'cable' in n:
        return 'charging cable'
    if 'case' in n or 'otterbox' in n or 'spigen' in n:
        return 'phone protective case'
    if 'screen protector' in n or 'tempered' in n:
        return 'screen protector glass'
    if 'stand' in n:
        return 'device stand holder'
    if 'charger' in n or 'charging' in n or 'magsafe' in n:
        return 'wireless charger'
    if 'battery' in n or 'power' in n:
        return 'portable power bank'
    if 'ssd' in n or 'nvme' in n:
        return 'solid state drive SSD'
    if any(k in n for k in ['hdd', 'barracuda', 'backup']):
        return 'external hard drive'
    if 'airtag' in n:
        return 'Bluetooth item tracker'
    if 'keyboard' in n:
        return 'wireless keyboard'
    if 'mouse' in n:
        return 'wireless mouse'
    if 'scooter' in n:
        return 'electric scooter'
    if 'bike' in n:
        return 'electric bicycle'
    if 'router' in n or 'wifi' in n or 'mesh' in n:
        return 'WiFi router'
    if any(k in n for k in ['sd card', 'microsd', 'sdxc', 'flash drive', 'datatraveler']):
        return 'memory card or flash drive'
    if 'chair' in n or 'secretlab' in n or 'noblechairs' in n:
        return 'gaming chair'
    if 'tile' in n:
        return 'Bluetooth tracker'
    return 'electronic accessory'


# ==================== ГЕНЕРАЦИЯ ====================

def generate_image(prompt: str, api_key: str) -> bytes | None:
    """Вызов OpenAI Images API, возвращает PNG bytes или None."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    body = {
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": SIZE,
        "response_format": "b64_json"
    }

    # dall-e-3 поддерживает quality
    if MODEL == "dall-e-3":
        body["quality"] = QUALITY

    try:
        resp = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers=headers,
            json=body,
            timeout=120
        )

        if resp.status_code == 429:
            # Rate limited — подождать и повторить
            retry_after = int(resp.headers.get("Retry-After", 10))
            print(f"  ⏳ Rate limited, waiting {retry_after}s...")
            time.sleep(retry_after)
            return generate_image(prompt, api_key)  # retry

        if resp.status_code != 200:
            print(f"  ❌ API Error {resp.status_code}: {resp.text[:200]}")
            return None

        data = resp.json()
        b64 = data["data"][0]["b64_json"]
        return base64.b64decode(b64)

    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None


def main():
    # Загружаем список товаров
    with open("products_list.json", "r") as f:
        products = json.load(f)

    print(f"📦 Всего товаров: {len(products)}")
    print(f"🎨 Модель: {MODEL}, размер: {SIZE}")
    print(f"💰 Примерная стоимость: ${len(products) * (0.016 if MODEL == 'dall-e-2' else 0.04):.2f}")
    print(f"📂 Папка: {OUTPUT_DIR}")
    print()

    # Создаём папки
    for folder in CAT_MAP.values():
        (OUTPUT_DIR / folder).mkdir(parents=True, exist_ok=True)

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

        # Пропуск если уже есть
        if SKIP_EXISTING and filepath.exists() and filepath.stat().st_size > 1000:
            skipped += 1
            continue

        prompt = make_prompt(name, brand, category, color)

        print(f"[{i+1}/{len(products)}] {name}")
        print(f"  📝 {prompt[:100]}...")

        img_bytes = generate_image(prompt, API_KEY)

        if img_bytes and len(img_bytes) > 500:
            filepath.write_bytes(img_bytes)
            print(f"  ✅ Saved: {filepath} ({len(img_bytes)} bytes)")
            success += 1
        else:
            print(f"  ❌ Failed!")
            failed += 1
            failed_list.append(pid)

        time.sleep(SLEEP_BETWEEN)

    print()
    print("=" * 50)
    print(f"✅ Успешно: {success}")
    print(f"⏭️  Пропущено: {skipped}")
    print(f"❌ Ошибки: {failed}")
    if failed_list:
        print(f"   Не удалось: {', '.join(failed_list)}")
    print()
    print("Готово! Теперь запусти: npm run build")


if __name__ == "__main__":
    main()
