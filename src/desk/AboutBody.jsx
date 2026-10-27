import { memo } from "react";
import { about } from "../data.js";

const base = import.meta.env.BASE_URL;

// The name tag renders this before anyone opens it, so it passes showPhotos=false until someone shows interest;
// the empty slots keep the same size, so nothing shifts when the photos arrive.
function AboutBody({ showPhotos = true }) {
  return (
    <>
      <div className="about-photos">
        {about.photos.map((photo) =>
          showPhotos ? (
            <picture key={photo.src}>
              <source
                type="image/webp"
                srcSet={`${base}${photo.webp}-480.webp 480w, ${base}${photo.webp}-960.webp 960w`}
                sizes="(max-width: 640px) 90vw, 360px"
              />
              <img src={`${base}${photo.src}`} alt={photo.alt} decoding="async" />
            </picture>
          ) : (
            <span key={photo.src} className="about-photo-slot" />
          ),
        )}
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

// Static or rarely changing; skip re-rendering when the desk opens and closes.
export default memo(AboutBody);
