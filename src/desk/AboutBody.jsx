import { about } from "../data.js";

export default function AboutBody() {
  return (
    <>
      <div className="about-photos">
        {about.photos.map((photo) => (
          <img
            key={photo.src}
            src={`${import.meta.env.BASE_URL}${photo.src}`}
            alt={photo.alt}
          />
        ))}
      </div>
      <p className="about-copy about-lead">{about.intro}</p>
      {about.sections.map((section) => (
        <section className="about-section" key={section.heading}>
          <h3 className="about-heading">{section.heading}</h3>
          {section.paragraphs.map((paragraph) => (
            <p className="about-copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <h3 className="about-heading">{about.facts.heading}</h3>
      <ul className="about-facts">
        {about.facts.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="about-copy about-closing">{about.closing}</p>
    </>
  );
}
