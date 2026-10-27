/** Resume copy. Tracer is included so the project hotspot on the page is real. */

export const profile = {
  name: "Tracy Tran",
  location: "Fullerton, CA",
  linkedin: "https://www.linkedin.com/in/tracythutran/",
  linkedinLabel: "LinkedIn",
  email: "m.tracy.tran@gmail.com",
  school: "California State University, Fullerton",
  schoolUrl: "https://www.fullerton.edu/",
  gmailUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=m.tracy.tran@gmail.com",
  github: "https://github.com/enobot",
  githubLabel: "GitHub",
};

export const summary =
  "Computer Science student (B.S. expected May 2027) and full-stack developer who ships desktop, web, browser-extension and Android software. Works in JavaScript/TypeScript, React, Node.js, Python/FastAPI, Electron and SQL, with a focus on privacy, security and tested code.";

export const about = {
  greeting: "Hi, I'm Tracy!",
  photos: [
    {
      src: "photos/tracy-color.jpg",
      webp: "photos/tracy-color",
      alt: "Tracy Tran with pink hair",
    },
    {
      src: "photos/tracy-portrait.jpg",
      webp: "photos/tracy-portrait",
      alt: "Black and white portrait of Tracy Tran",
    },
  ],
  intro:
    "I'm a Computer Science student at Cal State Fullerton, graduating in May 2027, and a full-stack developer who likes building software that makes everyday life a little easier, especially for people who don't love complicated technology.",
  sections: [
    {
      heading: "How I got here",
      paragraphs: [
        "I'm a first-generation college student, and I started college at 16 planning to become a veterinarian. Then I taught myself JavaScript, and building websites and small tools for my family showed me what I actually wanted to do.",
        "I completed Hack Reactor's software engineering program, then came back to school to finish my Computer Science degree at Cal State Fullerton, where I've made the Dean's List in Fall 2025 and Spring 2026.",
      ],
    },
    {
      heading: "What I like to build",
      paragraphs: [
        "Software for real people. Tracer started from how many steps it takes to get help with whatever is on screen, and it's partly inspired by my parents' experience with technology and language barriers. Merry Nails is the website for my mom's salon. FITTMM was a three-person team project that I led.",
        "I care about the parts people don't see, too: keeping data private, making things easy to use, and testing what I ship.",
      ],
    },
    {
      heading: "Teaching",
      paragraphs: [
        "I love teaching. I taught JavaScript and Python to kids at Code Ninjas through Roblox and Minecraft projects, and I'm usually the one helping a classmate until something finally clicks. Someday I'd like to teach computer science at the college level while working as a software engineer.",
      ],
    },
    {
      heading: "How I work",
      paragraphs: [
        "I ask a lot of questions (my professors can vouch for that). I'd rather ask one more and get it right than pretend I have everything figured out, and I always say where things stand.",
      ],
    },
  ],
  facts: {
    heading: "Outside of code",
    items: [
      "I can deadlift 405 lbs.",
      "I'll take on any spicy food challenge.",
      "I have 2 cats and 2 dogs, so it's a small zoo at home. Fitting, for someone who almost became a vet.",
    ],
  },
  closing:
    "I'm still learning and still asking questions, and I want to build things that help people. If that sounds like someone you'd like on your team, I'd love to hear from you.",
};

export const proficiencies = [
  ["Languages", "JavaScript, TypeScript, Python, SQL, Java, Kotlin, C++, HTML/CSS"],
  [
    "Frameworks, Backend & Databases",
    "React, Node.js, Express, FastAPI, Electron, Android SDK, Tailwind CSS, PostgreSQL, MySQL, MongoDB, Firebase (Auth, Firestore)",
  ],
  [
    "Tools & Support",
    "Git/GitHub, Claude, Cursor, ChatGPT, Playwright, Lighthouse, Chrome DevTools, k6, New Relic, NGINX, Vercel, technical documentation, IT support",
  ],
  [
    "Concepts",
    "REST APIs, OAuth 2.0 (PKCE), Chrome extensions (Manifest V3), automated testing, performance profiling, access management",
  ],
];

export const education = {
  dates: "Aug 2025 — May 2027",
  degree: "B.S. Computer Science",
  gpa: "GPA: 3.71/4.00",
  place: "Fullerton, CA",
  certificate: {
    title: "Software Engineering Certificate, Hack Reactor",
    detail:
      "Full-stack development, JavaScript, Python, web frameworks, SQL, TDD",
  },
};

export const projects = [
  {
    id: "tracer",
    name: "Tracer",
    tagline: "AI-Powered Windows Desktop Assistant",
    stack: "Electron | Node.js | JavaScript | OAuth 2.0 | OpenAI API",
    bullets: [
      "Built and released (v1.0.0) an Electron desktop app that freezes every monitor on a global hotkey, captures a drag-selected region, and streams a formatted ChatGPT answer back, with follow-up questions.",
      "Implemented Sign in with ChatGPT with OAuth 2.0 + PKCE; tokens never leave the main process, are encrypted with Electron safeStorage, refresh before expiry, and are revoked on every sign-out path.",
      "Hardened the process boundary with sandboxed, network-isolated renderers, a 21-function preload bridge, and sender checks on every IPC handler, covered by 102 automated tests run on every push.",
      "Cut shortcut-to-capture latency 16% (711 → 599 ms median); the installed app starts warm in 305 ms, keeps memory flat over 50 captures, and uses no CPU or network while idle.",
    ],
  },

  {
    id: "fittmm",
    name: "FITTMM",
    repo: "https://github.com/enobot/FITTMM",
    tagline: "Full-Stack Fitness Web Application",
    stack: "React | FastAPI | MySQL | Kotlin | Java | Firebase",
    bullets: [
      "Led a 3-person team building a workout-planning web app; owned the repository and merged 11 of the team's 16 merged pull requests.",
      "Built the React frontend (sign-in, multi-step plan builder, workout recording, progress history, lb/kg plate calculator) and integrated it with teammates' FastAPI/MySQL REST API.",
      "Building the Android version in Kotlin and Java on Firebase Auth and Firestore, with a repository layer for plans, sessions and profiles.",
    ],
  },
  {
    id: "blu",
    name: "BLU",
    tagline: "Full-Stack Social Platform for Gamers",
    stack: "React | JavaScript | REST APIs",
    bullets: [
      "Built component-driven navigation and authentication flows for registration, login, and profile management.",
      "Built the navigation bar, About modal, profile picture and mail components for the team's React frontend.",
    ],
  },
  {
    id: "surfsafe",
    name: "Shouldn't Wouldn't",
    repo: "https://github.com/enobot/ShouldntWouldnt",
    tagline: "Privacy-First Chrome Extension",
    stack: "TypeScript | Chrome Extensions API (Manifest V3) | Playwright",
    bullets: [
      "Built an extension that warns non-technical users when a form asks for SSNs, card or bank numbers, IDs or health data (email, password and phone only on risky pages), using field metadata only; it never reads typed values or sends data.",
      "Added on-device checks for HTTP pages, HTTP form actions and lookalike domains, with warnings in a closed shadow DOM that are restored, up to a capped limit, if a page removes them.",
      "Benchmarked against a no-extension baseline on 10 page types: reminders appear 56–82 ms after a typical form loads, typing latency is unchanged (5–8 ms to the next frame), and content-script CPU time fell 65% on pages that rewrite fields every 50 ms.",
      "Tested with unit, accuracy and Playwright browser suites, including a source scan that fails if form values are read; submitted v0.1.1 to the Chrome Web Store and added a choice of 12 languages, including right-to-left Arabic, in v0.2.0.",
    ],
  },
  {
    id: "portfolio",
    name: "tracythutran.com",
    repo: "https://github.com/enobot/Portfolio",
    tagline: "Interactive Résumé Portfolio",
    stack: "React | Vite | Motion | Vercel",
    bullets: [
      "Profiled slow mobile loads with Lighthouse and DevTools traces, then cut largest contentful paint from 5.7 s to 3.1 s (Lighthouse mobile 49 → 84, desktop 85 → 100) by serving the first screen as static HTML, deferring web fonts, and rendering the 3D desk after first paint.",
      "Replaced a ~1,400-node animated SVG and a text-shadow animation with compositor-friendly transforms and opacity, cutting main-thread work per interaction 18–48% and page weight 22%, verified with side-by-side A/B runs.",
    ],
  },
  {
    id: "getsy",
    name: "Getsy",
    tagline: "Product-Details Service (Hack Reactor System Design)",
    stack: "Node.js | Express | PostgreSQL | MongoDB | k6 | New Relic",
    bullets: [
      "Inherited a legacy product service and built its PostgreSQL version, comparing it against MongoDB on a 50M-row dataset (10M sellers, 10M stores, 30M products) generated with a streaming CSV seeder.",
      "Added delete and update endpoints, load-tested the read endpoint with k6 up to 1,400 virtual users, and instrumented the service with New Relic.",
    ],
  },
  {
    id: "merrynails",
    name: "Merry Nails",
    repo: "https://github.com/enobot/merrynails",
    tagline: "Website for My Mom's Nail Salon",
    stack: "React | React Router | Tailwind CSS | Vite | Vercel",
    bullets: [
      "Built a four-page React site with React Router and Tailwind CSS, deployed on Vercel, where customers browse services, compare options, and call the salon to book.",
      "Kept prices, hours, contact details, and page copy in plain data files so the salon can be updated without touching components, and generated the sitemap, robots.txt, and local-business structured data from one config at build time.",
      "Designed it to collect no customer information: booking is a phone call, with a setting ready to switch to an online booking page later.",
    ],
  },];

export const experience = [
  {
    dates: "Aug 2025 – Present",
    role: "IT Telecommunications Student Assistant",
    org: "school",
    bullets: [
      "Resolve support tickets from faculty, staff and students covering account access, authentication, phone and network issues.",
      "Configure Zoom Phone accounts, activate Ethernet data jacks, and manage access permissions under university IT security procedures; write troubleshooting guides for recurring issues.",
    ],
  },
  {
    dates: "Jul 2025 – Jan 2026",
    role: "Coding Instructor",
    org: "Code Ninjas",
    bullets: [
      "Taught JavaScript and Python through Roblox and Minecraft game projects, coaching students through programming logic and debugging at their own level.",
    ],
  },
];

export const achievements = [
  "Dean's List — Fall 2025; Spring 2026",
  "Emeritus Scholarship — Merit-based academic scholarship",
];

export const tracer = {
  repo: "https://github.com/enobot/Tracer",
  repoLabel: "github.com/enobot/Tracer",
  // Always the newest installer; release notes for 1.0.0.
  download: "https://github.com/enobot/Tracer/releases/latest/download/Tracer-Setup-win32-x64.exe",
  release: "https://github.com/enobot/Tracer/releases/tag/v1.0.0",
  docs: "https://docs.google.com/document/d/1cqqpQz3JiCPoTXN346Ona1IGnQxdGXHQeb_I93CM8FM/edit?usp=sharing",
  docsLabel: "Read my documentation on Google Docs",
  summary:
    "Tracer is a free Windows desktop app for asking about whatever is on your screen. Press one shortcut, drag over the part you need, and Tracer sends that screenshot with your prompt to ChatGPT on your own ChatGPT plan, with no API key. The answer comes back in the Tracer window. For Gemini and Claude, it copies the screenshot and prompt and opens their sites.",
  steps: [
    "Electron's main process registers Ctrl+Shift+Space, or a shortcut you pick with Set Hotkey, with globalShortcut, so it works from any app.",
    "Tracer hides its window and freezes every monitor. Drag a box to capture that area, right-click to take the whole monitor, or press Esc to cancel.",
    "With Send right after capture on (the default), the capture goes to ChatGPT with your prompt as soon as you let go. Turn it off to look at the screenshot first, then send it with Analyze screenshot or Ctrl+Enter.",
    "The main process sends the screenshot and prompt to ChatGPT's Responses API through Sign in with ChatGPT (OAuth with PKCE), on your own plan. The answer streams back word by word, formatted with headings, lists, tables and code.",
    "Ask follow-ups in the box under the answer. Each one sends the screenshot again with the conversation so far.",
    "The windows are sandboxed with no network access. Tokens stay in the main process, encrypted with Electron's safeStorage, and the screenshot is never written to disk.",
    "Closing the window leaves Tracer in the system tray, so the shortcut keeps working. The buttons come in English and 20 other languages, and answers can come back in 217.",
  ],
  stack: [
    ["JavaScript", "Main process, preload bridge, and windows"],
    ["Electron", "Windows, global shortcut, screen capture, tray, and safeStorage"],
    ["Node.js", "Runtime for the main process and the test runner"],
    ["OpenAI Responses API", "Streams the answer from the user's own ChatGPT plan"],
    ["OAuth 2.0 with PKCE", "Sign in with ChatGPT in the system browser; Tracer never sees the password"],
    ["Electron Forge and Vite", "Development, bundling, and the Windows installer"],
  ],
  prompts: [
    "Explain what is visible in this screenshot.",
    "Summarize this in three bullet points.",
    "Translate this into plain English.",
  ],
  // Sample answers for the in-browser demo, one per saved prompt.
  replies: [
    "user has no key named plan, so line 42 crashes before a week can be built. Load the saved profile first, then read it with user.get(\"plan\") and handle the missing case.",
    "• plans.py stops at line 42 in build_week.\n• That user has no \"plan\" key, so user[\"plan\"] raises a KeyError.\n• Load the saved profile first, or use user.get(\"plan\") and handle a missing plan.",
    "The program stopped because it looked up this person's workout plan, and they don't have one saved yet. It should load their profile first, or skip that step when there's no plan.",
  ],
  // A follow-up the demo suggests, and its sample answer.
  followUp: {
    question: "How do I fix line 42?",
    answer:
      "Give the lookup a default so a missing plan can't crash it:\n\nlevel = user.get(\"plan\", \"beginner\")\n\nIf a missing plan should stop the week from being built instead, check for it first and show the user a message before calling build_week.",
  },
};

/** The résumé paper on the desk mirrors the PDF résumé
 *  (handoff/resume/resume.html): the same projects, order, taglines and
 *  stacks. Bullets come from `projects` so the laptop and the résumé can't
 *  drift apart; Merry Nails keeps the PDF's single line. */
export const resumeProjects = [
  { id: "tracer", tagline: "Windows screenshot assistant for ChatGPT", stack: "Electron, Node.js, JavaScript, OAuth 2.0 (PKCE)" },
  { id: "surfsafe", tagline: "Privacy-first Chrome extension", stack: "TypeScript, Chrome Extensions API (Manifest V3), Playwright" },
  { id: "fittmm", tagline: "Fitness planning app, web + Android", stack: "React, FastAPI, MySQL, Kotlin, Java, Firebase" },
  { id: "portfolio", tagline: "Interactive résumé portfolio", stack: "React, Vite, Motion, Vercel" },
  { id: "getsy", tagline: "Product-details service (Hack Reactor system design)", stack: "Node.js, Express, PostgreSQL, MongoDB, k6, New Relic" },
  {
    id: "merrynails",
    tagline: "Website for a family-owned salon",
    stack: "React, React Router, Tailwind CSS, Vercel",
    bullets: [
      "Built and deployed a four-page site where customers browse services and call to book; prices, hours and policies live in data files so the salon can update them without code changes.",
    ],
  },
].map((entry) => {
  const project = projects.find((item) => item.id === entry.id);
  return { ...project, ...entry, bullets: entry.bullets ?? project.bullets };
});

export const resumeEducation = {
  degree: "B.S. Computer Science",
  gpa: "GPA: 3.71/4.00",
  when: "Expected May 2027",
  honors:
    "Dean's List (Fall 2025, Spring 2026) · Emeritus Scholarship (merit-based) · Coursework: Software Engineering, Algorithm Engineering, Compilers & Languages",
  certificate: "Software Engineering Immersive Certificate",
  certificateFrom: "Hack Reactor",
};

/** Everything on the laptop, bigger projects first. */
export const laptopProjects = ["tracer", "fittmm", "blu", "surfsafe", "merrynails"].map((id) =>
  projects.find((project) => project.id === id),
);
