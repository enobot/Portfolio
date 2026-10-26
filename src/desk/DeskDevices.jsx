import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { hoverShadow, liftShadow, liftTransition, restShadow } from "./lift.js";

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
import { profile, projects } from "../data.js";
import ProjectsBody from "./ProjectsBody.jsx";

const cardTones = {
  tracer: "tone-tracer",
  fittmm: "tone-fittmm",
  blu: "tone-blu",
};

function ProjectPreview() {
  return (
    <div className="mac-home">
      <header className="mac-home-bar">
        <p>{profile.name}</p>
        <h2>Projects</h2>
      </header>
      <div className="mac-cards">
        {projects.map((project) => (
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
}

function LaptopShell() {
  const rows = [
    { count: 14, kind: "fn" },
    { count: 13, kind: "keys" },
    { count: 14, kind: "keys" },
    { count: 13, kind: "keys" },
    { count: 12, kind: "keys" },
    { count: 5, kind: "space" },
  ];

  return (
    <div className="mac-model" aria-hidden="true">
      <div className="mac-base">
        <div className="mac-base-top">
          <div className="mac-hinge" />
          <div className="mac-keys">
            {rows.map((row, index) => (
              <div className={`mac-key-row ${row.kind}`} key={index}>
                {Array.from({ length: row.count }, (_, key) => (
                  <span key={key} />
                ))}
              </div>
            ))}
          </div>
          <div className="mac-trackpad" />
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
}

export function MacBook({ open, ready, titleId, buttonRef, onOpen, onClose, onOpenProject }) {
  const reduced = useReducedMotion();
  const transition = liftTransition(reduced);

  return (
    <motion.div
      layout
      className={`mac ${open ? "is-open" : ""}`}
      style={{ borderRadius: 18 }}
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
                  <ProjectsBody onOpen={onOpenProject} />
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
      style={{ borderRadius: 36 }}
      transition={transition}
    >
      <div className="phone-seat" aria-hidden="true" />
      <motion.div
        className="pose"
        initial={false}
        animate={{
          rotate: open ? 0 : 6,
          filter: open ? liftShadow : restShadow,
        }}
        whileHover={open || reduced ? undefined : { y: -7, filter: hoverShadow }}
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
