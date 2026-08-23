import lookchaImg from "../assets/projects/lookcha.jpg";
import marsImg from "../assets/projects/mars.jpg";
import musavvirImg from "../assets/projects/musavvir.jpg";

export type ProjectLink = { label: string; href: string };

export type Project = {
  name: string;
  tagline: string;
  role?: string;
  tech: string[];
  highlights: string[];
  links: ProjectLink[];
  image?: string;
  /** Backend-only projects render a technical card instead of a screenshot. */
  technical?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "FlowDesk API",
    tagline: "Production-style CRM and internal business operations backend.",
    tech: ["FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "JWT", "Pytest", "Docker"],
    highlights: [
      "Role-based access control",
      "Lead workflow and business rules",
      "Activity logging",
      "Filtering, search and pagination",
      "20 automated tests",
      "GitHub Actions CI with PostgreSQL",
    ],
    links: [{ label: "View Source", href: "https://github.com/muminova02/flowdesk-api" }],
    technical: true,
  },
  {
    name: "Lookcha AI",
    tagline: "AI-powered virtual try-on platform for fashion e-commerce.",
    role: "Founder & Full-Stack Developer",
    tech: ["FastAPI", "MongoDB", "React", "AI Integration"],
    highlights: [
      "Product browsing",
      "Full-body photo upload",
      "Virtual try-on flow",
      "AI result delivery",
      "Recommendations",
      "Responsive interfaces",
    ],
    links: [
      { label: "Live Product", href: "https://lookcha.uz" },
      { label: "Case Study", href: "https://github.com/muminova02/lookcha_ai" },
      { label: "Source", href: "https://github.com/muminova02/lookcha-ai-source" },
    ],
    image: lookchaImg,
  },
  {
    name: "Mars Intern",
    tagline: "Gamified programming learning platform with structured progression.",
    role: "Product Creator & Full-Stack Developer",
    tech: ["FastAPI", "SQLAlchemy", "JWT", "React", "Vite", "Tailwind CSS"],
    highlights: [
      "Learning paths",
      "Level / stage progression",
      "XP and streaks",
      "Exercises and tests",
      "Flashcards",
      "Progress tracking",
      "JWT authentication",
    ],
    links: [{ label: "Case Study", href: "https://github.com/muminova02/mars-intern" }],
    image: marsImg,
  },
  {
    name: "Musavvir Edu",
    tagline:
      "Interactive educational platform combining traditional learning with 3D and AR-oriented experiences.",
    role: "Full-Stack Developer / Product Creator",
    tech: ["FastAPI", "React", "Three.js", "3D / AR"],
    highlights: [
      "Interactive 3D educational models",
      "Three.js experiences",
      "Content discovery and filtering",
      "3D / AR-oriented learning",
      "Interactive educational resources",
    ],
    links: [
      { label: "Live Product", href: "https://metatalim.uz" },
      { label: "Case Study", href: "https://github.com/muminova02/musavvir-edu" },
    ],
    image: musavvirImg,
  },
];

export type WorkflowStep = { title: string; description: string };

export const WORKFLOW: WorkflowStep[] = [
  { title: "Requirement", description: "Understand the goal and constraints." },
  { title: "Architecture", description: "Shape the data flow and technical approach." },
  {
    title: "AI-Assisted Implementation",
    description: "Move fast with AI tools while keeping control.",
  },
  { title: "Manual Review", description: "Read, verify, and refine generated code." },
  { title: "Debugging & Testing", description: "Validate behavior and edge cases." },
  { title: "Delivery", description: "Ship a working, maintainable result." },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Django", "Django REST Framework", "SQLAlchemy", "REST APIs", "Pydantic"],
  },
  {
    group: "Frontend",
    items: ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "HTML/CSS"],
  },
  {
    group: "Databases",
    items: ["PostgreSQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    group: "Backend / DevOps",
    items: ["JWT", "Alembic", "Docker", "Git", "GitHub", "Pytest", "Ruff", "GitHub Actions", "Swagger/OpenAPI", "Postman"],
  },
  {
    group: "AI Development",
    items: ["Claude Code", "Cursor", "ChatGPT"],
  },
  {
    group: "Additional",
    items: ["Java", "Telegram Bots", "Three.js", "Celery", "RabbitMQ"],
  },
];

export const EXPERIENCE = {
  title: "Python Instructor / Backend Development Mentor",
  company: "Mars IT School",
  location: "Tashkent, Uzbekistan",
  period: "2026 – Present",
  bullets: [
    "Teach Python, OOP, Django, Django REST Framework, REST APIs, databases and backend development.",
    "Mentor students while building practical web applications, APIs and Telegram bots.",
    "Review code and debug backend / application issues.",
    "Create practical assignments based on real development workflows.",
  ],
};

export const EDUCATION = {
  school:
    "Tashkent University of Information Technologies named after Muhammad Al-Khwarizmi",
  degree: "Bachelor's Degree — Economics and Management in ICT",
  period: "2022 – 2026",
  training: [
    "PDP Academy — Java Backend",
    "42.uz — Python Backend",
    "Coursera — Google Project Management",
  ],
};

export const CONTACTS = [
  { label: "Email", value: "muminova.2m@gmail.com", href: "mailto:muminova.2m@gmail.com" },
  { label: "GitHub", value: "github.com/muminova02", href: "https://github.com/muminova02" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/muqaddas-muminova",
    href: "https://linkedin.com/in/muqaddas-muminova",
  },
  { label: "Telegram", value: "t.me/Double_M_com", href: "https://t.me/Double_M_com" },
];
