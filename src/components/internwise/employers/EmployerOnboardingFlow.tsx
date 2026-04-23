import { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, Check, MapPin, Search, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmployerOnboardingState = {
  roles: string[];
  location: string;
  experienceLevel: string;
  skills: string[];
};

const storageKey = "internwise-employer-onboarding";
const steps = ["Welcome", "Hiring intent", "Skills", "Explore"];
const roleOptions = ["Product", "Marketing", "Design", "Data", "Finance", "Software", "Operations", "Sales"];
const locationOptions = ["Remote", "London", "Berlin", "Amsterdam", "Paris", "Dublin", "Barcelona", "Other"];
const experienceOptions = ["Intern", "Junior"];
const skillOptions = [
  "Analytics",
  "Brand Strategy",
  "CRM",
  "Customer Research",
  "Excel",
  "Figma",
  "JavaScript",
  "Performance Marketing",
  "Product Sense",
  "Python",
  "React",
  "SEO",
  "SQL",
  "Storytelling",
  "UX Research",
];

const defaultState: EmployerOnboardingState = {
  roles: ["Product"],
  location: "Remote",
  experienceLevel: "Intern",
  skills: ["Product Sense", "Analytics", "Communication"],
};

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
        : "border-slate-200 bg-white/80 text-slate-700 hover:border-primary/40 hover:bg-white",
    )}
  >
    {children}
  </button>
);

const IntentCard = ({
  selected,
  icon: Icon,
  title,
  copy,
  onClick,
}: {
  selected: boolean;
  icon: typeof Briefcase;
  title: string;
  copy: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "rounded-[1.75rem] border p-4 text-left transition",
      selected ? "border-primary bg-primary/5 shadow-card-soft" : "border-slate-200 bg-slate-50 hover:border-primary/40",
    )}
  >
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="font-extrabold text-slate-950">{title}</div>
        <div className="mt-1 text-sm text-slate-500">{copy}</div>
      </div>
    </div>
  </button>
);

const EmployerOnboardingFlow = () => {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<EmployerOnboardingState>(defaultState);
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
    [skillQuery],
  );

  const update = <K extends keyof EmployerOnboardingState>(key: K, value: EmployerOnboardingState[K]) => {
    setState((current) => ({ ...current, [key]: value }));
  };

  const toggleRole = (role: string) => {
    setState((current) => {
      const exists = current.roles.includes(role);
      if (exists) {
        return { ...current, roles: current.roles.filter((item) => item !== role) || current.roles };
      }

      return { ...current, roles: [...current.roles, role] };
    });
  };

  const toggleSkill = (skill: string) => {
    setState((current) => {
      const exists = current.skills.includes(skill);
      if (exists) {
        return { ...current, skills: current.skills.filter((item) => item !== skill) };
      }

      if (current.skills.length >= 6) {
        return current;
      }

      return { ...current, skills: [...current.skills, skill] };
    });
  };

  const next = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const previous = () => setStep((current) => Math.max(current - 1, 0));
  const canContinue = step !== 2 || state.skills.length >= 3;

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
            Saved locally while you set up your hiring brief
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
              Employer onboarding
            </div>
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
              Start hiring smarter in under a minute.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/68">
              Share the hiring basics, lock in the skills you care about, then jump straight into candidate discovery.
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
                    index === step ? "bg-white/12 text-white" : "text-white/48 hover:bg-white/6 hover:text-white/78",
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
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-0 flex-1 overflow-y-auto p-5 md:p-6"
              >
                {step === 0 && (
                  <div className="flex min-h-[420px] flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Welcome</p>
                    <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">Start hiring smarter</h2>
                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
                      Get matched with top candidates instantly.
                    </p>
                    <div className="mt-8 grid gap-3 md:grid-cols-3">
                      {[
                        { title: "Role-ready candidates", copy: "See strong profiles without building a long brief.", icon: Users },
                        { title: "Skill-led matching", copy: "Prioritise candidate strengths that actually matter.", icon: Search },
                        { title: "Fast shortlist flow", copy: "Explore candidates before your team gets slowed down.", icon: Check },
                      ].map(({ title, copy, icon: Icon }) => (
                        <div key={title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="mt-4 font-extrabold text-slate-950">{title}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-500">{copy}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Hiring intent</p>
                    <h2 className="mt-3 text-3xl font-extrabold">What are you hiring for?</h2>

                    <div className="mt-7">
                      <p className="mb-3 text-sm font-bold text-slate-700">Role(s) hiring for</p>
                      <div className="flex flex-wrap gap-2">
                        {roleOptions.map((role) => (
                          <Chip key={role} selected={state.roles.includes(role)} onClick={() => toggleRole(role)}>
                            {role}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-700">Location</p>
                        <div className="grid gap-3">
                          {locationOptions.slice(0, 4).map((location) => (
                            <IntentCard
                              key={location}
                              selected={state.location === location}
                              icon={MapPin}
                              title={location}
                              copy={location === "Remote" ? "Ideal for distributed hiring across Europe." : "Prioritise candidates who can work from this market."}
                              onClick={() => update("location", location)}
                            />
                          ))}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {locationOptions.slice(4).map((location) => (
                            <Chip key={location} selected={state.location === location} onClick={() => update("location", location)}>
                              {location}
                            </Chip>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-3 text-sm font-bold text-slate-700">Experience level</p>
                        <div className="grid gap-3">
                          {experienceOptions.map((level) => (
                            <IntentCard
                              key={level}
                              selected={state.experienceLevel === level}
                              icon={Briefcase}
                              title={level}
                              copy={level === "Intern" ? "Early-career candidates ready for internship roles." : "Candidates with stronger ownership and some prior experience."}
                              onClick={() => update("experienceLevel", level)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Skills needed</p>
                    <h2 className="mt-3 text-3xl font-extrabold">Pick the strengths you want to see first</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-500">Select 3 to 6 skills to sharpen the candidate feed.</p>

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
                        <Chip key={skill} selected={state.skills.includes(skill)} onClick={() => toggleSkill(skill)}>
                          {skill}
                        </Chip>
                      ))}
                    </div>

                    <div className="mt-8 rounded-[1.75rem] bg-slate-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Selected</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {state.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="flex min-h-[420px] flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Explore candidates</p>
                    <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Your candidate feed is ready</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
                      We’ll use your role, location and skill preferences to prioritise the strongest profiles first.
                    </p>

                    <div className="mt-7 grid gap-4 md:grid-cols-3">
                      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Roles</p>
                        <p className="mt-3 text-lg font-extrabold text-slate-950">{state.roles.join(", ")}</p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Location</p>
                        <p className="mt-3 text-lg font-extrabold text-slate-950">{state.location}</p>
                      </div>
                      <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Skills</p>
                        <p className="mt-3 text-lg font-extrabold text-slate-950">{state.skills.length} selected</p>
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button asChild className="bg-cta-gradient text-white shadow-cta">
                        <Link to="/employer-dashboard">
                          Explore candidates <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/employer-dashboard">Skip and explore candidates</Link>
                      </Button>
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
              {step === 3 ? (
                <Button asChild className="bg-cta-gradient text-white shadow-cta">
                  <Link to="/employer-dashboard">
                    Explore candidates <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button type="button" onClick={next} disabled={!canContinue} className="bg-primary-gradient text-white disabled:opacity-50">
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

export default EmployerOnboardingFlow;
