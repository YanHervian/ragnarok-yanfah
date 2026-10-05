/* Shared ISOLDE moves (heron-leg lancer knight mecha, aether lance): player and AI use the same rules. */
(() => {
  'use strict';
  const getBal = () => window.GAME_BALANCE?.isolde;
  const atkSpd = () => getBal()?.movement?.attackSpeed ?? 1.0;

  const balance = { 
    get cooldowns() {
      return { skill1: getBal()?.skill1?.cooldown ?? 10, skill2: getBal()?.skill2?.cooldown ?? 20, ultimate: getBal()?.ultimate?.cooldown ?? 30 };
    }, 
    castTime:.5, 
    get lanceDamage() { return (getBal()?.ultimate?.damage ?? 48) / 3; }, 
    basicRefund:.05 
  };
  const names = ['LANCE LINE','SKY PIERCER','STILT CHARGE','SKYFALL LANCES'];
  // The lance gives a long, straight chain; reach sits inside the measured lance point (157/131/184 px in emitters.json).
  const combo = [
    {get damage() { return getBal()?.combo[0] ?? 6; },knockback:80,reach:140,get duration() { return .38 * atkSpd(); },hitAt:.5},
    {get damage() { return getBal()?.combo[1] ?? 8; },knockback:105,reach:115,get duration() { return .44 * atkSpd(); },hitAt:.5},
    {get damage() { return getBal()?.combo[2] ?? 12; },knockback:210,reach:165,get duration() { return .56 * atkSpd(); },hitAt:.55}
  ];
  // Sky Piercer: an ice bolt fired from the raised lance on a rising line (`rise` = vertical/horizontal speed ratio),
  // leaving at chest height (`y` px above the feet). It still catches a grounded rival within about 240 px and a
  // jumping rival much farther away: an anti-air poke.
  const piercer = { speed:900, rise:.25, y:105 };
  // Skyfall Lances: three giant ice lances dive from the sky 0.38 s apart (inside the 0.42 s hurt stun). Each one is
  // aimed at the rival's feet when it is called and takes `flight` s to land, with a small shatter where it lands.
  // A standing rival takes all three (48); keep moving to make them land behind you.
  const skyfall = { cutinDuration:.78, calls:[.8,1.18,1.56], flight:.55, height:520, back:260, shatter:70, size:170, duration:2.4 };
  function move(name,index=1) {
    if(name==='attack')return {name:`attack${index}`,type:'attack',index,...combo[index-1]};
    if(name==='skill1')return {name,type:name,damage:getBal()?.skill1?.damage ?? 16,duration:.5,knockback:130,projectile:true,speed:piercer.speed,range:240,hitAt:.55};
    // Stilt Charge: a long, fast lance-first charge on the springy heron legs.
    if(name==='skill2')return {name,type:name,damage:getBal()?.skill2?.damage ?? 24,duration:.72,knockback:300,reach:150,dash:560,hitAt:.58};
    return {name:'ultimate',type:'ultimate',duration:balance.castTime,damage:0,hitAt:1};
  }
  function start(a,name,index=1) {
    if(a.action||a.state==='hurt'||a.state==='down'||a.state==='recover')return false;
    if(name!=='attack'&&a.cooldowns[name]>0)return false;
    if(name!=='attack')a.cooldowns[name]=balance.cooldowns[name];
    a.action={...move(name,index),t:0,fired:false,queued:0};a.state=a.action.name;a.stateTime=0;return true;
  }
  function refund(a) {for(const name of Object.keys(balance.cooldowns))a.cooldowns[name]=Math.max(0,a.cooldowns[name]-balance.cooldowns[name]*balance.basicRefund);}
  window.Isolde={
  audio: {
    skill1: null,
    skill2: null,
    ultimate: 'assets/isolde/audio/isolde-ultimate.mp3',
    hit: null
  },balance,names,combo,piercer,skyfall,move,start,refund};
})();


