import { useEffect, useId, useRef, useState } from "react";

const repo = "https://github.com/enobot/FITTMM";

const clips = [
  {
    id: "overview",
    group: "Web",
    label: "Project walkthrough",
    file: "overview.mp4",
  },
  {
    id: "signup",
    group: "Web",
    label: "Sign up and log in",
    file: "signup-login.mp4",
  },
  {
    id: "create",
    group: "Web",
    label: "Create a workout",
    file: "create-workout.mp4",
  },
  {
    id: "record",
    group: "Web",
    label: "Record workouts",
    file: "record-workouts.mp4",
  },
  {
    id: "plate",
    group: "Web",
    label: "Plate calculator, light and dark",
    file: "plate-theme.mp4",
  },
  {
    id: "android",
    group: "Android",
    label: "Progress so far",
    file: "android-progress.mp4",
  },
];

function clipSrc(file) {
  return `${import.meta.env.BASE_URL}fittmm/${file}`;
}

export default function FittmmModal({ onClose }) {
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
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
          <h2 id={titleId}>FITTMM</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>

        <section>
          <h3>The project</h3>
          <p>
            FITTMM is a fitness app with two versions in one repository. The
            web app uses React and a FastAPI backend with MySQL to keep user
            profiles and workout routines. The Android app is in the same repo,
            built with Java, Kotlin, and Firebase.
          </p>
        </section>

        <section>
          <h3>Tool stack</h3>
          <dl className="stack-list">
            <div>
              <dt>Web</dt>
              <dd>React, JavaScript, FastAPI, Python, MySQL, REST APIs</dd>
            </div>
            <div>
              <dt>Android</dt>
              <dd>Java, Kotlin, and Firebase, in the android folder of the same repo</dd>
            </div>
          </dl>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            Web recordings first, then the Android progress so far.
          </p>

          {["Web", "Android"].map((group) => (
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
            key={active.file}
            ref={videoRef}
            className="demo-video"
            controls
            playsInline
            preload="metadata"
            src={clipSrc(active.file)}
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
              github.com/enobot/FITTMM
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
