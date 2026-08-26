import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "public", "assets", "cards", "cool-bank-schema.webp");
const width = 760;
const height = 460;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="minor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#15120E" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
    <pattern id="major-grid" width="200" height="200" patternUnits="userSpaceOnUse">
      <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#15120E" stroke-opacity="0.085" stroke-width="1.5"/>
    </pattern>
  </defs>

  <rect width="760" height="460" fill="#EEE8D8"/>
  <rect width="760" height="460" fill="url(#minor-grid)"/>
  <rect width="760" height="460" fill="url(#major-grid)"/>
  <rect width="8" height="460" fill="#9A4D2E"/>

  <text x="48" y="62" font-family="Courier New, monospace" font-size="15" letter-spacing="3" fill="#5F5746">NO. 02</text>
  <text x="712" y="62" font-family="Courier New, monospace" font-size="15" letter-spacing="3" fill="#5F5746" text-anchor="end">PRINCIPAL</text>

  <text x="48" y="154" font-family="Georgia, serif" font-size="48" font-weight="700" fill="#15120E">Cool Bank / La Herse</text>
  <text x="48" y="198" font-family="Georgia, serif" font-size="18" font-weight="700" fill="#9A4D2E">Banque de classe · deux versions 3D · trois rôles</text>

  <g fill="#F6F1E2" stroke="#15120E" stroke-width="2">
    <rect x="84" y="232" width="230" height="64"/>
    <rect x="446" y="232" width="230" height="64"/>
    <rect x="192" y="322" width="376" height="58"/>
  </g>
  <rect x="84" y="232" width="6" height="64" fill="#3D6628"/>
  <rect x="446" y="232" width="6" height="64" fill="#B18B45"/>
  <rect x="192" y="322" width="6" height="58" fill="#536E91"/>

  <text x="199" y="270" font-family="Courier New, monospace" font-size="18" font-weight="700" fill="#15120E" text-anchor="middle">V2 · 3D LOCALE</text>
  <text x="561" y="270" font-family="Courier New, monospace" font-size="18" font-weight="700" fill="#15120E" text-anchor="middle">V3 · 3D SÉPARÉE</text>

  <path d="M 199 296 V 308 H 330 V 322" fill="none" stroke="#5F5746" stroke-width="2"/>
  <path d="M 561 296 V 308 H 430 V 322" fill="none" stroke="#5F5746" stroke-width="2"/>
  <circle cx="330" cy="322" r="4" fill="#EEE8D8" stroke="#5F5746" stroke-width="2"/>
  <circle cx="430" cy="322" r="4" fill="#EEE8D8" stroke="#5F5746" stroke-width="2"/>

  <text x="380" y="348" font-family="Courier New, monospace" font-size="15" font-weight="700" fill="#15120E" text-anchor="middle">ÉLÈVE · BANQUIER · ENSEIGNANTE</text>
  <text x="380" y="369" font-family="Courier New, monospace" font-size="11" fill="#5F5746" text-anchor="middle">EDUCOOL RESTE L'OUTIL DE PILOTAGE SÉPARÉ</text>

  <line x1="48" y1="428" x2="712" y2="428" stroke="#15120E" stroke-width="1.5"/>
  <text x="48" y="449" font-family="Courier New, monospace" font-size="11" letter-spacing="3" fill="#5F5746">ARCHIVE · JONASSUHARD.COM</text>
</svg>`;

await mkdir(dirname(output), { recursive: true });
await sharp(Buffer.from(svg))
  .webp({ quality: 84, effort: 6 })
  .toFile(output);

console.log(`cool-bank-schema.webp (${width}x${height})`);
