import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  FileUp,
  Link as LinkIcon,
  Lock,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SkillLevel = "beginner" | "intermediate" | "advanced";

type SkillSelection = {
  name: string;
  level: SkillLevel;
};

type ProjectEntry = {
  title: string;
  detail: string;
};

type OnboardingState = {
  desiredRoles: string[];
  industry: string;
  workStyle: string;
  skills: SkillSelection[];
  education: string;
  projects: ProjectEntry[];
  experience: ProjectEntry[];
  cvName: string;
  linkedin: string;
  portfolio: string;
  location: string;
  availability: string;
  duration: string;
  authorisation: string;
};

const storageKey = "internwise-candidate-onboarding";

const roles = ["Marketing", "Product", "Design", "Data", "Finance", "Software", "Operations", "Sales"];
const industries = ["Technology", "Finance", "Consumer", "Healthcare", "Education", "Climate", "Creative", "Consulting"];
const workStyles = ["Remote", "Hybrid", "Onsite"];
const skillOptions = [
  "Analytics",
  "Brand Strategy",
  "Communication",
  "Content",
  "Excel",
  "Figma",
  "Financial Modelling",
  "JavaScript",
  "Market Research",
  "Power BI",
  "Python",
  "React",
  "SEO",
  "SQL",
  "UX Research",
];
const locations = ["Remote", "London", "Berlin", "Amsterdam", "Paris", "Dublin", "Other"];
const availabilityOptions = ["Immediately", "In 2-4 weeks", "In 1-2 months", "Flexible"];
const durationOptions = ["3 months", "6 months", "9-12 months", "Flexible"];
const authorisationOptions = ["EU/EEA citizen", "UK right to work", "Student visa", "Need sponsorship", "Not sure"];
const preferenceGroups: Array<{
  label: string;
  key: "location" | "availability" | "duration" | "authorisation";
  options: string[];
}> = [
  { label: "Location preference", key: "location", options: locations },
  { label: "Start availability", key: "availability", options: availabilityOptions },
  { label: "Duration preference", key: "duration", options: durationOptions },
  { label: "Work authorisation", key: "authorisation", options: authorisationOptions },
];

const steps = [
  "Welcome",
  "Role intent",
  "Skills",
  "Experience",
  "CV and links",
  "Preferences",
  "Review",
  "Matches",
];

const defaultState: OnboardingState = {
  desiredRoles: ["Marketing"],
  industry: "Technology",
  workStyle: "Hybrid",
  skills: [
    { name: "Analytics", level: "intermediate" },
    { name: "Content", level: "advanced" },
    { name: "SEO", level: "intermediate" },
  ],
  education: "BSc Business and Digital Marketing, final year",
  projects: [{ title: "Campus launch campaign", detail: "Planned content, tracked engagement, and reported weekly insights." }],
  experience: [{ title: "Part-time marketing assistant", detail: "Supported social media scheduling and newsletter reporting." }],
  cvName: "",
  linkedin: "",
  portfolio: "",
  location: "Remote",
  availability: "In 2-4 weeks",
  duration: "6 months",
  authorisation: "EU/EEA citizen",
};

const mockMatches = [
  {
    title: "Growth Marketing Intern",
    company: "B2B SaaS startup",
    location: "London / Remote",
    score: 93,
    reasons: ["Strong fit with content and analytics work", "Hybrid preference matches the team setup"],
    missing: "",
  },
  {
    title: "Product Marketing Intern",
    company: "FinTech scaleup",
    location: "Berlin",
    score: 89,
    reasons: ["Role intent overlaps with product and marketing", "SEO and campaign experience are relevant"],
    missing: "",
  },
  {
    title: "Digital Strategy Intern",
    company: "Consumer marketplace",
    location: "Amsterdam",
    score: 84,
    reasons: ["Good industry and project alignment", "Communication skills support cross-functional work"],
    missing: "Adding a portfolio link would strengthen this match.",
  },
  {
    title: "Junior Data Marketing Analyst",
    company: "Retail tech company",
    location: "Dublin",
    score: 79,
    reasons: ["Analytics and Excel experience are useful", "Availability fits the internship start window"],
    missing: "SQL or Power BI would make this match stronger.",
  },
  {
    title: "Brand Partnerships Intern",
    company: "Creative agency",
    location: "Paris",
    score: 74,
    reasons: ["Content background is relevant", "Project work shows campaign ownership"],
    missing: "More partnership or sales experience would help.",
  },
];

const emptyProject = (): ProjectEntry => ({ title: "", detail: "" });

const Chip = ({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-full border px-4 py-2 text-sm font-semibold transition",
      selected
        ? "border-primary bg-primary text-white shadow-card-soft"
        : "border-slate-200 bg-white/80 text-slate-700 hover:border-primary/40 hover:bg-white"
    )}
  >
    {children}
  </button>
);

const Field = ({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => (
  <label className="block space-y-2">
    <span className="text-sm font-bold text-slate-800">{label}</span>
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
    />
  </label>
);

const EntryCard = ({
  entry,
  onChange,
  onRemove,
  titlePlaceholder,
  detailPlaceholder,
}: {
  entry: ProjectEntry;
  onChange: (entry: ProjectEntry) => void;
  onRemove: () => void;
  titlePlaceholder: string;
  detailPlaceholder: string;
}) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="grid gap-3 md:grid-cols-[0.85fr_1.15fr_auto] md:items-center">
      <input
        value={entry.title}
        onChange={(event) => onChange({ ...entry, title: event.target.value })}
        placeholder={titlePlaceholder}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <input
        value={entry.detail}
        onChange={(event) => onChange({ ...entry, detail: event.target.value })}
        placeholder={detailPlaceholder}
        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary"
      />
      <Button type="button" variant="ghost" onClick={onRemove} className="text-slate-500">
        Remove
      </Button>
    </div>
  </div>
);

const CandidateOnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [skillQuery, setSkillQuery] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setState({ ...defaultState, ...JSON.parse(saved) });
      } catch {
        setState(defaultState);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const progress = ((step + 1) / steps.length) * 100;
  const filteredSkills = useMemo(
    () => skillOptions.filter((skill) => skill.toLowerCase().includes(skillQuery.toLowerCase())),
    [skillQuery]
  );

  const update = <Key extends keyof OnboardingState>(key: Key, value: OnboardingState[Key]) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  const toggleRole = (role: string) => {
    setState((current) => ({
      ...current,
      desiredRoles: current.desiredRoles.includes(role)
        ? current.desiredRoles.filter((item) => item !== role)
        : [...current.desiredRoles, role],
    }));
  };

  const toggleSkill = (skill: string) => {
    setState((current) => {
      const exists = current.skills.some((item) => item.name === skill);
      return {
        ...current,
        skills: exists
          ? current.skills.filter((item) => item.name !== skill)
          : [...current.skills, { name: skill, level: "intermediate" }],
      };
    });
  };

  const setSkillLevel = (skill: string, level: SkillLevel) => {
    setState((current) => ({
      ...current,
      skills: current.skills.map((item) => (item.name === skill ? { ...item, level } : item)),
    }));
  };

  const updateEntry = (key: "projects" | "experience", index: number, value: ProjectEntry) => {
    setState((current) => ({
      ...current,
      [key]: current[key].map((entry, entryIndex) => (entryIndex === index ? value : entry)),
    }));
  };

  const removeEntry = (key: "projects" | "experience", index: number) => {
    setState((current) => ({ ...current, [key]: current[key].filter((_, entryIndex) => entryIndex !== index) }));
  };

  const addEntry = (key: "projects" | "experience") => {
    setState((current) => ({ ...current, [key]: [...current[key], emptyProject()] }));
  };

  const handleCvChange = (event: ChangeEvent<HTMLInputElement>) => {
    update("cvName", event.target.files?.[0]?.name ?? "");
  };

  const next = () => setStep((current) => Math.min(steps.length - 1, current + 1));
  const previous = () => setStep((current) => Math.max(0, current - 1));

  return (
    <div className="h-[100svh] overflow-hidden bg-slate-950 text-white">
      <div className="fixed inset-0 bg-hero-gradient" />
      <div className="fixed inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />

      <div className="relative z-10 mx-auto flex h-[100svh] max-w-7xl flex-col px-4 py-4">
        <header className="flex shrink-0 items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Internwise Europe" className="h-10 w-auto" />
          </a>
          <div className="hidden rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/72 backdrop-blur md:block">
            Saved locally while we build your profile
          </div>
        </header>

        <div className="mt-4 shrink-0 rounded-3xl border border-white/12 bg-white/[0.08] p-4 backdrop-blur-xl lg:hidden">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
            <span>{steps[step]}</span>
            <span>{step + 1}/{steps.length}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-primary-light transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <main className="grid min-h-0 flex-1 gap-5 py-4 lg:grid-cols-[0.34fr_0.66fr] lg:items-stretch">
          <aside className="hidden min-h-0 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] p-5 backdrop-blur-xl lg:block">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/76">
              <Sparkles className="h-3.5 w-3.5 text-primary-light" />
              Candidate onboarding
            </div>
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              Build a profile that matches before you apply.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/68">
              A focused onboarding flow for role intent, skills, proof points, and preferences.
            </p>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                <span>{steps[step]}</span>
                <span>{step + 1}/{steps.length}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary-light transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-5 grid gap-1.5">
              {steps.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setStep(index)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm transition",
                    index === step ? "bg-white/12 text-white" : "text-white/48 hover:bg-white/6 hover:text-white/78"
                  )}
                >
                  <span className={cn("grid h-7 w-7 place-items-center rounded-full text-xs font-bold", index <= step ? "bg-primary-light/25 text-white" : "bg-white/8")}>
                    {index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </aside>

          <section className="flex min-h-0 flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-white text-slate-950 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6"
              >
                {step === 0 && (
                  <div className="flex min-h-[420px] flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Welcome</p>
                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Let’s build your profile</h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
                      Tell us a little about yourself so we can match you to the right internships.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
                      {["No long forms", "Saved locally", "Match preview included"].map((item) => (
                        <span key={item} className="rounded-full bg-primary/8 px-4 py-2 font-semibold text-primary">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Role intent</p>
                    <h2 className="mt-3 text-3xl font-extrabold">What do you want to be matched with?</h2>
                    <div className="mt-7">
                      <p className="mb-3 text-sm font-bold text-slate-700">Desired role(s)</p>
                      <div className="flex flex-wrap gap-2">
                        {roles.map((role) => (
                          <Chip key={role} selected={state.desiredRoles.includes(role)} onClick={() => toggleRole(role)}>
                            {role}
                          </Chip>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8 grid gap-7 md:grid-cols-2">
                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-700">Preferred industry</p>
                        <div className="flex flex-wrap gap-2">
                          {industries.map((industry) => (
                            <Chip key={industry} selected={state.industry === industry} onClick={() => update("industry", industry)}>
                              {industry}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-700">Work style</p>
                        <div className="grid gap-3">
                          {workStyles.map((style) => (
                            <button
                              key={style}
                              type="button"
                              onClick={() => update("workStyle", style)}
                              className={cn(
                                "rounded-3xl border p-4 text-left transition",
                                state.workStyle === style ? "border-primary bg-primary/5 shadow-card-soft" : "border-slate-200 bg-slate-50 hover:border-primary/40"
                              )}
                            >
                              <div className="font-extrabold">{style}</div>
                              <div className="mt-1 text-sm text-slate-500">Match with teams that support {style.toLowerCase()} internships.</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Skills</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Add the skills employers should notice first</h2>
                    <div className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input
                        value={skillQuery}
                        onChange={(event) => setSkillQuery(event.target.value)}
                        placeholder="Search skills"
                        className="w-full bg-transparent text-sm outline-none"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {filteredSkills.map((skill) => (
                        <Chip key={skill} selected={state.skills.some((item) => item.name === skill)} onClick={() => toggleSkill(skill)}>
                          {skill}
                        </Chip>
                      ))}
                    </div>
                    <div className="mt-8 grid gap-3">
                      {state.skills.map((skill) => (
                        <div key={skill.name} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="font-extrabold">{skill.name}</div>
                            <div className="flex flex-wrap gap-2">
                              {(["beginner", "intermediate", "advanced"] as SkillLevel[]).map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => setSkillLevel(skill.name, level)}
                                  className={cn(
                                    "rounded-full border px-3 py-1.5 text-xs font-bold capitalize transition",
                                    skill.level === level ? "border-primary bg-primary text-white" : "border-slate-200 bg-slate-50 text-slate-600"
                                  )}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Experience and projects</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Show proof without writing a long profile</h2>
                    <div className="mt-7">
                      <Field label="Education" value={state.education} placeholder="Degree, school, or course" onChange={(value) => update("education", value)} />
                    </div>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold">Projects</h3>
                        <Button type="button" variant="outline" onClick={() => addEntry("projects")}>Add project</Button>
                      </div>
                      {state.projects.map((project, index) => (
                        <EntryCard
                          key={`project-${index}`}
                          entry={project}
                          onChange={(entry) => updateEntry("projects", index, entry)}
                          onRemove={() => removeEntry("projects", index)}
                          titlePlaceholder="Project title"
                          detailPlaceholder="What you did and what changed"
                        />
                      ))}
                    </div>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-extrabold">Past internship or work experience</h3>
                        <Button type="button" variant="outline" onClick={() => addEntry("experience")}>Add experience</Button>
                      </div>
                      {state.experience.map((experience, index) => (
                        <EntryCard
                          key={`experience-${index}`}
                          entry={experience}
                          onChange={(entry) => updateEntry("experience", index, entry)}
                          onRemove={() => removeEntry("experience", index)}
                          titlePlaceholder="Role or experience"
                          detailPlaceholder="Responsibilities, tools, or outcomes"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">CV and links</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Add the links that strengthen your match</h2>
                    <label className="mt-7 flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border border-dashed border-primary/35 bg-primary/5 p-8 text-center transition hover:bg-primary/8">
                      <FileUp className="h-8 w-8 text-primary" />
                      <span className="mt-3 font-extrabold">{state.cvName || "Upload CV"}</span>
                      <span className="mt-1 text-sm text-slate-500">PDF or DOC for now. Stored locally in this prototype.</span>
                      <input type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={handleCvChange} />
                    </label>
                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                      <Field label="LinkedIn" value={state.linkedin} placeholder="https://linkedin.com/in/..." onChange={(value) => update("linkedin", value)} />
                      <Field label="Portfolio / GitHub / Behance" value={state.portfolio} placeholder="https://..." onChange={(value) => update("portfolio", value)} />
                    </div>
                    <div className="mt-6 flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                      <LinkIcon className="h-4 w-4 text-primary" />
                      Links help employers understand your work before the first message.
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Preferences</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Set the practical details</h2>
                    <div className="mt-7 grid gap-7 md:grid-cols-2">
                      {preferenceGroups.map(({ label, options, key }) => (
                        <div key={label}>
                          <p className="mb-3 text-sm font-bold text-slate-700">{label}</p>
                          <div className="flex flex-wrap gap-2">
                            {options.map((option) => (
                              <Chip
                                key={option}
                                selected={state[key] === option}
                                onClick={() => update(key, option)}
                              >
                                {option}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 6 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Profile review</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Review before matching</h2>
                    <div className="mt-7 grid gap-4 md:grid-cols-2">
                      {[
                        ["Roles", state.desiredRoles.join(", "), 1],
                        ["Industry and style", `${state.industry} · ${state.workStyle}`, 1],
                        ["Skills", state.skills.map((skill) => `${skill.name} (${skill.level})`).join(", "), 2],
                        ["Education", state.education || "Not added", 3],
                        ["CV", state.cvName || "Not uploaded", 4],
                        ["Preferences", `${state.location} · ${state.availability} · ${state.duration}`, 5],
                      ].map(([label, value, targetStep]) => (
                        <div key={label as string} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{label as string}</p>
                              <p className="mt-2 text-sm leading-6 text-slate-600">{value as string}</p>
                            </div>
                            <Button type="button" variant="ghost" onClick={() => setStep(targetStep as number)}>
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Match results</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Top roles for your profile</h2>
                    <div className="mt-7 grid gap-4">
                      {mockMatches.map((match) => (
                        <div key={match.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <h3 className="font-extrabold">{match.title}</h3>
                              </div>
                              <p className="mt-1 text-sm text-slate-500">{match.company} · {match.location}</p>
                            </div>
                            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
                              {match.score}% Match
                            </div>
                          </div>
                          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_0.65fr]">
                            <div className="space-y-2">
                              {match.reasons.map((reason) => (
                                <p key={reason} className="flex items-start gap-2 text-sm text-slate-600">
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                                  {reason}
                                </p>
                              ))}
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-500">
                              {match.missing ? (
                                <span><Lock className="mr-1 inline h-3.5 w-3.5" /> {match.missing}</span>
                              ) : (
                                <span className="text-emerald-600">No major gaps detected.</span>
                              )}
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button type="button" variant="outline">View Match Details</Button>
                            <Button type="button" variant="outline">Complete Profile</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex shrink-0 flex-col gap-3 border-t border-slate-200 bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
              <Button type="button" variant="ghost" onClick={previous} disabled={step === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {step === 6 ? (
                <Button type="button" onClick={next} className="bg-cta-gradient text-white shadow-cta">
                  See My Matches <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : step === 7 ? (
                <Button asChild type="button" className="bg-cta-gradient text-white shadow-cta">
                  <Link to="/candidate-matches">
                    Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button type="button" onClick={next} className="bg-primary-gradient text-white">
                  {step === 0 ? "Continue" : "Save and continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CandidateOnboardingFlow;
