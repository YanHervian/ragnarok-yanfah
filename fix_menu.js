const fs = require('fs');
let code = fs.readFileSync('menu.js', 'utf8');
code = code.replace(/const el = root\.querySelector\("\[data-stage=\$\(\\)\]\);/g, 'const el = root.querySelector([data-stage=""]);');
fs.writeFileSync('menu.js', code);
