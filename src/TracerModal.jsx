import { useEffect, useId, useRef, useState } from "react";
import { tracer } from "./data.js";
import { lockPageScroll } from "./lockPageScroll.js";

const TRACEBACK = `Traceback (most recent call last):
  File "plans.py", line 42, in build_week
    level = user["plan"]
KeyError: 'plan'`;

// The demo walks the real flow: idle → frozen (choose an area) → preview
// (edit the prompt) → answering → answered. Escape while frozen goes back to
// whatever was there before, like the app.
export default function TracerModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const desktopRef = useRef(null);
  const timerRef = useRef(null);
  const dragRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [before, setBefore] = useState("idle");
  const [box, setBox] = useState(null);
  const [capture, setCapture] = useState(null);
  const [prompt, setPrompt] = useState(tracer.prompts[0]);
  const [shown, setShown] = useState("");
  const [answer, setAnswer] = useState(tracer.replies[0]);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  function freeze() {
    window.clearInterval(timerRef.current);
    setBefore(phaseRef.current === "frozen" ? before : phaseRef.current);
    setBox(null);
    setPhase("frozen");
  }

  function cancelFreeze() {
    setBox(null);
    if (before === "answering") {
      setShown(answer);
      setPhase("answered");
      return;
    }
    setPhase(before === "frozen" ? "idle" : before);
  }

  function take(kind, size) {
    setCapture({ kind, size });
    setBox(null);
    setShown("");
    setPhase("preview");
  }

  function ask() {
    if (!prompt.trim()) return;
    const reply = tracer.replies[tracer.prompts.indexOf(prompt)] ?? tracer.replies[0];
    setAnswer(reply);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.clearInterval(timerRef.current);
    if (reduce) {
      setShown(reply);
      setPhase("answered");
      return;
    }
    setShown("");
    setPhase("answering");
    let index = 0;
    timerRef.current = window.setInterval(() => {
      index += 3;
      setShown(reply.slice(0, index));
      if (index >= reply.length) {
        window.clearInterval(timerRef.current);
        setPhase("answered");
      }
    }, 24);
  }

  function removePreview() {
    window.clearInterval(timerRef.current);
    setCapture(null);
    setShown("");
    setPhase("idle");
  }

  function point(event) {
    const rect = desktopRef.current.getBoundingClientRect();
    return {
      x: Math.min(Math.max(event.clientX - rect.left, 0), rect.width),
      y: Math.min(Math.max(event.clientY - rect.top, 0), rect.height),
    };
  }

  function onPointerDown(event) {
    if (phase !== "frozen" || event.button !== 0) return;
    event.preventDefault();
    const start = point(event);
    dragRef.current = start;
    desktopRef.current.setPointerCapture(event.pointerId);
    setBox({ x: start.x, y: start.y, w: 0, h: 0 });
  }

  function onPointerMove(event) {
    const start = dragRef.current;
    if (!start) return;
    const end = point(event);
    setBox({
      x: Math.min(start.x, end.x),
      y: Math.min(start.y, end.y),
      w: Math.abs(end.x - start.x),
      h: Math.abs(end.y - start.y),
    });
  }

  function onPointerUp() {
    const start = dragRef.current;
    dragRef.current = null;
    if (!start || !box) return;
    // A tiny drag is treated as a missed click, as in the app.
    if (box.w < 12 || box.h < 12) {
      setBox(null);
      return;
    }
    take("area", `${Math.round(box.w)} × ${Math.round(box.h)}`);
  }

  function onContextMenu(event) {
    if (phase !== "frozen") return;
    event.preventDefault();
    dragRef.current = null;
    take("screen", "whole screen");
  }

  // The key handler is attached once and reaches the current actions here.
  const actionsRef = useRef(null);
  actionsRef.current = { freeze, cancelFreeze, ask };

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button, textarea")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    focusable()[0]?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (phaseRef.current === "frozen") {
          actionsRef.current.cancelFreeze();
          return;
        }
        onClose();
        return;
      }
      if (event.ctrlKey && event.shiftKey && event.code === "Space") {
        event.preventDefault();
        actionsRef.current.freeze();
        return;
      }
      if (event.ctrlKey && event.key === "Enter" && phaseRef.current === "preview") {
        event.preventDefault();
        actionsRef.current.ask();
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
      window.clearInterval(timerRef.current);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  const answering = phase === "answering" || phase === "answered";

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
            Try it in the browser: press Ctrl+Shift+Space (or the key below),
            then drag a box around the error. Right-click takes the whole
            screen, and Escape cancels.
          </p>

          <div
            ref={desktopRef}
            className={`desktop ${phase}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              dragRef.current = null;
              setBox(null);
            }}
            onContextMenu={onContextMenu}
          >
            <div className="window">
              <div className="window-bar">
                <span>plans.py</span>
                <span>Visual Studio Code</span>
              </div>
              <pre>{TRACEBACK}</pre>
            </div>

            {phase === "frozen" && (
              <p className="freeze-hint" aria-live="polite">
                Screen frozen · drag to capture · right-click for the whole screen · Esc to cancel
              </p>
            )}
            {phase === "frozen" && box && box.w > 0 && (
              <div
                className="freeze-box"
                style={{ left: box.x, top: box.y, width: box.w, height: box.h }}
                aria-hidden="true"
              />
            )}
          </div>

          {capture && phase !== "frozen" && (
            <div className="tracer-panel">
              <p className="demo-kicker">
                Preview · {capture.size} · nothing is uploaded yet
              </p>
              <pre className="shot">{TRACEBACK}</pre>
              <label className="prompt-field">
                <span>Prompt</span>
                <textarea
                  rows={2}
                  value={prompt}
                  readOnly={answering}
                  onChange={(event) => setPrompt(event.target.value)}
                />
              </label>
              <div className="prompt-chips" aria-label="Saved prompts">
                {tracer.prompts.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={prompt === item}
                    disabled={answering}
                    onClick={() => setPrompt(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {answering && (
                <>
                  <p className="reply-label">ChatGPT · example answer</p>
                  <p className="reply" aria-live="polite">
                    {shown}
                  </p>
                </>
              )}
              {phase === "answered" && (
                <p className="reply-note">
                  This in-browser demo shows a sample answer. The desktop app
                  sends the screenshot and prompt to the signed-in ChatGPT plan.
                </p>
              )}
            </div>
          )}

          <div className="demo-controls">
            <button type="button" className="key" onClick={freeze}>
              Ctrl + Shift + Space
            </button>
            {phase === "frozen" && (
              <>
                <button type="button" className="text-button" onClick={() => take("area", "code window")}>
                  Capture the code window
                </button>
                <button type="button" className="text-button" onClick={cancelFreeze}>
                  Cancel
                </button>
              </>
            )}
            {phase === "preview" && (
              <button type="button" className="text-button" onClick={ask}>
                Ask ChatGPT (Ctrl + Enter)
              </button>
            )}
            {capture && phase !== "frozen" && (
              <button type="button" className="text-button" onClick={removePreview}>
                Remove preview
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
