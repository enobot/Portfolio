import { memo, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { liftShadow, liftTransition, restShadow } from "./lift.js";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h17v11h-17z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V17M8 7.5v.2M12 17v-4.2a2 2 0 0 1 4 0V17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.2a7.8 7.8 0 0 0-2.5 15.2c.4.1.5-.2.5-.4v-1.4c-2 .4-2.5-1-2.5-1-.3-.8-.8-1-.8-1-.7-.5.1-.5.1-.5.7.1 1.1.8 1.1.8.6 1.1 1.7.8 2.1.6.1-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.5.7-2-.1-.2-.3-1 .1-2 0 0 .6-.2 2 .8a7 7 0 0 1 3.6 0c1.4-1 2-.8 2-.8.4 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.2.6.7.6 1.4v2.1c0 .2.1.5.5.4A7.8 7.8 0 0 0 12 4.2z"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 15.5H5.5A1.5 1.5 0 0 1 4 14V5.5A1.5 1.5 0 0 1 5.5 4H14a1.5 1.5 0 0 1 1.5 1.5V6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
import { MockFrame } from "react-mockframe";
import "react-mockframe/styles/mockframe.css";
import { laptopProjects, profile } from "../data.js";
import ProjectsBody from "./ProjectsBody.jsx";

const cardTones = {
  tracer: "tone-tracer",
  merrynails: "tone-merrynails",
  surfsafe: "tone-surfsafe",
  fittmm: "tone-fittmm",
  blu: "tone-blu",
  drawgorithms: "tone-drawgorithms",
};

// Two by two on the screen. With more than four, the grid scrolls: the wheel
// over the resting laptop scrolls it (see MacBook), and a faint scrollbar
// shows there is more.
const ProjectPreview = memo(function ProjectPreview() {
  return (
    <div className="mac-home">
      <header className="mac-home-bar">
        <p>{profile.name}</p>
        <h2>Projects</h2>
      </header>
      <div className="mac-cards">
        {laptopProjects.map((project) => (
          <article className={`mac-card ${cardTones[project.id] || ""}`} key={project.id}>
            <div className="mac-card-art" aria-hidden="true">
              <span>{project.name.slice(0, 1)}</span>
            </div>
            <h3>{project.name}</h3>
            <p>{project.tagline}</p>
          </article>
        ))}
      </div>
    </div>
  );
});

// Die-cut vinyl stickers on the palm rests: nods to Naruto (an orange swirl and
// a bowl of ramen), Sasuke (a lightning bolt), and Sakura (a cherry blossom).
// Original shapes, not character art.
function Stickers() {
  const spiral = Array.from({ length: 60 }, (_, index) => {
    const angle = index * 0.34;
    const radius = 4 + index * 0.62;
    return `${index === 0 ? "M" : "L"}${(50 + Math.cos(angle) * radius).toFixed(1)} ${(50 + Math.sin(angle) * radius).toFixed(1)}`;
  }).join(" ");
  return (
    <div className="mac-stickers" aria-hidden="true">
      <svg className="sticker sticker-swirl" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="#fff" />
        <circle cx="50" cy="50" r="40" fill="#f7931e" />
        <path d={spiral} fill="none" stroke="#c4421a" strokeWidth="6" strokeLinecap="round" />
      </svg>
      <svg className="sticker sticker-ramen" viewBox="0 0 120 100">
        <path d="M8 46 H112 Q108 92 60 94 Q12 92 8 46Z" fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
        <path d="M30 40 C26 30 36 26 32 14 M50 40 C46 28 58 24 52 10 M70 40 C66 30 76 26 72 14" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" />
        <path d="M30 40 C26 30 36 26 32 14 M50 40 C46 28 58 24 52 10 M70 40 C66 30 76 26 72 14" fill="none" stroke="#b9b1c9" strokeWidth="3" strokeLinecap="round" />
        <path d="M14 50 H106 Q102 86 60 88 Q18 86 14 50Z" fill="#e8553a" />
        <path d="M22 60 H98" stroke="#f6c453" strokeWidth="4" strokeDasharray="8 6" />
        <ellipse cx="60" cy="50" rx="46" ry="7" fill="#f5e6c4" />
        <path d="M24 49 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0" fill="none" stroke="#e8c87a" strokeWidth="2.4" />
        <circle cx="82" cy="49" r="5" fill="#fff" />
        <circle cx="82" cy="49" r="2.2" fill="#f2a2c0" />
        <path d="M76 4 L96 44 M88 2 L104 42" stroke="#8a5a3c" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg className="sticker sticker-bolt" viewBox="0 0 80 110">
        <path d="M46 4 L12 62 H36 L28 106 L68 40 H44 L56 4Z" fill="#fff" stroke="#fff" strokeWidth="12" strokeLinejoin="round" />
        <path d="M46 4 L12 62 H36 L28 106 L68 40 H44 L56 4Z" fill="#3b3f8f" />
        <path d="M44 14 L22 56 H40 L36 84" fill="none" stroke="#9fb4ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="sticker sticker-blossom" viewBox="0 0 100 100">
        <g transform="translate(50 52)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <path key={`edge-${angle}`} d="M0 0 C-22 -10 -18 -40 -5 -44 L0 -36 L5 -44 C18 -40 22 -10 0 0Z" transform={`rotate(${angle})`} fill="#fff" stroke="#fff" strokeWidth="10" strokeLinejoin="round" />
          ))}
          {[0, 72, 144, 216, 288].map((angle) => (
            <path key={angle} d="M0 0 C-22 -10 -18 -40 -5 -44 L0 -36 L5 -44 C18 -40 22 -10 0 0Z" transform={`rotate(${angle})`} fill="#f7a8c4" />
          ))}
          <circle r="8" fill="#e46a95" />
          <circle r="3.4" fill="#f6d27a" />
        </g>
      </svg>
    </div>
  );
}

// A MacBook Pro keyboard (US layout). Each key is [legend, width in key units,
// kind, shifted legend]. Every row adds up to 14.5 units.
const key = (label, width = 1, kind = "", top = "") => ({ label, width, kind, top });
const KEY_ROWS = [
  [
    key("esc", 1.5, "mod"),
    ...Array.from({ length: 12 }, (_, index) => key(`F${index + 1}`, 1, "fkey")),
    key("", 1, "touch-id"),
  ],
  [
    ...[["`", "~"], ["1", "!"], ["2", "@"], ["3", "#"], ["4", "$"], ["5", "%"], ["6", "^"], ["7", "&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"]].map(
      ([label, top]) => key(label, 1, "pair", top),
    ),
    key("delete", 1.5, "mod right"),
  ],
  [
    key("tab", 1.5, "mod"),
    ..."QWERTYUIOP".split("").map((letter) => key(letter)),
    key("[", 1, "pair", "{"),
    key("]", 1, "pair", "}"),
    key("\\", 1, "pair", "|"),
  ],
  [
    key("caps lock", 1.75, "mod"),
    ..."ASDFGHJKL".split("").map((letter) => key(letter)),
    key(";", 1, "pair", ":"),
    key("'", 1, "pair", '"'),
    key("return", 1.75, "mod right"),
  ],
  [
    key("shift", 2.25, "mod"),
    ..."ZXCVBNM".split("").map((letter) => key(letter)),
    key(",", 1, "pair", "<"),
    key(".", 1, "pair", ">"),
    key("/", 1, "pair", "?"),
    key("shift", 2.25, "mod right"),
  ],
  [
    key("fn", 1, "mod"),
    key("control", 1, "mod", "⌃"),
    key("option", 1, "mod", "⌥"),
    key("command", 1.25, "mod", "⌘"),
    key("", 5, "space"),
    key("command", 1.25, "mod right", "⌘"),
    key("option", 1, "mod right", "⌥"),
    key("", 3, "arrows"),
  ],
];

function Keyboard() {
  return (
    <div className="mac-keys">
      {KEY_ROWS.map((row, rowIndex) => (
        <div className={rowIndex === 0 ? "mac-key-row fn" : "mac-key-row"} key={rowIndex}>
          {row.map((item, index) =>
            item.kind === "arrows" ? (
              <span className="mac-arrows" key={index} style={{ flexGrow: item.width }}>
                <span className="mac-key">◀</span>
                <span className="mac-arrow-pair">
                  <span className="mac-key">▲</span>
                  <span className="mac-key">▼</span>
                </span>
                <span className="mac-key">▶</span>
              </span>
            ) : (
              <span className={`mac-key ${item.kind}`} key={index} style={{ flexGrow: item.width }}>
                {item.top ? <small>{item.top}</small> : null}
                {item.label}
              </span>
            ),
          )}
        </div>
      ))}
    </div>
  );
}

const LaptopShell = memo(function LaptopShell() {
  return (
    <div className="mac-model" aria-hidden="true">
      <div className="mac-base">
        <div className="mac-base-top">
          <div className="mac-hinge" />
          <Keyboard />
          <div className="mac-trackpad" />
          <Stickers />
        </div>
        <div className="mac-base-front" />
        <div className="mac-base-left" />
        <div className="mac-base-right" />
      </div>
      <div className="mac-lid">
        <div className="mac-lid-back" />
        <div className="mac-lid-face">
          <div className="mac-notch" />
          <div className="mac-display">
            <ProjectPreview />
          </div>
        </div>
      </div>
    </div>
  );
});

export function MacBook({ prepared, open, ready, titleId, buttonRef, onOpen, onClose, onOpenProject }) {
  const reduced = useReducedMotion();
  const transition = liftTransition(reduced);
  const rootRef = useRef(null);

  // The resting laptop is covered by its click target, so wheel turns over it
  // are passed to the screen's project grid.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || open) return undefined;
    function onWheel(event) {
      const grid = root.querySelector(".mac-display .mac-cards");
      if (!grid || grid.scrollHeight <= grid.clientHeight) return;
      event.preventDefault();
      grid.scrollTop += event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY;
    }
    root.addEventListener("wheel", onWheel, { passive: false });
    return () => root.removeEventListener("wheel", onWheel);
  }, [open]);

  return (
    <motion.div
      layout
      ref={rootRef}
      className={`mac ${open ? "is-open" : ""}`}
      transition={transition}
    >
      <div className="mac-seat" aria-hidden="true" />
      <div className="pose">
      {!open && (
        <button
          type="button"
          className="lift-hit"
          ref={buttonRef}
          aria-label="Open projects"
          onClick={onOpen}
        >
          <span className="tip" aria-hidden="true">Projects</span>
        </button>
      )}
      <div className="device-scale">
        <div className="mac-rig">
          <LaptopShell />
          <div className="mac-live-frame">
            <MockFrame device="MacBook Pro" color="silver">
              <div className="mac-screen">
                {open && (
                  <button type="button" className="device-close close" onClick={onClose}>
                    Close
                  </button>
                )}
                <div className={ready ? "mac-preview is-hidden" : "mac-preview"} aria-hidden="true" inert>
                  <ProjectPreview />
                </div>
                <div
                  className={ready ? "mac-live is-shown" : "mac-live"}
                  inert={ready ? undefined : true}
                  aria-hidden={ready ? undefined : true}
                >
                  <h2 id={titleId}>Projects</h2>
                  {prepared || open ? <ProjectsBody onOpen={onOpenProject} /> : null}
                </div>
              </div>
            </MockFrame>
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

export function DeskPhone({ open, ready, titleId, buttonRef, onOpen, onClose }) {
  const reduced = useReducedMotion();
  const transition = liftTransition(reduced);
  const [copyNote, setCopyNote] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyNote("Email copied.");
    } catch {
      setCopied(false);
      setCopyNote("Select the address and copy it.");
    }
  }

  return (
    <motion.div
      layout
      className={`iphone ${open ? "is-open" : ""}`}
      transition={transition}
    >
      <div className="phone-seat" aria-hidden="true" />
      <motion.div
        className="pose"
        initial={false}
        style={{ filter: open ? liftShadow : restShadow }}
        animate={{ rotate: open ? 0 : 6 }}
        whileHover={open || reduced ? undefined : { y: -12, scale: 1.03 }}
        transition={transition}
      >
      {!open && (
        <button
          type="button"
          className="lift-hit"
          ref={buttonRef}
          aria-label="Open contact"
          onClick={onOpen}
        >
          <span className="tip" aria-hidden="true">Contact</span>
        </button>
      )}
      <div className="device-scale">
      <MockFrame device="iPhone 17" color="white">
      <div className="iphone-screen" inert={open && ready ? undefined : true}>
        <p className="phone-kicker">Contact</p>
        <div className="device-top phone-top">
          <h2 id={titleId}>{profile.name}</h2>
        </div>
        <p className="phone-role">Software Engineer | Full-Stack Developer</p>
        <div className="phone-actions">
          <a href={`mailto:${profile.email}`}>
            <span className="phone-icon"><MailIcon /></span>
            <span className="phone-copy">
              <strong>Email</strong>
              <small>{profile.email}</small>
            </span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="phone-icon"><LinkedInIcon /></span>
            <span className="phone-copy">
              <strong>{profile.linkedinLabel}</strong>
              <small>tracythutran</small>
            </span>
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <span className="phone-icon"><GitHubIcon /></span>
            <span className="phone-copy">
              <strong>{profile.githubLabel}</strong>
              <small>enobot</small>
            </span>
          </a>
          <button type="button" onClick={copyEmail}>
            <span className="phone-icon"><CopyIcon /></span>
            <span className="phone-copy">
              <strong>Copy email</strong>
              <small>Copy the address</small>
            </span>
          </button>
        </div>
        <p className={copied ? "copy-note is-success" : "copy-note"} role="status">
          {copyNote}
        </p>
        {open && (
          <button type="button" className="device-close close" onClick={onClose}>
            Close
          </button>
        )}
      </div>
      </MockFrame>
      </div>
      </motion.div>
    </motion.div>
  );
}
