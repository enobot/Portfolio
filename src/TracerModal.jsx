import { useEffect, useId, useRef, useState } from "react";
import { tracer } from "./data.js";
import { lockPageScroll } from "./lockPageScroll.js";

const TRACEBACK = `Traceback (most recent call last):
  File "plans.py", line 42, in build_week
    level = user["plan"]
KeyError: 'plan'`;

export default function TracerModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const timerRef = useRef(null);
  const [phase, setPhase] = useState("idle");

  function runDemo() {
    window.clearTimeout(timerRef.current);
    setPhase("capturing");
    timerRef.current = window.setTimeout(() => setPhase("ready"), 700);
  }

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
      if (event.ctrlKey && event.shiftKey && event.code === "Space") {
        event.preventDefault();
        runDemo();
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
      window.clearTimeout(timerRef.current);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>Tracer</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>

        <section>
          <h3>The project</h3>
          <p>{tracer.summary}</p>
        </section>

        <section>
          <h3>How it works</h3>
          <ol className="steps">
            {tracer.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h3>Tool stack</h3>
          <dl className="stack-list">
            {tracer.stack.map(([name, detail]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            In-browser walkthrough of the desktop app. Press Ctrl+Shift+Space,
            or use the key below.
          </p>

          <div className={`desktop ${phase}`}>
            <div className="window">
              <div className="window-bar">
                <span>plans.py</span>
                <span>Visual Studio Code</span>
              </div>
              <pre>{TRACEBACK}</pre>
            </div>

            {phase === "capturing" && (
              <p className="demo-status">Hotkey detected. Capturing screen…</p>
            )}

            {phase === "ready" && (
              <div className="tracer-panel">
                <p className="demo-kicker">Screenshot stored</p>
                <p className="saved-prompt">
                  <span>Saved prompt</span>
                  {tracer.prompt}
                </p>
                <pre className="shot">{TRACEBACK}</pre>
                <p className="reply-label">
                  Example reply · sending this to the model is the next step
                </p>
                <p className="reply">{tracer.reply}</p>
              </div>
            )}
          </div>

          <div className="demo-controls">
            <button type="button" className="key" onClick={runDemo}>
              Ctrl + Shift + Space
            </button>
            {phase === "ready" && (
              <button type="button" className="text-button" onClick={() => setPhase("idle")}>
                Reset demo
              </button>
            )}
          </div>

          <p className="repo-line">
            Check out my repo:{" "}
            <a
              className="repo-link"
              href={tracer.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tracer.repoLabel}
            </a>
          </p>
          <p className="repo-line">
            <a
              className="repo-link"
              href={tracer.docs}
              target="_blank"
              rel="noopener noreferrer"
            >
              {tracer.docsLabel}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
