const fs = require('fs');
let css = fs.readFileSync('menu.css', 'utf8');

const newCSS = `
/* --- AI REDESIGN ROSTER TILE STYLING --- */
#front-menu .roster-grid { display:grid;grid-template-columns:repeat(4,minmax(78px,112px));gap:14px;justify-content:center }
#front-menu .roster-tile{
  all:unset;cursor:pointer;display:block;width:100%;aspect-ratio:1;position:relative;overflow:hidden;
  clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
  background:linear-gradient(135deg,rgba(20,24,34,.7),rgba(10,12,16,.9));
  box-shadow:inset 0 0 10px rgba(0,0,0,.5);
  transition:transform .3s cubic-bezier(.25,.8,.25,1),filter .3s,box-shadow .3s;
  filter:saturate(.55) brightness(.75);
}
#front-menu .roster-tile::before{
  content:"";position:absolute;inset:0;z-index:3;pointer-events:none;
  border:1px solid rgba(255,255,255,.08);transition:.3s;
}
#front-menu .roster-tile .portrait-image{width:100%;height:100%;object-fit:cover;transition:transform .5s; filter: none !important; scale: 1 !important;}
#front-menu .roster-tile::after{
  content:"";position:absolute;inset:0;z-index:2;pointer-events:none;
  background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);
  transform:translateX(-120%);
}
#front-menu .roster-name-tag{
  position:absolute;left:0;right:0;bottom:0;z-index:4;padding:16px 6px 6px;text-align:center;
  font:700 12px var(--ui);letter-spacing:.24em;color:#fff;
  background:linear-gradient(to top,color-mix(in srgb,var(--accent) 70%,#000),transparent);
  transform:translateY(100%);transition:transform .3s; opacity: 1;
}
#front-menu .roster-tile:hover,#front-menu .roster-tile:focus-visible,#front-menu .roster-tile.highlight{
  transform:translateY(-5px) scale(1.08);filter:none;z-index:5;
  box-shadow:inset 0 0 22px color-mix(in srgb,var(--accent) 45%,transparent);
}
#front-menu .roster-tile:hover::before,#front-menu .roster-tile:focus-visible::before,#front-menu .roster-tile.highlight::before{
  border:2px solid var(--accent);
}
#front-menu .roster-tile:hover::after{transform:translateX(120%);transition:transform .7s}
#front-menu .roster-tile:hover .portrait-image,#front-menu .roster-tile.highlight .portrait-image{transform:scale(1.1) !important;}
#front-menu .roster-tile:hover .roster-name-tag,#front-menu .roster-tile:focus-visible .roster-name-tag,#front-menu .roster-tile.highlight .roster-name-tag{transform:none;opacity:1;}
#front-menu .roster-tile:focus-visible{outline:2px dashed var(--accent);outline-offset:3px}
`;

if (!css.includes('AI REDESIGN ROSTER TILE STYLING')) {
    fs.writeFileSync('menu.css', css + '\n' + newCSS, 'utf8');
    console.log('Appended AI roster styling.');
} else {
    console.log('Already appended.');
}
