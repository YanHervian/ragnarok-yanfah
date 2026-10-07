import os

file_path = r'c:\Users\ACER\Downloads\aether-clash-main\core\game.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Entry 1 - variables
if 'window.Ramuru :' not in content:
    content = content.replace(
        'window.Valkren : null;',
        'window.Valkren : null, RM = window.Ramuru && window.RAMURU_MANIFEST ? window.Ramuru : null;'
    )

# 2. Entry 2 - KITS
if '{ ramuru: RM }' not in content:
    content = content.replace(
        '...(VK ? { valkren: VK } : {}) };',
        '...(VK ? { valkren: VK } : {}), ...(RM ? { ramuru: RM } : {}) };'
    )

# 3. Entry 3 - VOICE_NAMES
if "ramuru: 'RAMURU'," not in content:
    content = content.replace(
        "valkren: 'VALKREN',",
        "valkren: 'VALKREN',\n      ramuru: 'RAMURU',"
    )

# 4. Entry 4 - CHARACTER_ASSETS
if 'ramuru: {' not in content:
    idx = content.find('valkren: {')
    end_idx = content.find('  },', idx) + 4
    valkren_block = content[idx:end_idx]
    
    ramuru_block = """ramuru: {
    sprite: ['ramuru', 'assets/ramuru/run/sprite-sheet-alpha.webp'],
    fx: {
      prefix: 'fx-ramuru-',
      dir: 'assets/ramuru/ui/fx-',
      names: ['slash', 'hit', 'projectile', 'explosion', 'warning', 'eruption', 'ultaura', 'ultenv', 'guard', 'dust']
    }
  },
  """
    content = content[:end_idx] + '\n  ' + ramuru_block + content[end_idx:]

# 5. Entry 5 - startSummon
if 'id === \'ramuru\'' not in content:
    content = content.replace(
        "else if (id === 'valkren') startValkrenUlt(actor);",
        "else if (id === 'valkren') startValkrenUlt(actor);\n      else if (id === 'ramuru') startRamuruUlt(actor);"
    )

# 6. Entry 6 - syncPlayerForm
if "else if (selectedCharacter === 'ramuru')" not in content:
    content = content.replace(
        "Object.assign(cooldownMax, VK ? VK.balance.cooldowns : { skill1: 10, skill2: 20, ultimate: 30 });\n    }",
        "Object.assign(cooldownMax, VK ? VK.balance.cooldowns : { skill1: 10, skill2: 20, ultimate: 30 });\n    }\n    else if (selectedCharacter === 'ramuru') {\n      manifest = window.RAMURU_MANIFEST;\n      metrics = window.RAMURU_METRICS || window.RAMURU_MANIFEST;\n      images.hero = images.ramuru;\n      Object.assign(cooldownMax, RM ? RM.balance.cooldowns : { skill1: 10, skill2: 20, ultimate: 30 });\n    }"
    )

# 7. Entry 7 - syncOpponentForm
if "else if (opponentCharacter === 'ramuru')" not in content:
    content = content.replace(
        "images.dummy = images.valkren;\n    }",
        "images.dummy = images.valkren;\n    }\n    else if (opponentCharacter === 'ramuru') {\n      opponentManifest = window.RAMURU_MANIFEST;\n      opponentMetrics = window.RAMURU_METRICS || window.RAMURU_MANIFEST;\n      images.dummy = images.ramuru;\n    }"
    )

# 8. Add startRamuruUlt and updateRamuruUlt
if 'function startRamuruUlt' not in content:
    valkren_ult_end = content.find('function startRocketParade(actor)')
    
    ramuru_ult_code = """
function startRamuruUlt(actor) {
  const ctx = makeUltContext();
  const group = window.Ramuru?.ultimate?.start
    ? window.Ramuru.ultimate.start(actor, ctx)
    : { t: 0, owner: actor === hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false };
  group._charId = 'ramuru';
  if (actor === hero) activeUlt.player = group;
  else activeUlt.enemy = group;
  cinematic = .9; announceTimer = 0;
  startUltimateVoice('ramuru', actor);
}

function updateRamuruUlt(dt, s) {
  if (!s) return;
  const ctx = makeUltContext();
  const next = window.Ramuru?.ultimate?.update
    ? window.Ramuru.ultimate.update(dt, s, ctx)
    : null;
  if (!next) {
    if (s === activeUlt.enemy) activeUlt.enemy = null;
    else if (s === activeUlt.player) activeUlt.player = null;
  }
}
"""
    content = content[:valkren_ult_end] + ramuru_ult_code + content[valkren_ult_end:]

# 9. Entry 9 - Game Loop
if 'updateRamuruUlt(dt' not in content:
    content = content.replace(
        "updateValkrenUlt(dt, activeUlt.enemy?._charId === 'valkren' ? activeUlt.enemy : null);",
        "updateValkrenUlt(dt, activeUlt.enemy?._charId === 'valkren' ? activeUlt.enemy : null);\n    updateRamuruUlt(dt, activeUlt.player?._charId === 'ramuru' ? activeUlt.player : null);\n    updateRamuruUlt(dt, activeUlt.enemy?._charId === 'ramuru' ? activeUlt.enemy : null);"
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("game.js patched successfully.")
