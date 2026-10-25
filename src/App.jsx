import { useCallback, useId, useRef, useState } from "react";
import {
  achievements,
  education,
  experience,
  proficiencies,
  profile,
  projects,
  summary,
} from "./data.js";
import AboutModal from "./AboutModal.jsx";
import BluModal from "./BluModal.jsx";
import FeedbackModal from "./FeedbackModal.jsx";
import FittmmModal from "./FittmmModal.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import StarCursor from "./StarCursor.jsx";
import TracerModal from "./TracerModal.jsx";

function HotLink({ href, tip, children }) {
  const tipId = useId();
  return (
    <span className="hot-wrap">
      <a
        className="hot"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={tip ? tipId : undefined}
      >
        {children}
      </a>
      {tip ? (
        <span className="tip" id={tipId} role="tooltip">
          {tip}
        </span>
      ) : null}
    </span>
  );
}

function SchoolLink() {
  return (
    <a
      className="hot"
      href={profile.schoolUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {profile.school}
    </a>
  );
}

export default function App() {
  const [tracerOpen, setTracerOpen] = useState(false);
  const [fittmmOpen, setFittmmOpen] = useState(false);
  const [bluOpen, setBluOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const tracerTipId = useId();
  const fittmmTipId = useId();
  const bluTipId = useId();
  const aboutTipId = useId();
  const tracerButtonRef = useRef(null);
  const fittmmButtonRef = useRef(null);
  const bluButtonRef = useRef(null);
  const aboutButtonRef = useRef(null);
  const feedbackButtonRef = useRef(null);
  const closeTracer = useCallback(() => {
    setTracerOpen(false);
    tracerButtonRef.current?.focus();
  }, []);
  const closeFittmm = useCallback(() => {
    setFittmmOpen(false);
    fittmmButtonRef.current?.focus();
  }, []);
  const closeBlu = useCallback(() => {
    setBluOpen(false);
    bluButtonRef.current?.focus();
  }, []);
  const closeAbout = useCallback(() => {
    setAboutOpen(false);
    aboutButtonRef.current?.focus();
  }, []);
  const closeFeedback = useCallback(() => {
    setFeedbackOpen(false);
    feedbackButtonRef.current?.focus();
  }, []);

  return (
    <div className="desk">
      <StarCursor />
      {showWelcome ? (
        <LoadingScreen onDone={() => setShowWelcome(false)} />
      ) : null}
      <article className="paper">
        <header className="mast">
          <h1>
            <span className="hot-wrap name-wrap">
              <button
                type="button"
                className="name-button"
                ref={aboutButtonRef}
                aria-describedby={aboutTipId}
                onClick={() => setAboutOpen(true)}
              >
                {profile.name}
              </button>
              <span className="tip" id={aboutTipId} role="tooltip">
                Get to know me
              </span>
            </span>
          </h1>
          <p className="contact-line">
            <span>{profile.location}</span>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <HotLink href={profile.linkedin} tip="Check out my LinkedIn">
              {profile.linkedinLabel}
            </HotLink>
            <span className="dot" aria-hidden="true">
              ·
            </span>
            <HotLink href={profile.gmailUrl} tip="Send me a direct email!">
              {profile.email}
            </HotLink>
          </p>
        </header>

        <section>
          <h2>Professional Summary</h2>
          <p>{summary}</p>
        </section>

        <section>
          <h2>Technical Proficiencies</h2>
          <ul className="skills">
            {proficiencies.map(([label, value]) => (
              <li key={label}>
                <strong>{label}:</strong> {value}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Education</h2>
          <div className="entry">
            <div className="entry-head">
              <p className="dates">{education.dates}</p>
              <p className="place">{education.place}</p>
            </div>
            <p className="role">
              <strong>{education.degree}</strong>, <SchoolLink />
            </p>
          </div>
          <div className="entry">
            <p className="role">
              <strong>{education.certificate.title}</strong>
            </p>
            <p>{education.certificate.detail}</p>
          </div>
        </section>

        <section>
          <h2>Software Engineering Projects</h2>
          {projects.map((project) => (
            <div className="entry" key={project.name}>
              <h3>
                {project.id === "tracer" ? (
                  <span className="hot-wrap">
                    <button
                      type="button"
                      className="hot"
                      ref={tracerButtonRef}
                      aria-describedby={tracerTipId}
                      onClick={() => setTracerOpen(true)}
                    >
                      {project.name}
                    </button>
                    <span className="tip" id={tracerTipId} role="tooltip">
                      Check out my project
                    </span>
                  </span>
                ) : project.id === "fittmm" ? (
                  <span className="hot-wrap">
                    <button
                      type="button"
                      className="hot"
                      ref={fittmmButtonRef}
                      aria-describedby={fittmmTipId}
                      onClick={() => setFittmmOpen(true)}
                    >
                      {project.name}
                    </button>
                    <span className="tip" id={fittmmTipId} role="tooltip">
                      Check out my project
                    </span>
                  </span>
                ) : project.id === "blu" ? (
                  <span className="hot-wrap">
                    <button
                      type="button"
                      className="hot"
                      ref={bluButtonRef}
                      aria-describedby={bluTipId}
                      onClick={() => setBluOpen(true)}
                    >
                      {project.name}
                    </button>
                    <span className="tip" id={bluTipId} role="tooltip">
                      Check out my project
                    </span>
                  </span>
                ) : project.repo ? (
                  <HotLink href={project.repo} tip="Check out my project">
                    {project.name}
                  </HotLink>
                ) : (
                  project.name
                )}
                <span className="tagline"> — {project.tagline}</span>
              </h3>
              <p className="stack">{project.stack}</p>
              <ul className="bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((job) => (
            <div className="entry" key={job.role}>
              <p className="dates">{job.dates}</p>
              <p className="role">
                <strong>{job.role}</strong>
                {job.org === "school" ? (
                  <>
                    , <SchoolLink />
                  </>
                ) : (
                  <>, {job.org}</>
                )}
              </p>
              <ul className="bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Achievements</h2>
          <ul className="bullets">
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <p className="get-in-touch">
          <button
            type="button"
            className="hot get-in-touch-button"
            ref={feedbackButtonRef}
            onClick={() => setFeedbackOpen(true)}
          >
            Get in touch
          </button>
        </p>
      </article>

      {tracerOpen ? <TracerModal onClose={closeTracer} /> : null}
      {fittmmOpen ? <FittmmModal onClose={closeFittmm} /> : null}
      {bluOpen ? <BluModal onClose={closeBlu} /> : null}
      {aboutOpen ? <AboutModal onClose={closeAbout} /> : null}
      {feedbackOpen ? <FeedbackModal onClose={closeFeedback} /> : null}
    </div>
  );
}
