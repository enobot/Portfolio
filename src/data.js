/**
 * Everything visitors see lives in this file.
 * Replace the sample text, then run `npm run dev` to preview.
 * Leave a link as "" until you have a URL — the button stays hidden.
 */

export const profile = {
  name: "Your Name",
  role: "Computer Science Student",
  location: "City, State",
  school: "Your University",
  degree: "B.S. Computer Science",
  graduation: "2028",
  availability: "Open to internships",
  email: "you@example.com",
  github: "https://github.com/your-handle",
  githubLabel: "github.com/your-handle",
  linkedin: "https://www.linkedin.com/in/your-handle",
  linkedinLabel: "LinkedIn",
  resume: "",
  focus: ["Systems", "Programming languages", "Interfaces"],
  headline: "I like software you can explain on a whiteboard.",
  summary:
    "Computer science student working on systems, languages, and the small tools that make them easier to trust. I like taking a fuzzy problem and leaving behind code someone else can reason about.",
};

export const projects = [
  {
    title: "MiniDB",
    year: "2026",
    summary:
      "A teaching database with a SQL subset, paged storage, and a cost-based planner. The point was to see the path from a query string to a result table, including a readable EXPLAIN.",
    stack: ["C++", "SQL", "B+ trees"],
    repo: "",
    demo: "",
  },
  {
    title: "RaftKV",
    year: "2025",
    summary:
      "A key-value store replicated across three nodes with a simplified Raft protocol. Leaders, elections, and a log you can watch fill in from separate terminals.",
    stack: ["Go", "RPC", "Concurrency"],
    repo: "",
    demo: "",
  },
  {
    title: "Pathfinder",
    year: "2025",
    summary:
      "A course planner that models a catalog as a graph and searches for a schedule that respects prerequisites, credit limits, and time conflicts.",
    stack: ["Python", "Graphs", "React"],
    repo: "",
    demo: "",
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    label: "Systems",
    items: ["Operating systems", "Networks", "Databases", "Concurrency"],
  },
  {
    label: "Tools",
    items: ["Git", "Linux", "Docker", "React", "Vite"],
  },
  {
    label: "Coursework",
    items: ["Data structures", "Algorithms", "Computer organization", "Discrete math"],
  },
];

export const experience = [
  {
    role: "Computer Science Tutor",
    org: "Your University",
    dates: "2025 — 2026",
    detail:
      "Weekly hours for data structures. Turned pointer bugs and recurrence relations into drawings students could replay on their own.",
  },
  {
    role: "Project lead",
    org: "Student computing club",
    dates: "2024 — 2025",
    detail:
      "Scoped a semester-long build, kept the repository reviewable, and shipped a demo the group could explain without opening the code.",
  },
];
