# Valkren - Sprite Animation Prompts
## Character Reference (pasang di setiap prompt)

Valkren is a towering heavy anime mecha warrior designed as a premium battle-game character. He has a very large, broad, imposing humanoid mechanical body with oversized shoulders, thick armored limbs, a relatively small angular helmeted head, heavy mechanical feet, and layered futuristic armor. Main armor colors are matte white, gunmetal, and black with crimson-red illuminated accents. He has a sharp knight-like helmet with a narrow crimson visor, a glowing crimson chest core, large wing-like shoulder armor, and twin shoulder-mounted laser cannons. He carries a massive futuristic greatsword designed to be wielded with BOTH HANDS. The greatsword is large, elegant, angular, and heavy, with black/gunmetal structure, white armor sections, and crimson energy channels. Valkren is a calm, powerful, intimidating heavy fighter.
Anime pixel art style. Full-body side-view/three-quarter battle-game sprite. Preserve the exact same character proportions, armor design, sword design, shoulder cannon placement, colors, and silhouette across every frame.
IMPORTANT: The sprite animation itself must contain NO VFX unless explicitly stated. Do NOT add glowing energy trails, laser beams, explosions, sparks, particles, slash effects, smoke, or aura. The separate VFX files will be composited later.

## Canvas Rules

- 4-frame animations: Canvas 2048x512 px (4 equal frames of 512x512 px each). Solid magenta (#FF00FF) background.
- 1-frame animations (jump, doublejump): Canvas 512x512 px (single frame). Solid magenta (#FF00FF) background.
- Keep the entire character inside each frame.
- Maintain consistent head height, shoulder width, body scale, sword scale, and foot position across frames whenever physically possible.
- The sword must remain a clearly separate physical object from the VFX.
- Shoulder-mounted cannons must remain visibly attached to the shoulders, never to the forearms or hands.

## LIST OF 15 ANIMATIONS

### 0. idle.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren.
Animation: Heavy mechanical idle loop. CRITICAL: While it is an idle animation, the 4 frames must clearly show the mechanical breathing/weight shift progression described below. The armor must visibly move/shift between frames, do not output identical static frames. Valkren should feel powerful and alive, not stiff.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Base): Valkren stands tall in a wide, stable stance. Greatsword is held vertically or diagonally in front of his body with both hands resting naturally on the handle. Shoulder cannons are closed and resting in their normal position. Head faces forward with a calm combat-ready posture.
Frame 2 (Mechanical Breathing): His armored chest rises very slightly as if internal systems are cycling. Shoulders move upward by only a few pixels. Hands tighten slightly around the sword handle. Helmet tilts forward by a tiny amount.
Frame 3 (Weight Shift): His weight shifts subtly toward the opposite leg. The torso and shoulders move slightly while both feet remain firmly planted. Sword angle changes by only a few degrees.
Frame 4 (Return): Heavy armor settles back into the original position. Head returns to center. Sword returns to Frame 1 position.
NO VFX. Pure mechanical idle animation.

### 1. walk.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren walking.
Animation: Heavy armored walking cycle. CRITICAL: The 4 frames MUST show a clear, distinct progression of the walk cycle. Frame 1, 2, 3, and 4 must have different leg positions and arm swings. DO NOT generate 4 identical poses. Every step must communicate significant mechanical weight.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Contact): Left leg steps forward. Right leg remains behind. Torso upright and stable. Greatsword is held diagonally with both hands, close to the body.
Frame 2 (Down): Left foot is firmly planted. Body drops slightly from the weight of the step. Right leg begins moving forward. Shoulder armor shifts subtly with the movement.
Frame 3 (Contact): Right leg steps forward. Left leg moves behind. Sword remains firmly controlled with both hands.
Frame 4 (Down): Right foot planted. Body compresses slightly from the heavy landing. Left leg begins moving through.
NO VFX. Pure heavy mechanical movement.

### 2. run.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren performing a powerful mechanical combat run.
Animation: Heavy boosted run. CRITICAL: The 4 frames MUST be distinctly different parts of the running motion (legs fully extended, legs crossing, opposite leg extended, etc). DO NOT just copy-paste the same pose. Valkren leans forward more than during walking, but his large armor remains stable and controlled. The greatsword is held securely with both hands.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Left leg extended forward, right leg far back. Body leans forward. Sword held diagonally across the front of the body.
Frame 2: Both legs transition underneath the body. Torso compresses slightly as the heavy frame prepares the next stride.
Frame 3: Right leg extended forward, left leg far back. Body leans forward. Sword position mirrors Frame 1.
Frame 4: Both legs transition underneath the body again, preparing to loop.
NO exhaust, laser, dust, sparks, or energy trails. Pure physical/mechanical run.

### 3. jump.png — 1 frame
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a SINGLE-FRAME sprite for Valkren performing a heavy combat jump.
Canvas: 512x512 px. Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep the character completely inside the 512x512 px frame.
- Leave comfortable empty space around the character on all sides.
- Do not let the character, sword, shoulder cannons, or armor touch the canvas edges.
- Keep the pose centered and clearly separated from the canvas boundaries.

Pose: Valkren is airborne at the peak of a heavy jump. Both knees are bent slightly upward. His torso remains controlled and upright. He holds the greatsword with both hands across the front of his body. Shoulder cannons remain attached and aligned with the shoulders. The pose should make his mass and mechanical weight visually clear.
NO VFX, no exhaust, no glow, no particles.

### 4. doublejump.png — 1 frame
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a SINGLE-FRAME sprite for Valkren performing a powerful mid-air second jump.
Canvas: 512x512 px. Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep the character completely inside the 512x512 px frame.
- Leave comfortable empty space around the character on all sides.
- Do not let the character, sword, shoulder cannons, or armor touch the canvas edges.
- Keep the pose centered and clearly separated from the canvas boundaries.

Pose: Valkren twists his torso slightly while kicking one leg downward and extending the other leg outward, as if using a powerful mechanical propulsion burst to change direction. He keeps both hands firmly on the greatsword. The shoulder-mounted cannons remain clearly visible.
NO VFX, no exhaust, no glow, no particles. Pure physical pose.

### 5. attack1.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren performing a fast two-handed greatsword slash.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Quick horizontal sword slash corresponding to the Crimson Blade Arc VFX.
Frame 1 (Anticipation): Valkren plants his rear foot and pulls the greatsword back across his body with BOTH HANDS. Torso twists slightly away from the attack direction. Elbows bent. The sword is clearly loaded for a powerful swing.
Frame 2 (Swing): Valkren rotates his entire torso and hips while driving the sword forward in a fast horizontal slash. Both arms extend strongly.
Frame 3 (Impact Hold): Sword reaches maximum extension across the attack direction. Front leg is planted firmly and the body leans into the strike. Strong, aggressive combat posture.
Frame 4 (Recovery): Valkren pulls the sword back toward his body and returns to a guarded two-handed stance.
ABSOLUTELY NO sword trail, red energy arc, sparks, glow, or particles. The separate Crimson Blade Arc VFX will be added later.

### 6. attack2.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren performing a heavy rising greatsword slash.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Heavy upward sword strike. This is slower and stronger than Attack 1.
Frame 1 (Anticipation): Valkren lowers his center of gravity and pulls the greatsword down beside his body. Both hands grip the handle tightly. Knees bend deeply.
Frame 2 (Power Start): Valkren pushes upward through both legs while beginning to rotate his torso. The sword starts traveling upward.
Frame 3 (Peak): Valkren completes a powerful rising slash, both arms extended upward and forward. One leg is planted strongly while the other follows the motion. The greatsword points diagonally upward.
Frame 4 (Recovery): Valkren lowers the sword under control and returns to a stable stance.
NO energy trail, sparks, glow, or particles. Pure physical sword motion.

### 7. attack3.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren performing a devastating overhead greatsword smash.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Heavy downward execution strike. The movement should feel like the strongest physical sword attack before skills.
Frame 1 (Anticipation): Valkren raises the massive greatsword high above his head with BOTH HANDS. Feet spread wide. Knees bent. Torso pulls slightly backward to prepare maximum force.
Frame 2 (Downswing): Valkren drives the sword downward with his entire body. Arms extend downward, torso leans forward, and knees straighten from the force.
Frame 3 (Impact): Greatsword reaches its lowest point in front of Valkren, almost touching the ground. Both feet are planted widely. His whole body is compressed into the strike.
Frame 4 (Recovery): Valkren slowly lifts the sword back into a guarded position while returning to an upright stance.
NO ground cracks, shockwaves, energy, sparks, glow, or particles. Pure physical sword impact motion.

### 8. crouch.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren crouching.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Standing in a guarded stance with both hands on the greatsword.
Frame 2: Knees bend and torso lowers. Sword moves closer to the body.
Frame 3: Deep crouch. Valkren becomes compact while maintaining a defensive two-handed sword stance.
Frame 4: Hold the crouched position, ready to attack.
NO VFX.

### 9. hurt.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren reacting to being hit.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Valkren’s armored torso jerks backward from the hit. Head snaps slightly backward. Sword shifts away from its normal guard position.
Frame 2: Upper body recoils further. One shoulder and arm move backward while the other attempts to stabilize the sword.
Frame 3: Valkren stumbles backward one step, knees bending under the force.
Frame 4: Valkren regains partial balance, torso slightly hunched, sword lowered defensively.
A very small physical hit reaction is allowed, but NO VFX, sparks, glow, or particles.


### 10. down.png — 4 frames

[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren being knocked down.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Valkren loses balance, knees buckling. Greatsword slips downward but remains in his hands.
Frame 2: He drops to one knee, using the sword to help support his weight.
Frame 3: He falls heavily onto the ground, body turned partly to the side. Greatsword lies beside or across him.
Frame 4: Valkren is fully down on the ground in a defeated pose, armor resting heavily against the floor.
NO explosion, dust, sparks, or energy.


### 11. recover.png — 4 frames

[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren recovering from being knocked down.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Valkren lies on the ground and begins pushing himself upward with one arm while reaching toward the greatsword.
Frame 2: He rises onto one knee and grips the greatsword with both hands.
Frame 3: He pushes himself to both feet, torso still slightly hunched.
Frame 4: Valkren stands fully upright again in a strong two-handed sword guard stance.
NO VFX. Pure physical recovery.


### 12. skill1.png — 4 frames

[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren activating and firing his shoulder-mounted laser cannons.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Redline Laser Barrage physical firing sequence. CRITICAL: Valkren is NOT attacking with his sword! The sword must be held strictly defensively near his body pointing down or resting. The attack comes ONLY from the TWO LARGE CANNONS on his SHOULDERS pointing forward. The cannons must clearly originate from the SHOULDERS.
Frame 1 (Targeting): Valkren plants his feet and angles his torso toward the enemy. The greatsword is held diagonally with both hands. Both shoulder-mounted cannon housings mechanically open and rotate into firing position. The cannons must clearly originate from the SHOULDERS.
Frame 2 (Charge): Shoulder cannons fully deploy and aim forward. Valkren lowers his center of gravity and braces his body. His sword remains held securely across his front.
Frame 3 (Firing Pose): Both shoulder cannons point directly toward the target. Valkren’s torso is locked and stable, feet planted wide. The sword remains visible in both hands.
Frame 4 (Cooldown/Recovery): Shoulder cannons retract slightly toward their normal shoulder position. Valkren returns the sword to his standard two-handed guard.
ABSOLUTELY NO laser beams, glow, muzzle flash, sparks, smoke, or particles. The separate Redline Laser Barrage VFX will be composited later.


### 13. skill2.png — 4 frames

[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren activating his area-targeting bombardment system.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Execution Lock → Crimson Rain physical casting/targeting motion. CRITICAL: Valkren is NOT attacking with his sword! The sword is just held defensively near his body. The action is entirely focused on the SHOULDER CANNONS aiming upward into the sky.
Frame 1 (Target Acquisition): Valkren lowers his greatsword slightly and raises his upper body into a commanding targeting stance. His head tilts toward the battlefield as if scanning for targets. Shoulder cannons begin rotating upward.
Frame 2 (Lock-On): Valkren plants both feet firmly. Both shoulder cannons point upward/forward at a steep angle. One hand remains on the greatsword while the other stabilizes its position. His torso is rigid and commanding.
Frame 3 (Bombardment Stance): Valkren holds a powerful stationary stance while both shoulder cannons are fully deployed and aimed toward the sky. Greatsword remains visible and ready in front of him.
Frame 4 (Recovery): Shoulder cannons return toward their resting position. Valkren raises the greatsword back into his normal two-handed guard.
ABSOLUTELY NO targeting lines, warning markers, laser pillars, explosions, glow, sparks, or particles. The separate Execution Lock and Crimson Rain VFX will be composited later.


### 14. ultimate.png — 4 frames

[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Valkren activating his ultimate Valkren Overdrive.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, sword, shoulder cannons, or armor cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Animation: Dramatic heavy-mecha overdrive activation followed by a powerful greatsword execution pose.
Frame 1 (System Initiation): Valkren stands upright with both hands gripping the greatsword in front of his body. His head lowers slightly. Shoulder cannon housings begin opening. His stance is calm and controlled.
Frame 2 (Overdrive Activation): Valkren spreads his stance wider and raises the greatsword upward with both hands. Shoulder cannons fully unfold into combat position. Chest and armor panels visibly shift open mechanically, exposing the areas where the overdrive system activates. No energy effects.
Frame 3 (Maximum Output): Valkren raises the greatsword high above his head with both hands. His torso is fully extended, shoulders broad, feet firmly planted, and head lifted in a commanding pose. Shoulder cannons are fully deployed and aimed outward/upward.
Frame 4 (Execution Ready): Valkren brings the greatsword down into a powerful forward diagonal ready position, leaning slightly forward as if preparing to unleash the final attack. Both shoulder cannons remain deployed. This is the final dramatic pose before the ultimate VFX and impact animation.
ABSOLUTELY NO aura, energy rings, glow, laser beams, particles, sparks, or shockwaves. Pure physical overdrive activation and attack preparation. The separate Overdrive Field, Valkren Overdrive, and final impact VFX will be composited later.

## Animation Consistency Rules

- Valkren’s shoulder-mounted laser cannons MUST ALWAYS originate from and remain attached to the shoulders.
- Never place the cannons on the forearms, wrists, hands, or hips.
- Valkren’s greatsword is ALWAYS held with BOTH HANDS during sword attacks.
- Keep the greatsword physically consistent in size, proportions, handle length, blade shape, and color.
- Valkren must remain substantially broader and heavier than human characters in the roster.
- Preserve the same helmet, visor, chest core, shoulder armor, leg armor, and foot design across all frames.
- Keep the black/white/gunmetal/crimson visual identity consistent.
- Do not add gold as a dominant color.
- Do not add volleyballs or sports equipment. Valkren is a battle mecha, not a volleyball character.
- The sprite frames contain the character’s physical motion only. All attack VFX are generated separately using valkren-vfx-prompts.md.
