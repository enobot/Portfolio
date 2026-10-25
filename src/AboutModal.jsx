import { useEffect, useId, useRef } from "react";
import { about } from "./data.js";

export default function AboutModal({ onClose }) {
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>{about.greeting}</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="about-photos">
          {about.photos.map((photo) => (
            <img
              key={photo.src}
              src={`${import.meta.env.BASE_URL}${photo.src}`}
              alt={photo.alt}
            />
          ))}
        </div>
        {about.intro.map((paragraph) => (
          <p className="about-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <h3 className="about-heading">{about.more.heading}</h3>
        {about.more.paragraphs.map((paragraph) => (
          <p className="about-copy" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <h3 className="about-heading">{about.facts.heading}</h3>
        <ul className="about-facts">
          {about.facts.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="about-copy about-closing">{about.closing}</p>
      </div>
    </div>
  );
}
