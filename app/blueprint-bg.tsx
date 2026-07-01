function polarPoint(radius: number, angleDeg: number) {
  const angle = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: Number((Math.cos(angle) * radius).toFixed(2)),
    y: Number((Math.sin(angle) * radius).toFixed(2))
  };
}

function gearPath(teeth: number, rootRadius: number, toothRadius: number) {
  const points = Array.from({ length: teeth * 2 }, (_, index) => {
    const radius = index % 2 === 0 ? toothRadius : rootRadius;
    const angle = (index / (teeth * 2)) * 360;
    return polarPoint(radius, angle);
  });

  return `${points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ")} Z`;
}

function radialLine(innerRadius: number, outerRadius: number, angleDeg: number) {
  const inner = polarPoint(innerRadius, angleDeg);
  const outer = polarPoint(outerRadius, angleDeg);
  return { inner, outer };
}

const gaugeTicks = Array.from({ length: 49 }, (_, index) => {
  const angle = -122 + index * 5;
  const major = index % 4 === 0;
  return {
    angle,
    major,
    line: radialLine(major ? 222 : 236, 252, angle)
  };
});

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
        <g opacity=".9" stroke="rgba(21,18,14,.12)" transform="translate(-24 -14) rotate(-13)">
          <use href="#bp-gear-large" />
          <circle r="112" />
          <circle r="63" />
          <circle r="22" />
          <line x1="-96" x2="96" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-96" y2="96" />
          <line x1="-68" x2="68" y1="-68" y2="68" />
          <line x1="-68" x2="68" y1="68" y2="-68" />
        </g>

        <g
          className="blueprint-bg__mobile-muted"
          opacity=".85"
          stroke="rgba(21,18,14,.11)"
          transform="translate(1338 930) rotate(18)"
        >
          <use href="#bp-gear-medium" />
          <circle r="77" />
          <circle r="36" />
          <circle r="12" />
          <line x1="-68" x2="68" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-68" y2="68" />
          <line x1="-48" x2="48" y1="-48" y2="48" />
          <line x1="-48" x2="48" y1="48" y2="-48" />
        </g>

        <g opacity=".7" stroke="rgba(21,18,14,.1)" transform="translate(1300 120) rotate(8)">
          <use href="#bp-gear-small" />
          <circle r="45" />
          <circle r="18" />
          <line x1="-39" x2="39" y1="0" y2="0" />
          <line x1="0" x2="0" y1="-39" y2="39" />
        </g>

        <g
          className="blueprint-bg__mobile-muted"
          opacity=".8"
          stroke="rgba(21,18,14,.11)"
          transform="translate(1038 342)"
        >
          <path d="M -216 132 A 254 254 0 1 1 216 132" />
          <path d="M -170 102 A 202 202 0 1 1 170 102" opacity=".72" />
          <path d="M -92 48 A 112 112 0 1 1 92 48" opacity=".5" />
          <line opacity=".5" x1="-284" x2="284" y1="0" y2="0" />
          <line opacity=".5" x1="0" x2="0" y1="-284" y2="184" />
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
        </g>

        <g
          className="blueprint-bg__mobile-muted"
          opacity=".7"
          stroke="rgba(21,18,14,.1)"
          strokeDasharray="8 11"
        >
          <line x1="92" x2="478" y1="736" y2="736" />
          <line x1="224" x2="224" y1="624" y2="922" />
          <line x1="780" x2="1228" y1="176" y2="176" />
          <line x1="1178" x2="1178" y1="92" y2="704" />
          <path d="M 774 762 L 1268 502" />
        </g>

        <g className="blueprint-bg__mobile-muted" opacity=".78" stroke="rgba(21,18,14,.11)">
          <rect height="198" opacity=".62" width="352" x="112" y="704" />
          <path d="M 112 752 H 162 M 112 804 H 142 M 112 856 H 178" opacity=".5" />
          <path d="M 408 704 V 754 M 358 704 V 734 M 308 704 V 770" opacity=".5" />
          <path d="M 696 162 H 780 V 246 Z" fill="rgba(21,18,14,.02)" opacity=".72" />
          <path d="M 715 181 H 752 V 218" opacity=".6" />
          <path d="M 1224 728 H 1294 V 798 H 1224 Z" fill="rgba(21,18,14,.018)" opacity=".62" />
          <path d="M 1244 780 L 1280 744 M 1244 744 H 1280 V 780" opacity=".56" />
          <path d="M 560 896 L 622 896 L 560 834 Z" fill="rgba(21,18,14,.018)" opacity=".54" />
        </g>
      </g>
    </svg>
  );
}
