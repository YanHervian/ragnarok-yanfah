import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding='utf-8')

old_line = "else if(selectedCharacter==='yanfah') {manifest=window.YANFAH_MANIFEST;metrics=window.YANFAH_METRICS;images.hero=images.yanfah;Object.assign(cooldownMax,YF.balance.cooldowns);}"
new_line = old_line + "\n  else if(selectedCharacter==='dhyla') {manifest=window.DHYLA_MANIFEST;metrics=window.DHYLA_MANIFEST.metrics||{};images.hero=images.dhyla;Object.assign(cooldownMax,DH.balance.cooldowns);}"

text = text.replace(old_line, new_line)
p.write_text(text, encoding='utf-8')
print("Updated game.js")
