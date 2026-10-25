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
  intro: [
    "I'm a first-generation college student, aspiring software engineer, and someone who originally dreamed of becoming a veterinarian. Somehow, life took me from wanting to save animals to writing code, and honestly, I'm pretty happy with where I ended up!",
    "My journey into tech wasn't exactly traditional. I started by teaching myself how to code, attended a software engineering bootcamp, and eventually decided to return to college to pursue my Computer Science degree at Cal State Fullerton.",
    "What I love most about programming is that I can take an idea and turn it into something useful. I want to build technology that makes people's everyday lives a little easier, whether that's solving a small inconvenience or creating something that genuinely helps someone.",
    "But coding isn't my only passion. I love teaching, too! I've spent time tutoring kids and helping my classmates understand difficult concepts, and there's something really special about seeing that moment when everything finally clicks. One of my biggest dreams is to work as a software engineer while also teaching computer science someday. I want to keep learning, but I also want to share what I've learned along the way.",
  ],
  more: {
    heading: "A little more about me...",
    paragraphs: [
      "One thing you should know about me is that I'm not afraid to ask questions. My professors can definitely vouch for that. I'm usually the student asking one more question after class, showing up with another problem, or sending yet another email.",
      "I'm naturally curious, I probably overcommunicate, and I'm not afraid to admit when I don't know something. I'd rather ask a hundred questions and learn something new than pretend I have everything figured out.",
      "So, if you're looking for someone who's curious, eager to learn, communicates (maybe a little too much), and genuinely cares about doing things right, I might just be your person!",
    ],
  },
  facts: {
    heading: "Some fun facts about me!",
    items: [
      "I can deadlift 405 lbs! I love lifting heavy things almost as much as I love solving problems.",
      "I love spicy food challenges. My spice tolerance might actually be stronger than my debugging patience.",
      "I have 2 cats and 2 dogs. My house is basically a tiny zoo, which is fitting for someone who originally wanted to be a vet.",
      "I genuinely love teaching. Sometimes explaining a concept to someone else is more exciting than figuring it out myself.",
      "I'm a lifelong learner. Whether it's a new programming language, a challenging algorithm, or something completely unrelated to tech, I love figuring out how things work.",
    ],
  },
  closing:
    "I'm still learning, still asking questions, and still figuring out where this journey will take me. But one thing I know for sure is that I want to build things that help people and encourage others to believe they can do the same.",
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
    "Tracer is a Windows desktop assistant for work that is already on screen. The whole interaction is one global hotkey and one saved prompt: press Ctrl+Shift+Space, Tracer grabs the display, and that image is meant to travel with the prompt so the answer can come back in the Tracer window.",
  steps: [
    "Electron's main process registers Ctrl+Shift+Space with globalShortcut. The shortcut still fires when another application is focused.",
    "The main process sends a hotkey-pressed message to the Tracer window.",
    "A preload script exposes window.tracer through contextBridge. The page does not get raw Node.js. A ping channel also checks that the sender is Tracer's own window.",
    "The renderer captures the display, draws a single frame onto a canvas, and stores the PNG.",
    "Next, that screenshot and the saved prompt go to the model, and the reply is shown in the window. The walkthrough below includes an example of that reply. Sending it to the model is the step still being built.",
  ],
  stack: [
    ["JavaScript", "Application code in the main process and the window"],
    ["Electron", "Desktop window, global hotkey, and screen access"],
    ["Node.js", "Runtime for the main process"],
    ["Electron Forge", "Runs the app in development and packages it"],
    ["Vite", "Bundles the window during development"],
    ["HTML and CSS", "Structure and styling inside the window"],
  ],
  prompt: "Explain what is on my screen and tell me the next step.",
  reply:
    "user has no key named plan, so line 42 crashes before a week can be built. Load the saved profile first, then read it with user.get(\"plan\") and handle the missing case.",
};
