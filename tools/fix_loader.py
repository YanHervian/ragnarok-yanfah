import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding="utf-8")

# Remove the on-demand load hack and replace with simple version
old = """else if(selectedCharacter==='dhyla') {
  manifest=window.DHYLA_MANIFEST;
  metrics=window.DHYLA_MANIFEST.metrics||{};
  if(!images.dhyla){const img=new Image();img.onload=()=>{images.dhyla=img;images.hero=img;};img.src='assets/dhyla/run/sprite-sheet-alpha.webp';}
  else {images.hero=images.dhyla;}
  Object.assign(cooldownMax,DH?DH.balance.cooldowns:{skill1:3,skill2:6,ultimate:18});
}"""

new = "else if(selectedCharacter==='dhyla') {manifest=window.DHYLA_MANIFEST;metrics=window.DHYLA_METRICS||window.DHYLA_MANIFEST;images.hero=images.dhyla;Object.assign(cooldownMax,DH?DH.balance.cooldowns:{skill1:3,skill2:6,ultimate:18});}"

text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
print("Fixed on-demand loader")
print("Has dhyla block:", "selectedCharacter==='dhyla'" in text)
