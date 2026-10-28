import { useEffect, useId, useRef, useState } from "react";
import { lockPageScroll } from "./lockPageScroll.js";

const repo = "https://github.com/enobot/Drawgorithm";

// Recorded from the app running locally. Each clip has a still of the same name for its poster.
const clips = [
  { id: "build", group: "Write and run", label: "Draw a tree as you type" },
  { id: "run", group: "Write and run", label: "Step through a binary search" },
  { id: "heap", group: "Data structures", label: "Heap: tree and array in sync" },
  { id: "graph", group: "Data structures", label: "Graph search, step by step" },
  { id: "union-find", group: "Data structures", label: "Union-find communities" },
  { id: "trie", group: "Data structures", label: "Trie of words" },
  { id: "deque", group: "Data structures", label: "Sliding-window deque" },
  { id: "practice", group: "Practice", label: "Hints and Check all tests" },
];

const groups = [...new Set(clips.map((clip) => clip.group))];

function clipSrc(id, ext) {
  return `${import.meta.env.BASE_URL}drawgorithms/${id}.${ext}`;
}

export default function DrawgorithmsModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const [activeId, setActiveId] = useState(clips[0].id);
  const active = clips.find((clip) => clip.id === activeId) ?? clips[0];

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button, video")].filter(
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

  function chooseClip(id) {
    videoRef.current?.pause();
    setActiveId(id);
  }

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
          <h2 id={titleId}>Drawgorithms</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>

        <section>
          <h3>The project</h3>
          <p>
            Drawgorithms runs your JavaScript one step at a time and draws what
            it does: variables as blocks, arrays as cells, maps, trees, linked
            lists and the call stack, next to the line that ran. Every drawing
            comes from what the code really did, so a bug shows up as a wrong
            picture. You can step forward and backward through a run, and the
            practice set checks your answer against examples and hidden tests.
          </p>
        </section>

        <section>
          <h3>Tool stack</h3>
          <dl className="stack-list">
            <div>
              <dt>Interpreter</dt>
              <dd>TypeScript, acorn, a tree-walking interpreter in a Web Worker (no eval)</dd>
            </div>
            <div>
              <dt>Interface</dt>
              <dd>React, Monaco Editor, Motion, Zustand, Tailwind CSS, Vite</dd>
            </div>
            <div>
              <dt>Tests</dt>
              <dd>Vitest, including differential tests against native JavaScript</dd>
            </div>
          </dl>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            Recorded from the app running on my computer. The data-structure
            clips use new drawings that aren&rsquo;t merged into main yet.
          </p>

          {groups.map((group) => (
            <div className="clip-group" key={group}>
              <p className="clip-label">{group}</p>
              <div className="clip-list">
                {clips
                  .filter((clip) => clip.group === group)
                  .map((clip) => (
                    <button
                      key={clip.id}
                      type="button"
                      className="clip"
                      aria-pressed={clip.id === activeId}
                      onClick={() => chooseClip(clip.id)}
                    >
                      {clip.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <video
            key={active.id}
            ref={videoRef}
            className="demo-video"
            controls
            playsInline
            preload="metadata"
            poster={clipSrc(active.id, "jpg")}
            src={clipSrc(active.id, "mp4")}
          >
            {active.label}
          </video>

          <p className="repo-line">
            Check out my repo:{" "}
            <a
              className="repo-link"
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/enobot/Drawgorithm
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
