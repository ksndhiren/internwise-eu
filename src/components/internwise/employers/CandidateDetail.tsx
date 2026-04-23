import { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Check, Download, ExternalLink, MapPin, MessageSquare, Sparkles, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { candidates } from "@/components/internwise/employers/employerMockData";
import useEmployerShortlist from "@/components/internwise/employers/useEmployerShortlist";

const SectionShell = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
    <h2 className="text-2xl font-extrabold text-slate-950">{title}</h2>
    <div className="mt-5">{children}</div>
  </section>
);

const CandidateDetail = () => {
  const { candidateId } = useParams();
  const candidate = candidates.find((item) => item.id === candidateId);
  const { getEntry, shortlistCandidate, updateStatus } = useEmployerShortlist();

  if (!candidate) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-card-soft">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Star className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-3xl font-extrabold text-slate-950">Candidate not found</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            This profile is not available in the current mock dataset.
          </p>
          <Button asChild className="mt-6 bg-primary-gradient text-white">
            <Link to="/employer-dashboard">
              Back to dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const shortlistEntry = getEntry(candidate.id);
  const isShortlisted = Boolean(shortlistEntry);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-8 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <header className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Internwise Europe" className="h-12 w-auto" />
            </Link>
            <Button asChild variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white">
              <Link to="/employer-dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to dashboard
              </Link>
            </Button>
          </header>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.34fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Candidate detail
              </div>
              <div className="flex items-start gap-4">
                <img src={candidate.avatar} alt={candidate.name} className="h-20 w-20 rounded-[1.6rem] object-cover shadow-lg" />
                <div>
                  <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{candidate.name}</h1>
                  <p className="mt-2 text-lg text-white/72">
                    {candidate.role} · {candidate.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Match score</p>
                  <p className="mt-1 text-4xl font-extrabold">{candidate.score}%</p>
                </div>
                <Star className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button className="bg-cta-gradient text-white shadow-cta" onClick={() => shortlistCandidate(candidate.id)} disabled={isShortlisted}>
                  {isShortlisted ? "Shortlisted" : "Shortlist"}
                </Button>
                <Button
                  variant="outline"
                  className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white"
                  onClick={() => updateStatus(candidate.id, "contacted")}
                  disabled={!isShortlisted}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 grid max-w-7xl gap-6 px-4 pb-20 lg:grid-cols-[1fr_0.34fr] lg:items-start">
        <div className="space-y-6">
          <SectionShell title="Why this candidate fits">
            <div className="grid gap-3">
              {candidate.fitBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-full bg-white text-emerald-500 shadow-sm">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Skills">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Strong", candidate.skillBands.strong],
                ["Basic", candidate.skillBands.basic],
                ["Learning", candidate.skillBands.learning],
              ].map(([label, list]) => (
                <div key={label as string} className="rounded-[1.6rem] bg-slate-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{label as string}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(list as string[]).map((skill) => (
                      <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Projects / Experience">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {candidate.projects.map((project) => (
                <article key={project.title} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-extrabold text-slate-950">{project.title}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">{project.meta}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{project.detail}</p>
                </article>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Gaps">
            <div className="grid gap-3">
              {candidate.gaps.map((gap) => (
                <div key={gap} className="rounded-[1.4rem] border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-slate-600">
                  {gap}
                </div>
              ))}
            </div>
          </SectionShell>

          <SectionShell title="Links">
            <div className="grid gap-4 md:grid-cols-3">
              <a href={candidate.links.cv} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white">
                <Download className="h-5 w-5 text-primary" />
                <p className="mt-4 font-extrabold text-slate-950">CV</p>
                <p className="mt-1 text-sm text-slate-500">Download profile summary</p>
              </a>
              <a href={candidate.links.linkedin} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white">
                <ExternalLink className="h-5 w-5 text-primary" />
                <p className="mt-4 font-extrabold text-slate-950">LinkedIn</p>
                <p className="mt-1 text-sm text-slate-500">Professional background and recommendations</p>
              </a>
              <a href={candidate.links.portfolio} className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-5 transition hover:border-primary/30 hover:bg-white">
                <Briefcase className="h-5 w-5 text-primary" />
                <p className="mt-4 font-extrabold text-slate-950">Portfolio</p>
                <p className="mt-1 text-sm text-slate-500">Selected work and project depth</p>
              </a>
            </div>
          </SectionShell>
        </div>

        <aside className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950">Quick scan</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Role</p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{candidate.role}</p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Location</p>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin className="h-4 w-4 text-primary" />
                {candidate.location}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Top skills</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button className="bg-cta-gradient text-white shadow-cta" onClick={() => shortlistCandidate(candidate.id)} disabled={isShortlisted}>
              {isShortlisted ? "Shortlisted" : "Shortlist"}
            </Button>
            <Button variant="outline" onClick={() => updateStatus(candidate.id, "contacted")} disabled={!isShortlisted}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default CandidateDetail;
