import { memo, useId } from "react";
import {
  achievements,
  education,
  experience,
  proficiencies,
  profile,
  projects,
  summary,
} from "../data.js";
import { projectDetails } from "./projectDetails.js";

function HotLink({ href, tip, children }) {
  const tipId = useId();
  return (
    <span className="hot-wrap">
      <a
        className="hot"
        data-glow={typeof children === "string" ? children : undefined}
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
    <a className="hot" href={profile.schoolUrl} target="_blank" rel="noopener noreferrer">
      {profile.school}
    </a>
  );
}

function ProjectName({ project, interactive, buttonRef, tipId, onOpen }) {
  if (!interactive) {
    return project.name;
  }
  return (
    <span className="hot-wrap">
      <button
        type="button"
        className="hot"
        data-glow={project.name}
        ref={buttonRef}
        aria-describedby={tipId}
        onClick={onOpen}
      >
        {project.name}
      </button>
      <span className="tip" id={tipId} role="tooltip">
        Check out my project
      </span>
    </span>
  );
}

function ResumePaper({
  interactive = false,
  aboutButtonRef,
  aboutTipId,
  tracerButtonRef,
  tracerTipId,
  fittmmButtonRef,
  fittmmTipId,
  bluButtonRef,
  bluTipId,
  shouldntWouldntButtonRef,
  shouldntWouldntTipId,
  feedbackButtonRef,
  onAbout,
  onTracer,
  onFittmm,
  onBlu,
  onShouldntWouldnt,
  onFeedback,
}) {
  const projectControls = {
    tracer: { buttonRef: tracerButtonRef, tipId: tracerTipId, onOpen: onTracer },
    fittmm: { buttonRef: fittmmButtonRef, tipId: fittmmTipId, onOpen: onFittmm },
    blu: { buttonRef: bluButtonRef, tipId: bluTipId, onOpen: onBlu },
    surfsafe: { buttonRef: shouldntWouldntButtonRef, tipId: shouldntWouldntTipId, onOpen: onShouldntWouldnt },
  };

  return (
    <article className="paper" inert={interactive ? undefined : true}>
      <header className="mast">
        <h1>
          {interactive ? (
            <span className="hot-wrap name-wrap">
              <button
                type="button"
                className="name-button"
                ref={aboutButtonRef}
                aria-describedby={aboutTipId}
                onClick={onAbout}
              >
                {profile.name}
              </button>
              <span className="tip" id={aboutTipId} role="tooltip">
                Get to know me
              </span>
            </span>
          ) : (
            profile.name
          )}
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
          <p>{education.gpa}</p>
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
        {projects.map((project) => {
          const control = projectControls[project.id];
          return (
            <div className="entry" key={project.name}>
              <h3>
                {control ? (
                  <ProjectName project={project} interactive={interactive} {...control} />
                ) : (
                  project.name
                )}
                <span className="tagline"> — {project.tagline}</span>
              </h3>
              <p className="stack">{project.stack}</p>
              {projectDetails[project.id]?.links.length ? (
                <p className="project-links">
                  {projectDetails[project.id].links.map((link, index) => (
                    <span key={link.href}>
                      {index > 0 ? <span className="dot" aria-hidden="true"> · </span> : null}
                      {interactive ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        link.label
                      )}
                    </span>
                  ))}
                </p>
              ) : null}
              <ul className="bullets">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          );
        })}
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
        {interactive ? (
          <button
            type="button"
            className="hot get-in-touch-button"
            data-glow="Get in touch"
            ref={feedbackButtonRef}
            onClick={onFeedback}
          >
            Get in touch
          </button>
        ) : (
          <span className="get-in-touch-button">Get in touch</span>
        )}
      </p>
    </article>
  );
}

// Static or rarely changing; skip re-rendering when the desk opens and closes.
export default memo(ResumePaper);
