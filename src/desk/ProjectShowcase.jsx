import { useEffect, useId, useRef } from "react";
import { projects } from "../data.js";
import { lockPageScroll } from "../lockPageScroll.js";
import { projectDetails } from "./projectDetails.js";

export default function ProjectShowcase({ onClose, onOpen }) {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    focusable()[0]?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const unlockScroll = lockPageScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal showcase-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>Projects</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="showcase-lead">
          These are the three projects on the résumé. Open a walkthrough for the demo.
        </p>
        <div className="project-grid">
          {projects.map((project) => {
            const detail = projectDetails[project.id];
            const stack = project.stack.split("|").map((item) => item.trim());
            return (
              <article className="project-card" key={project.id}>
                <h3>{project.name}</h3>
                <p className="card-kicker">{project.tagline}</p>
                <p>{detail.about}</p>
                <ul className="card-list">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="chip-row">
                  {stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
                <p className="status-line">{detail.status}</p>
                <div className="card-actions">
                  {detail.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    className="primary"
                    onClick={() => onOpen(project.id)}
                  >
                    Open walkthrough
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
