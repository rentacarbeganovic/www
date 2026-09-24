"""
Build every image the Beganović site ships from the files in source-images/.

Pillow only, no numpy, so it runs on a stock Python. Run from the project root:

    python3 scripts/build-images.py

Outputs
  public/images/brand/logo.webp        logo keyed off its white ground (for light surfaces)
  public/images/brand/logo-dark.webp   the same logo with the navy redrawn white (for the navy footer)
  public/images/hero/lineup*.webp      the car line-up from hero.webp, below its baked-in text
  public/images/fleet/<slug>.webp      1280w card/page image + a 640w `-sm` variant
  public/images/og-image.jpg           1200x630 share image
  public/favicon*, apple-touch-icon, android-chrome-*  copied from source-images/favicon_io
"""
import os
import shutil
from PIL import Image

SRC = 'source-images'
OUT = 'public/images'
for sub in ('brand', 'hero', 'fleet'):
    os.makedirs(f'{OUT}/{sub}', exist_ok=True)

# Source file -> public slug. The slug is also the /vozila/<slug> URL segment
# (see FLEET_CARS in app/data/business.ts), so keep the two in step.
FLEET = {
    'peugeot308-2015.webp': 'peugeot-308-2015-automatik',
    'Peugeot5008-2014.webp': 'peugeot-5008-2014-automatik',
    'golf7-2016.webp': 'vw-golf-7-2016',
    'golf6-2012.webp': 'vw-golf-6-2012',
    'mazda5-2013.webp': 'mazda-5-2013',
    'ford-kuga-2012.webp': 'ford-kuga-2012-automatik',
}


def key_white(img):
    """
    Colour-to-alpha against white: every pixel becomes the most transparent
    colour that composites back to the original over white. Keeps the soft
    gradients in the swoosh and the car body instead of a hard matte edge.
    """
    img = img.convert('RGB')
    out = Image.new('RGBA', img.size)
    src = img.load()
    dst = out.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            a = 255 - min(r, g, b)
            if a < 6:
                dst[x, y] = (0, 0, 0, 0)
                continue
            k = 255 / a
            dst[x, y] = (
                max(0, min(255, round(255 - (255 - r) * k))),
                max(0, min(255, round(255 - (255 - g) * k))),
                max(0, min(255, round(255 - (255 - b) * k))),
                a,
            )
    return out


def redraw_for_dark(img):
    """Navy and grey artwork -> near-white; the orange keeps its colour."""
    out = img.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if max(r, g, b) - min(r, g, b) < 60:  # unsaturated: the navy/grey parts
                px[x, y] = (246, 244, 240, a)
    return out


def build_brand():
    logo = Image.open(f'{SRC}/logo.webp')
    logo.thumbnail((900, 900), Image.LANCZOS)
    keyed = key_white(logo)
    keyed = keyed.crop(keyed.getbbox())
    keyed.save(f'{OUT}/brand/logo.webp', 'WEBP', quality=90, method=6)
    redraw_for_dark(keyed).save(f'{OUT}/brand/logo-dark.webp', 'WEBP', quality=90, method=6)
    print('  brand/logo.webp', keyed.size)


def build_hero():
    """
    hero.webp carries a logo, a headline and four feature icons baked into its
    top-left. The page sets its own type, so only the band below that text is
    used: the five cars on the road with the river and the church behind them.
    """
    hero = Image.open(f'{SRC}/hero.webp').convert('RGB')
    # The baked-in feature icons end at y~435, so the band starts just below.
    wide = hero.crop((0, 445, hero.width, hero.height))
    wide.save(f'{OUT}/hero/lineup.webp', 'WEBP', quality=82, method=6)
    sm = wide.copy()
    sm.thumbnail((1000, 1000), Image.LANCZOS)
    sm.save(f'{OUT}/hero/lineup-sm.webp', 'WEBP', quality=80, method=6)
    # Phone: the middle three cars, taller, so they stay legible at 390px.
    mid = hero.crop((370, 445, 1580, hero.height))
    mid.thumbnail((900, 900), Image.LANCZOS)
    mid.save(f'{OUT}/hero/lineup-portrait.webp', 'WEBP', quality=80, method=6)
    # Scenic crop (river, bridge, church) for the About page.
    scene = hero.crop((980, 150, hero.width, 560))
    scene.save(f'{OUT}/hero/prijedor.webp', 'WEBP', quality=80, method=6)
    print('  hero/lineup*.webp', wide.size)

    # Open Graph: the hero already carries the logo and "Pouzdan najam vozila",
    # which is exactly what a share card should say. 1.9:1 from the left edge.
    og = hero.crop((0, 0, 1560, 821)).resize((1200, 632), Image.LANCZOS).crop((0, 1, 1200, 631))
    og.save(f'{OUT}/og-image.jpg', 'JPEG', quality=86, optimize=True, progressive=True)
    print('  og-image.jpg', og.size)


def build_fleet():
    for src, slug in FLEET.items():
        im = Image.open(f'{SRC}/{src}').convert('RGB')
        big = im.copy()
        big.thumbnail((1280, 1280), Image.LANCZOS)
        big.save(f'{OUT}/fleet/{slug}.webp', 'WEBP', quality=80, method=6)
        sm = im.copy()
        sm.thumbnail((640, 640), Image.LANCZOS)
        sm.save(f'{OUT}/fleet/{slug}-sm.webp', 'WEBP', quality=78, method=6)
        print(f'  fleet/{slug}.webp', big.size)


def build_favicons():
    fav = f'{SRC}/favicon_io'
    for name in ('favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png',
                 'apple-touch-icon.png', 'android-chrome-192x192.png',
                 'android-chrome-512x512.png'):
        shutil.copy(f'{fav}/{name}', f'public/{name}')
    print('  favicons copied')


if __name__ == '__main__':
    build_brand()
    build_hero()
    build_fleet()
    build_favicons()
