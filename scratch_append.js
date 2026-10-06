const fs = require('fs');
const css = `
/* About Modern Redesign */
.blur-bg {
  filter: blur(8px) brightness(0.3) saturate(1.5);
  transform: scale(1.05);
}

.about-modern {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding-top: 60px;
}

.about-modern-content {
  width: min(900px, 90%);
  max-height: 85vh;
  background: rgba(12, 16, 24, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: 0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1);
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  overflow-y: auto;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.about-header {
  text-align: center;
}

.about-header .eyebrow {
  display: inline-block;
  font-size: 12px;
  letter-spacing: 3px;
  color: var(--gold);
  margin-bottom: 12px;
  text-transform: uppercase;
  background: linear-gradient(90deg, transparent, rgba(232, 185, 74, 0.2), transparent);
  padding: 4px 16px;
  border-radius: 12px;
}

.about-header h2 {
  font-family: 'Chaos', serif;
  font-size: 52px;
  line-height: 1.1;
  color: var(--white);
  margin: 0 0 16px 0;
  text-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

.about-header h2 em {
  color: var(--gold);
  font-style: italic;
}

.about-header p {
  font-size: 15px;
  line-height: 1.6;
  color: #a0a8b5;
  max-width: 680px;
  margin: 0 auto;
}

.factions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.faction-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}

.faction-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: var(--gold);
  opacity: 0;
  transition: opacity 0.3s;
}

.faction-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 16px 32px rgba(0,0,0,0.3);
}

.faction-card:hover::before {
  opacity: 1;
}

.faction-card.divine:hover::before { background: #ffd700; }
.faction-card.fantasy:hover::before { background: #b470ff; }
.faction-card.mortal:hover::before { background: #ff4747; }

.faction-icon {
  font-size: 32px;
  margin-bottom: 16px;
  text-shadow: 0 0 16px rgba(255,255,255,0.2);
}

.faction-card h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 20px;
  color: var(--white);
  margin: 0 0 12px 0;
  letter-spacing: 2px;
}

.faction-card p {
  font-size: 13px;
  line-height: 1.5;
  color: #8c96a5;
  margin: 0;
}

.about-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.stats-row {
  display: flex;
  gap: 40px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat b {
  font-family: 'Chaos', serif;
  font-size: 42px;
  line-height: 1;
  color: var(--gold);
  margin-bottom: 4px;
}

.stat span {
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--muted);
}

.about-credits {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.about-credits small {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
}

.btn-glow {
  box-shadow: 0 0 20px rgba(232, 185, 74, 0.2);
  border: 1px solid rgba(232, 185, 74, 0.5);
  background: rgba(232, 185, 74, 0.1);
}
.btn-glow:hover {
  box-shadow: 0 0 30px rgba(232, 185, 74, 0.4);
  background: rgba(232, 185, 74, 0.2);
}

@media(max-width: 800px) {
  .about-modern-content { padding: 32px 24px; gap: 24px; }
  .about-header h2 { font-size: 36px; }
  .factions-grid { grid-template-columns: 1fr; gap: 12px; }
  .faction-card { padding: 20px 16px; }
  .about-footer { flex-direction: column; align-items: center; gap: 32px; text-align: center; }
  .about-credits { align-items: center; text-align: center; }
  .stats-row { gap: 24px; justify-content: center; width: 100%; }
}
`;
fs.appendFileSync('menu.css', '\n' + css);
console.log("Appended CSS successfully");
