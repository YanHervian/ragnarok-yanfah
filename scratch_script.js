const fs = require('fs');
let c = fs.readFileSync('assets/audio/announcer/manifest.js', 'utf8');

c = c.replace(/"round_1"/g, '"ronde_1"');
c = c.replace(/"round_2"/g, '"ronde_2"');
c = c.replace(/"round_3"/g, '"ronde_3"');
c = c.replace(/"fight"/g, '"mulai"');
c = c.replace(/"ko"/g, '"ko"');
c = c.replace(/"double_ko"/g, '"ko_ganda"');
c = c.replace(/"draw"/g, '"seri"');
c = c.replace(/"time_up"/g, '"waktu_habis"');

fs.writeFileSync('assets/audio/announcer/manifest.js', c);
