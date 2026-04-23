import { useMemo } from "react";
import { ArrowRight, Briefcase, Check, MapPin, Sparkles, Star, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EmployerBrief = {
  roles: string[];
  location: string;
  experienceLevel: string;
  skills: string[];
};

type CandidateProfile = {
  name: string;
  role: string;
  location: string;
  score: number;
  availability: string;
  skills: string[];
  strengths: string[];
  summary: string;
};

const storageKey = "internwise-employer-onboarding";

const candidateProfiles: CandidateProfile[] = [
  {
    name: "Sofia Lindstrom",
    role: "Product Analyst Intern",
    location: "Berlin / Remote",
    score: 94,
    availability: "Available in 2 weeks",
    skills: ["Product Sense", "SQL", "Analytics"],
    strengths: ["Strong product thinking plus structured data skills", "Already comfortable with reporting and cross-functional work"],
    summary: "Final-year candidate with internship-ready product analysis experience and crisp communication.",
  },
  {
    name: "Lukas Schneider",
    role: "Junior Product Designer",
    location: "Amsterdam",
    score: 91,
    availability: "Available now",
    skills: ["Figma", "UX Research", "Storytelling"],
    strengths: ["Clear design communication and user research ability", "Can support fast product discovery work"],
    summary: "Strong portfolio-led designer with practical research habits and visual polish.",
  },
  {
    name: "Marta Rossi",
    role: "Growth Marketing Intern",
    location: "Paris / Remote",
    score: 88,
    availability: "Available in 1 month",
    skills: ["SEO", "Analytics", "Content"],
    strengths: ["Excellent campaign support profile", "Strong signal for growth and content-heavy internships"],
    summary: "Performance-minded marketer with solid channel understanding and execution energy.",
  },
  {
    name: "Clara Dubois",
    role: "Frontend Intern",
    location: "Remote",
    score: 85,
    availability: "Flexible",
    skills: ["React", "JavaScript", "Storytelling"],
    strengths: ["Useful mix of implementation and product context", "Could grow quickly with mentoring"],
    summary: "Frontend candidate with strong foundations and a clear eye for product detail.",
  },
];

const defaultBrief: EmployerBrief = {
  roles: ["Product"],
  location: "Remote",
  experienceLevel: "Intern",
  skills: ["Product Sense", "Analytics", "Communication"],
};

const CandidateFeed = () => {
  const brief = useMemo<EmployerBrief>(() => {
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
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-20 pt-8 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Internwise Europe" className="h-12 w-auto" />
            </Link>
            <Button asChild variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              <Link to="/employer-onboarding">Edit hiring brief</Link>
            </Button>
          </header>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Employer candidate feed
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Candidate feed</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Ranked profiles based on {brief.roles.join(", ")}, {brief.location}, and the skills you selected.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Hiring brief</p>
                  <p className="mt-1 text-2xl font-extrabold">{brief.experienceLevel} talent</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {brief.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold text-white/84">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/62">Top profiles are surfaced first so you can start reviewing immediately.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-7xl gap-6 px-4 pb-20 lg:grid-cols-[1fr_0.34fr] lg:items-start">
        <div className="space-y-5">
          {candidateProfiles.map((candidate, index) => (
            <article
              key={candidate.name}
              className={cn(
                "relative overflow-hidden rounded-[2rem] border bg-white shadow-card-soft transition hover:-translate-y-0.5",
                index === 0 ? "border-primary/25 p-6 md:p-7" : "border-slate-200 p-5",
              )}
            >
              {index === 0 && <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary/10" />}

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-bold text-primary">
                    <Users className="h-3.5 w-3.5" />
                    {index === 0 ? "Best fit right now" : "Strong candidate"}
                  </div>
                  <h2 className={cn("font-extrabold tracking-tight text-slate-950", index === 0 ? "text-2xl md:text-3xl" : "text-xl")}>
                    {candidate.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {candidate.role} · {candidate.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light px-4 py-3 text-center text-white shadow-sm">
                  <div className={cn("font-extrabold", index === 0 ? "text-3xl" : "text-2xl")}>{candidate.score}%</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-75">Match</div>
                </div>
              </div>

              <p className="relative mt-4 max-w-3xl text-sm leading-6 text-slate-600">{candidate.summary}</p>

              <div className="relative mt-5 grid gap-4 md:grid-cols-[1fr_0.72fr]">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Why this candidate stands out</p>
                  <div className="space-y-2.5">
                    {candidate.strengths.map((strength) => (
                      <p key={strength} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                        {strength}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-blue-50 p-4 text-sm leading-6 text-slate-600">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Snapshot</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {candidate.location}</p>
                  <p className="mt-2 flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> {candidate.availability}</p>
                </div>
              </div>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="relative mt-5 flex flex-wrap gap-3">
                <Button className={index === 0 ? "bg-primary-gradient text-white" : ""} variant={index === 0 ? "default" : "outline"}>
                  View Candidate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Shortlist</Button>
              </div>
            </article>
          ))}
        </div>

        <aside className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Star className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950">Why this feed works</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Candidate quality is ranked from the hiring signal you gave us, so employers can move faster with less admin.
          </p>

          <div className="mt-6 space-y-4">
            {[
              "Role and location intent are already applied.",
              "Skills help push the most relevant candidates higher.",
              "The shortlist CTA is ready for later backend wiring.",
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-white text-primary shadow-sm">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>

          <Button asChild className="mt-6 w-full bg-cta-gradient text-white shadow-cta">
            <Link to="/employer-onboarding">Refine brief</Link>
          </Button>
        </aside>
      </section>
    </main>
  );
};

export default CandidateFeed;
