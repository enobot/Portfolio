import { useEffect, useRef, useState } from "react";
import "./LoadingScreen.css";

const PETAL_TONES = [
  ["#ffe6ef", "#f7a9c4"],
  ["#fff0f5", "#f4b8cd"],
  ["#ffdbe8", "#ee97b6"],
  ["#fff6f0", "#f5c3d2"],
];

// Petals are pushed away from the pointer inside this radius (CSS px).
const DODGE_RADIUS = 140;
const DODGE_FORCE = 1700;

function petalPath(ctx, size) {
  const w = size * 0.62;
  const h = size;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.bezierCurveTo(-w * 0.95, h * 0.22, -w * 0.78, -h * 0.42, -w * 0.2, -h / 2);
  ctx.lineTo(0, -h * 0.36);
  ctx.lineTo(w * 0.2, -h / 2);
  ctx.bezierCurveTo(w * 0.78, -h * 0.42, w * 0.95, h * 0.22, 0, h / 2);
  ctx.closePath();
}

function sprite(size, paint) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.translate(size / 2, size / 2);
  paint(ctx);
  return canvas;
}

// Each petal colour and the five-petal blossom are drawn once, then stamped
// every frame, so the animation stays cheap.
function makeSprites(ratio) {
  const size = Math.round(48 * ratio);
  const petals = PETAL_TONES.map(([tip, base]) =>
    sprite(size, (ctx) => {
      const fill = ctx.createLinearGradient(0, size * 0.42, 0, -size * 0.42);
      fill.addColorStop(0, base);
      fill.addColorStop(1, tip);
      petalPath(ctx, size * 0.84);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = "rgba(214, 112, 150, 0.35)";
      ctx.lineWidth = ratio;
      ctx.beginPath();
      ctx.moveTo(0, size * 0.36);
      ctx.lineTo(0, -size * 0.12);
      ctx.stroke();
    }),
  );

  const bloomSize = Math.round(64 * ratio);
  const bloom = sprite(bloomSize, (ctx) => {
    for (let index = 0; index < 5; index += 1) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * index) / 5);
      ctx.translate(0, -bloomSize * 0.2);
      const fill = ctx.createLinearGradient(0, bloomSize * 0.2, 0, -bloomSize * 0.2);
      fill.addColorStop(0, "#f39dbd");
      fill.addColorStop(1, "#fff1f6");
      petalPath(ctx, bloomSize * 0.42);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#f6d27a";
    ctx.beginPath();
    ctx.arc(0, 0, bloomSize * 0.07, 0, Math.PI * 2);
    ctx.fill();
  });

  return { petals, bloom };
}

// anywhere: scatter over the whole screen (first frame); otherwise start just
// above the top, a little to the left since the breeze carries them right.
function makePetal(width, height, anywhere) {
  const depth = 0.55 + Math.random() * 0.45;
  const turn = (Math.random() - 0.5) * 2.2;
  const bloom = Math.random() < 0.12;
  return {
    x: anywhere ? Math.random() * width : Math.random() * (width + 120) - 120,
    y: anywhere ? Math.random() * height : -40 - Math.random() * height * 0.3,
    vx: 0,
    vy: 0,
    depth,
    fall: (34 + Math.random() * 40) * depth,
    sway: 18 + Math.random() * 30,
    swaySpeed: 0.6 + Math.random() * 1.1,
    phase: Math.random() * Math.PI * 2,
    angle: Math.random() * Math.PI * 2,
    turn,
    spin: turn,
    flip: Math.random() * Math.PI * 2,
    flipSpeed: 1.4 + Math.random() * 2.4,
    size: (22 + Math.random() * 18) * depth * (bloom ? 1.45 : 1),
    tone: Math.floor(Math.random() * PETAL_TONES.length),
    bloom,
  };
}

export default function LoadingScreen({ onDone }) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const canvasRef = useRef(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduce ? 900 : 4300;
    const fade = reduce ? 180 : 700;
    const leaveTimer = setTimeout(() => setLeaving(true), hold);
    const doneTimer = setTimeout(() => onDoneRef.current(), hold + fade);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const sprites = makeSprites(ratio);
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let petals = [];
    let frame = 0;
    let last = performance.now();

    function draw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const petal of petals) {
        const image = petal.bloom ? sprites.bloom : sprites.petals[petal.tone];
        const size = petal.size;
        ctx.setTransform(ratio, 0, 0, ratio, petal.x * ratio, petal.y * ratio);
        ctx.rotate(petal.angle);
        // Tumbling: the petal turns edge-on and back as it falls.
        ctx.scale(1, 0.25 + 0.75 * Math.abs(Math.cos(petal.flip)));
        ctx.globalAlpha = 0.55 + petal.depth * 0.45;
        ctx.drawImage(image, -size / 2, -size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    }

    function fit() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      const count = Math.round(Math.min(110, Math.max(36, (width * height) / 16000)));
      while (petals.length < count) petals.push(makePetal(width, height, true));
      petals.length = count;
      draw();
    }

    function step(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = now / 1000;
      const breeze = 14 + Math.sin(time * 0.35) * 16;
      const settle = Math.min(1, dt * 1.6);
      for (const petal of petals) {
        const dx = petal.x - pointer.x;
        const dy = petal.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < DODGE_RADIUS && distance > 0.01) {
          const push = (1 - distance / DODGE_RADIUS) * DODGE_FORCE * dt;
          petal.vx += (dx / distance) * push;
          petal.vy += (dy / distance) * push;
          petal.spin += (Math.random() - 0.5) * push * 0.05;
        }
        // Ease back to drifting with the breeze.
        petal.vx -= petal.vx * settle;
        petal.vy -= petal.vy * settle;
        petal.spin += (petal.turn - petal.spin) * settle;
        petal.x += (petal.vx + breeze * petal.depth + Math.sin(time * petal.swaySpeed + petal.phase) * petal.sway) * dt;
        petal.y += (petal.vy + petal.fall) * dt;
        petal.angle += petal.spin * dt;
        petal.flip += petal.flipSpeed * dt;
        if (petal.y > height + 40 || petal.x > width + 60 || petal.x < -160) {
          Object.assign(petal, makePetal(width, height, false));
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function onMove(event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function onLeave(event) {
      if (event?.pointerType === "mouse") return;
      pointer.x = -9999;
      pointer.y = -9999;
    }

    fit();
    if (!reduce) frame = requestAnimationFrame(step);
    window.addEventListener("resize", fit);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onMove);
    window.addEventListener("pointerup", onLeave);
    window.addEventListener("pointercancel", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", fit);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerup", onLeave);
      window.removeEventListener("pointercancel", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={leaving ? "welcome welcome-leave" : "welcome"} role="status" aria-live="polite">
      <canvas className="welcome-petals" ref={canvasRef} aria-hidden="true" />
      <div className="welcome-copy">
        <p className="welcome-title">
          WELCOME TO MY
          <br />
          INTERACTIVE RESUME
        </p>
      </div>
    </div>
  );
}
