import { useEffect, useMemo, useRef, useState } from "react";
import "./LoadingScreen.css";

const POMS = [
  {
    coat: "#f2a45a",
    dark: "#d4783a",
    light: "#ffe6c8",
    ear: "#c4622c",
    lane: "bottom",
    size: "200px",
    duration: "8s",
    delay: "-1.6s",
    flip: false,
  },
  {
    coat: "#fff6ee",
    dark: "#f0ddd0",
    light: "#ffffff",
    ear: "#f3d2c0",
    lane: "low",
    size: "146px",
    duration: "9s",
    delay: "-4.2s",
    flip: true,
  },
  {
    coat: "#6a5648",
    dark: "#4a3b32",
    light: "#f0c89a",
    ear: "#3a2e28",
    lane: "mid",
    size: "158px",
    duration: "10s",
    delay: "-6.4s",
    flip: false,
  },
  {
    coat: "#e8b07a",
    dark: "#c4844e",
    light: "#fff1de",
    ear: "#b56a38",
    lane: "high",
    size: "118px",
    duration: "11s",
    delay: "-2.4s",
    flip: true,
  },
  {
    coat: "#f6d7a8",
    dark: "#e0b07a",
    light: "#fff8ee",
    ear: "#d4925a",
    lane: "bottom-front",
    size: "128px",
    duration: "7.4s",
    delay: "-5.1s",
    flip: false,
  },
  {
    coat: "#f7c4d4",
    dark: "#e59ab4",
    light: "#fff0f5",
    ear: "#d984a4",
    lane: "upper",
    size: "136px",
    duration: "8.8s",
    delay: "-3.3s",
    flip: true,
  },
];

function Star({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 0l1.7 8.3L22 12l-8.3 1.7L12 22l-1.7-8.3L2 12l8.3-1.7z"
      />
    </svg>
  );
}

function Pomeranian({ coat, dark, light, ear }) {
  return (
    <svg className="pom" viewBox="0 0 240 160" aria-hidden="true">
      <ellipse className="pom-shadow" cx="118" cy="150" rx="54" ry="7" />
      <g className="pom-bob">
        <g className="pom-tail">
          <circle cx="46" cy="78" r="22" fill={coat} />
          <circle cx="32" cy="62" r="16" fill={dark} />
          <circle cx="50" cy="50" r="14" fill={coat} />
          <circle cx="38" cy="44" r="11" fill={light} />
        </g>
        <circle cx="78" cy="98" r="36" fill={coat} />
        <circle cx="98" cy="110" r="28" fill={dark} />
        <ellipse cx="114" cy="114" rx="34" ry="20" fill={light} />
        <circle cx="132" cy="92" r="38" fill={coat} />
        <circle cx="146" cy="84" r="26" fill={dark} />
        <g className="leg leg-a">
          <path d="M86 114h12v24a6 6 0 0 1-12 0z" fill={dark} />
          <ellipse cx="92" cy="142" rx="10" ry="5" fill={coat} />
        </g>
        <g className="leg leg-b">
          <path d="M106 116h11v22a5.5 5.5 0 0 1-11 0z" fill={coat} />
          <ellipse cx="111" cy="142" rx="9" ry="4.5" fill={dark} />
        </g>
        <g className="leg leg-c">
          <path d="M132 112h12v26a6 6 0 0 1-12 0z" fill={dark} />
          <ellipse cx="138" cy="142" rx="10" ry="5" fill={coat} />
        </g>
        <g className="leg leg-d">
          <path d="M152 114h12v24a6 6 0 0 1-12 0z" fill={coat} />
          <ellipse cx="158" cy="142" rx="10" ry="5" fill={light} />
        </g>
        <circle cx="176" cy="72" r="34" fill={coat} />
        <circle cx="166" cy="68" r="18" fill={dark} />
        <path d="M154 56 L146 26 L170 48 Z" fill={ear} />
        <path d="M184 50 L196 18 L208 54 Z" fill={ear} />
        <ellipse cx="198" cy="78" rx="18" ry="13" fill={light} />
        <ellipse cx="210" cy="76" rx="5.5" ry="4.2" fill="#2b211c" />
        <circle cx="182" cy="66" r="3.4" fill="#241c18" />
        <circle cx="183.3" cy="64.7" r="1.1" fill="#fff" />
        <path d="M204 86 q5 9 0 11 q-5-2 0-11" fill="#f4a0b0" />
      </g>
    </svg>
  );
}

export default function LoadingScreen({ onDone }) {
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const [leaving, setLeaving] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3.5,
        delay: Math.random() * 3,
        duration: 1.4 + Math.random() * 2.4,
        spark: Math.random() > 0.72,
      })),
    [],
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, id) => ({
        id,
        left: 6 + Math.random() * 88,
        top: 8 + Math.random() * 84,
        size: 12 + Math.random() * 18,
        delay: Math.random() * 2.2,
        duration: 1.2 + Math.random() * 1.6,
        color: ["#fffaf6", "#ffd0e4", "#ffe7a8", "#ffb7d5"][id % 4],
      })),
    [],
  );

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

  return (
    <div
      className={leaving ? "welcome welcome-leave" : "welcome"}
      role="status"
      aria-live="polite"
    >
      <div className="welcome-sky" aria-hidden="true">
        {stars.map((star) =>
          star.spark ? (
            <Star
              key={star.id}
              className="sky-star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size * 3.2}px`,
                height: `${star.size * 3.2}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ) : (
            <span
              key={star.id}
              className="sky-dot"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ),
        )}
        {sparkles.map((sparkle) => (
          <Star
            key={sparkle.id}
            className="sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              color: sparkle.color,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
        {POMS.map((pom) => (
          <div
            key={`${pom.lane}-${pom.delay}`}
            className={pom.flip ? `pom-lane flip lane-${pom.lane}` : `pom-lane lane-${pom.lane}`}
            style={{
              "--size": pom.size,
              "--dur": pom.duration,
              "--delay": pom.delay,
            }}
          >
            <Pomeranian
              coat={pom.coat}
              dark={pom.dark}
              light={pom.light}
              ear={pom.ear}
            />
          </div>
        ))}
      </div>
      <div className="welcome-copy">
        <div className="welcome-stack">
          <p className="welcome-title">
            WELCOME TO MY
            <br />
            INTERACTIVE RESUME
          </p>
          <p className="welcome-note">
            Feel free to click anything that <span>glows</span> for more info.
          </p>
        </div>
      </div>
    </div>
  );
}
