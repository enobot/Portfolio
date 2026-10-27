import { memo, useId } from "react";
import { experience, proficiencies, profile, resumeEducation, resumeProjects } from "../data.js";
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
          <HotLink href={profile.gmailUrl} tip="Send me a direct email!">
            {profile.email}
          </HotLink>
          <span className="dot" aria-hidden="true">
            ·
          </span>
          <HotLink href={profile.linkedin} tip="Check out my LinkedIn">
            linkedin.com/in/tracythutran
          </HotLink>
          <span className="dot" aria-hidden="true">
            ·
          </span>
          <HotLink href={profile.github} tip="Check out my GitHub">
            github.com/enobot
          </HotLink>
          <span className="dot" aria-hidden="true">
            ·
          </span>
          <span>tracythutran.com</span>
        </p>
      </header>

      <section>
        <h2>Education</h2>
        <div className="entry-head">
          <p className="role">
            <strong>{resumeEducation.degree}</strong>, <SchoolLink /> · {resumeEducation.gpa}
          </p>
          <p className="place">{resumeEducation.when}</p>
        </div>
        <p className="skill-line">
          <strong>Honors:</strong> {resumeEducation.honors}
        </p>
        {resumeEducation.coursework.map(([label, value]) => (
          <p className="skill-line" key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
        <p className="role">
          <strong>{resumeEducation.certificate}</strong>, {resumeEducation.certificateFrom}
        </p>
      </section>

      <section>
        <h2>Technical Skills</h2>
        {proficiencies.map(([label, value]) => (
          <p className="skill-line" key={label}>
            <strong>{label}:</strong> {value}
          </p>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {resumeProjects.map((project) => {
          const control = projectControls[project.id];
          return (
            <div className="entry" key={project.name}>
              <h3>
                {control ? (
                  <ProjectName project={project} interactive={interactive} {...control} />
                ) : (
                  project.name
                )}
                <span className="tagline"> — {project.tagline}</span>{" "}
                <span className="stack-inline">| {project.stack}</span>
              </h3>
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
            <div className="entry-head">
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
              <p className="place">{job.dates}</p>
            </div>
            <ul className="bullets">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
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
