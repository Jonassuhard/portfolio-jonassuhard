function polarPoint(radius: number, angleDeg: number) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Number((Math.cos(angle) * radius).toFixed(2)),
    y: Number((Math.sin(angle) * radius).toFixed(2))
  };
}

// Denture carrée (créneaux) : flanc radial, sommet en arc, flanc radial, creux en arc.
function gearPath(teeth: number, rootRadius: number, toothRadius: number) {
  const step = 360 / teeth;
  const topWidth = step * 0.45;
  const start = polarPoint(rootRadius, 0);
  const segments = Array.from({ length: teeth }, (_, index) => {
    const a0 = index * step;
    const a1 = a0 + topWidth;
    const a2 = a0 + step;
    const flankOut = polarPoint(toothRadius, a0);
    const topEnd = polarPoint(toothRadius, a1);
    const flankIn = polarPoint(rootRadius, a1);
    const rootEnd = polarPoint(rootRadius, a2);
    return [
      `L${flankOut.x} ${flankOut.y}`,
      `A${toothRadius} ${toothRadius} 0 0 1 ${topEnd.x} ${topEnd.y}`,
      `L${flankIn.x} ${flankIn.y}`,
      `A${rootRadius} ${rootRadius} 0 0 1 ${rootEnd.x} ${rootEnd.y}`
    ].join(" ");
  });

  return `M${start.x} ${start.y} ${segments.join(" ")} Z`;
}

function radialLine(innerRadius: number, outerRadius: number, angleDeg: number) {
  const inner = polarPoint(innerRadius, angleDeg);
  const outer = polarPoint(outerRadius, angleDeg);
  return { inner, outer };
}

// Divergence meter : cadran -120°/+120°, tick majeur toutes les 30°.
const gaugeTicks = Array.from({ length: 41 }, (_, index) => {
  const angle = -120 + index * 6;
  const major = index % 5 === 0;
  return {
    angle,
    major,
    line: radialLine(major ? 96 : 104, 118, angle)
  };
});

const needleTip = polarPoint(98, 48);
const needleTail = polarPoint(20, 228);

export default function BlueprintBg() {
  return (
    <svg
      aria-hidden="true"
      className="blueprint-bg"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 1024"
    >
      <defs>
        <path id="bp-gear-large" d={gearPath(36, 124, 144)} />
        <path id="bp-gear-medium" d={gearPath(28, 92, 110)} />
        <path id="bp-gear-small" d={gearPath(22, 58, 70)} />
      </defs>

      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2">
        {/* Axes de construction (trait-point) + repère centre : la "feuille" du plan */}
        <g opacity=".5" stroke="rgba(21,18,14,.1)" strokeDasharray="26 7 5 7" strokeWidth="1">
          <line x1="130" x2="1310" y1="512" y2="512" />
          <line x1="720" x2="720" y1="116" y2="936" />
        </g>
        <g opacity=".55" stroke="rgba(21,18,14,.1)" strokeWidth="1">
          <circle cx="720" cy="512" r="5" />
          <line x1="704" x2="736" y1="512" y2="512" />
          <line x1="720" x2="720" y1="496" y2="528" />
        </g>

        {/* Repères de coin (cadre de planche) */}
        <g className="blueprint-bg__mobile-muted" opacity=".6" stroke="rgba(21,18,14,.1)" strokeWidth="1">
          <path d="M 100 126 V 100 H 126" />
          <path d="M 1314 100 H 1340 V 126" />
          <path d="M 100 898 V 924 H 126" />
          <path d="M 1314 924 H 1340 V 898" />
        </g>

        {/* Worldline : ligne d'événements qui bifurque (visible mobile) */}
        <g opacity=".8" stroke="rgba(21,18,14,.11)">
          <line x1="500" x2="930" y1="190" y2="190" />
          <path d="M 628 190 L 930 132" />
          <line x1="560" x2="560" y1="185" y2="195" />
          <line x1="700" x2="700" y1="185" y2="195" />
          <line x1="772" x2="772" y1="185" y2="195" />
          <line x1="844" x2="844" y1="185" y2="195" />
          <circle cx="500" cy="190" r="4.5" />
          <circle cx="628" cy="190" r="4.5" />
          <circle cx="930" cy="190" r="4.5" />
          <circle cx="930" cy="132" r="4.5" />
          <circle cx="930" cy="132" r="9" opacity=".6" />
        </g>

        {/* Divergence meter : remontée haut-droite, hors de la carte hero */}
        <g
          className="blueprint-bg__mobile-muted"
          opacity=".85"
          stroke="rgba(21,18,14,.11)"
          transform="translate(1150 218)"
        >
          <path d="M -105.66 61 A 122 122 0 1 1 105.66 61" />
          <path d="M -72.75 42 A 84 84 0 1 1 72.75 42" opacity=".6" />
          {gaugeTicks.map((tick) => (
            <line
              key={tick.angle}
              opacity={tick.major ? ".92" : ".55"}
              strokeWidth={tick.major ? "1.4" : ".9"}
              x1={tick.line.inner.x}
              x2={tick.line.outer.x}
              y1={tick.line.inner.y}
              y2={tick.line.outer.y}
            />
          ))}
          <line x1={needleTail.x} x2={needleTip.x} y1={needleTail.y} y2={needleTip.y} strokeWidth="1.4" />
          <circle r="7" />
          <circle r="2.5" opacity=".7" />
        </g>

        {/* Train d'engrenages : trois roues qui s'engrènent, bas-gauche */}
        <g
          className="blueprint-bg__mobile-muted"
          opacity=".9"
          stroke="rgba(21,18,14,.12)"
          transform="translate(270 795) rotate(-4)"
        >
          <use href="#bp-gear-large" />
          <circle r="112" />
          <circle r="63" />
          <circle r="22" />
          <circle r="134" opacity=".45" strokeDasharray="5 9" strokeWidth=".9" />
          <line x1="-96" x2="96" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-96" y2="96" />
          <line x1="-68" x2="68" y1="-68" y2="68" />
          <line x1="-68" x2="68" y1="68" y2="-68" />
        </g>
        <g opacity=".88" stroke="rgba(21,18,14,.115)" transform="translate(473 672) rotate(7)">
          <use href="#bp-gear-medium" />
          <circle r="77" />
          <circle r="36" />
          <circle r="12" />
          <circle r="101" opacity=".45" strokeDasharray="5 9" strokeWidth=".9" />
          <line x1="-68" x2="68" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-68" y2="68" />
        </g>
        <g opacity=".85" stroke="rgba(21,18,14,.11)" transform="translate(608 767) rotate(12)">
          <use href="#bp-gear-small" />
          <circle r="45" />
          <circle r="18" />
          <circle r="64" opacity=".45" strokeDasharray="5 9" strokeWidth=".9" />
          <line x1="-39" x2="39" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-39" y2="39" />
        </g>

        {/* Cote Ø de la grande roue (lignes d'attache + flèches) */}
        <g className="blueprint-bg__mobile-muted" opacity=".55" stroke="rgba(21,18,14,.1)" strokeWidth="1">
          <line x1="258" x2="138" y1="661" y2="661" />
          <line x1="258" x2="138" y1="929" y2="929" />
          <line x1="148" x2="148" y1="661" y2="929" />
          <path d="M 143 673 L 148 661 L 153 673" />
          <path d="M 143 917 L 148 929 L 153 917" />
        </g>

        {/* Ligne de rappel rayon (roue moyenne, visible mobile) */}
        <g opacity=".55" stroke="rgba(21,18,14,.1)" strokeWidth="1">
          <path d="M 527 594 L 570 552 H 612" />
          <circle cx="527" cy="594" r="2.5" />
        </g>

        {/* Cercle de détail : denture agrandie + ligne de rappel vers la grande roue */}
        <g className="blueprint-bg__mobile-muted" opacity=".7" stroke="rgba(21,18,14,.1)">
          <circle cx="400" cy="235" r="56" />
          <path d="M 356 258 H 368 V 238 H 382 V 258 H 396 V 238 H 410 V 258 H 424 V 238 H 438" strokeWidth="1" />
          <path d="M 356 270 A 96 96 0 0 1 444 258" opacity=".6" strokeWidth="1" />
          <path d="M 392 289 L 306 640" opacity=".7" strokeDasharray="6 8" strokeWidth="1" />
          <circle cx="306" cy="640" r="3" opacity=".7" />
        </g>

        {/* Cartouche de plan, bas-droite */}
        <g className="blueprint-bg__mobile-muted" opacity=".7" stroke="rgba(21,18,14,.11)">
          <rect height="108" width="192" x="1160" y="790" />
          <line x1="1160" x2="1352" y1="820" y2="820" />
          <line x1="1160" x2="1352" y1="856" y2="856" />
          <line x1="1258" x2="1258" y1="790" y2="856" />
          <path d="M 1172 805 H 1230 M 1268 805 H 1330" opacity=".6" strokeWidth="1" />
          <path d="M 1172 838 H 1214 M 1268 838 H 1312" opacity=".6" strokeWidth="1" />
          <path d="M 1172 877 H 1246" opacity=".6" strokeWidth="1" />
        </g>
      </g>
    </svg>
  );
}
