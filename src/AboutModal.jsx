import { useEffect, useId, useRef } from "react";
import { about } from "./data.js";
import AboutBody from "./desk/AboutBody.jsx";
import { lockPageScroll } from "./lockPageScroll.js";

export default function AboutModal({ onClose, notebook = false }) {
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
        className={notebook ? "modal about-modal notebook" : "modal about-modal"}
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
        <AboutBody />
      </div>
    </div>
  );
}
