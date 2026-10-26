import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data.js";
import AboutBody from "./AboutBody.jsx";
import { flatShadow, hoverShadow, liftShadow, liftTransition } from "./lift.js";

export default function NameTag({ open, ready, titleId, buttonRef, onOpen, onClose }) {
  const reduced = useReducedMotion();
  const transition = liftTransition(reduced);

  return (
    <motion.div
      layout
      className={`badge ${open ? "is-open" : ""}`}
      style={{ borderRadius: 8 }}
      transition={transition}
    >
      <div className="badge-seat" aria-hidden="true" />
      <motion.div
        className="pose"
        initial={false}
        animate={{
          rotate: open ? 0 : -6,
          filter: open ? liftShadow : flatShadow,
        }}
        whileHover={open || reduced ? undefined : { y: -6, filter: hoverShadow }}
        transition={transition}
      >
        {!open && (
          <button
            type="button"
            className="lift-hit"
            ref={buttonRef}
            aria-label="Open about me"
            onClick={onOpen}
          >
            <span className="tip" aria-hidden="true">About Me</span>
          </button>
        )}
        <div className="badge-card">
          {open && (
            <button type="button" className="badge-close close" onClick={onClose}>
              Close
            </button>
          )}
          <motion.div layout className={ready ? "badge-face is-hidden" : "badge-face"} aria-hidden="true">
            <p className="badge-kicker">About</p>
            <p className="badge-name">{profile.name}</p>
            <span className="badge-rule" />
            <p className="badge-role">Software Engineer</p>
          </motion.div>
          <motion.div
            layout
            className={ready ? "badge-live is-shown" : "badge-live"}
            inert={ready ? undefined : true}
            aria-hidden={ready ? undefined : true}
          >
            <h2 id={titleId}>Hi, I'm Tracy!</h2>
            <AboutBody />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
