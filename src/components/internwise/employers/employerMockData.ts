import sofia from "@/assets/avatar-sofia.jpg";
import lukas from "@/assets/avatar-lukas.jpg";
import marta from "@/assets/avatar-marta.jpg";
import male1 from "@/assets/avatar-male1.jpg";
import female1 from "@/assets/avatar-female1.jpg";

export type EmployerBrief = {
  roles: string[];
  location: string;
  experienceLevel: string;
  skills: string[];
};

export type CandidateProject = {
  title: string;
  meta: string;
  detail: string;
};

export type CandidateLinks = {
  cv: string;
  linkedin: string;
  portfolio: string;
};

export type Candidate = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  score: number;
  skills: string[];
  reasons: string[];
  fitBullets: string[];
  skillBands: {
    strong: string[];
    basic: string[];
    learning: string[];
  };
  projects: CandidateProject[];
  gaps: string[];
  links: CandidateLinks;
};

export const storageKey = "internwise-employer-onboarding";

export const defaultBrief: EmployerBrief = {
  roles: ["Product"],
  location: "Remote",
  experienceLevel: "Intern",
  skills: ["Product Sense", "Analytics", "Communication"],
};

export const candidates: Candidate[] = [
  {
    id: "sofia",
    name: "Sofia Lindstrom",
    avatar: sofia,
    role: "Product Analyst Intern",
    location: "Berlin",
    score: 94,
    skills: ["Product Sense", "SQL", "Analytics"],
    reasons: [
      "Strong product thinking with sharp reporting and insight generation.",
      "Comfortable turning ambiguous questions into structured analysis.",
    ],
    fitBullets: [
      "Combines product intuition with strong analytical depth, which is rare at internship level.",
      "Already works well with structured reporting, experimentation, and insight communication.",
      "Location and availability fit a fast-moving European product team.",
      "Shows high signal for ownership without needing a heavy ramp-up period.",
    ],
    skillBands: {
      strong: ["Product Sense", "SQL", "Analytics"],
      basic: ["Python", "Dashboarding", "Stakeholder Reporting"],
      learning: ["A/B Testing", "User Research"],
    },
    projects: [
      {
        title: "Pricing insights dashboard",
        meta: "University consultancy project",
        detail: "Built a lightweight dashboard to compare product pricing, retention patterns, and market shifts for a SaaS case study.",
      },
      {
        title: "Product discovery sprint",
        meta: "Student startup team",
        detail: "Structured interviews, synthesized findings, and translated user friction into a prioritised opportunity list.",
      },
      {
        title: "Growth reporting assistant",
        meta: "Part-time fintech internship",
        detail: "Supported weekly reporting, cleaned source data, and surfaced performance changes for the growth lead.",
      },
    ],
    gaps: [
      "Has strong analytical signal, but still limited exposure to live production experiments.",
      "Would benefit from one more end-to-end product project with measurable shipped outcomes.",
    ],
    links: {
      cv: "#",
      linkedin: "https://linkedin.com/in/sofia-lindstrom",
      portfolio: "https://portfolio.internwise-demo.com/sofia",
    },
  },
  {
    id: "lukas",
    name: "Lukas Schneider",
    avatar: lukas,
    role: "Junior Product Designer",
    location: "Amsterdam",
    score: 91,
    skills: ["Figma", "UX Research", "Storytelling"],
    reasons: [
      "Excellent research-to-design flow for early product teams.",
      "Strong communication style makes cross-functional work easier.",
    ],
    fitBullets: [
      "High-quality visual communication makes his design thinking easy for teams to adopt quickly.",
      "Comfortable balancing discovery, prototyping, and narrative presentation work.",
      "Strong fit for internship or junior roles that need design support without heavy process overhead.",
    ],
    skillBands: {
      strong: ["Figma", "UX Research", "Storytelling"],
      basic: ["Prototyping", "Design Systems", "Usability Testing"],
      learning: ["HTML/CSS", "Product Analytics"],
    },
    projects: [
      {
        title: "B2B onboarding redesign",
        meta: "Portfolio case study",
        detail: "Mapped friction in onboarding and created a cleaner product flow with lower cognitive load for first-time users.",
      },
      {
        title: "Research synthesis sprint",
        meta: "Design internship",
        detail: "Summarised interview evidence and translated it into sharper user flows and usability fixes for a SaaS dashboard.",
      },
    ],
    gaps: [
      "Less evidence of shipping inside engineering constraints than some more technical candidates.",
    ],
    links: {
      cv: "#",
      linkedin: "https://linkedin.com/in/lukas-schneider",
      portfolio: "https://portfolio.internwise-demo.com/lukas",
    },
  },
  {
    id: "marta",
    name: "Marta Rossi",
    avatar: marta,
    role: "Growth Marketing Intern",
    location: "Paris",
    score: 88,
    skills: ["SEO", "Analytics", "Content"],
    reasons: [
      "Campaign-minded profile with clear growth and performance instincts.",
      "Content and reporting mix is useful for lean marketing teams.",
    ],
    fitBullets: [
      "Comfortable operating across content, SEO, and performance-style thinking.",
      "Has evidence of actually executing, not just planning, campaign work.",
      "Good match for employers who need a broad marketing intern rather than a narrow specialist.",
    ],
    skillBands: {
      strong: ["SEO", "Analytics", "Content"],
      basic: ["CRM", "Lifecycle", "Campaign Reporting"],
      learning: ["Paid Social", "Marketing Automation"],
    },
    projects: [
      {
        title: "Campus ambassador launch",
        meta: "Student-led growth project",
        detail: "Built a micro-campaign plan, coordinated creators, and tracked engagement to improve event signups.",
      },
      {
        title: "Editorial growth sprint",
        meta: "E-commerce internship",
        detail: "Improved blog structure and search visibility with a practical SEO and content refresh process.",
      },
    ],
    gaps: [
      "Strong generalist signal, but would benefit from deeper experience in paid acquisition or CRM tooling.",
    ],
    links: {
      cv: "#",
      linkedin: "https://linkedin.com/in/marta-rossi",
      portfolio: "https://portfolio.internwise-demo.com/marta",
    },
  },
  {
    id: "clara",
    name: "Clara Dubois",
    avatar: female1,
    role: "Frontend Intern",
    location: "Remote",
    score: 85,
    skills: ["React", "TypeScript", "Storytelling"],
    reasons: [
      "Strong UI execution with a product-sensitive mindset.",
      "Could add pace to shipping polished employer-facing surfaces.",
    ],
    fitBullets: [
      "Combines implementation skills with a clear sense of interface quality.",
      "Strong fit for product teams that need a frontend generalist who can grow quickly.",
      "Remote-friendly and likely to contribute well inside async workflows.",
    ],
    skillBands: {
      strong: ["React", "TypeScript", "UI Implementation"],
      basic: ["Testing", "State Management", "Accessibility"],
      learning: ["Performance Optimisation", "Backend Integration"],
    },
    projects: [
      {
        title: "Design system playground",
        meta: "Personal project",
        detail: "Built reusable UI components and interaction patterns in React with attention to consistency and usability.",
      },
      {
        title: "Event platform interface",
        meta: "Frontend bootcamp project",
        detail: "Created responsive pages and reusable card patterns for a lightweight discovery and booking workflow.",
      },
    ],
    gaps: [
      "Less evidence of working against production APIs than more experienced frontend candidates.",
      "Would strengthen quickly with one documented real-world shipping example.",
    ],
    links: {
      cv: "#",
      linkedin: "https://linkedin.com/in/clara-dubois",
      portfolio: "https://portfolio.internwise-demo.com/clara",
    },
  },
  {
    id: "elias",
    name: "Elias Novak",
    avatar: male1,
    role: "Data Intern",
    location: "Dublin",
    score: 82,
    skills: ["Python", "SQL", "Analytics"],
    reasons: [
      "Great fit for data-heavy internship projects and experimentation.",
      "Shows dependable analytical depth for an early-career profile.",
    ],
    fitBullets: [
      "Strong analytical foundation makes him useful for operational or reporting-heavy environments.",
      "Good fit for employers who want someone reliable, structured, and quantitative.",
      "Likely to work well on internal dashboards, reporting, and exploratory analysis.",
    ],
    skillBands: {
      strong: ["Python", "SQL", "Analytics"],
      basic: ["Excel", "Data Cleaning", "Visualisation"],
      learning: ["Experiment Design", "Product Metrics"],
    },
    projects: [
      {
        title: "Revenue trend analysis",
        meta: "Business analytics course",
        detail: "Modeled seasonal variance and created a simple reporting deck to explain operational changes in retail revenue.",
      },
      {
        title: "Operations KPI tracker",
        meta: "Part-time analyst support role",
        detail: "Prepared recurring metrics and simplified team visibility into weekly demand fluctuations.",
      },
    ],
    gaps: [
      "Analytical depth is good, but employer-facing communication examples are still limited.",
    ],
    links: {
      cv: "#",
      linkedin: "https://linkedin.com/in/elias-novak",
      portfolio: "https://portfolio.internwise-demo.com/elias",
    },
  },
];

export const readBrief = (): EmployerBrief => {
  if (typeof window === "undefined") {
    return defaultBrief;
  }

  const savedBrief = window.localStorage.getItem(storageKey);
  if (!savedBrief) {
    return defaultBrief;
  }

  try {
    return { ...defaultBrief, ...JSON.parse(savedBrief) };
  } catch {
    return defaultBrief;
  }
};
