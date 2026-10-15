export const profile = {
  name: "Alexey Kim",
  email: "kim.alyosha@gmail.com",
  linkedin: "https://www.linkedin.com/in/alexeykim-sbu/",
  introduction:
    "I'm Alexey Kim, an Information Systems student at Stony Brook University, connecting technology, business and data to understand practical problems.",
  about: [
    "I chose Information Systems because I’m interested in both how technology works and how people use it. I enjoy breaking down problems, organizing information, and finding ways to make everyday tasks easier. I'm especially interested in how data and technology can support better business decisions.",
    "My experience includes university websites, student and customer support, and programming instruction. I enjoy work that combines technical understanding with clear communication.",
    "Originally from Kazakhstan and now studying in New York, I bring an international perspective and communicate in English and Russian.",
  ],
};

export const experiences = [
  {
    role: "Registration Workshop Assistant",
    organization: "Stony Brook University · Undergraduate Advising Services",
    date: "Jun — Aug 2026",
    kind: "Campus role",
    description:
      "Guided 25+ incoming transfer students through fall schedule-building by analyzing degree requirements using DegreeWorks and Stony Brook University Catalog to finalize course plans.\nTrained students on the SBU student portal (Solar) resolving registration and navigation issues in real time to ensure a smoothonboarding experience.",
    tags: ["Student support", "Communication"],
  },
  {
    role: "Front-End & CMS Developer",
    organization: "Stony Brook University · Languages and Cultural Studies",
    date: "Jan — May 2025",
    kind: "Campus role",
    description:
      "Updated departmental web content and worked on page layouts using HTML, CSS, and JavaScript. Collaborated with faculty to publish academic information.",
    tags: ["HTML / CSS / JavaScript", "Content management"],
  },
  {
    role: "Teaching Assistant · Russian Cinema",
    organization: "Stony Brook University · HUR 241",
    date: "Jan — May 2025",
    kind: "Teaching",
    description:
      "Supported course operations in Brightspace and coordinated communication between faculty and students.",
    tags: ["Brightspace", "Course operations"],
  },
  {
    role: "Programming Teacher",
    organization: "Inclusive Academy · Almaty, Kazakhstan",
    date: "May — Aug 2023",
    kind: "Teaching",
    description:
      "Taught HTML and CSS to students with disabilities, adapting instruction to their learning needs.",
    tags: ["HTML / CSS", "Teaching"],
  },
  {
    role: "1C Software Support Intern",
    organization: "Computer Center “Server” · Shymkent, Kazakhstan",
    date: "Summers 2021 — 2023",
    kind: "Internship",
    description:
      "Helped clients with software configuration issues and documented support resolutions using 1C software.",
    tags: ["1C: Enterprise", "Technical support"],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "Development" | "Data" | "Planning";
  context: string;
  description: string;
  tools: string[];
  confirmed: string;
  pending?: string;
  illustration: "map" | "database" | "board";
  sections?: {
    heading: string;
    text: string;
  }[];
  files?: {
    label: string;
    path: string;
  }[];
};

export const projects: Project[] = [
  {
    id: "01",
    title: "FitMe — Agile Project Management",
    category: "Planning",
    context: "ISE 393 · Team project · Spring 2026",
    description:
      "A Jira and Confluence workspace for planning a fitness app. As the team's Scrum Master, I worked on a project covering user stories, sprint planning, progress tracking, and team reflection.",
  tools: ["Jira", "Confluence", "Scrum", "Sprint planning"],
  confirmed:
    "FitMe was an ISE 393 team project centered on planning a mobile fitness application. The proposed features included user registration, profile setup, workout logging, step tracking, calorie tracking, and a progress dashboard. Our workspace connected Jira tasks with supporting documentation in Confluence.",
  illustration: "board",
  sections: [
    {
      heading: "My role",
      text:
        "I served as Scrum Master in a four-person team, alongside a Product Owner, Developer, and QA Engineer. The project gave me practice working within a Scrum team and connecting project plans, task tracking, and team communication.",
    },
    {
      heading: "Jira: user stories and sprint tracking",
      text:
        "The first sprint contained six user stories, each estimated at five story points. Stories included assigned owners and moved through To Do, In Progress, and Done. A separate backlog captured future ideas such as goal setting, hydration reminders, social sharing, dark mode, macro tracking, and a friend leaderboard.",
    },
    {
      heading: "Confluence: planning and documentation",
      text:
        "Our team documented a product roadmap, sprint plan, daily Scrum updates, sprint review, and retrospective. The roadmap proposed four phases across eight sprints. Sprint planning covered the goal, team roles, capacity, dependencies, and risks, while daily Scrum notes tracked progress and blockers.",
    },
    {
      heading: "Risks and team improvements",
      text:
        "The documents considered dependencies such as phone pedometer permissions and food database integrations. The retrospective proposed earlier blocker reporting, more consistent Jira updates, peer reviews, and a shared Definition of Done checklist.",
    },
    {
      heading: "Project scope",
      text:
        "The materials below demonstrate our coursework in Agile planning and project documentation. Roadmap dates, release milestones, and performance targets represent the team's project plans rather than independently verified production results.",
    },
  ],
  files: [
      {
        label: "Jira — Sprint user stories (PNG)",
        path: "/projects/fitme/jira-sprint.png",
      },
      {
        label: "Jira — Sprint board (PNG)",
        path: "/projects/fitme/jira-board.png",
      },
      {
        label: "Jira — Future backlog (PNG)",
        path: "/projects/fitme/jira-backlog.png",
      },
      {
        label: "Confluence — Product roadmap (PDF)",
        path: "/projects/fitme/product-roadmap.pdf",
      },
      {
        label: "Confluence — Sprint planning (PDF)",
        path: "/projects/fitme/sprint-planning.pdf",
      },
      {
        label: "Confluence — Daily Scrum (PDF)",
        path: "/projects/fitme/daily-scrum.pdf",
      },
      {
        label: "Confluence — Sprint review (PDF)",
        path: "/projects/fitme/sprint-review.pdf",
      },
      {
        label: "Confluence — Sprint retrospective (PDF)",
        path: "/projects/fitme/sprint-retrospective.pdf",
      },
    ],
  },
];

export const skillGroups = [
  {
    number: "01",
    name: "Technology & data",
    description: "Tools I've studied or used in coursework and practical work.",
    skills: [
      "SQL",
      "Relational database design",
      "Microsoft Office (Excel, Access, Word)",
      "Google Workspace (Docs, Sheets, Slides, Drive)",
      "Java",
      "Python",
      "JavaScript",
      "HTML & CSS",
      "Git",
      "Content management",
      "React",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    number: "02",
    name: "Business & systems",
    description: "Connecting technical work to how organizations operate.",
    skills: [
      "Jira & Confluence",
      "Work breakdown structure (WBS)",
      "IT project management",
      "Scope & scheduling",
      "Stakeholder coordination",
      "Business finance",
      "Engineering economics",
      "Systems troubleshooting",
    ],
  },
  {
    number: "03",
    name: "People & communication",
    description: "Experience explaining, supporting, and working with others.",
    skills: [
      "Technical support",
      "Teaching & mentoring",
      "Team collaboration",
      "Client communication",
      "English",
      "Russian",
    ],
  },
];
