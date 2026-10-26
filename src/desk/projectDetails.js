import { tracer } from "../data.js";

/** Verified notes for each project on the laptop. `walkthrough` marks the ones
 *  with an in-browser walkthrough. */
export const projectDetails = {
  tracer: {
    about: tracer.summary,
    status:
      "Region capture works on Windows and 70 automated tests pass. A live signed-in ChatGPT reply hasn't been tried yet.",
    links: [
      { href: tracer.repo, label: "GitHub" },
      { href: tracer.docs, label: "Documentation" },
    ],
    walkthrough: true,
  },
  merrynails: {
    about:
      "The website for Merry Nails Salon, my mom's nail salon in Sherman Oaks. Customers can browse services, compare options, see sample photos, and call to book.",
    status:
      "Live on Vercel. Demo photos are labeled as samples until the salon's own are ready, and a custom domain is next.",
    links: [
      { href: "https://merrynails.vercel.app", label: "Visit the site" },
      { href: "https://github.com/enobot/merrynails", label: "GitHub" },
    ],
  },
  fittmm: {
    about:
      "FITTMM is a fitness app with a React and FastAPI web version and an Android version in the same repository.",
    status: "Web walkthroughs are ready. The Android version is progress so far.",
    links: [{ href: "https://github.com/enobot/FITTMM", label: "GitHub" }],
    walkthrough: true,
  },
  blu: {
    about:
      "BLU is G.F. Finder, a social app for putting a team together before a match. The in-browser demo uses sample players.",
    status: "In-browser demo. The repository belongs to Blu-Organization.",
    links: [
      {
        href: "https://github.com/Blu-Organization/FinalGFFinder",
        label: "GitHub",
      },
    ],
    walkthrough: true,
  },
  surfsafe: {
    about:
      "SurfSafe, also called Shouldn't Wouldn't, is a privacy-first Chrome extension that will warn people when a website asks for sensitive information, with the checks running on their own computer.",
    status: "Just getting started: the repository is set up and the extension is being designed.",
    links: [],
  },
};
