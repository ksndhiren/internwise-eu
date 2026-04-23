import { ArrowRight, Briefcase, Check, FileUp, Link as LinkIcon, Plus, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Match = {
  title: string;
  company: string;
  companyType: string;
  location: string;
  score: number;
  reasons: string[];
  missing?: string;
};

const matches: Match[] = [
  {
    title: "Growth Marketing Intern",
    company: "Northstar SaaS",
    companyType: "B2B SaaS startup",
    location: "London / Remote",
    score: 93,
    reasons: [
      "Your content, SEO and analytics skills map strongly to the role.",
      "Your campaign project shows evidence of ownership and reporting.",
      "Hybrid preference aligns with the team setup.",
    ],
  },
  {
    title: "Product Marketing Intern",
    company: "FinEdge Labs",
    companyType: "FinTech scaleup",
    location: "Berlin",
    score: 88,
    reasons: [
      "Your role intent overlaps with product and marketing work.",
      "Market research and communication skills match the team’s needs.",
    ],
    missing: "Add one product or research project to strengthen this match.",
  },
  {
    title: "Digital Strategy Intern",
    company: "Mosaic Market",
    companyType: "Consumer marketplace",
    location: "Amsterdam",
    score: 82,
    reasons: [
      "Your project experience suggests strong campaign thinking.",
      "Your preferred industry fits the company profile.",
    ],
    missing: "Uploading your CV would unlock a more confident recommendation.",
  },
  {
    title: "Junior Data Marketing Analyst",
    company: "RetailLoop",
    companyType: "Retail tech company",
    location: "Dublin",
    score: 76,
    reasons: [
      "Analytics and Excel are relevant to the reporting workflow.",
      "Availability fits the internship start window.",
    ],
    missing: "You’re close. Adding SQL or Power BI would make this match stronger.",
  },
  {
    title: "Brand Partnerships Intern",
    company: "Studio Atlas",
    companyType: "Creative agency",
    location: "Paris",
    score: 71,
    reasons: [
      "Your content background is relevant for partner storytelling.",
      "Campaign experience gives you a useful starting point.",
    ],
    missing: "You’re close. Add partnership, sales or outreach examples to improve fit.",
  },
];

const suggestions = [
  {
    icon: Plus,
    title: "Add one missing skill",
    copy: "SQL, Power BI or product research would boost three of your current matches.",
  },
  {
    icon: FileUp,
    title: "Upload your CV",
    copy: "A CV helps employers verify education, dates and project depth faster.",
  },
  {
    icon: LinkIcon,
    title: "Complete LinkedIn link",
    copy: "Adding a profile link improves trust and can help shortlist decisions.",
  },
];

const scoreTone = (score: number) => {
  if (score >= 90) return "from-primary to-primary-light text-white";
  if (score >= 80) return "from-primary/90 to-primary-light/80 text-white";
  return "from-slate-100 to-blue-50 text-primary";
};

const MatchCard = ({ match, featured = false }: { match: Match; featured?: boolean }) => {
  const weak = match.score < 80;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[2rem] border bg-white shadow-card-soft transition hover:-translate-y-0.5",
        featured ? "border-primary/25 p-6 md:p-7" : "border-slate-200 p-5",
      )}
    >
      {featured && (
        <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-primary/10" />
      )}

      <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-bold text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            {featured ? "Top match" : weak ? "You’re close" : "Strong match"}
          </div>
          <h2 className={cn("font-extrabold tracking-tight text-slate-950", featured ? "text-2xl md:text-3xl" : "text-xl")}>
            {match.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {match.company} · {match.companyType} · {match.location}
          </p>
        </div>

        <div className={cn("rounded-2xl bg-gradient-to-br px-4 py-3 text-center shadow-sm", scoreTone(match.score))}>
          <div className={cn("font-extrabold", featured ? "text-3xl" : "text-2xl")}>{match.score}%</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-75">Match</div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-4 md:grid-cols-[1fr_0.72fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Why you match</p>
          <div className="space-y-2.5">
            {match.reasons.map((reason) => (
              <p key={reason} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                {reason}
              </p>
            ))}
          </div>
        </div>

        <div className={cn("rounded-3xl p-4 text-sm leading-6", match.missing ? "bg-blue-50 text-slate-600" : "bg-emerald-50 text-emerald-700")}>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {match.missing ? "What’s missing" : "Profile signal"}
          </p>
          {match.missing || "No major gaps detected for this match."}
        </div>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-3">
        <Button className={featured ? "bg-primary-gradient text-white" : ""} variant={featured ? "default" : "outline"}>
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">Improve Profile</Button>
      </div>
    </article>
  );
};

const CandidateMatchResults = () => {
  const profileStrength = 72;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-20 pt-8 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <header className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Internwise Europe" className="h-12 w-auto" />
            </a>
            <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              Complete Profile
            </Button>
          </header>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Candidate match results
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Your top matches</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                These roles are ranked from your onboarding answers, skill signals and stated preferences.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Profile strength</p>
                  <p className="mt-1 text-2xl font-extrabold">{profileStrength}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
                <div className="h-full rounded-full bg-primary-light" style={{ width: `${profileStrength}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/62">Add a CV and one more project to unlock stronger matches.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-7xl gap-6 px-4 pb-20 lg:grid-cols-[1fr_0.34fr] lg:items-start">
        <div className="space-y-5">
          {matches.map((match, index) => (
            <MatchCard key={match.title} match={match} featured={index === 0} />
          ))}
        </div>

        <aside className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950">Boost your matches</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            A few focused profile updates can improve match confidence and shortlist readiness.
          </p>

          <div className="mt-6 space-y-4">
            {suggestions.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-primary shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-extrabold text-slate-900">{title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{copy}</p>
              </div>
            ))}
          </div>

          <Button className="mt-6 w-full bg-cta-gradient text-white shadow-cta">
            Improve Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </aside>
      </section>
    </main>
  );
};

export default CandidateMatchResults;
