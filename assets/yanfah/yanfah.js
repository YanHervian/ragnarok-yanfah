/* YANFAH moves: player and AI use the same rules. */
(() => {
  'use strict';
  const getBal = () => window.GAME_BALANCE?.yanfah;
  const atkSpd = () => getBal()?.movement?.attackSpeed ?? 1.0;

  const balance = {
    get cooldowns() {
      return {
        skill1: getBal()?.skill1?.cooldown ?? 10,
        skill2: getBal()?.skill2?.cooldown ?? 20,
        ultimate: getBal()?.ultimate?.cooldown ?? 30
      };
    },
    castTime: .5, basicRefund: .05
  };
  const names = ['KEYBOARD SMASH', 'COPY PASTE', 'PING 999', 'BLUE SCREEN'];

  const combo = [
    { get damage() { return getBal()?.combo[0] ?? 6; }, knockback: 75, reach: 90, get duration() { return .34 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[1] ?? 8; }, knockback: 100, reach: 78, get duration() { return .40 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[2] ?? 12; }, knockback: 180, reach: 115, get duration() { return .50 * atkSpd(); }, hitAt: .55 }
  ];
  const murmuration = { cutinDuration: .78, passStart: [.55, .85, 1.15], passHeights: [-70, -112, -150], speed: 1500, ravens: 10, spacing: 40, duration: 2.4 };

  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    if (name === 'skill1') return { name, type: name, damage: getBal()?.skill1?.damage ?? 16, duration: .46, knockback: 60, projectile: true, speed: 840, feathers: [5, 5, 6], spread: .1, hitAt: .5 };
    if (name === 'skill2') return { name, type: name, damage: getBal()?.skill2?.damage ?? 24, duration: .82, knockback: 300, reach: 190, area: true, dash: 850, hitAt: .60 };
    return { name: 'ultimate', type: 'yanfah-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }
  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 }; a.state = a.action.name; a.stateTime = 0;

    if (name === 'skill1' && window.Yanfah.audio.skill1) {
      try {
        const el = new Audio(window.Yanfah.audio.skill1);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.yanfah?.skill1 === 'number' ? window.AUDIO_CONFIG.skills.yanfah.skill1 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(() => { });
      } catch (e) { }
    }
    if (name === 'skill2' && window.Yanfah.audio.skill2) {
      try {
        const el = new Audio(window.Yanfah.audio.skill2);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.yanfah?.skill2 === 'number' ? window.AUDIO_CONFIG.skills.yanfah.skill2 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(() => { });
      } catch (e) { }
    }

    return true;
  }
  const vfx = {
    attacks: [
      { x: 100, y: -100, size: 75, asset: 'yanfah-meleeswipe', flipX: 1 },
      { x: 110, y: -120, size: 75, asset: 'yanfah-meleeswipe', flipX: 1, rotation: -45 },
      { slamAsset: 'yanfah-cyberslam', slamSize: 170, slamX: 5, slamY: -40 }
    ],
    projectile: { asset: 'yanfah-datacode', speed: 950, size: 140, color: '#00ffff' },
    hasJumpSmoke: false
  };

  const ultimate = {
    start(actor, context) {
      return { t: 0, owner: actor === context.hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, hits: 0, phase: 'cutin', calls: 0, triggered: false };
    },
    update(dt, s, context) {
      if (!s) return null;
      const target = s.owner === 'enemy' ? context.hero : context.dummy;
      const isVoicePlaying = context.isVoicePlaying('yanfah', s.owner);
      if (s.t < 0.78 || s.triggered) {
        if (s.t >= 0.77 && s.t < 0.78 && isVoicePlaying) {
          // Freeze
        } else {
          s.t += dt;
        }
      }
      if (!s.projectileFired && s.t >= 0.78 && !isVoicePlaying) {
        s.projectileFired = true;
        const caster = s.owner === 'enemy' ? context.dummy : context.hero;
        const px = caster.x, py = caster.y - 100;
        const speed = 1200;
        const targetX = target.x, targetY = target.y - 85;
        const angle = Math.atan2(targetY - py, targetX - px);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        context.projectiles.push({ x: px, y: py, vx: vx, vy: vy, life: 1, facing: s.facing, owner: s.owner, damage: 0, knockback: 0, asset: 'yanfah-datacode', size: 140, color: '#00ffff', yanfahUltTrigger: true, tall: 140, homingTarget: target, speed: speed });
        context.effects.push({ type: 'yanfah-fx', asset: 'yanfah-glitchhit', x: px, y: py, facing: s.facing, life: .18, maxLife: .18, size: 120 });
        context.sound('cast');
      }
      const calls = [1.71];
      while (s.triggered && s.calls < calls.length && s.t >= calls[s.calls]) {
        const last = s.calls === calls.length - 1; s.calls++;
        const tx = target.x + (Math.random() * 80 - 40);
        context.effects.push({ type: 'yanfah-fx', asset: 'yanfah-systemcrash', x: tx, y: context.groundY - 10, facing: s.facing, life: .55, maxLife: .55, size: 280 });
        context.spawnParticles(tx, context.groundY - 20, '#00ffff', 40, 350); context.dust(tx, 14); context.addTrauma(.35);
        // Langsung putar SFX ledakan tanpa lewat pool
        try {
          const _sfxEl = new Audio('assets/audio/sfx/hit_heavy.mp3');
          const _vol = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
          const _master = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
          _sfxEl.volume = Math.max(0, Math.min(1, _vol * _master));
          _sfxEl.play().catch(() => {});
        } catch (_) {}
        if (Math.abs(target.x - tx) < 150 && target.y > context.groundY - 200) {
          const ultDmg = getBal()?.ultimate?.damage ?? 16;
          if (s.owner === 'enemy') context.receiveHit(ultDmg, { freeze: false, hitSound: 'heavy', ultContext: true });
          else context.hitDummy(ultDmg, last ? 220 : 60, '#00ffff', s.casterX, context.groundY - 60, false, false, 1, 0, true, 'heavy');
        }
      }
      s.phase = s.t < .78 ? 'cutin' : s.calls < calls.length ? 'calling' : 'fading';
      if (s.t >= 3.0 && s.triggered) return null;
      if (s.t > 0.78 && !s.triggered) {
        s.timeout = (s.timeout || 0) + dt;
        if (s.timeout > 2.0) return null;
      }
      return s;
    }
  };
  function refund(a) { for (const name of Object.keys(balance.cooldowns)) a.cooldowns[name] = Math.max(0, a.cooldowns[name] - balance.cooldowns[name] * balance.basicRefund); }

  window.Yanfah = {
    audio: {
      skill1: 'assets/yanfah/audio/yanfah-skill1.mp3',
      skill2: 'assets/yanfah/audio/yanfah-skill2.mp3',
      ultimate: 'assets/yanfah/audio/yanfah-ultimate.mp3',
      hit: null
    }, balance, names, combo, murmuration, vfx, ultimate, move, start, refund
  };
})();


