import pathlib
import re

p = pathlib.Path(r'c:\Users\ACER\Downloads\aether-clash-main\game.js')
text = p.read_text(encoding='utf-8')

text = text.replace(
    'YF = window.Yanfah && window.YANFAH_MANIFEST ? window.Yanfah : null;',
    'YF = window.Yanfah && window.YANFAH_MANIFEST ? window.Yanfah : null, DH = window.Dhyla && window.DHYLA_MANIFEST ? window.Dhyla : null;'
)

text = text.replace(
    '...(YF ? { yanfah: YF } : {}) };',
    '...(YF ? { yanfah: YF } : {}), ...(DH ? { dhyla: DH } : {}) };'
)

text = text.replace(
    'YANFAH_VOICE_PATH = \'assets/yanfah/audio/yanfah-ultimate.mp3\';',
    'YANFAH_VOICE_PATH = \'assets/yanfah/audio/yanfah-ultimate.mp3\', DHYLA_VOICE_PATH = \'assets/dhyla/audio/dhyla-ultimate.mp3\';'
)

text = text.replace(
    'edda: \'Opal\', yanfah: \'Hacker\' };',
    'edda: \'Opal\', yanfah: \'Hacker\', dhyla: \'Dhyla\' };'
)

text = text.replace(
    "...(YF ? [['yanfah', YANFAH_VOICE_PATH]] : [])])",
    "...(YF ? [['yanfah', YANFAH_VOICE_PATH]] : []), ...(DH ? [['dhyla', DHYLA_VOICE_PATH]] : [])])"
)

text = text.replace(
    'if(selectedCharacter===\'yanfah\'){yanfahStrike(hero,YF.move(\'attack\',index));return;}',
    'if(selectedCharacter===\'yanfah\'){yanfahStrike(hero,YF.move(\'attack\',index));return;}\n    if(selectedCharacter===\'dhyla\'){dhylaStrike(hero,DH.move(\'attack\',index));return;}'
)

text = text.replace(
    'if(selectedCharacter===\'yanfah\'){yanfahStrike(hero,action);return;}',
    'if(selectedCharacter===\'yanfah\'){yanfahStrike(hero,action);return;}\n    if(selectedCharacter===\'dhyla\'){dhylaStrike(hero,action);return;}'
)

text = text.replace(
    'else if (id === \'yanfah\') startSystemCrash(actor);',
    'else if (id === \'yanfah\') startSystemCrash(actor); else if (id === \'dhyla\') startSystemCrash(actor);'
)

strike_stub = '''function dhylaStrike(actor, move) {
    if (!move) return;
    const isUlt = move.type === 'dhyla-ult';
    actor.action = { type: move.type, name: move.name, duration: move.duration, t: 0, fired: false, hitAt: move.hitAt, dash: move.dash || 0, index: move.index };
    playSound('swing', actor);
    if (isUlt) startUltimateVoice('dhyla', actor);
}
'''
if 'function dhylaStrike' not in text:
    text = text.replace('function yanfahStrike(actor, move) {', strike_stub + '\nfunction yanfahStrike(actor, move) {')

p.write_text(text, encoding='utf-8')
print('Updated game.js with Dhyla!')
