import { experience, profile, projects, skillGroups } from "./data.js";

function External({ href, children, className }) {
  if (!href) return null;
  const external = href.startsWith("http");
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="page">
      <a className="skip" href="#work">
        Skip to work
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top">
            {profile.name}
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main id="top" className="shell">
        <section className="hero">
          <div>
            <p className="kicker">
              <span className="mark" aria-hidden="true" />
              {profile.role}
              {profile.location ? ` · ${profile.location}` : ""}
            </p>
            <h1>{profile.name}</h1>
            <p className="focus">{profile.focus.join("  ·  ")}</p>
            <p className="lede">{profile.headline}</p>
          </div>

          <div className="hero-copy">
            <p>{profile.summary}</p>
            <dl className="facts">
              <div>
                <dt>School</dt>
                <dd>{profile.school}</dd>
              </div>
              <div>
                <dt>Degree</dt>
                <dd>
                  {profile.degree}
                  {profile.graduation ? `, ${profile.graduation}` : ""}
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{profile.availability}</dd>
              </div>
            </dl>
            <div className="actions">
              <External className="button" href={`mailto:${profile.email}`}>
                Email me
              </External>
              <External className="button button-ghost" href={profile.resume}>
                Resume
              </External>
              <External href={profile.github}>{profile.githubLabel}</External>
              <External href={profile.linkedin}>{profile.linkedinLabel}</External>
            </div>
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-head">
            <h2>Selected work</h2>
            <p>Systems, tools, and a catalog I wished I had.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className="project" key={project.title}>
                <p className="project-index">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="stack">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {(project.repo || project.demo) && (
                    <p className="project-links">
                      <External href={project.repo}>Source</External>
                      <External href={project.demo}>Demo</External>
                    </p>
                  )}
                </div>
                <p className="project-year">{project.year}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-head">
            <h2>Skills</h2>
            <p>What I use, and what I have studied.</p>
          </div>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-head">
            <h2>Experience</h2>
            <p>Roles, labs, clubs, and jobs.</p>
          </div>
          <div className="jobs">
            {experience.map((job) => (
              <article className="job" key={`${job.role}-${job.org}`}>
                <p className="job-dates">{job.dates}</p>
                <div>
                  <h3>
                    {job.role}
                    <span> · {job.org}</span>
                  </h3>
                  <p>{job.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <p className="kicker">
            <span className="mark" aria-hidden="true" />
            Contact
          </p>
          <h2>Tell me what you are building.</h2>
          <p className="contact-links">
            <a className="email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <External href={profile.github}>{profile.githubLabel}</External>
            <External href={profile.linkedin}>{profile.linkedinLabel}</External>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <p>
            {profile.name} · {year}
          </p>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
