# Ramuru - Sprite Animation Prompts
## Character Reference (pasang di setiap prompt)

Ramuru is an agile, androgynous slime-humanoid character designed as a premium battle-game character. They have short, slightly messy light blue hair with cyan highlights, and bright golden eyes. Their outfit is modern techwear: an oversized white high-collar tech jacket with black and cyan/teal accents, hanging cyan straps, dark blue baggy cropped tech pants (joggers), and chunky modern sneakers with white and teal details. They wield a plain, sleek katana. Ramuru is extremely agile, flexible, and has a calm but sharp expression.
Anime pixel art style. Full-body side-view/three-quarter battle-game sprite. Preserve the exact same character proportions, techwear design, katana design, colors, and silhouette across every frame.
IMPORTANT: The sprite animation itself must contain NO VFX unless explicitly stated. Do NOT add glowing energy trails, water splashes, slime particles, slash effects, or magic aura. The separate VFX files will be composited later.

## Canvas Rules

- 4-frame animations: Canvas 2048x512 px (4 equal frames of 512x512 px each). Solid magenta (#FF00FF) background.
- 1-frame animations (jump, doublejump): Canvas 512x512 px (single frame). Solid magenta (#FF00FF) background.
- Keep the entire character inside each frame.
- Maintain consistent head height, shoulder width, body scale, sword scale, and foot position across frames whenever physically possible.
- The katana must remain a clearly separate physical object from the VFX.

## LIST OF 15 ANIMATIONS

### 0. idle.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru.
Animation: Relaxed but combat-ready idle loop. CRITICAL: The 4 frames must clearly show breathing and slight shifting. The jacket and straps must visibly sway/shift between frames, do not output identical static frames.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Base): Ramuru stands in a relaxed, agile stance. One hand rests on the hip or hangs loose, the other loosely grips the katana pointed diagonally downward.
Frame 2 (Breathing): Chest rises slightly. Hanging cyan straps and oversized jacket sway just a tiny bit.
Frame 3 (Weight Shift): Shifts weight slightly. Head tilts slightly.
Frame 4 (Return): Returns to the original relaxed stance.
NO VFX. Pure physical idle animation.

### 1. walk.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru walking.
Animation: Smooth, confident walk cycle. CRITICAL: The 4 frames MUST show a clear, distinct progression of the walk cycle. Frame 1, 2, 3, and 4 must have different leg positions and arm swings. DO NOT generate 4 identical poses. Every step must communicate agility.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Contact): Left leg steps forward smoothly. Katana held securely at the side.
Frame 2 (Down): Left foot planted. Jacket slightly reacts to the movement.
Frame 3 (Contact): Right leg steps forward.
Frame 4 (Down): Right foot planted.
NO VFX. Pure physical movement.

### 2. run.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru running.
Animation: Fast, ninja-like run (leaning forward slightly, aerodynamic). CRITICAL: The 4 frames MUST be distinctly different parts of the running motion.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Left leg extended far forward, body leaning forward. Katana held backwards trailing behind.
Frame 2: Both legs transition underneath the body. Jacket tails and cyan straps flapping back heavily in the wind.
Frame 3: Right leg extended far forward. Body remains aerodynamic.
Frame 4: Both legs transition underneath the body, preparing to loop.
NO VFX. Pure physical run.

### 3. jump.png — 1 frame
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a SINGLE-FRAME sprite for Ramuru jumping.
Canvas: 512x512 px. Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep the character completely inside the 512x512 px frame.
- Leave comfortable empty space around the character on all sides.
- Do not let the character, katana, or techwear touch the canvas edges.
- Keep the pose centered and clearly separated from the canvas boundaries.

Pose: Airborne, knees slightly tucked in an agile, light pose. Katana held ready across the body.
NO VFX.

### 4. doublejump.png — 1 frame
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a SINGLE-FRAME sprite for Ramuru performing a mid-air flip or second jump.
Canvas: 512x512 px. Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep the character completely inside the 512x512 px frame.
- Leave comfortable empty space around the character on all sides.
- Do not let the character, katana, or techwear touch the canvas edges.
- Keep the pose centered and clearly separated from the canvas boundaries.

Pose: Mid-air acrobatic spin or tucked pose, showing extreme agility. Jacket and straps flow naturally with the motion.
NO VFX.

### 5. attack1.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru's first basic attack (fast horizontal slash).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Anticipation): Windup. Katana pulled back to the right, body coiled.
Frame 2 (Swing): Fast horizontal slash across the front. Body extending into the strike.
Frame 3 (Impact Hold): Follow-through of the slash, body twisted slightly.
Frame 4 (Recovery): Swiftly returning to neutral stance.
ABSOLUTELY NO VFX (no water trails). Pure physical sword motion.

### 6. attack2.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru's second basic attack (downward slash).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Anticipation): Windup from the previous slash, raising katana high.
Frame 2 (Power Start): Powerful downward diagonal slash begins.
Frame 3 (Peak): Sword reaches the bottom, body lowered significantly into the stance.
Frame 4 (Recovery): Pulling the blade back up into recovery stance.
NO VFX. Pure physical sword motion.

### 7. attack3.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru's third basic attack (thrust finisher).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1 (Anticipation): Windup. Pulling the katana back near the waist for a thrust.
Frame 2 (Forward): Lunge forward, thrusting the katana straight ahead.
Frame 3 (Impact): Maximum extension of the thrust, leaning deeply into the attack, back leg straight.
Frame 4 (Recovery): Swiftly pulling the blade back to idle stance.
NO VFX. Pure physical sword motion.

### 8. crouch.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru crouching.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Standing in the relaxed idle stance.
Frame 2: Bending knees, starting to drop low.
Frame 3: Deep agile squat or kneeling on one knee, katana held defensively.
Frame 4: Holding the crouched position, maintaining balance.
NO VFX.

### 9. hurt.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru reacting to being hit.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Ramuru reels backward abruptly, head thrown back.
Frame 2: Upper body recoils further, losing footing slightly.
Frame 3: Stumbling backward, arms flailing slightly to keep balance.
Frame 4: Regaining balance, sliding into a low defensive posture.
NO VFX.

### 10. down.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru being knocked down.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Ramuru loses balance completely, knocked backward.
Frame 2: Falling down heavily toward the ground.
Frame 3: Hitting the ground, rolling slightly from the impact.
Frame 4: Laying on the ground in a defeated pose.
NO VFX.

### 11. recover.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru recovering from being knocked down.
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Ramuru lying on the ground, starting to push up.
Frame 2: Swiftly flipping or pushing up onto one knee.
Frame 3: Springing up lightly onto both feet.
Frame 4: Fully recovered and back in the agile combat stance.
NO VFX.

### 12. skill1.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru activating Skill 1 (Hydro-Shift Dash).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Ramuru crouches extremely low, preparing to dash.
Frame 2: Almost entirely flattened out, leaning impossibly far forward (simulating turning into a puddle/slime).
Frame 3: Reforming out of the dash into a sudden spinning horizontal slash.
Frame 4: Ending pose, katana extended outward.
ABSOLUTELY NO VFX (water effects will be added later).

### 13. skill2.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru activating Skill 2 (Predator's Grasp).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Raises katana in a reverse-grip.
Frame 2: Slams the katana straight down into the ground.
Frame 3: Holding the katana firmly in the ground, looking up with a sharp expression.
Frame 4: Pulling the katana out and returning to stance.
ABSOLUTELY NO VFX.

### 14. ultimate.png — 4 frames
[IKUTIN ATURAN sprite-consistency-prompt.md]
Generate a 4-frame horizontal sprite strip for Ramuru activating Ultimate (Aqua Cleaver).
Canvas: 2048x512 px (4 frames of 512x512 px). Magenta (#FF00FF) background.

Frame Spacing / Separation:
- Keep each character completely inside its assigned 512x512 px frame.
- Leave a clearly visible empty magenta gutter between adjacent frames.
- Do not let any part of the character, katana, or techwear cross into the neighboring frame.
- Maintain a comfortable empty margin on the left and right sides of every frame; frames must never look crowded, touching, overlapping, or merged together.
- Keep the character centered within each frame as much as the pose allows.
- The empty space between frames is part of the sprite layout and must remain clean, solid magenta (#FF00FF).

Frame 1: Stands tall, raising the katana high above the head with both hands.
Frame 2: Arching back, preparing for a massive strike.
Frame 3: Swings the katana down with full body weight in a devastating vertical chop.
Frame 4: Katana embedded in the ground or swung all the way down, body crouched heavily from the impact.
ABSOLUTELY NO VFX (no massive water sword or splash).

## Animation Consistency Rules

- Ramuru’s katana is sleek and simple, keep it physically consistent in size, proportions, and shape.
- Ramuru is extremely agile and flexible; their poses should feel dynamic and fluid.
- Preserve the same oversized tech jacket, cropped baggy pants, chunky sneakers, and cyan straps across all frames.
- Maintain the light blue/cyan hair and golden eyes.
- Keep the white/dark blue/cyan/teal visual identity consistent.
- Do not add random accessories or change the outfit between frames.
- Do not add volleyballs or sports equipment. Ramuru is a battle character.
- The sprite frames contain the character’s physical motion only. All attack VFX are generated separately using ramuru-vfx-prompts.md.
