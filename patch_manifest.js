const fs = require('fs');

let c = fs.readFileSync('assets/audio/announcer/manifest.js', 'utf8');
const manifest = JSON.parse(c.substring('window.ANNOUNCER_MANIFEST = '.length, c.length - 1));

const mappings = {
  'ronde_1': 'assets/audio/announcer_universal/ronde_1.mp3',
  'ronde_2': 'assets/audio/announcer_universal/ronde_2.mp3',
  'ronde_3': 'assets/audio/announcer_universal/ronde_3.mp3',
  'mulai': 'assets/audio/announcer_universal/mulai.mp3',
  'ko': 'assets/audio/announcer_universal/ko.mp3',
  'seri': 'assets/audio/announcer_universal/seri.mp3',
  'waktu_habis': 'assets/audio/announcer_universal/waktu_habis.mp3',
  'ko_ganda': 'assets/audio/announcer_universal/ko_ganda.mp3'
};

for (const [key, newPath] of Object.entries(mappings)) {
  if (manifest.clips[key]) {
    manifest.clips[key].file = newPath;
  }
}

const out = 'window.ANNOUNCER_MANIFEST = ' + JSON.stringify(manifest) + ';';
fs.writeFileSync('assets/audio/announcer/manifest.js', out, 'utf8');
console.log('Manifest patched successfully.');
