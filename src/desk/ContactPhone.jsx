import { useEffect, useId, useRef, useState } from "react";
import { profile } from "../data.js";
import { lockPageScroll } from "../lockPageScroll.js";

export default function ContactPhone({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const [copyNote, setCopyNote] = useState("");

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

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyNote("Email copied.");
    } catch {
      setCopyNote("Select the address above and copy it.");
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal phone-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>Let's connect</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>
        <p className="phone-note">
          {profile.name} · {profile.location}
        </p>
        <div className="phone-screen">
          <p>{profile.email}</p>
          <div className="phone-actions">
            <a className="primary" href={profile.gmailUrl} target="_blank" rel="noopener noreferrer">
              Email me
            </a>
            <button type="button" onClick={copyEmail}>
              Copy email
            </button>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              {profile.linkedinLabel}
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              {profile.githubLabel}
            </a>
          </div>
          <p className="copy-note" role="status">
            {copyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
