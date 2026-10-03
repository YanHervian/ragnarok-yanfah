import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding='utf-8')

# Inject dhyla image loading inline in syncPlayerForm, so it loads on demand if not preloaded
old = "else if(selectedCharacter==='dhyla') {manifest=window.DHYLA_MANIFEST;metrics=window.DHYLA_MANIFEST.metrics||{};images.hero=images.dhyla;Object.assign(cooldownMax,DH.balance.cooldowns);}"
new = """else if(selectedCharacter==='dhyla') {
  manifest=window.DHYLA_MANIFEST;
  metrics=window.DHYLA_MANIFEST.metrics||{};
  if(!images.dhyla){const img=new Image();img.onload=()=>{images.dhyla=img;images.hero=img;};img.src='assets/dhyla/run/sprite-sheet-alpha.webp';}
  else {images.hero=images.dhyla;}
  Object.assign(cooldownMax,DH?DH.balance.cooldowns:{skill1:3,skill2:6,ultimate:18});
}"""

text = text.replace(old, new)
p.write_text(text, encoding='utf-8')
print("Patched syncPlayerForm for dhyla on-demand load")
