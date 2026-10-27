import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { profile } from "../data.js";
import AboutBody from "./AboutBody.jsx";
import { flatShadow, liftShadow, liftTransition } from "./lift.js";

export default function NameTag({ prepared, open, ready, titleId, buttonRef, onOpen, onClose }) {
  const reduced = useReducedMotion();
  const transition = liftTransition(reduced);
  // The photos stay out of the page load; hovering, focusing or pressing the tag starts them, so they are
  // usually in by the time it finishes opening.
  const [photosWanted, setPhotosWanted] = useState(false);
  const wantPhotos = () => setPhotosWanted(true);

  return (
    <motion.div
      layout
      className={`badge ${open ? "is-open" : ""}`}
      transition={transition}
    >
      <div className="badge-seat" aria-hidden="true" />
      <motion.div
        className="pose"
        initial={false}
        style={{ filter: open ? liftShadow : flatShadow }}
        animate={{ rotate: open ? 0 : -6 }}
        whileHover={open || reduced ? undefined : { y: -11, scale: 1.03 }}
        transition={transition}
      >
        {!open && (
          <button
            type="button"
            className="lift-hit"
            ref={buttonRef}
            aria-label="Open about me"
            onPointerEnter={wantPhotos}
            onPointerDown={wantPhotos}
            onFocus={wantPhotos}
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
            {prepared || open ? <AboutBody showPhotos={photosWanted || open} /> : null}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
