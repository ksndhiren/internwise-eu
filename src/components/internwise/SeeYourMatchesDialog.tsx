import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Lock, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type SeeYourMatchesDialogProps = {
  children: ReactNode;
};

const roles = ["Marketing", "Product", "Design", "Data", "Finance", "Software"];

const skills = [
  "Analytics",
  "Brand Strategy",
  "Canva",
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

const previewMatches = [
  {
    title: "Growth Marketing Intern",
    companyType: "B2B SaaS startup",
    location: "London / Remote",
    score: 91,
    reasons: ["Your content and analytics skills fit the role", "Strong match for fast-moving campaign work"],
  },
  {
    title: "Product Research Intern",
    companyType: "FinTech scaleup",
    location: "Berlin",
    score: 87,
    reasons: ["Good overlap with research and data tasks", "Location preference aligns with the team setup"],
  },
  {
    title: "Junior Data Intern",
    companyType: "Consumer marketplace",
    location: "Amsterdam",
    score: 84,
    reasons: ["SQL and Excel match the core requirements", "Profile indicates strong reporting potential"],
  },
];

const stepLabels = ["Role", "Skills", "Location", "Preview"];

const SeeYourMatchesDialog = ({ children }: SeeYourMatchesDialogProps) => {
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState("Marketing");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Analytics", "Content", "SEO"]);
  const [selectedLocation, setSelectedLocation] = useState("Remote");
  const [skillQuery, setSkillQuery] = useState("");

  const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(skillQuery.toLowerCase()));
  const canContinue = step !== 1 || selectedSkills.length >= 3;

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) => {
      if (current.includes(skill)) {
        return current.filter((item) => item !== skill);
      }

      if (current.length >= 5) {
        return current;
      }

      return [...current, skill];
    });
  };

  const resetPreviewFlow = () => {
    setStep(0);
    setSelectedRole("Marketing");
    setSelectedSkills(["Analytics", "Content", "SEO"]);
    setSelectedLocation("Remote");
    setSkillQuery("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      window.setTimeout(resetPreviewFlow, 180);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-hidden border-white/20 bg-white p-0 shadow-2xl sm:rounded-[2rem]">
        <div className="grid min-h-[620px] lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="relative overflow-hidden bg-hero-gradient p-7 text-white">
            <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 20%, hsl(209 73% 64% / 0.7), transparent 42%)" }} />
            <div className="relative">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/82 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Match preview
              </div>
              <DialogHeader>
                <DialogTitle className="text-3xl font-extrabold leading-tight text-white">
                  See your first matches in under a minute.
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-6 text-white/72">
                  Pick a role, add a few skills, and preview the kind of internships Internwise can surface for you.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-10 space-y-3">
                {stepLabels.map((label, index) => (
                  <div key={label} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border text-xs font-bold",
                        index <= step ? "border-primary-light/70 bg-primary-light/20 text-white" : "border-white/12 bg-white/5 text-white/45"
                      )}
                    >
                      {index < step ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className={index <= step ? "text-white" : "text-white/45"}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex min-h-0 flex-col bg-slate-50">
            <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-8">
              {step === 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Step 1</p>
                  <h3 className="mt-3 text-2xl font-extrabold text-slate-950">What kind of internship are you looking for?</h3>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {roles.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={cn(
                          "rounded-2xl border p-4 text-left text-sm font-semibold transition",
                          selectedRole === role
                            ? "border-primary bg-white text-primary shadow-card-soft"
                            : "border-slate-200 bg-white/70 text-slate-700 hover:border-primary/40 hover:bg-white"
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Step 2</p>
                  <h3 className="mt-3 text-2xl font-extrabold text-slate-950">Pick 3 to 5 skills</h3>
                  <div className="mt-5 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                      value={skillQuery}
                      onChange={(event) => setSkillQuery(event.target.value)}
                      placeholder="Search skills"
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {filteredSkills.map((skill) => {
                      const selected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={cn(
                            "rounded-full border px-3.5 py-2 text-sm font-medium transition",
                            selected
                              ? "border-primary bg-primary text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-primary/40"
                          )}
                        >
                          {selected ? "✓ " : ""}{skill}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Selected skills</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{selectedSkills.length}/5 selected. Choose at least 3 to continue.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Step 3</p>
                  <h3 className="mt-3 text-2xl font-extrabold text-slate-950">Where would you prefer to work?</h3>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {locations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        onClick={() => setSelectedLocation(location)}
                        className={cn(
                          "rounded-2xl border p-4 text-left text-sm font-semibold transition",
                          selectedLocation === location
                            ? "border-primary bg-white text-primary shadow-card-soft"
                            : "border-slate-200 bg-white/70 text-slate-700 hover:border-primary/40 hover:bg-white"
                        )}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Preview</p>
                  <h3 className="mt-3 text-2xl font-extrabold text-slate-950">Your sample matches</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Based on {selectedRole}, {selectedSkills.slice(0, 3).join(", ")} and {selectedLocation}.
                  </p>

                  <div className="mt-6 grid gap-4">
                    {previewMatches.map((match, index) => (
                      <div key={match.title} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-card-soft">
                        <div className={cn(index === 2 && "blur-[2px]")}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="font-extrabold text-slate-950">{match.title}</h4>
                              <p className="mt-1 text-sm text-slate-500">{match.companyType} · {match.location}</p>
                            </div>
                            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-extrabold text-primary">
                              {match.score}%
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            {match.reasons.map((reason) => (
                              <p key={reason} className="flex items-start gap-2 text-sm text-slate-600">
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                                {reason}
                              </p>
                            ))}
                          </div>
                        </div>
                        {index === 2 && (
                          <div className="absolute inset-0 grid place-items-center bg-white/55 backdrop-blur-[1px]">
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-bold text-white">
                              <Lock className="h-3.5 w-3.5" />
                              Details locked
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl border border-primary/20 bg-white p-5 text-center shadow-card-soft">
                    <DialogClose asChild>
                      <Button asChild className="bg-cta-gradient text-white hover:opacity-90 shadow-cta rounded-xl border-0">
                        <Link to="/candidate-onboarding">
                          Create Profile to Unlock Full Matches <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </DialogClose>
                    <p className="mt-3 text-sm text-slate-500">
                      Complete your profile to see all matches and get shortlisted by employers.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4">
              <Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>
                Back
              </Button>
              {step < 3 ? (
                <Button disabled={!canContinue} onClick={() => setStep((current) => Math.min(3, current + 1))} className="bg-primary-gradient text-white">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setStep(0)}>
                  Start over
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SeeYourMatchesDialog;
