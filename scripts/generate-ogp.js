const fs = require('fs')
const path = require('path')

// SVG content for OGP image (1300x400)
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1300" height="400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>

    <!-- Shadow filter -->
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
      <feOffset dx="0" dy="3" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.4"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Text background -->
    <filter id="textBg">
      <feFlood flood-color="rgba(0,0,0,0.3)"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1300" height="400" fill="url(#bgGradient)"/>

  <!-- Decorative pattern with darker colors -->
  <g opacity="0.15">
    <circle cx="120" cy="120" r="80" fill="#4a5bb5"/>
    <circle cx="1180" cy="280" r="100" fill="#5a3d7a"/>
    <circle cx="250" cy="320" r="60" fill="#5568c7"/>
    <circle cx="1050" cy="80" r="70" fill="#6e4d96"/>
  </g>

  <!-- Left section: Image frames -->
  <g filter="url(#shadow)">
    <!-- Left image frame -->
    <rect x="80" y="80" width="160" height="200" rx="8" fill="white" opacity="0.98"/>
    <rect x="90" y="90" width="140" height="140" rx="4" fill="#E8EAF6"/>
    <circle cx="160" cy="140" r="24" fill="#9FA8DA"/>
    <path d="M 142 155 L 160 173 L 178 155" stroke="#7986CB" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect x="100" y="240" width="120" height="10" rx="5" fill="#C5CAE9"/>
    <rect x="100" y="258" width="90" height="8" rx="4" fill="#E8EAF6"/>

    <!-- Right image frame -->
    <rect x="260" y="80" width="160" height="200" rx="8" fill="white" opacity="0.98"/>
    <rect x="270" y="90" width="140" height="140" rx="4" fill="#E1F5FE"/>
    <circle cx="340" cy="140" r="24" fill="#81D4FA"/>
    <path d="M 322 155 L 340 173 L 358 155" stroke="#4FC3F7" stroke-width="4" fill="none" stroke-linecap="round"/>
    <rect x="280" y="240" width="120" height="10" rx="5" fill="#B3E5FC"/>
    <rect x="280" y="258" width="90" height="8" rx="4" fill="#E1F5FE"/>

    <!-- Comparison arrows -->
    <g opacity="0.9">
      <path d="M 232 180 L 248 180 M 242 174 L 248 180 L 242 186" stroke="white" stroke-width="4" fill="none" stroke-linecap="round"/>
    </g>
  </g>

  <!-- Center section: Title with semi-transparent background -->
  <g>
    <!-- Text background box -->
    <rect x="480" y="110" width="740" height="180" rx="12" fill="rgba(0,0,0,0.25)" filter="url(#shadow)"/>

    <!-- Main title -->
    <text x="850" y="180" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">
      Digital Archive Tools
    </text>

    <!-- Subtitle -->
    <text x="850" y="230" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" opacity="0.95">
      IIIF Image Comparison &amp; Download
    </text>

    <!-- Footer -->
    <text x="850" y="270" font-family="Arial, sans-serif" font-size="22" fill="white" text-anchor="middle" opacity="0.85">
      Powered by Mirador 3 &amp; IIIF
    </text>
  </g>
</svg>`

// Write SVG file
const svgPath = path.join(__dirname, '..', 'static', 'img', 'ogp', 'home.svg')
fs.writeFileSync(svgPath, svgContent)
console.log('SVG file created:', svgPath)
console.log('\nTo convert to JPG, you can:')
console.log('1. Open the SVG in a browser and take a screenshot')
console.log('2. Use online tools like: https://svgtopng.com/')
console.log('3. Use ImageMagick: convert home.svg -quality 95 home.jpg')
console.log('4. Install sharp package and run: node scripts/svg-to-jpg.js')
