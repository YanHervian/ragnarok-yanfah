/* DHYLA moves: player and AI use the same rules. */
(() => {
  'use strict';
  const getBal = () => window.GAME_BALANCE?.dhyla;
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
  const names = ['GETOK JAMUR', 'TIMPUK JAMUR', 'JAMUR TANAH', 'AZAB JAMUR'];

  const combo = [
    { get damage() { return getBal()?.combo[0] ?? 6; }, knockback: 75, reach: 90, get duration() { return .34 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[1] ?? 8; }, knockback: 100, reach: 78, get duration() { return .40 * atkSpd(); }, hitAt: .5 },
    { get damage() { return getBal()?.combo[2] ?? 12; }, knockback: 180, reach: 115, get duration() { return .50 * atkSpd(); }, hitAt: .55 }
  ];
  const murmuration = { cutinDuration: .78, passStart: [.55, .85, 1.15], passHeights: [-70, -112, -150], speed: 1500, ravens: 10, spacing: 40, duration: 2.4 };
  
  function move(name, index = 1) {
    if (name === 'attack') return { name: `attack${index}`, type: 'attack', index, ...combo[index - 1] };
    if (name === 'skill1') return { name, type: name, damage: getBal()?.skill1?.damage ?? 16, duration: .46, knockback: 60, projectile: true, speed: 840, feathers: [5, 5, 6], spread: .1, hitAt: .5 };
    if (name === 'skill2') return { name, type: name, damage: getBal()?.skill2?.damage ?? 24, duration: .45, knockback: 300, reach: 190, area: true, hitAt: .75 };
    return { name: 'ultimate', type: 'dhyla-ult', duration: balance.castTime, damage: 0, hitAt: .4 };
  }
  function start(a, name, index = 1) {
    if (a.action || a.state === 'hurt' || a.state === 'down' || a.state === 'recover') return false;
    if (name !== 'attack' && a.cooldowns[name] > 0) return false;
    if (name !== 'attack') a.cooldowns[name] = balance.cooldowns[name];
    a.action = { ...move(name, index), t: 0, fired: false, queued: 0 }; a.state = a.action.name; a.stateTime = 0;
    
    if (name === 'skill1' && window.Dhyla.audio.skill1) {
      try {
        const el = new Audio(window.Dhyla.audio.skill1);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.dhyla?.skill1 === 'number' ? window.AUDIO_CONFIG.skills.dhyla.skill1 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(()=>{});
      } catch (e) {}
    }
    if (name === 'skill2' && window.Dhyla.audio.skill2) {
      try {
        const el = new Audio(window.Dhyla.audio.skill2);
        const masterMult = typeof window.AUDIO_CONFIG?.master === 'number' ? window.AUDIO_CONFIG.master : 1.0;
        const skillMult = typeof window.AUDIO_CONFIG?.skills?.dhyla?.skill2 === 'number' ? window.AUDIO_CONFIG.skills.dhyla.skill2 : 1.0;
        const sfxVolumeConfig = Number(localStorage.getItem('aether.sfxVolume') || 90) / 100;
        el.volume = Math.max(0, Math.min(1, sfxVolumeConfig * masterMult * skillMult));
        el.play().catch(()=>{});
      } catch (e) {}
    }

    return true;
  }
  const vfx = {
    attacks: [
      { x: 100, y: -130, size: 80, asset: 'dhyla-slash', flipX: -1 },
      { x: 100, y: -160, size: 80, asset: 'dhyla-slash', flipX: -1 },
      { x: 125, y: -115, size: 100, asset: 'dhyla-slash', flipX: -1 }
    ],
    hasJumpSmoke: false
  };
  const ultimate = {
    start(actor, context) {
      return { t: 0, owner: actor === context.hero ? 'player' : 'enemy', facing: actor.facing, casterX: actor.x, phase: 'cutin', hit: false, auraSpawned: false, envFx: null };
    },
    update(dt, s, context) {
      if (!s) return null;
      const isVoicePlaying = context.isVoicePlaying('dhyla', s.owner);
      if (s.t < 0.78 || s.triggered) {
        if (s.t >= 0.77 && s.t < 0.78 && isVoicePlaying) {
          // Freeze s.t until voice finishes
          if (s.auraFx) s.auraFx.life += dt; // Pertahankan efek aura selama voice berjalan
        } else {
          s.t += dt;
        }
      } else {
        s.t += dt;
      }
      const a = s.owner === 'enemy' ? context.dummy : context.hero;
      const target = s.owner === 'enemy' ? context.hero : context.dummy;
      // 1. Aura instan saat ditekan
      if (s.t >= 0 && !s.auraSpawned) {
        s.auraSpawned = true;
        s.auraFx = { type: 'dhyla-fx', asset: 'dhyla-ultaura', x: a.x, y: a.y - 70, facing: a.facing, life: 2.6, maxLife: 2.6, size: 300, bindTo: a, offsetX: 0, offsetY: -70, behind: true };
        context.effects.push(s.auraFx);
      }

      // 2. Munculkan jamur dari bawah tanah (setelah cut-in hampir selesai)
      if (s.t >= 0.8 && !s.envFx && !s.hit) {
        // Spawn 400 pixel di bawah tanah
        s.envFx = { type: 'dhyla-fx', asset: 'dhyla-ultenv', x: target.x, y: context.groundY + 400, facing: 1, life: 2.0, maxLife: 2.0, size: 360 };
        context.effects.push(s.envFx);
      }

      // 3. Animasi muncul dari tanah dan mengunci posisi target
      if (s.envFx && !s.hit) {
        // Terus ikuti (nempel) pergerakan target supaya tidak bisa kabur
        s.envFx.x = target.x;

        if (s.envFx.y > context.groundY - 70) {
          s.envFx.y -= 2500 * dt; // Kecepatan melesat naik dari tanah (2500px/detik)
          if (s.envFx.y <= context.groundY - 70) {
            s.envFx.y = context.groundY - 70;
            s.hit = true;
            // Hard-snap the target to the ground to kill any residual hurt/knockdown velocity
            // (vy = -420 from a prior combo) that could send them flying after the hit lands.
            target.vy = 0; target.vx = 0; target.y = context.groundY; target.grounded = true;
            if (target.hurtTime !== undefined) target.hurtTime = 0;
            context.spawnParticles(target.x, context.groundY - 60, '#ffd700', 40, 450);
            context.addTrauma(.7);
            const dmg = getBal()?.ultimate?.damage ?? 48;
            if (s.owner === 'enemy') context.receiveHit(dmg, { freeze: false, knockdown: true, ultContext: true });
            else context.hitDummy(dmg, 280, '#ffd700', a.x, target.y - 80, true, false, 1, 0, true);
            if (!target.isBlocking) context.sound('heavy');
          }
        }
      }

      s.phase = s.t < .78 ? 'cutin' : 'active';
      if (s.t >= 2.6) {
        context.stopVoice('dhyla', s.owner);
        return null; // Ultimate finished
      }
      return s;
    }
  };
  function refund(a) { for (const name of Object.keys(balance.cooldowns)) a.cooldowns[name] = Math.max(0, a.cooldowns[name] - balance.cooldowns[name] * balance.basicRefund); }

  window.Dhyla = {
    audio: {
      skill1: 'assets/dhyla/audio/dhyla-skill1.mp3',
      skill2: 'assets/dhyla/audio/dhyla-skill2.mp3',
      ultimate: 'assets/dhyla/audio/dhyla-ultimate.mp3',
      hit: null
    }, balance, names, combo, murmuration, vfx, ultimate, move, start, refund
  };
})();



