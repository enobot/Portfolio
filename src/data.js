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
  "Computer Science student and full-stack developer with experience building full-stack web and desktop applications. Skilled in JavaScript, Python, React, Node.js, FastAPI, and MySQL. Experienced in leading development teams, designing REST APIs, debugging applications, and building practical software solutions.";

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
        "Software for real people. Tracer started from how many steps it takes to get help with whatever is on screen, and it's partly inspired by my parents' experience with technology and language barriers. Merry Nails is the website for my mom's salon. FITTMM was a five-person team project that I led.",
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
  ["Languages", "Python, JavaScript, SQL, HTML, CSS"],
  ["Frameworks & Backend", "React, FastAPI, Node.js, Express, Electron"],
  ["Databases", "MySQL, Relational Database Design"],
  [
    "Engineering",
    "Full-Stack Development, RESTful APIs, Authentication, API Integration, Debugging, IPC",
  ],
  [
    "Tools & Support",
    "Git/GitHub, Technical Documentation, IT Support, Access Management, IT Security, Vite",
  ],
];

export const education = {
  dates: "Aug 2025 — May 2027",
  degree: "B.S. Computer Science",
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
    stack: "Electron | Node.js | JavaScript | Vite | IPC | OCR | LLM APIs",
    bullets: [
      "Developed an AI-powered Windows desktop assistant to analyze on-screen content and generate contextual explanations, summaries, and translations.",
      "Implemented user-configurable global hotkeys using Electron, enabling users to activate the assistant from any application.",
      "Architected secure IPC communication between Electron's Main, Preload, and Renderer processes to support screen capture and AI-powered content processing.",
    ],
  },
  {
    id: "fittmm",
    name: "FITTMM",
    repo: "https://github.com/enobot/FITTMM",
    tagline: "Full-Stack Fitness Web Application",
    stack: "React | JavaScript | FastAPI | Python | MySQL | REST APIs",
    bullets: [
      "Led a 5-person development team in building a full-stack fitness application, coordinating task delegation, frontend development, and feature integration.",
      "Developed React/JavaScript UI and a state-driven multi-step workflow for personalized weekly workout plans.",
      "Implemented RESTful FastAPI endpoints and normalized MySQL schemas to persist user profiles and workout routines.",
    ],
  },
  {
    id: "blu",
    name: "BLU",
    tagline: "Full-Stack Social Platform for Gamers",
    stack: "Node.js | Express | JavaScript | REST APIs | Discord Integration",
    bullets: [
      "Built component-driven navigation and authentication flows for registration, login, and profile management.",
      "Developed Node.js/Express REST APIs for account creation and Discord integration, emphasizing secure authentication and scalable endpoint design.",
    ],
  },
];

export const experience = [
  {
    dates: "Aug 2025 — Present",
    role: "IT Student Assistant",
    org: "school",
    bullets: [
      "Resolved 200+ technical support tickets per week involving account access, authentication, login, phone, and network issues.",
      "Configured Zoom Phone accounts, activated Ethernet data jacks, and managed access permissions in accordance with university IT procedures.",
      "Diagnosed technical issues, documented solutions, and collaborated with IT teams to resolve service requests efficiently.",
      "Created technical documentation and troubleshooting guides to improve issue resolution and knowledge sharing.",
    ],
  },
  {
    dates: "Jul 2025 — Jan 2026",
    role: "Coding Instructor",
    org: "Code Ninjas",
    bullets: [
      "Taught JavaScript and Python programming through hands-on Roblox and Minecraft development projects.",
      "Guided students through programming logic, algorithms, debugging, and error resolution while adapting explanations to different skill levels.",
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

/** Projects shown on the laptop's Projects page but not on the printed résumé. */
export const moreProjects = [
  {
    id: "merrynails",
    name: "Merry Nails",
    tagline: "Website for My Mom's Nail Salon",
    stack: "React | React Router | Tailwind CSS | Vite | Vercel",
    bullets: [
      "Built a four-page React site (Home, Services, Policies, Visit Us) where customers browse services, compare options, and call the salon to book.",
      "Kept prices, hours, contact details, and page copy in plain data files, so the salon can be updated without touching components.",
      "Generated the sitemap, robots.txt, and local-business structured data from a single salon config at build time.",
      "Collects no customer information: booking is a phone call, with a setting ready to point at an online booking page later.",
    ],
  },
  {
    id: "surfsafe",
    name: "SurfSafe",
    tagline: "Privacy-First Chrome Extension",
    stack: "Chrome Extension",
    bullets: [],
  },
];
