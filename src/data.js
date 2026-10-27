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
      alt: "Tracy Tran with pink hair",
    },
    {
      src: "photos/tracy-portrait.jpg",
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
      "Built an Electron desktop app that freezes every monitor on a global hotkey, captures a drag-selected region, and streams a ChatGPT answer about it back into the app.",
      "Implemented Sign in with ChatGPT with OAuth 2.0 + PKCE; tokens never leave the main process, are encrypted with Electron safeStorage, refresh before expiry, and are revoked on every sign-out path.",
      "Hardened the process boundary with sandboxed, network-isolated renderers, a 19-function preload bridge, and sender checks on every IPC handler, covered by 79 automated tests.",
      "Profiled the packaged app: 665 ms warm start, 25 ms to crop and encode a capture, about 2% of one CPU core at idle, and flat memory across 60 repeated captures.",
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
      "Built an extension that warns non-technical users when a form asks for SSNs, card or bank numbers, passwords or health data, classifying fields from metadata only; it never reads typed values and makes no network requests.",
      "Added on-device checks for HTTP pages, HTTP form actions and lookalike domains, with warnings in a closed shadow DOM that are restored, up to a capped limit, if a page removes them.",
      "Benchmarked against a no-extension baseline on 10 page types: reminders appear 56–82 ms after a typical form loads, typing latency is unchanged (5–8 ms to the next frame), and content-script CPU time fell 65% on pages that rewrite fields every 50 ms.",
      "Tested with unit, accuracy and Playwright browser suites across 24 test pages, including a source scan that fails if form values are read; submitted v0.1.1 to the Chrome Web Store.",
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
    dates: "Aug 2025 — Present",
    role: "IT Telecommunications Student Assistant",
    org: "school",
    bullets: [
      "Resolve support tickets from faculty, staff and students covering account access, authentication, phone and network issues.",
      "Configure Zoom Phone accounts, activate Ethernet data jacks, and manage access permissions under university IT security procedures; write troubleshooting guides for recurring issues.",
    ],
  },
  {
    dates: "Jul 2025 — Jan 2026",
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
  docs: "https://docs.google.com/document/d/1cqqpQz3JiCPoTXN346Ona1IGnQxdGXHQeb_I93CM8FM/edit?usp=sharing",
  docsLabel: "Read my documentation on Google Docs",
  summary:
    "Tracer is a free Windows desktop app for asking about whatever is on your screen. Press one shortcut, drag over the part you need, and Tracer sends that screenshot with your prompt to ChatGPT on your own ChatGPT plan, with no API key. The answer comes back in the Tracer window. For Gemini and Claude, it copies the screenshot and prompt and opens their sites.",
  steps: [
    "Electron's main process registers Ctrl+Shift+Space, or a shortcut you choose, with globalShortcut, so it works from any app.",
    "Tracer hides its window and freezes every monitor. Drag a box to capture that area, right-click to keep the whole monitor, or press Escape to cancel.",
    "The main process crops the frozen frame and hands the window a preview. Nothing is uploaded yet.",
    "Edit the prompt or pick one from Past Prompts, Favorites, or Saved Prompts, then press Ctrl+Enter.",
    "The main process sends the screenshot and prompt to ChatGPT's Responses API through Sign in with ChatGPT (OAuth with PKCE), and the answer streams back into the window.",
    "The windows are sandboxed with no network access. Tokens stay in the main process, encrypted with Electron's safeStorage, and the screenshot is never written to disk.",
  ],
  stack: [
    ["JavaScript", "Main process, preload bridge, and windows"],
    ["Electron", "Windows, global shortcut, screen capture, and safeStorage"],
    ["Node.js", "Runtime for the main process and the test runner"],
    ["OpenAI Responses API", "Streams the answer from the user's own ChatGPT plan"],
    ["OAuth 2.0 with PKCE", "Sign in with ChatGPT in the system browser; Tracer never sees the password"],
    ["Electron Forge and Vite", "Development, bundling, and Windows packaging"],
  ],
  prompts: [
    "Explain what is on my screen and tell me the next step.",
    "Summarize this in three bullet points.",
    "Translate this into plain English.",
  ],
  // Sample answers for the in-browser demo, one per saved prompt.
  replies: [
    "user has no key named plan, so line 42 crashes before a week can be built. Load the saved profile first, then read it with user.get(\"plan\") and handle the missing case.",
    "• plans.py stops at line 42 in build_week.\n• That user has no \"plan\" key, so user[\"plan\"] raises a KeyError.\n• Load the saved profile first, or use user.get(\"plan\") and handle a missing plan.",
    "The program stopped because it looked up this person's workout plan, and they don't have one saved yet. It should load their profile first, or skip that step when there's no plan.",
  ],
};

/** Everything on the laptop, bigger projects first. */
export const laptopProjects = ["tracer", "fittmm", "blu", "surfsafe", "merrynails"].map((id) =>
  projects.find((project) => project.id === id),
);
