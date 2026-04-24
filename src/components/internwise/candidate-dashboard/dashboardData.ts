import {
  Briefcase,
  FileUp,
  Layers3,
  Link as LinkIcon,
  Sparkles,
  Wand2,
} from "lucide-react";

export type CandidateMatch = {
  id: string;
  title: string;
  company: string;
  location: string;
  score: number;
  reasons: string[];
  missing?: string;
  overview: string;
  teamNote: string;
  breakdown: {
    overall: number;
    skills: number;
    experience: number;
    preferences: number;
  };
  gaps: {
    id: string;
    name: string;
    explanation: string;
  }[];
  recommendations: {
    id: string;
    title: string;
    impact: string;
  }[];
  employerPreview: {
    topSkills: string[];
    fitSummary: string;
  };
};

export type EmployerInterest = {
  id: string;
  company: string;
  action: "shortlisted" | "viewed" | "saved";
  time: string;
  opportunity?: string;
};

export type CoachSuggestion = {
  id: string;
  icon: typeof Sparkles;
  title: string;
  text: string;
};

export type ProfileChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

export type ActivityItem = {
  id: string;
  title: string;
  time: string;
  detail: string;
};

export const candidateProfile = {
  name: "Sofia",
  newMatches: 5,
  profileStrength: 78,
};

export const candidateMatches: CandidateMatch[] = [
  {
    id: "product-intern",
    title: "Product Intern",
    company: "Nova Labs",
    location: "Berlin / Hybrid",
    score: 86,
    reasons: [
      "Your product sense and analytical skills line up with the role.",
      "Your project work shows strong research-to-insight thinking.",
    ],
    missing: "Add one shipped product project to strengthen this match further.",
    overview:
      "This role sits in a fast-moving product team working across user research, prioritisation, and insight-driven roadmap support.",
    teamNote:
      "The hiring manager values candidates who can connect user behavior, product feedback, and structured reporting.",
    breakdown: {
      overall: 86,
      skills: 84,
      experience: 79,
      preferences: 94,
    },
    gaps: [
      {
        id: "product-case-study",
        name: "Shipped product case study",
        explanation: "Adding one project with problem framing, decision-making, and outcomes would sharpen product credibility.",
      },
      {
        id: "sql-depth",
        name: "Deeper SQL signal",
        explanation: "The role values stronger data fluency for insight work and prioritisation support.",
      },
      {
        id: "stakeholder-proof",
        name: "Stakeholder collaboration proof",
        explanation: "One example of working across design, growth, or research would make your profile more complete.",
      },
    ],
    recommendations: [
      { id: "figma-project", title: "Add an existing product project with research notes", impact: "May improve match by +6%" },
      { id: "cv-refresh", title: "Upload a stronger CV version", impact: "May improve match by +4%" },
      { id: "linkedin", title: "Add LinkedIn profile", impact: "May improve match by +2%" },
    ],
    employerPreview: {
      topSkills: ["Product Sense", "SQL", "Analytics"],
      fitSummary: "Strong analytical product signal with clear research-to-insight thinking and good Berlin/hybrid alignment.",
    },
  },
  {
    id: "marketing-intern",
    title: "Marketing Intern",
    company: "BrightBridge",
    location: "London / Remote",
    score: 81,
    reasons: [
      "Your communication and campaign-thinking skills map well to the role.",
      "Your interests align with growth and brand-facing work.",
    ],
    missing: "A stronger CV version would make this profile more shortlist-ready.",
    overview:
      "A cross-channel internship with exposure to content, campaign execution, and weekly performance review.",
    teamNote:
      "This team is looking for candidates who can write clearly, adapt quickly, and support reporting without hand-holding.",
    breakdown: {
      overall: 81,
      skills: 82,
      experience: 74,
      preferences: 88,
    },
    gaps: [
      {
        id: "campaign-metrics",
        name: "Campaign performance proof",
        explanation: "A concrete result from a marketing project would make this role feel more de-risked for the employer.",
      },
      {
        id: "cv-strength",
        name: "Stronger CV version",
        explanation: "The current fit is strong, but a sharper CV would improve confidence and shortlist readiness.",
      },
    ],
    recommendations: [
      { id: "campaign-project", title: "Add one campaign project with clear outcomes", impact: "May improve match by +5%" },
      { id: "cv-refresh", title: "Upload a stronger CV version", impact: "May improve match by +4%" },
      { id: "linkedin", title: "Add LinkedIn profile", impact: "May improve match by +2%" },
    ],
    employerPreview: {
      topSkills: ["Communication", "Campaign Thinking", "Analytics"],
      fitSummary: "Clear growth and brand-fit potential with strong communication signals and flexible work preferences.",
    },
  },
  {
    id: "ux-intern",
    title: "UX Intern",
    company: "StudioFlow",
    location: "Amsterdam",
    score: 77,
    reasons: [
      "Your research-led thinking is relevant for early UX exploration work.",
      "You already show strong structure in problem framing and feedback loops.",
    ],
    missing: "Add one design case study to improve confidence for design-heavy roles.",
    overview:
      "A UX-focused role supporting wireframes, research synthesis, and lightweight prototype feedback for product squads.",
    teamNote:
      "The team values clear thinking and process, even if the visual portfolio is still growing.",
    breakdown: {
      overall: 77,
      skills: 72,
      experience: 70,
      preferences: 89,
    },
    gaps: [
      {
        id: "figma-proof",
        name: "Figma case study",
        explanation: "A visible design artifact or process walkthrough would make your profile much easier to evaluate.",
      },
      {
        id: "portfolio-link",
        name: "Portfolio depth",
        explanation: "This team needs one clear design example to understand your UX thinking in practice.",
      },
    ],
    recommendations: [
      { id: "figma-case-study", title: "Add an existing project using Figma", impact: "May improve match by +6%" },
      { id: "portfolio", title: "Add one portfolio case study", impact: "May improve match by +5%" },
      { id: "linkedin", title: "Add LinkedIn profile", impact: "May improve match by +2%" },
    ],
    employerPreview: {
      topSkills: ["Research Thinking", "Problem Framing", "Feedback Loops"],
      fitSummary: "Promising UX potential with strong structured thinking, though visual proof is still limited.",
    },
  },
  {
    id: "finance-intern",
    title: "Finance Intern",
    company: "North Peak Capital",
    location: "Dublin",
    score: 72,
    reasons: [
      "Your structured reporting skills are relevant to the workflow.",
      "Your profile signals strong organisation and detail orientation.",
    ],
    missing: "Adding finance-specific coursework or modelling examples would help.",
    overview:
      "An operations-heavy internship focused on reporting packs, internal tracking, and analytical support for finance leads.",
    teamNote:
      "This opportunity rewards consistency, numerical confidence, and clear communication with stakeholders.",
    breakdown: {
      overall: 72,
      skills: 68,
      experience: 70,
      preferences: 80,
    },
    gaps: [
      {
        id: "modelling",
        name: "Finance modelling basics",
        explanation: "A simple example of working with financial analysis or spreadsheets would materially improve fit.",
      },
      {
        id: "coursework",
        name: "Finance coursework signal",
        explanation: "Relevant coursework or certifications would reduce employer uncertainty around domain readiness.",
      },
    ],
    recommendations: [
      { id: "quickbooks", title: "Learn QuickBooks basics", impact: "May improve match by +5%" },
      { id: "cv-refresh", title: "Upload a stronger CV version", impact: "May improve match by +3%" },
      { id: "coursework", title: "Add finance coursework or certification", impact: "May improve match by +4%" },
    ],
    employerPreview: {
      topSkills: ["Reporting", "Organisation", "Detail Orientation"],
      fitSummary: "Strong structure and reporting discipline, but still light on finance-specific proof points.",
    },
  },
  {
    id: "data-analyst-intern",
    title: "Data Analyst Intern",
    company: "PulseGrid",
    location: "Paris / Hybrid",
    score: 68,
    reasons: [
      "Your analytical foundation gives you a credible starting point.",
      "Your profile already shows strong potential for insight-based work.",
    ],
    missing: "Add SQL depth and one dashboard project to unlock stronger data matches.",
    overview:
      "A junior analytics role supporting weekly reporting, exploratory analysis, and dashboard maintenance across business teams.",
    teamNote:
      "This team is looking for coachable candidates with growing technical confidence and a strong curiosity for data.",
    breakdown: {
      overall: 68,
      skills: 64,
      experience: 66,
      preferences: 76,
    },
    gaps: [
      {
        id: "sql",
        name: "SQL depth",
        explanation: "The role needs stronger querying confidence for day-to-day reporting and data validation.",
      },
      {
        id: "dashboard",
        name: "Dashboard project",
        explanation: "A visible analytics or reporting project would help the employer judge your readiness much faster.",
      },
      {
        id: "tooling",
        name: "BI tooling proof",
        explanation: "Even basic exposure to dashboards or reporting tools would increase trust in this match.",
      },
    ],
    recommendations: [
      { id: "sql-course", title: "Build one SQL practice project", impact: "May improve match by +7%" },
      { id: "dashboard-project", title: "Add one dashboard case study", impact: "May improve match by +5%" },
      { id: "linkedin", title: "Add LinkedIn profile", impact: "May improve match by +2%" },
    ],
    employerPreview: {
      topSkills: ["Analytics", "Curiosity", "Structured Thinking"],
      fitSummary: "High potential for analytics, but the employer would want more technical proof before shortlisting confidently.",
    },
  },
];

export const employerInterest: EmployerInterest[] = [
  {
    id: "nova-shortlist",
    company: "Nova Labs",
    action: "shortlisted",
    time: "2h ago",
    opportunity: "Product Intern",
  },
  {
    id: "brightbridge-viewed",
    company: "BrightBridge",
    action: "viewed",
    time: "Yesterday",
    opportunity: "Marketing Intern",
  },
  {
    id: "studioflow-saved",
    company: "StudioFlow",
    action: "saved",
    time: "2 days ago",
    opportunity: "UX Intern",
  },
];

export const coachSuggestions: CoachSuggestion[] = [
  {
    id: "project",
    icon: Layers3,
    title: "Add one project to improve design matches",
    text: "A clear case study would immediately strengthen UX and product-facing opportunities.",
  },
  {
    id: "cv",
    icon: FileUp,
    title: "Upload a stronger CV version",
    text: "A fresher CV helps employers validate your timeline, projects, and current strengths faster.",
  },
  {
    id: "linkedin",
    icon: LinkIcon,
    title: "Add LinkedIn profile link",
    text: "A LinkedIn profile adds trust and helps employers understand your broader professional context.",
  },
];

export const profileChecklist: ProfileChecklistItem[] = [
  { id: "cv", label: "CV uploaded", complete: true },
  { id: "skills", label: "Skills added", complete: true },
  { id: "projects", label: "Projects added", complete: true },
  { id: "linkedin", label: "LinkedIn missing", complete: false },
  { id: "preference", label: "Work preference completed", complete: true },
];

export const recentActivity: ActivityItem[] = [
  {
    id: "match",
    title: "Profile matched with Product Intern",
    time: "Today",
    detail: "Nova Labs moved into your highest-confidence match lane.",
  },
  {
    id: "view",
    title: "Employer viewed profile",
    time: "Yesterday",
    detail: "BrightBridge reviewed your profile after a fresh skills update.",
  },
  {
    id: "suggestion",
    title: "Skill suggestion added",
    time: "2 days ago",
    detail: "AI Coach recommended adding one portfolio-style project for design roles.",
  },
];

export const dashboardIcons = {
  match: Briefcase,
  coach: Wand2,
  activity: Sparkles,
};
