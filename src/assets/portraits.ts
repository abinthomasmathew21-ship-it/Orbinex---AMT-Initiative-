/**
 * Curated high-fidelity black & white editorial portrait assets
 * Matching Founder & CEO Abin Mathew Thomas and Co-Founder Anjana Koshal
 */

// Abin Mathew Thomas - Founder & CEO
// Crisp monochrome editorial portrait with modern glasses and striped shirt
export const PORTRAIT_ABIN = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141416" />
      <stop offset="60%" stop-color="#0c0d0e" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <radialGradient id="rimLight" cx="0.5" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="#2a2d32" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0c0d0e" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d4c9be" />
      <stop offset="100%" stop-color="#a89a8c" />
    </linearGradient>
    <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f5f5f5" />
      <stop offset="100%" stop-color="#d0d0d0" />
    </linearGradient>
  </defs>
  <rect width="400" height="480" fill="url(#bgGrad)" />
  <circle cx="200" cy="180" r="160" fill="url(#rimLight)" />
  
  <!-- Subtle technical grid marks -->
  <path d="M40 40h20M40 40v20M360 40h-20M360 40v20M40 440h20M40 440v-20M360 440h-20M360 440v-20" stroke="#333" stroke-width="1.5" />
  <text x="200" y="32" fill="#555" font-family="monospace" font-size="10" text-anchor="middle" letter-spacing="2">ORBINEX // FOUNDER ID: AMT-01</text>

  <!-- Torso & Arms Crossed (Striped Shirt) -->
  <path d="M90 480 L110 330 Q140 310 200 310 Q260 310 290 330 L310 480 Z" fill="url(#shirt)" />
  <!-- Vertical Stripes on Shirt -->
  <g stroke="#777" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.6">
    <line x1="125" y1="330" x2="115" y2="480" />
    <line x1="145" y1="320" x2="135" y2="480" />
    <line x1="165" y1="315" x2="160" y2="480" />
    <line x1="185" y1="312" x2="185" y2="480" />
    <line x1="205" y1="312" x2="205" y2="480" />
    <line x1="225" y1="315" x2="230" y2="480" />
    <line x1="245" y1="320" x2="255" y2="480" />
    <line x1="265" y1="330" x2="275" y2="480" />
  </g>
  <!-- Shirt Collar Open -->
  <path d="M165 310 L200 360 L235 310 Q200 325 165 310 Z" fill="#202020" />
  <path d="M150 310 L185 365 L170 370 L140 318 Z" fill="#e5e5e5" />
  <path d="M250 310 L215 365 L230 370 L260 318 Z" fill="#ffffff" />
  
  <!-- Arms Crossed Pose -->
  <path d="M120 400 Q150 430 200 425 Q250 420 280 390 L265 440 Q200 465 135 440 Z" fill="#c8c8c8" opacity="0.9" />
  <!-- Forearm & Wrist -->
  <path d="M160 415 Q200 410 240 415 L235 435 Q195 430 165 435 Z" fill="#bfae9e" />

  <!-- Neck -->
  <path d="M175 220 L175 315 Q200 325 225 315 L225 220 Z" fill="#9e8f82" />
  <path d="M182 230 L182 305 Q200 312 218 305 L218 230 Z" fill="#baa99a" />

  <!-- Head / Face -->
  <ellipse cx="200" cy="180" rx="62" ry="76" fill="url(#skin)" />
  <path d="M142 165 Q135 220 170 250 Q200 262 230 250 Q265 220 258 165 Z" fill="#ab9b8e" />

  <!-- Curly / Wavy Hair -->
  <path d="M136 170 Q130 105 165 85 Q200 70 235 85 Q270 105 264 170 Q255 125 200 120 Q145 125 136 170 Z" fill="#151515" />
  <path d="M145 110 Q160 75 200 75 Q240 75 255 110 Q235 90 200 90 Q165 90 145 110 Z" fill="#252525" />
  <!-- Hair curls texture -->
  <circle cx="160" cy="95" r="14" fill="#151515" />
  <circle cx="185" cy="85" r="16" fill="#1a1a1a" />
  <circle cx="215" cy="85" r="16" fill="#151515" />
  <circle cx="240" cy="95" r="14" fill="#1a1a1a" />
  <circle cx="145" cy="125" r="12" fill="#151515" />
  <circle cx="255" cy="125" r="12" fill="#151515" />

  <!-- Ears -->
  <ellipse cx="137" cy="185" rx="8" ry="16" fill="#ab9b8e" />
  <ellipse cx="263" cy="185" rx="8" ry="16" fill="#ab9b8e" />

  <!-- Eyebrows -->
  <path d="M160 155 Q175 150 188 156" stroke="#181818" stroke-width="3" stroke-linecap="round" fill="none" />
  <path d="M212 156 Q225 150 240 155" stroke="#181818" stroke-width="3" stroke-linecap="round" fill="none" />

  <!-- Eyes -->
  <ellipse cx="174" cy="168" rx="8" ry="5" fill="#f0f0f0" />
  <circle cx="174" cy="168" r="4" fill="#202020" />
  <circle cx="172" cy="166" r="1.2" fill="#ffffff" />
  <ellipse cx="226" cy="168" rx="8" ry="5" fill="#f0f0f0" />
  <circle cx="226" cy="168" r="4" fill="#202020" />
  <circle cx="224" cy="166" r="1.2" fill="#ffffff" />

  <!-- Modern Rectangular / Rounded Glasses -->
  <rect x="156" y="156" width="36" height="24" rx="6" fill="none" stroke="#222" stroke-width="2.5" />
  <rect x="208" y="156" width="36" height="24" rx="6" fill="none" stroke="#222" stroke-width="2.5" />
  <line x1="192" y1="165" x2="208" y2="165" stroke="#222" stroke-width="2.5" />
  <line x1="138" y1="164" x2="156" y2="166" stroke="#222" stroke-width="2" />
  <line x1="244" y1="166" x2="262" y2="164" stroke="#222" stroke-width="2" />
  <!-- Glass lens reflection -->
  <path d="M162 160 L180 160 L166 174 L162 174 Z" fill="#ffffff" opacity="0.25" />
  <path d="M214 160 L232 160 L218 174 L214 174 Z" fill="#ffffff" opacity="0.25" />

  <!-- Nose -->
  <path d="M200 165 L197 195 Q200 200 206 198" stroke="#8b7b6e" stroke-width="2" fill="none" stroke-linecap="round" />

  <!-- Mustache & Beard Shadow -->
  <path d="M188 208 Q200 212 212 208" stroke="#333" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7" />
  <path d="M188 220 Q200 224 212 220" stroke="#776" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4" />

  <!-- Mouth -->
  <path d="M188 214 Q200 217 212 214" stroke="#7a5550" stroke-width="2.2" stroke-linecap="round" fill="none" />

  <!-- Vignette / Border -->
  <rect x="1" y="1" width="398" height="478" fill="none" stroke="#282828" stroke-width="1" />
</svg>
`)}`;

// Anjana Koshal - Co-Founder
// Elegant monochrome editorial portrait with side profile gaze and textured knitted v-neck attire
export const PORTRAIT_ANJANA = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480" width="400" height="480">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#16181b" />
      <stop offset="60%" stop-color="#0e0f11" />
      <stop offset="100%" stop-color="#050505" />
    </linearGradient>
    <radialGradient id="rimLight2" cx="0.6" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="#2c3038" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0c0d0e" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="skin2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#dbcaba" />
      <stop offset="100%" stop-color="#ab9988" />
    </linearGradient>
    <linearGradient id="sweater" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8ede9" />
      <stop offset="100%" stop-color="#b0b8b2" />
    </linearGradient>
  </defs>
  <rect width="400" height="480" fill="url(#bgGrad2)" />
  <circle cx="220" cy="180" r="160" fill="url(#rimLight2)" />

  <!-- Subtle technical grid marks -->
  <path d="M40 40h20M40 40v20M360 40h-20M360 40v20M40 440h20M40 440v-20M360 440h-20M360 440v-20" stroke="#333" stroke-width="1.5" />
  <text x="200" y="32" fill="#555" font-family="monospace" font-size="10" text-anchor="middle" letter-spacing="2">ORBINEX // CO-FOUNDER ID: AMT-02</text>

  <!-- Torso & Arms Crossed (Ribbed Knit Sweater) -->
  <path d="M80 480 L115 340 Q150 320 210 320 Q270 320 305 340 L340 480 Z" fill="url(#sweater)" />
  <!-- Knit texture ribs -->
  <g stroke="#9aa39d" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.65">
    <line x1="120" y1="340" x2="100" y2="480" />
    <line x1="140" y1="330" x2="125" y2="480" />
    <line x1="165" y1="325" x2="155" y2="480" />
    <line x1="190" y1="322" x2="185" y2="480" />
    <line x1="215" y1="322" x2="215" y2="480" />
    <line x1="240" y1="325" x2="245" y2="480" />
    <line x1="265" y1="330" x2="275" y2="480" />
    <line x1="290" y1="340" x2="305" y2="480" />
  </g>
  <!-- Deep V-Neck Cut -->
  <path d="M165 320 L205 390 L245 320 Q205 330 165 320 Z" fill="url(#skin2)" />
  <!-- Button Detail on Sweater -->
  <circle cx="205" cy="405" r="7" fill="#443" stroke="#221" stroke-width="2" />
  <circle cx="205" cy="405" r="2" fill="#111" />

  <!-- Arms Folded Pose -->
  <path d="M105 410 Q145 440 205 435 Q265 430 305 395 L290 455 Q205 480 120 455 Z" fill="#9da8a0" opacity="0.9" />

  <!-- Neck & Collarbone -->
  <path d="M180 230 L180 330 Q205 340 230 330 L230 230 Z" fill="#a49382" />
  <path d="M188 240 L188 325 Q205 332 222 325 L222 240 Z" fill="#c4b3a2" />

  <!-- Head / Side-profile angle -->
  <ellipse cx="210" cy="180" rx="58" ry="72" fill="url(#skin2)" />
  <path d="M155 170 Q150 220 185 248 Q215 258 245 244 Q268 215 264 165 Z" fill="#b09f8f" />

  <!-- Long Hair Tied Back / Flowing Side Locks -->
  <!-- Dark black hair tied back -->
  <path d="M148 175 Q140 100 185 80 Q225 65 255 80 Q285 105 270 170 Q260 130 215 120 Q160 125 148 175 Z" fill="#121212" />
  <path d="M152 110 Q180 75 220 75 Q260 75 265 110 Q240 90 215 90 Q175 90 152 110 Z" fill="#202020" />
  <!-- Bun / Ponytail contour behind -->
  <path d="M142 165 Q130 200 135 240 Q145 260 155 240 Q150 190 148 165 Z" fill="#151515" />
  <!-- Tendril hair strand touching cheek -->
  <path d="M210 165 Q230 190 238 215" stroke="#121212" stroke-width="2.5" stroke-linecap="round" fill="none" />

  <!-- Earring stud -->
  <ellipse cx="152" cy="188" rx="7" ry="14" fill="#a89888" />
  <circle cx="154" cy="196" r="2.5" fill="#e5e5e5" />

  <!-- Eyebrows (Poised arched gaze looking slightly right) -->
  <path d="M178 152 Q192 146 205 152" stroke="#181818" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M225 152 Q240 147 254 153" stroke="#181818" stroke-width="2.5" stroke-linecap="round" fill="none" />

  <!-- Expressive Eyes (Gaze rightwards) -->
  <ellipse cx="192" cy="165" rx="7" ry="4.5" fill="#f0f0f0" />
  <circle cx="194" cy="165" r="3.5" fill="#1c1c1c" />
  <circle cx="193" cy="164" r="1" fill="#ffffff" />
  <ellipse cx="240" cy="165" rx="7" ry="4.5" fill="#f0f0f0" />
  <circle cx="243" cy="165" r="3.5" fill="#1c1c1c" />
  <circle cx="242" cy="164" r="1" fill="#ffffff" />

  <!-- Nose (Delicate side profile) -->
  <path d="M218 160 L220 188 Q223 194 228 191" stroke="#8b7b6e" stroke-width="2" fill="none" stroke-linecap="round" />

  <!-- Lips (Refined, quiet expression) -->
  <path d="M208 208 Q222 210 234 207" stroke="#684a44" stroke-width="2.5" stroke-linecap="round" fill="none" />

  <!-- Vignette / Border -->
  <rect x="1" y="1" width="398" height="478" fill="none" stroke="#282828" stroke-width="1" />
</svg>
`)}`;

// Space Hero Graphic (Scientific Earth and Satellite Orbit)
export const SPACE_HERO_GRAPHIC = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <radialGradient id="spaceGlow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#181b22" />
      <stop offset="80%" stop-color="#050608" />
      <stop offset="100%" stop-color="#000000" />
    </radialGradient>
    <radialGradient id="earthGlow" cx="0.4" cy="0.4" r="0.6">
      <stop offset="0%" stop-color="#e5e5e5" />
      <stop offset="40%" stop-color="#666666" />
      <stop offset="80%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#050505" />
    </radialGradient>
  </defs>
  <rect width="800" height="450" fill="url(#spaceGlow)" />
  
  <!-- Starfield points -->
  <g fill="#fff" opacity="0.6">
    <circle cx="50" cy="80" r="1" />
    <circle cx="120" cy="40" r="1.5" />
    <circle cx="220" cy="110" r="1" />
    <circle cx="340" cy="50" r="0.8" />
    <circle cx="680" cy="90" r="1.2" />
    <circle cx="750" cy="180" r="1" />
    <circle cx="620" cy="380" r="0.8" />
    <circle cx="180" cy="390" r="1.2" />
    <circle cx="80" cy="260" r="1" />
  </g>

  <!-- Orbital Rings -->
  <ellipse cx="400" cy="235" rx="320" ry="110" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="4 4" transform="rotate(-15 400 235)" />
  <ellipse cx="400" cy="235" rx="260" ry="90" fill="none" stroke="#555" stroke-width="1.2" transform="rotate(25 400 235)" />
  <ellipse cx="400" cy="235" rx="200" ry="70" fill="none" stroke="#222" stroke-width="1" />

  <!-- Planet Earth (High contrast monochrome) -->
  <circle cx="400" cy="235" r="110" fill="url(#earthGlow)" />
  <circle cx="400" cy="235" r="111" fill="none" stroke="#666" stroke-width="0.8" opacity="0.4" />

  <!-- Satellites on orbit -->
  <!-- ISS -->
  <g transform="translate(560, 160)">
    <rect x="-14" y="-3" width="28" height="6" fill="#fff" />
    <rect x="-2" y="-10" width="4" height="20" fill="#bbb" />
    <circle cx="0" cy="0" r="3" fill="#fff" />
    <text x="12" y="-6" fill="#fff" font-family="monospace" font-size="9" letter-spacing="1">ISS [NORAD 25544]</text>
  </g>

  <!-- Starlink / Research CubeSat -->
  <g transform="translate(230, 270)">
    <circle cx="0" cy="0" r="4" fill="#fff" />
    <line x1="-12" y1="0" x2="12" y2="0" stroke="#bbb" stroke-width="2" />
    <text x="-90" y="16" fill="#aaa" font-family="monospace" font-size="9">AMT CUBESAT-1</text>
  </g>
</svg>
`)}`;
