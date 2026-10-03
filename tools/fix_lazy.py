import pathlib

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding="utf-8")

# Find selectCharacter and inject lazy load for dhyla
old = "function selectCharacter(id) {\nif(!ready || match?.mode==='versus' || !playable().includes(id) || (id==='fenr'&&!window.FENR_HUMAN_MANIFEST))return false;\nselectedCharacter=id;reset();syncPlayerForm();warmCutins();$('#character-select').value=id;updateHud();return true;\n}"

new = """function selectCharacter(id) {
if(!ready || match?.mode==='versus' || !playable().includes(id) || (id==='fenr'&&!window.FENR_HUMAN_MANIFEST))return false;
selectedCharacter=id;
if(id==='dhyla' && !images.dhyla) {
  const img=new Image();
  img.onload=()=>{images.dhyla=img;images.hero=img;};
  img.src='assets/dhyla/run/sprite-sheet-alpha.webp?v=2';
}
reset();syncPlayerForm();warmCutins();$('#character-select').value=id;updateHud();return true;
}"""

text = text.replace(old, new)
p.write_text(text, encoding="utf-8")
print("Injected lazy load in selectCharacter")
print("Has selectCharacter:", "function selectCharacter" in text)
