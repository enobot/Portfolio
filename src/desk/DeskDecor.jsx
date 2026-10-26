// A still-life piece that shares the desk with the clickable objects: a tiny
// cherry bonsai, drawn from overhead at real size (100 SVG units per inch) and
// lit from the upper left like everything else. It isn't interactive.

function seeded(seed) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function scatter(random, count, cx, cy, reach, make) {
  return Array.from({ length: count }, (_, index) => {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * reach;
    return make(cx + Math.cos(angle) * distance, cy + Math.sin(angle) * distance, index);
  });
}

// Cloud-shaped pads of blossom, the way a bonsai canopy is pruned.
const pads = [
  { x: 150, y: 170, r: 80 },
  { x: 310, y: 132, r: 86 },
  { x: 368, y: 272, r: 72 },
  { x: 206, y: 322, r: 68 },
  { x: 252, y: 226, r: 74 },
];

const PINKS = ["#f9c6d6", "#f6b4c9", "#fbd6e2", "#f2a3bd", "#f8bfd2"];

// Each pad is many small clusters in a few pinks, lighter on the side facing
// the window, with single flowers on top for texture and a few new leaves.
const bonsai = (() => {
  const random = seeded(23);
  return pads.map((pad) => ({
    ...pad,
    puffs: scatter(random, 70, pad.x, pad.y, pad.r * 0.86, (x, y) => ({
      x,
      y,
      r: 7 + random() * 9,
      fill: PINKS[Math.floor(random() * PINKS.length)],
    })),
    lights: scatter(random, 16, pad.x - pad.r * 0.28, pad.y - pad.r * 0.3, pad.r * 0.45, (x, y) => ({
      x,
      y,
      r: 4 + random() * 6,
    })),
    flowers: scatter(random, 22, pad.x, pad.y, pad.r * 0.85, (x, y) => ({
      x,
      y,
      r: 4 + random() * 2.5,
      turn: random() * 72,
    })),
    leaves: scatter(random, 4, pad.x, pad.y, pad.r * 0.95, (x, y) => ({
      x,
      y,
      turn: random() * 360,
    })),
  }));
})();

const twigs = [
  "M150 170 L104 128",
  "M150 170 L96 196",
  "M310 132 L352 84",
  "M310 132 L262 92",
  "M368 272 L420 296",
  "M368 272 L404 226",
  "M206 322 L170 364",
  "M206 322 L250 368",
];

const moss = (() => {
  const random = seeded(5);
  return Array.from({ length: 70 }, () => ({
    x: 112 + random() * 256,
    y: 158 + random() * 176,
    r: 2.5 + random() * 4,
    dark: random() > 0.5,
  }));
})();

const fallen = [
  { x: 40, y: 420, turn: 20 },
  { x: 92, y: 452, turn: 140 },
  { x: 432, y: 440, turn: 75 },
  { x: 462, y: 96, turn: 210 },
  { x: 30, y: 64, turn: 300 },
  { x: 372, y: 462, turn: 250 },
];

const petal = "M0 8 C-7 4 -6 -6 -1.6 -8 L0 -5.8 L1.6 -8 C6 -6 7 4 0 8Z";

// Petals that let go of the canopy and drift down onto the desk on a loop.
// x/y start inside a pad; dx/dy is where the breeze carries them.
const drifting = [
  { x: 150, y: 170, dx: 120, dy: 190, time: 9, delay: 0 },
  { x: 318, y: 120, dx: 150, dy: 120, time: 11, delay: -3 },
  { x: 372, y: 280, dx: 110, dy: 150, time: 8, delay: -6 },
  { x: 210, y: 330, dx: 60, dy: 150, time: 10, delay: -1.5 },
  { x: 262, y: 220, dx: 170, dy: 180, time: 12, delay: -8 },
  { x: 120, y: 210, dx: -60, dy: 200, time: 10, delay: -4.5 },
  { x: 340, y: 170, dx: 190, dy: 60, time: 9.5, delay: -7 },
];

function Blossom({ x, y, r, turn }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn}) scale(${r / 8})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <path key={angle} d={petal} transform={`rotate(${angle}) translate(0 -7)`} fill="#fff1f6" />
      ))}
      <circle r="3" fill="#e98aa9" />
      <circle r="1.2" fill="#f4c96a" />
    </g>
  );
}

function Bonsai() {
  return (
    <svg viewBox="0 0 480 480" role="presentation">
      <defs>
        <linearGradient id="decor-pot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f1f8" />
          <stop offset="55%" stopColor="#ddd3e8" />
          <stop offset="100%" stopColor="#bdb0cc" />
        </linearGradient>
        <filter id="decor-pad-shade" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="6" dy="8" stdDeviation="6" floodColor="#3a1f22" floodOpacity="0.34" />
        </filter>
      </defs>
      {fallen.map((spot, index) => (
        <path key={index} d={petal} transform={`translate(${spot.x} ${spot.y}) rotate(${spot.turn}) scale(1.4)`} fill="#f7bcd0" />
      ))}
      <rect x="90" y="136" width="300" height="220" rx="44" fill="url(#decor-pot)" />
      <rect x="104" y="150" width="272" height="192" rx="34" fill="#cfc3dc" />
      <rect x="112" y="158" width="256" height="176" rx="28" fill="#5f6f45" />
      {moss.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.dark ? "#4d5c37" : "#7b8d58"} />
      ))}
      <path d="M214 244 Q236 226 262 240 Q276 262 254 282 Q226 290 214 268Z" fill="#452d20" />
      <g className="bonsai-canopy">
      <g stroke="#4f3426" strokeLinecap="round" fill="none">
        <path d="M232 260 Q190 220 150 170" strokeWidth="16" />
        <path d="M240 250 Q280 170 310 132" strokeWidth="15" />
        <path d="M248 262 Q320 270 368 272" strokeWidth="13" />
        <path d="M236 270 Q220 300 206 322" strokeWidth="12" />
        {twigs.map((twig) => (
          <path key={twig} d={twig} strokeWidth="4" />
        ))}
      </g>
      {bonsai.map((pad, padIndex) => (
        <g
          key={padIndex}
          className="bonsai-pad"
          filter="url(#decor-pad-shade)"
          style={{ animationDelay: `${padIndex * -1.1}s`, animationDuration: `${4.6 + padIndex * 0.7}s` }}
        >
          {pad.puffs.map((puff, index) => (
            <circle key={index} cx={puff.x} cy={puff.y} r={puff.r} fill={puff.fill} />
          ))}
          {pad.lights.map((light, index) => (
            <circle key={index} cx={light.x} cy={light.y} r={light.r} fill="#fff0f5" opacity="0.75" />
          ))}
          {pad.leaves.map((leaf, index) => (
            <ellipse key={index} cx={leaf.x} cy={leaf.y} rx="7" ry="3.4" transform={`rotate(${leaf.turn} ${leaf.x} ${leaf.y})`} fill="#93b56f" />
          ))}
          {pad.flowers.map((flower, index) => (
            <Blossom key={index} {...flower} />
          ))}
        </g>
      ))}
      </g>
      {drifting.map((drift, index) => (
        <path
          key={index}
          className="bonsai-petal"
          d={petal}
          fill="#f9c3d5"
          style={{
            "--x": `${drift.x}px`,
            "--y": `${drift.y}px`,
            "--dx": `${drift.dx}px`,
            "--dy": `${drift.dy}px`,
            animationDuration: `${drift.time}s`,
            animationDelay: `${drift.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}

export default function DeskDecor() {
  return (
    <div className="decor decor-bonsai" aria-hidden="true">
      <Bonsai />
    </div>
  );
}
