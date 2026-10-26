import { laptopProjects } from "../data.js";
import { projectDetails } from "./projectDetails.js";

export default function ProjectsBody({ onOpen }) {
  return (
    <div className="projects-page">
      {laptopProjects.map((project) => {
        const detail = projectDetails[project.id];
        if (!detail) return null;
        const stack = project.stack.split("|").map((item) => item.trim());
        return (
          <article className="mac-project" key={project.id}>
            <h3>{project.name}</h3>
            <p className="mac-kicker">{project.tagline}</p>
            <p>{detail.about}</p>
            {project.bullets.length > 0 ? (
              <ul>
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            <p className="mac-stack">{stack.join(" · ")}</p>
            <p className="mac-status">{detail.status}</p>
            {detail.links.length > 0 || (onOpen && detail.walkthrough) ? (
              <div className="mac-links">
                {detail.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
                {onOpen && detail.walkthrough ? (
                  <button
                    type="button"
                    onClick={(event) => onOpen(project.id, event.currentTarget)}
                  >
                    Open walkthrough
                  </button>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
