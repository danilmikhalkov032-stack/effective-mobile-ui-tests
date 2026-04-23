export function makeIllustration(title, subtitle, colorA = '#7C3AED', colorB = '#312E81', icon = '◆') {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="480" viewBox="0 0 800 480">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="100%" stop-color="${colorB}" />
        </linearGradient>
      </defs>
      <rect width="800" height="480" rx="32" fill="url(#g)"/>
      <circle cx="660" cy="110" r="90" fill="rgba(255,255,255,0.08)"/>
      <circle cx="120" cy="380" r="120" fill="rgba(255,255,255,0.06)"/>
      <text x="64" y="140" font-size="80" font-family="Arial, sans-serif" fill="white" opacity="0.95">${icon}</text>
      <text x="64" y="250" font-size="52" font-family="Arial, sans-serif" font-weight="700" fill="white">${title}</text>
      <text x="64" y="302" font-size="28" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.8)">${subtitle}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
