import { useEffect, useId, useRef, useState } from "react";
import { tracer } from "./data.js";
import { lockPageScroll } from "./lockPageScroll.js";

const TRACEBACK = `Traceback (most recent call last):
  File "plans.py", line 42, in build_week
    level = user["plan"]
KeyError: 'plan'`;

const HOTKEY = "Ctrl+Shift+Space";

// The demo walks the app's flow with its own labels: idle → frozen (drag to
// choose an area) → sent straight away when "Send right after capture" is on,
// or held as "captured" until Analyze screenshot when it's off → the answer
// streams in → follow-ups. Escape while frozen keeps whatever was there before.
export default function TracerModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const desktopRef = useRef(null);
  const streamRef = useRef(null);
  const waitRef = useRef(null);
  const dragRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [before, setBefore] = useState("idle");
  const [box, setBox] = useState(null);
  const [capture, setCapture] = useState(null);
  const [prompt, setPrompt] = useState(tracer.prompts[0]);
  const [autoSend, setAutoSend] = useState(true);
  const [turns, setTurns] = useState([]);
  const [followUp, setFollowUp] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  function stopStreaming() {
    window.clearInterval(streamRef.current);
    window.clearTimeout(waitRef.current);
    // Anything mid-answer finishes at once, so nothing is left half-written.
    setTurns((list) => list.map((turn) => ({ ...turn, shown: turn.answer, waiting: false, done: true })));
  }

  function freeze() {
    if (phaseRef.current === "frozen") return;
    stopStreaming();
    setBefore(phaseRef.current === "streaming" ? "answered" : phaseRef.current);
    setBox(null);
    setStatus("");
    setPhase("frozen");
  }

  function cancelFreeze() {
    setBox(null);
    setStatus(capture ? "Selection canceled. The previous screenshot was kept." : "Selection canceled.");
    setPhase(before);
  }

  function send(question, answer) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stopStreaming();
    setStatus("");
    if (reduce) {
      setTurns((list) => [...list, { question, answer, shown: answer, waiting: false, done: true }]);
      setPhase("answered");
      return;
    }
    setTurns((list) => [...list, { question, answer, shown: "", waiting: true, done: false }]);
    setPhase("streaming");
    // "Waiting for ChatGPT…", then the answer arrives word by word.
    waitRef.current = window.setTimeout(() => {
      const words = answer.split(/(\s+)/);
      let count = 0;
      streamRef.current = window.setInterval(() => {
        count += 2;
        const done = count >= words.length;
        setTurns((list) => {
          const next = [...list];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, waiting: false, shown: words.slice(0, count).join(""), done };
          return next;
        });
        if (done) {
          window.clearInterval(streamRef.current);
          setPhase("answered");
        }
      }, 45);
    }, 650);
  }

  function replyFor(question) {
    return tracer.replies[tracer.prompts.indexOf(question)] ?? tracer.replies[0];
  }

  function take(kind) {
    stopStreaming();
    setCapture({ kind });
    setTurns([]);
    setBox(null);
    setFollowUp("");
    if (autoSend) {
      send(prompt, replyFor(prompt));
      return;
    }
    setStatus("Captured. Nothing has been sent yet.");
    setPhase("captured");
  }

  function analyze() {
    if (!prompt.trim()) {
      setStatus("Type a question first.");
      return;
    }
    send(prompt, replyFor(prompt));
  }

  function sendFollowUp(event) {
    event.preventDefault();
    const question = followUp.trim();
    if (!question) {
      setStatus("Type a question first.");
      return;
    }
    setFollowUp("");
    send(question, tracer.followUp.answer);
  }

  function removeScreenshot() {
    stopStreaming();
    setCapture(null);
    setTurns([]);
    setFollowUp("");
    setStatus("Screenshot and conversation removed.");
    setPhase("idle");
  }

  async function copyAnswer(index) {
    try {
      await navigator.clipboard.writeText(turns[index].answer);
      setCopied({ index, text: "Copied" });
    } catch {
      setCopied({ index, text: "Copy failed" });
    }
    window.setTimeout(() => setCopied(null), 1600);
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
    take("area");
  }

  function onContextMenu(event) {
    if (phase !== "frozen") return;
    event.preventDefault();
    dragRef.current = null;
    take("monitor");
  }

  // The key handler is attached once and reaches the current actions here.
  const actionsRef = useRef(null);
  actionsRef.current = { freeze, cancelFreeze, analyze };

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button, textarea, input, video")].filter(
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
      if (event.ctrlKey && event.key === "Enter" && phaseRef.current === "captured") {
        event.preventDefault();
        actionsRef.current.analyze();
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
      window.clearInterval(streamRef.current);
      window.clearTimeout(waitRef.current);
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  const busy = phase === "streaming";
  const lastTurn = turns[turns.length - 1];

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
          <h3>Video</h3>
          <p className="demo-lead">
            A screen recording of Tracer 1.0.0 on Windows, signed in to ChatGPT. The Python file
            and its error are a demo I set up; the answers are ChatGPT&rsquo;s real replies.
          </p>
          <video
            className="demo-video is-recording"
            controls
            playsInline
            preload="metadata"
            width="1100"
            height="916"
            poster={`${import.meta.env.BASE_URL}tracer/poster.jpg`}
            src={`${import.meta.env.BASE_URL}tracer/demo.mp4`}
          >
            A recording of Tracer explaining a Python error and answering a follow-up question.
          </video>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            Try it in the browser: press Ctrl+Shift+Space (or the key below), then drag a box
            around the error. Right-click takes the whole screen, and Escape cancels.
          </p>

          <div className="tracer-panel">
            <div className="tracer-bar">
              <span className="demo-kicker">Tracer</span>
              <span className="tracer-chip">ChatGPT connected</span>
            </div>
            <label className="prompt-field">
              <span>Prompt</span>
              <textarea
                rows={2}
                value={prompt}
                readOnly={busy}
                onChange={(event) => setPrompt(event.target.value)}
              />
            </label>
            <div className="prompt-chips" role="group" aria-label="Saved Prompts">
              {tracer.prompts.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={prompt === item}
                  disabled={busy}
                  onClick={() => setPrompt(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="tracer-check">
              <input
                type="checkbox"
                checked={autoSend}
                onChange={(event) => setAutoSend(event.target.checked)}
              />
              Send right after capture
            </label>
            <p className="reply-note">
              Press {HOTKEY}, then drag over what you want to ask about. Right-click captures the
              whole monitor, and Esc cancels.{" "}
              {autoSend
                ? "Tracer sends the capture to ChatGPT with your prompt as soon as you let go."
                : "Nothing is sent until you choose Analyze screenshot."}
            </p>
            {status && !capture ? (
              <p className="tracer-status" role="status">
                {status}
              </p>
            ) : null}
          </div>

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
                Screen frozen · drag to capture · right-click for the whole monitor · Esc to cancel
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
              <p className="demo-kicker">{capture.kind === "monitor" ? "Captured monitor" : "Captured area"}</p>
              <pre className="shot">{TRACEBACK}</pre>
              {status ? (
                <p className="tracer-status" role="status">
                  {status}
                </p>
              ) : null}

              {turns.length > 0 && <p className="reply-label">Answers</p>}
              {turns.map((turn, index) => (
                <div className="tracer-turn" key={index}>
                  <p className="tracer-you">
                    <span>You asked:</span> {turn.question}
                  </p>
                  <p className="reply-label">ChatGPT answered: (example answer)</p>
                  <p className="reply" aria-live="polite">
                    {turn.waiting ? "Waiting for ChatGPT…" : turn.shown}
                  </p>
                  {turn.done ? (
                    <button type="button" className="tracer-link" onClick={() => copyAnswer(index)}>
                      {copied?.index === index ? copied.text : "Copy answer"}
                    </button>
                  ) : null}
                </div>
              ))}

              {lastTurn?.done ? (
                <>
                  <form className="tracer-follow" onSubmit={sendFollowUp}>
                    <input
                      type="text"
                      aria-label="Question about this screenshot"
                      placeholder="Ask a follow-up about this screenshot"
                      value={followUp}
                      onChange={(event) => setFollowUp(event.target.value)}
                    />
                    <button type="submit">Send</button>
                  </form>
                  {turns.length === 1 ? (
                    <div className="prompt-chips">
                      <button type="button" onClick={() => setFollowUp(tracer.followUp.question)}>
                        {tracer.followUp.question}
                      </button>
                    </div>
                  ) : null}
                  <p className="reply-note">Uses your ChatGPT plan. Follow-ups send the screenshot again.</p>
                </>
              ) : null}
            </div>
          )}

          <div className="demo-controls">
            <button type="button" className="key" onClick={freeze}>
              Ctrl + Shift + Space
            </button>
            {phase === "frozen" && (
              <>
                <button type="button" className="text-button" onClick={() => take("area")}>
                  Capture the code window
                </button>
                <button type="button" className="text-button" onClick={cancelFreeze}>
                  Cancel
                </button>
              </>
            )}
            {phase === "captured" && (
              <button type="button" className="text-button" onClick={analyze}>
                Analyze screenshot (Ctrl + Enter)
              </button>
            )}
            {capture && phase !== "frozen" && (
              <button type="button" className="text-button" onClick={removeScreenshot}>
                Remove screenshot
              </button>
            )}
          </div>

          <p className="demo-lead tracer-note">
            This in-browser demo shows sample answers. The desktop app sends the screenshot and
            your prompt to your own ChatGPT plan, and the real answer streams back the same way.
          </p>

          <p className="repo-line">
            Try the real thing:{" "}
            <a className="repo-link" href={tracer.download}>
              Download Tracer 1.0.0 for Windows
            </a>{" "}
            (
            <a className="repo-link" href={tracer.release} target="_blank" rel="noopener noreferrer">
              release notes
            </a>
            ). It isn&rsquo;t code-signed yet, so Windows shows &ldquo;Windows protected your
            PC&rdquo;; choose More info, then Run anyway.
          </p>
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
