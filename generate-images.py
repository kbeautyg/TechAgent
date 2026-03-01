#!/usr/bin/env python3
"""
Generate SVG product images for TechAgent catalog.
Each image: 400x400 with device silhouette, brand color, product color.
Organized by category folders.
"""
import os, re, json

# Category mapping (Russian -> folder name)
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

# Brand colors
BRAND_COLORS = {
    'Apple': ('#1d1d1f', '#86868b'),
    'Samsung': ('#1428a0', '#4a90d9'),
    'Xiaomi': ('#ff6900', '#ff9a3c'),
    'Sony': ('#000000', '#666666'),
    'DJI': ('#333333', '#888888'),
    'JBL': ('#ff6600', '#ffaa33'),
    'Beats': ('#e4002b', '#ff4466'),
    'Dyson': ('#6b21a8', '#9333ea'),
    'Nintendo': ('#e4000f', '#ff4444'),
    'Microsoft': ('#00a4ef', '#0078d4'),
    'LG': ('#a50034', '#d9004c'),
    'Google': ('#4285f4', '#66a3ff'),
    'Huawei': ('#cf0a2c', '#ff0000'),
    'OnePlus': ('#f50514', '#ff3344'),
    'Bose': ('#222222', '#555555'),
    'Sennheiser': ('#1a1a1a', '#444444'),
    'Garmin': ('#007cc3', '#3399dd'),
    'Logitech': ('#00b8fc', '#33ccff'),
    'Anker': ('#0082ca', '#33aaee'),
    'Razer': ('#44d62c', '#66ee44'),
    'ASUS': ('#000000', '#444444'),
    'Dell': ('#007db8', '#0099dd'),
    'HP': ('#0096d6', '#33aaee'),
    'MSI': ('#ff0000', '#ff3333'),
    'Lenovo': ('#e20000', '#ff2222'),
}

# Product color -> hex
COLOR_MAP = {
    'black': '#1a1a1a',
    'white': '#f5f5f7',
    'silver': '#c0c0c0',
    'gold': '#d4af37',
    'blue': '#006edb',
    'red': '#ff3b30',
    'green': '#34c759',
    'midnight': '#1d1d3b',
    'titanium': '#8e8e93',
    'natural titanium': '#a0a0a0',
    'white titanium': '#e8e8e8',
    'graphite': '#555555',
    'turquoise': '#40e0d0',
    'phantom silver': '#d0d0d0',
    'chalk': '#e8e5dd',
    'charcoal': '#333333',
    'nickel': '#b8b8b8',
    'brown': '#8b4513',
    'space gray': '#636366',
    'multi-color': '#ff6b6b',
}

def get_device_color(color_str):
    if not color_str:
        return '#2c2c2e'
    return COLOR_MAP.get(color_str.lower(), '#2c2c2e')

def get_brand_color(brand):
    return BRAND_COLORS.get(brand, ('#555555', '#888888'))

# SVG silhouettes for each category type
def svg_smartphone(pid, name, brand, color):
    dc = get_device_color(color)
    bc1, bc2 = get_brand_color(brand)
    screen_color = '#0a84ff' if dc == '#1a1a1a' else '#1a1a1a'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c1c1e"/><stop offset="100%" stop-color="#2c2c2e"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Phone body -->
  <rect x="140" y="45" width="120" height="250" rx="18" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="147" y="58" width="106" height="225" rx="12" fill="url(#screen)"/>
  <!-- Dynamic Island / Notch -->
  <rect x="178" y="63" width="44" height="12" rx="6" fill="{dc}"/>
  <!-- Screen content hint -->
  <circle cx="200" cy="155" r="25" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <text x="200" y="162" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="18" font-family="system-ui">●</text>
  <!-- Brand -->
  <text x="200" y="335" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui, -apple-system, sans-serif">{brand}</text>
  <!-- Product name (truncated) -->
  <text x="200" y="358" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
  <text x="200" y="375" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[35:70] if len(name)>35 else ''}</text>
</svg>'''

def svg_laptop(pid, name, brand, color):
    dc = get_device_color(color) if color else '#636366'
    bc1, bc2 = get_brand_color(brand)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c1c1e"/><stop offset="100%" stop-color="#2c2c2e"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="3" stdDeviation="6" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Lid -->
  <rect x="70" y="60" width="260" height="175" rx="10" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="80" y="68" width="240" height="158" rx="4" fill="url(#screen)"/>
  <!-- Screen glow -->
  <rect x="100" y="90" width="200" height="4" rx="2" fill="rgba(255,255,255,0.06)"/>
  <rect x="100" y="102" width="160" height="4" rx="2" fill="rgba(255,255,255,0.04)"/>
  <rect x="100" y="114" width="180" height="4" rx="2" fill="rgba(255,255,255,0.04)"/>
  <!-- Base / keyboard -->
  <path d="M55,240 L70,235 L330,235 L345,240 L345,268 Q345,278 335,278 L65,278 Q55,278 55,268 Z" fill="{dc}" filter="url(#shadow)"/>
  <!-- Trackpad -->
  <rect x="160" y="250" width="80" height="20" rx="4" fill="rgba(255,255,255,0.05)"/>
  <!-- Brand -->
  <text x="200" y="325" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="348" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:38]}</text>
  <text x="200" y="365" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[38:76] if len(name)>38 else ''}</text>
</svg>'''

def svg_tablet(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1c1c1e"/><stop offset="100%" stop-color="#2c2c2e"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Tablet body -->
  <rect x="90" y="55" width="220" height="280" rx="16" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="100" y="65" width="200" height="260" rx="8" fill="url(#screen)"/>
  <!-- Camera dot -->
  <circle cx="200" cy="60" r="3" fill="#333"/>
  <!-- Brand -->
  <text x="200" y="370" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="390" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_headphones(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    is_tws = any(k in name.lower() for k in ['airpods', 'buds', 'wf-', 'tune', 'dime', 'fit pro', 'powerbeats'])
    is_speaker = any(k in name.lower() for k in ['partybox', 'charge', 'flip', 'bar', 'soundbar', 'hw-q'])

    if is_speaker:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Speaker body -->
  <rect x="130" y="80" width="140" height="230" rx="30" fill="{dc}" filter="url(#shadow)"/>
  <!-- Speaker grille -->
  <circle cx="200" cy="160" r="40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
  <circle cx="200" cy="160" r="25" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <circle cx="200" cy="250" r="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
  <!-- Brand -->
  <text x="200" y="350" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="373" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

    if is_tws:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Case -->
  <rect x="120" y="100" width="160" height="120" rx="30" fill="{dc}" filter="url(#shadow)"/>
  <!-- Case line -->
  <line x1="140" y1="160" x2="260" y2="160" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <!-- Left earbud -->
  <ellipse cx="165" cy="135" rx="18" ry="22" fill="{dc}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <!-- Right earbud -->
  <ellipse cx="235" cy="135" rx="18" ry="22" fill="{dc}" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
  <!-- Stems -->
  <rect x="160" y="155" width="10" height="25" rx="4" fill="{dc}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  <rect x="230" y="155" width="10" height="25" rx="4" fill="{dc}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
  <!-- Brand -->
  <text x="200" y="280" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="303" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

    # Over-ear headphones
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Headband -->
  <path d="M120,200 Q120,90 200,80 Q280,90 280,200" fill="none" stroke="{dc}" stroke-width="14" stroke-linecap="round" filter="url(#shadow)"/>
  <!-- Left ear cup -->
  <ellipse cx="120" cy="210" rx="35" ry="45" fill="{dc}" filter="url(#shadow)"/>
  <ellipse cx="120" cy="210" rx="25" ry="35" fill="rgba(255,255,255,0.05)"/>
  <!-- Right ear cup -->
  <ellipse cx="280" cy="210" rx="35" ry="45" fill="{dc}" filter="url(#shadow)"/>
  <ellipse cx="280" cy="210" rx="25" ry="35" fill="rgba(255,255,255,0.05)"/>
  <!-- Padding -->
  <ellipse cx="120" cy="210" rx="20" ry="28" fill="rgba(0,0,0,0.15)"/>
  <ellipse cx="280" cy="210" rx="20" ry="28" fill="rgba(0,0,0,0.15)"/>
  <!-- Brand -->
  <text x="200" y="320" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="343" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_watch(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    is_band = 'band' in name.lower()

    if is_band:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Band body -->
  <rect x="160" y="60" width="80" height="280" rx="20" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="168" y="150" width="64" height="40" rx="8" fill="#1c1c1e"/>
  <text x="200" y="176" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="14" font-family="system-ui">12:00</text>
  <!-- Brand -->
  <text x="200" y="375" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
</svg>'''

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Top band -->
  <rect x="165" y="50" width="70" height="80" rx="8" fill="{dc}" filter="url(#shadow)"/>
  <!-- Watch body -->
  <rect x="145" y="120" width="110" height="130" rx="22" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="155" y="130" width="90" height="110" rx="16" fill="#1c1c1e"/>
  <!-- Watch face -->
  <circle cx="200" cy="185" r="35" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <text x="200" y="180" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="20" font-family="system-ui">12:00</text>
  <text x="200" y="200" text-anchor="middle" fill="rgba(10,132,255,0.6)" font-size="10" font-family="system-ui">MON 1</text>
  <!-- Crown button -->
  <rect x="255" y="170" width="8" height="20" rx="3" fill="{dc}"/>
  <!-- Bottom band -->
  <rect x="165" y="250" width="70" height="90" rx="8" fill="{dc}"/>
  <!-- Brand -->
  <text x="200" y="370" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
</svg>'''

def svg_camera(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    is_drone = any(k in name.lower() for k in ['dji', 'mini', 'mavic', 'avata', 'air 3'])
    is_gopro = 'gopro' in name.lower() or 'hero' in name.lower() or 'insta360' in name.lower()
    is_webcam = any(k in name.lower() for k in ['streamcam', 'brio', 'facecam', 'webcam'])
    is_accessory = any(k in name.lower() for k in ['ring light', 'microphone', 'tripod', 'sm7b', 'at2020', 'neewer', 'manfrotto'])

    if is_drone:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Drone body -->
  <ellipse cx="200" cy="190" rx="50" ry="25" fill="{dc}" filter="url(#shadow)"/>
  <!-- Arms -->
  <line x1="160" y1="180" x2="100" y2="140" stroke="{dc}" stroke-width="6" stroke-linecap="round"/>
  <line x1="240" y1="180" x2="300" y2="140" stroke="{dc}" stroke-width="6" stroke-linecap="round"/>
  <line x1="160" y1="200" x2="100" y2="240" stroke="{dc}" stroke-width="6" stroke-linecap="round"/>
  <line x1="240" y1="200" x2="300" y2="240" stroke="{dc}" stroke-width="6" stroke-linecap="round"/>
  <!-- Propellers -->
  <circle cx="100" cy="140" r="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <circle cx="300" cy="140" r="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <circle cx="100" cy="240" r="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <circle cx="300" cy="240" r="30" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <!-- Camera -->
  <circle cx="200" cy="195" r="8" fill="#1c1c1e" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
  <!-- Brand -->
  <text x="200" y="330" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="353" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

    # Default camera
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Camera body -->
  <rect x="100" y="120" width="200" height="140" rx="12" fill="{dc}" filter="url(#shadow)"/>
  <!-- Viewfinder bump -->
  <rect x="130" y="105" width="60" height="20" rx="4" fill="{dc}"/>
  <!-- Lens -->
  <circle cx="200" cy="190" r="40" fill="#111" stroke="rgba(255,255,255,0.15)" stroke-width="3"/>
  <circle cx="200" cy="190" r="28" fill="#1a1a1a" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <circle cx="200" cy="190" r="15" fill="#222" stroke="rgba(100,149,237,0.3)" stroke-width="1"/>
  <!-- Flash -->
  <rect x="270" y="130" width="15" height="10" rx="2" fill="rgba(255,255,255,0.15)"/>
  <!-- Brand -->
  <text x="200" y="320" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="343" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_console(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    is_controller = 'controller' in name.lower() or 'dualsense' in name.lower()
    is_switch = 'switch' in name.lower()

    if is_controller:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Controller body -->
  <path d="M130,160 Q130,140 150,140 L250,140 Q270,140 270,160 L280,240 Q285,270 260,270 L230,260 Q210,255 200,255 Q190,255 170,260 L140,270 Q115,270 120,240 Z" fill="{dc}" filter="url(#shadow)"/>
  <!-- D-pad -->
  <rect x="147" y="175" width="30" height="8" rx="2" fill="rgba(255,255,255,0.1)"/>
  <rect x="158" y="164" width="8" height="30" rx="2" fill="rgba(255,255,255,0.1)"/>
  <!-- Buttons -->
  <circle cx="252" cy="172" r="5" fill="rgba(255,255,255,0.1)"/>
  <circle cx="265" cy="185" r="5" fill="rgba(255,255,255,0.1)"/>
  <circle cx="239" cy="185" r="5" fill="rgba(255,255,255,0.1)"/>
  <circle cx="252" cy="198" r="5" fill="rgba(255,255,255,0.1)"/>
  <!-- Sticks -->
  <circle cx="175" cy="215" r="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <circle cx="240" cy="215" r="12" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <!-- Brand -->
  <text x="200" y="330" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="353" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

    if is_switch:
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Switch body -->
  <rect x="70" y="110" width="260" height="160" rx="10" fill="#1c1c1e" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="105" y="115" width="190" height="150" rx="4" fill="#2c2c2e"/>
  <!-- Left Joy-Con -->
  <rect x="70" y="110" width="40" height="160" rx="10" fill="#0ab9e6"/>
  <!-- Right Joy-Con -->
  <rect x="290" y="110" width="40" height="160" rx="10" fill="#ff3c28"/>
  <!-- Sticks -->
  <circle cx="90" cy="160" r="10" fill="rgba(0,0,0,0.3)"/>
  <circle cx="310" cy="220" r="10" fill="rgba(0,0,0,0.3)"/>
  <!-- Brand -->
  <text x="200" y="330" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="353" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

    # Console box
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Console body -->
  <rect x="130" y="70" width="140" height="240" rx="16" fill="{dc}" filter="url(#shadow)"/>
  <!-- Disc slot -->
  <rect x="160" y="140" width="80" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
  <!-- USB ports -->
  <rect x="170" y="280" width="20" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
  <rect x="200" y="280" width="20" height="6" rx="2" fill="rgba(255,255,255,0.08)"/>
  <!-- Power button -->
  <circle cx="200" cy="90" r="6" fill="rgba(255,255,255,0.08)"/>
  <!-- Brand -->
  <text x="200" y="350" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="373" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_appliance(pid, name, brand, color):
    dc = get_device_color(color) if color else '#2c2c2e'
    bc1, bc2 = get_brand_color(brand)
    is_vacuum = any(k in name.lower() for k in ['v15', 'v12', 'vacuum', 'navigator'])
    is_hairdryer = any(k in name.lower() for k in ['supersonic', 'airwrap', 'iron'])
    is_speaker = any(k in name.lower() for k in ['echo', 'nest', 'hub'])

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Appliance body -->
  <rect x="130" y="70" width="140" height="240" rx="20" fill="{dc}" filter="url(#shadow)"/>
  <circle cx="200" cy="170" r="35" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
  <circle cx="200" cy="250" r="8" fill="rgba(255,255,255,0.1)"/>
  <!-- Brand -->
  <text x="200" y="350" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="373" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_tv(pid, name, brand, color):
    dc = get_device_color(color) if color else '#1a1a1a'
    bc1, bc2 = get_brand_color(brand)
    is_monitor = any(k in name.lower() for k in ['monitor', 'predator', 'proart', 'ultrawide', '27"'])

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- TV bezel -->
  <rect x="50" y="70" width="300" height="190" rx="6" fill="{dc}" filter="url(#shadow)"/>
  <!-- Screen -->
  <rect x="55" y="75" width="290" height="178" rx="2" fill="url(#screen)"/>
  <!-- Stand -->
  <rect x="175" y="260" width="50" height="30" fill="{dc}"/>
  <rect x="140" y="285" width="120" height="8" rx="4" fill="{dc}"/>
  <!-- Brand -->
  <text x="200" y="340" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="363" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
</svg>'''

def svg_accessory(pid, name, brand, color):
    dc = get_device_color(color) if color else '#555555'
    bc1, bc2 = get_brand_color(brand)

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="{bc1}"/><stop offset="100%" stop-color="{bc2}"/></linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)" rx="20"/>
  <!-- Generic accessory shape -->
  <rect x="130" y="110" width="140" height="140" rx="25" fill="{dc}" filter="url(#shadow)"/>
  <circle cx="200" cy="180" r="30" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  <circle cx="200" cy="180" r="12" fill="rgba(255,255,255,0.08)"/>
  <!-- Brand -->
  <text x="200" y="310" text-anchor="middle" fill="rgba(255,255,255,0.9)" font-size="14" font-weight="600" font-family="system-ui">{brand}</text>
  <text x="200" y="333" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11" font-family="system-ui">{name[:35]}</text>
  <text x="200" y="353" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10" font-family="system-ui">{name[35:70] if len(name)>35 else ''}</text>
</svg>'''

# Category -> SVG generator
SVG_GENERATORS = {
    'Смартфоны': svg_smartphone,
    'Ноутбуки': svg_laptop,
    'Планшеты': svg_tablet,
    'Наушники': svg_headphones,
    'Часы': svg_watch,
    'Камеры': svg_camera,
    'Игровые консоли': svg_console,
    'Бытовая техника': svg_appliance,
    'Телевизоры': svg_tv,
    'Аксессуары': svg_accessory,
    'Аксcessуары': svg_accessory,
}

def main():
    # Read products from TypeScript file
    with open('src/data/products.ts', 'r') as f:
        content = f.read()

    # Extract products
    pattern = r"\{[^}]*id:\s*'([^']+)'[^}]*name:\s*'([^']+)'[^}]*brand:\s*'([^']+)'[^}]*category:\s*'([^']+)'"
    matches = re.findall(pattern, content)

    # Extract colors
    color_pattern = r"id:\s*'([^']+)'.*?color:\s*'([^']*)'"
    colors = {}
    for m in re.finditer(color_pattern, content):
        colors[m.group(1)] = m.group(2)

    base_dir = 'public/images'
    total = 0
    by_cat = {}

    for pid, name, brand, category in matches:
        color = colors.get(pid, '')
        folder = CAT_MAP.get(category, 'accessories')
        gen = SVG_GENERATORS.get(category, svg_accessory)

        svg_content = gen(pid, name, brand, color)

        filepath = os.path.join(base_dir, folder, f'{pid}.svg')
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        with open(filepath, 'w') as f:
            f.write(svg_content)

        if folder not in by_cat:
            by_cat[folder] = 0
        by_cat[folder] += 1
        total += 1

    print(f'Generated {total} SVG images:')
    for cat, count in sorted(by_cat.items()):
        print(f'  {cat}: {count}')

if __name__ == '__main__':
    main()
