# Одноразовая генерация брендовой OG-картинки 1200x630 (public/og/og-default.png).
# GDI+ гарантированно рендерит кириллицу шрифтами Windows (Segoe UI).
# Запуск: powershell -File scripts/assets/generate-og.ps1

Add-Type -AssemblyName System.Drawing

$root = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
$outDir = Join-Path $root "public\og"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
$outFile = Join-Path $outDir "og-default.png"

$w = 1200; $h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Фон: вертикальный градиент тёмной темы сайта
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0, 0, $w, $h)),
    [System.Drawing.ColorTranslator]::FromHtml("#0B1020"),
    [System.Drawing.ColorTranslator]::FromHtml("#131B3A"),
    [System.Drawing.Drawing2D.LinearGradientMode]::Vertical)
$g.FillRectangle($bgBrush, 0, 0, $w, $h)

# Мягкое свечение справа сверху
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowPath.AddEllipse(700, -250, 800, 800)
$glowBrush = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$glowBrush.CenterColor = [System.Drawing.Color]::FromArgb(70, 27, 68, 245)
$glowBrush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 27, 68, 245))
$g.FillPath($glowBrush, $glowPath)

# Верхняя брендовая полоса (как в шапке сайта): красный -> синий
$barBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0, 0, $w, 10)),
    [System.Drawing.ColorTranslator]::FromHtml("#FB2C36"),
    [System.Drawing.ColorTranslator]::FromHtml("#1B44F5"),
    [System.Drawing.Drawing2D.LinearGradientMode]::Horizontal)
$g.FillRectangle($barBrush, 0, 0, $w, 10)

function New-RoundedRect([single]$x, [single]$y, [single]$width, [single]$height, [single]$r) {
    $p = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $p.AddArc($x, $y, $d, $d, 180, 90)
    $p.AddArc($x + $width - $d, $y, $d, $d, 270, 90)
    $p.AddArc($x + $width - $d, $y + $height - $d, $d, $d, 0, 90)
    $p.AddArc($x, $y + $height - $d, $d, $d, 90, 90)
    $p.CloseFigure()
    return $p
}

# Плитка логотипа с молнией
$tileX = 84; $tileY = 96; $tileS = 108
$tile = New-RoundedRect $tileX $tileY $tileS $tileS 26
$tileBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#1B44F5"))
$g.FillPath($tileBrush, $tile)

# Молния (path из Header.tsx, viewBox 24, масштаб на плитку ~72px)
$scale = 3.4; $ox = $tileX + ($tileS - 24 * $scale) / 2; $oy = $tileY + ($tileS - 24 * $scale) / 2 + 1
$pts = @(
    (New-Object System.Drawing.PointF(($ox + 13 * $scale), ($oy + 2 * $scale))),
    (New-Object System.Drawing.PointF(($ox + 3 * $scale),  ($oy + 14 * $scale))),
    (New-Object System.Drawing.PointF(($ox + 12 * $scale), ($oy + 14 * $scale))),
    (New-Object System.Drawing.PointF(($ox + 11 * $scale), ($oy + 22 * $scale))),
    (New-Object System.Drawing.PointF(($ox + 21 * $scale), ($oy + 10 * $scale))),
    (New-Object System.Drawing.PointF(($ox + 12 * $scale), ($oy + 10 * $scale)))
)
$g.FillPolygon([System.Drawing.Brushes]::White, $pts)

# Логотип-текст: Tech (красный) + Agent (голубой)
$fontLogo = New-Object System.Drawing.Font("Segoe UI", 52, [System.Drawing.FontStyle]::Bold)
$redBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F87171"))
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#4E74FF"))
$logoX = $tileX + $tileS + 28
$logoY = $tileY + 8
$techSize = $g.MeasureString("Tech", $fontLogo)
$g.DrawString("Tech", $fontLogo, $redBrush, $logoX, $logoY)
$g.DrawString("Agent", $fontLogo, $blueBrush, ($logoX + $techSize.Width - 26), $logoY)

# Заголовок
$fontH1 = New-Object System.Drawing.Font("Segoe UI", 56, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#F8FAFC"))
$g.DrawString("Агентская закупка", $fontH1, $whiteBrush, 76, 268)
$g.DrawString("электроники для бизнеса", $fontH1, $whiteBrush, 76, 360)

# Подзаголовок-факты
$fontSub = New-Object System.Drawing.Font("Segoe UI", 27)
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#AEB6C9"))
$g.DrawString("Комиссия 3%   ·   Доставка 5–7 дней   ·   200+ товаров", $fontSub, $mutedBrush, 80, 492)

# Домен
$fontDomain = New-Object System.Drawing.Font("Consolas", 24, [System.Drawing.FontStyle]::Bold)
$domainBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#5EE3B4"))
$g.DrawString("techagent.pro", $fontDomain, $domainBrush, 80, 556)

$g.Dispose()
$bmp.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
Write-Host "OK: $outFile"
