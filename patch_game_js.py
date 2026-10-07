import re

with open("core/game.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. 1505 chain
if "selectedCharacter === 'ramuru'" not in content:
    replacement_1 = r"else if (selectedCharacter === 'valkren') { manifest = window.VALKREN_MANIFEST;"
    new_1 = r"else if (selectedCharacter === 'ramuru') { manifest = window.RAMURU_MANIFEST; metrics = window.RAMURU_METRICS || window.RAMURU_MANIFEST; if (!images.ramuru) { const img = new Image(); img.onload = () => { images.ramuru = img; images.hero = img; }; img.src = 'assets/ramuru/run/sprite-sheet-alpha.webp'; } else { images.hero = images.ramuru; } Object.assign(cooldownMax, window.Ramuru ? window.Ramuru.balance.cooldowns : { skill1: 10, skill2: 20, ultimate: 30 }); }\n    " + replacement_1
    content = content.replace(replacement_1, new_1)

# 2. 2203
if "opponentCharacter === 'ramuru'" not in content:
    content = content.replace(
        "opponentCharacter === 'valkren' ? window.VALKREN_MANIFEST :",
        "opponentCharacter === 'ramuru' ? window.RAMURU_MANIFEST : opponentCharacter === 'valkren' ? window.VALKREN_MANIFEST :"
    )

# 3. 2410
if "e.type === 'ramuru-fx'" not in content:
    content = content.replace(
        "|| e.type === 'valkren-fx')",
        "|| e.type === 'valkren-fx' || e.type === 'ramuru-fx')"
    )

# 4. 2621
if "id === 'ramuru'" not in content:
    replacement_4 = r"if (id === 'valkren') return"
    new_4 = r"if (id === 'ramuru') return { name: 'RAMURU', cls: 'MECHA', deck: 'RAMURU', title: 'THE NEW FIGHTER', portrait: 'assets/ramuru/ui/portrait.webp', names: window.Ramuru?.names || [], icons: ['attack', 'skill1', 'skill2', 'ultimate'].map(s => 'assets/yanfah/ui/icon-' + s + '.webp') };\n    if (id === 'valkren') return"
    content = content.replace(replacement_4, new_4)

# 5. 2690-2694
if "voiceKind === 'ramuru'" not in content:
    content = content.replace(
        "|| voiceKind === 'valkren'",
        "|| voiceKind === 'valkren' || voiceKind === 'ramuru'"
    )
if "cutinKey === 'ramuru'" not in content:
    content = content.replace(
        "cutin.classList.toggle('valkren-cutin', cutinKey === 'valkren');",
        "cutin.classList.toggle('valkren-cutin', cutinKey === 'valkren'); cutin.classList.toggle('ramuru-cutin', cutinKey === 'ramuru');"
    )
if "cutinKey === 'ramuru'" not in content:
    content = content.replace(
        "|| cutinKey === 'valkren' ?",
        "|| cutinKey === 'valkren' || cutinKey === 'ramuru' ?"
    )
if "ramuru: 'RAMURU / '" not in content:
    content = content.replace(
        "valkren: 'MODE TEMPUR / ' + cutinOwner,",
        "valkren: 'MODE TEMPUR / ' + cutinOwner, ramuru: 'RAMURU / ' + cutinOwner,"
    )
if "ramuru: 'SYSTEM<br><em>OVERRIDE</em>'" not in content:
    content = content.replace(
        "valkren: 'SISTEM<br><em>OVERDRIVE</em>',",
        "valkren: 'SISTEM<br><em>OVERDRIVE</em>', ramuru: 'SYSTEM<br><em>OVERRIDE</em>',"
    )
if "ramuru: 'THE NEW ERA'" not in content:
    content = content.replace(
        "valkren: 'PELEPASAN DAYA MAKSIMAL',",
        "valkren: 'PELEPASAN DAYA MAKSIMAL', ramuru: 'THE NEW ERA',"
    )
if "ramuru: 'RAMURU ultimate" not in content:
    content = content.replace(
        "valkren: 'VALKREN ultimate: Sistem Overdrive',",
        "valkren: 'VALKREN ultimate: Sistem Overdrive', ramuru: 'RAMURU ultimate: System Override',"
    )

# 6. 2703
if "ramuru: 'assets/ramuru/ui/cutin.webp'" not in content:
    content = content.replace(
        "valkren: 'assets/valkren/ui/cutin.webp',",
        "valkren: 'assets/valkren/ui/cutin.webp', ramuru: 'assets/ramuru/ui/cutin.webp',"
    )

with open("core/game.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Game JS Patched Successfully")
