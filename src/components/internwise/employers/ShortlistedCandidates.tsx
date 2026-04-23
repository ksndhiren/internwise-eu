import { ArrowRight, MessageSquare, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmployerCandidateCard from "@/components/internwise/employers/EmployerCandidateCard";
import { candidates, readBrief } from "@/components/internwise/employers/employerMockData";
import useEmployerShortlist, { formatShortlistedTime } from "@/components/internwise/employers/useEmployerShortlist";

const ShortlistedCandidates = () => {
  const brief = readBrief();
  const { entries, removeCandidate, updateNotes, updateStatus } = useEmployerShortlist();

  const shortlistedCandidates = entries
    .map((entry) => {
      const candidate = candidates.find((item) => item.id === entry.candidateId);
      return candidate ? { candidate, entry } : null;
    })
    .filter((item): item is { candidate: (typeof candidates)[number]; entry: (typeof entries)[number] } => Boolean(item));

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
              <Link to="/employer-dashboard">Back to dashboard</Link>
            </Button>
          </header>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.36fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Employer shortlist
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Shortlisted Candidates</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Manage selected candidates, add notes, and track who has already been contacted.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Hiring brief</p>
                  <p className="mt-1 text-2xl font-extrabold">{brief.roles.join(", ")}</p>
                </div>
                <Star className="h-8 w-8 text-primary-light" />
              </div>
              <p className="mt-4 text-sm text-white/62">
                {entries.length} shortlisted candidates saved locally for this employer flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-20">
        {shortlistedCandidates.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-card-soft">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold text-slate-950">No shortlisted candidates yet</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Start shortlisting from the employer dashboard and your selected candidates will appear here.
            </p>
            <Button asChild className="mt-6 bg-primary-gradient text-white">
              <Link to="/employer-dashboard">
                Open dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {shortlistedCandidates.map(({ candidate, entry }) => (
              <EmployerCandidateCard
                key={candidate.id}
                candidate={candidate}
                primaryLabel={entry.status === "contacted" ? "Contacted" : "Contact"}
                primaryDisabled={entry.status === "contacted"}
                onPrimary={() => updateStatus(candidate.id, "contacted")}
                onSecondary={() => removeCandidate(candidate.id)}
                secondaryLabel="Remove from shortlist"
                onContact={() => updateStatus(candidate.id, "contacted")}
                status={entry.status}
                timestampLabel={formatShortlistedTime(entry.shortlistedAt)}
                notes={entry.notes}
                onNotesChange={(value) => updateNotes(candidate.id, value)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ShortlistedCandidates;
