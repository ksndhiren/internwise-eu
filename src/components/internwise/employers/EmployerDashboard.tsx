import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { candidates, readBrief } from "@/components/internwise/employers/employerMockData";
import EmployerCandidateCard from "@/components/internwise/employers/EmployerCandidateCard";
import useEmployerShortlist from "@/components/internwise/employers/useEmployerShortlist";

const scoreOptions = ["All matches", "90%+", "85%+", "80%+"];

const EmployerDashboard = () => {
  const brief = useMemo(readBrief, []);
  const [roleFilter, setRoleFilter] = useState("All roles");
  const [scoreFilter, setScoreFilter] = useState("All matches");
  const [locationFilter, setLocationFilter] = useState("All locations");
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const [shortlistingId, setShortlistingId] = useState<string | null>(null);
  const { shortlistedIds, shortlistCandidate } = useEmployerShortlist();

  const roleOptions = useMemo(
    () => ["All roles", ...new Set(candidates.map((candidate) => candidate.role))],
    [],
  );
  const locationOptions = useMemo(
    () => ["All locations", ...new Set(candidates.map((candidate) => candidate.location))],
    [],
  );

  const visibleCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (shortlistedIds.includes(candidate.id) || skippedIds.includes(candidate.id)) {
        return false;
      }

      if (roleFilter !== "All roles" && !candidate.role.toLowerCase().includes(roleFilter.toLowerCase())) {
        return false;
      }

      if (locationFilter !== "All locations" && !candidate.location.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }

      if (scoreFilter === "90%+" && candidate.score < 90) {
        return false;
      }

      if (scoreFilter === "85%+" && candidate.score < 85) {
        return false;
      }

      if (scoreFilter === "80%+" && candidate.score < 80) {
        return false;
      }

      return true;
    });
  }, [locationFilter, roleFilter, scoreFilter, shortlistedIds, skippedIds]);

  const shortlistedCandidates = useMemo(() => candidates.filter((candidate) => shortlistedIds.includes(candidate.id)), [shortlistedIds]);

  const handleShortlist = (candidateId: string) => {
    setShortlistingId(candidateId);
    window.setTimeout(() => {
      shortlistCandidate(candidateId);
      setShortlistingId(null);
    }, 340);
  };

  const handleSkip = (candidateId: string) => {
    setSkippedIds((current) => [...current, candidateId]);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-24 pt-8 text-white">
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

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.36fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Employer dashboard
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Matched Candidates</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                Scan strong profiles quickly, shortlist the best fits, and keep your hiring momentum high.
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
              <div className="mt-4 flex flex-wrap gap-2">
                {brief.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold text-white/84">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/62">Shortlisted candidates will move into their own review lane automatically.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-7xl px-4 pb-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-card-soft">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              Quick filters
            </div>

            <div className="grid gap-3 md:grid-cols-3 lg:min-w-[720px]">
              <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Role</span>
                <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)} className="w-full bg-transparent font-semibold text-slate-900 outline-none">
                  {roleOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Match %</span>
                <select value={scoreFilter} onChange={(event) => setScoreFilter(event.target.value)} className="w-full bg-transparent font-semibold text-slate-900 outline-none">
                  {scoreOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Location</span>
                <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="w-full bg-transparent font-semibold text-slate-900 outline-none">
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.34fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">Candidate smart cards</h2>
                <p className="mt-1 text-sm text-slate-500">Fast to scan, strong on context, ready for shortlisting.</p>
              </div>
              <div className="text-sm font-semibold text-slate-500">{visibleCandidates.length} candidates</div>
            </div>

            {visibleCandidates.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-card-soft">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-slate-950">No candidates in this view</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Adjust the role, score, or location filters to reopen the feed.
                </p>
              </div>
            ) : (
              <motion.div layout className="grid gap-5 xl:grid-cols-2">
                {visibleCandidates.map((candidate) => (
                  <motion.div
                    key={candidate.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <EmployerCandidateCard
                      candidate={candidate}
                      isAnimating={shortlistingId === candidate.id}
                      onPrimary={() => handleShortlist(candidate.id)}
                      onSecondary={() => handleSkip(candidate.id)}
                      secondaryLabel="Skip"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <aside className="sticky top-24 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Star className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-950">Shortlisted</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your strongest candidates land here the moment you shortlist them.
            </p>

            <div className="mt-6 space-y-3">
              <AnimatePresence>
                {shortlistedCandidates.length > 0 ? (
                  shortlistedCandidates.map((candidate) => (
                    <motion.div
                      key={candidate.id}
                      layout
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 18 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <img src={candidate.avatar} alt={candidate.name} className="h-12 w-12 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <div className="truncate font-extrabold text-slate-950">{candidate.name}</div>
                          <div className="truncate text-sm text-slate-500">{candidate.role}</div>
                        </div>
                        <div className="ml-auto rounded-full bg-white px-3 py-1 text-xs font-extrabold text-primary shadow-sm">
                          {candidate.score}%
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {candidate.location}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-500">
                    Shortlist a candidate to start building your review queue.
                  </div>
                )}
              </AnimatePresence>
            </div>

            <Button asChild className="mt-6 w-full bg-cta-gradient text-white shadow-cta">
              <Link to="/shortlisted-candidates">Open shortlist</Link>
            </Button>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default EmployerDashboard;
