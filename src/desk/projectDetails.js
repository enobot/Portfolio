import { tracer } from "../data.js";

/** Verified notes for each project on the laptop. `walkthrough` marks the ones
 *  with an in-browser walkthrough. */
export const projectDetails = {
  tracer: {
    about: tracer.summary,
    status:
      "Version 1.0.0 for Windows 10 and 11 is out on GitHub. It isn't code-signed yet, so Windows asks before the first run. Tested live with a real ChatGPT account, and 102 automated tests run on every push.",
    links: [
      { href: tracer.download, label: "Download for Windows" },
      { href: tracer.repo, label: "GitHub" },
      { href: tracer.docs, label: "Documentation" },
    ],
    walkthrough: true,
  },
  drawgorithms: {
    about:
      "Drawgorithms runs your JavaScript one step at a time and draws what it does: variables, arrays, maps, trees, linked lists and the call stack, next to the line that ran. It's for practicing coding-interview problems by watching your own code, bugs included.",
    status:
      "In development and not deployed yet. The heap, graph, trie, deque and union-find drawings in the clips are on a branch that isn't merged into main yet.",
    links: [{ href: "https://github.com/enobot/Drawgorithm", label: "GitHub" }],
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
  portfolio: {
    about: "This site: an interactive desk in React, Vite and Motion.",
    status: "Live on Vercel. Measurements are in PERFORMANCE_AUDIT.md in the repository.",
    links: [
      { href: "https://github.com/enobot/Portfolio", label: "GitHub" },
      {
        href: "https://github.com/enobot/Portfolio/blob/main/PERFORMANCE_AUDIT.md",
        label: "Performance audit",
      },
    ],
  },
  surfsafe: {
    about:
      "Shouldn't Wouldn't is a privacy-first Chrome extension that gently warns people when a website asks for sensitive information, with the checks running on their own computer.",
    status:
      "Version 0.1.1 was submitted to the Chrome Web Store on October 26, 2026 and is waiting for Google's review. Version 0.2.0 adds a choice of 12 languages for the extension's own reminders; those translations are waiting for review by native speakers. Unit, accuracy and real-browser tests run on every push.",
    links: [{ href: "https://github.com/enobot/ShouldntWouldnt", label: "GitHub" }],
    walkthrough: true,
  },
};
