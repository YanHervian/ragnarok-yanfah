import os
import shutil

os.makedirs(r"assets\ramuru\ui", exist_ok=True)
shutil.copy(r"assets\yanfah\ui\portrait.webp", r"assets\ramuru\ui\portrait.webp")
shutil.copy(r"assets\yanfah\ui\cutin.webp", r"assets\ramuru\ui\cutin.webp")
shutil.copy(r"assets\menu\yanfah-select.webp", r"assets\menu\ramuru-select.webp")

fx_names = ['slash', 'hit', 'projectile', 'explosion', 'warning', 'eruption', 'ultaura', 'ultenv', 'guard', 'dust']
for fx in fx_names:
    src = rf"assets\dhyla\ui\fx-{fx}.webp"
    dst = rf"assets\ramuru\ui\fx-{fx}.webp"
    if os.path.exists(src):
        shutil.copy(src, dst)
    else:
        # fallback to valkren
        shutil.copy(rf"assets\valkren\ui\fx-{fx}.webp", dst)
