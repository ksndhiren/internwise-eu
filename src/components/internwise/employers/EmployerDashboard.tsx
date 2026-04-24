import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CandidateSmartCard from "@/components/internwise/employers/CandidateSmartCard";
import EmployerFilterBar from "@/components/internwise/employers/EmployerFilterBar";
import EmployerStats from "@/components/internwise/employers/EmployerStats";
import EmptyState from "@/components/internwise/employers/EmptyState";
import HiringNeedsSummary from "@/components/internwise/employers/HiringNeedsSummary";
import ShortlistedPanel from "@/components/internwise/employers/ShortlistedPanel";
import { candidates, defaultBrief, readBrief, type EmployerBrief } from "@/components/internwise/employers/employerMockData";
import useEmployerShortlist from "@/components/internwise/employers/useEmployerShortlist";
import { toast } from "@/components/ui/sonner";

const scoreOptions = ["All matches", "90%+", "85%+", "80%+", "75%+"];

const EmployerDashboard = () => {
  const storedBrief = useMemo(readBrief, []);
  const dashboardBrief: EmployerBrief = useMemo(
    () => ({
      roles: storedBrief.roles?.length ? storedBrief.roles : ["Marketing Intern"],
      location: storedBrief.location || "Berlin / Remote",
      experienceLevel: storedBrief.experienceLevel || "Intern",
      skills: storedBrief.skills?.length ? storedBrief.skills : ["Social Media", "Canva", "Copywriting"],
    }),
    [storedBrief],
  );
  const [filters, setFilters] = useState({
    role: "All roles",
    location: "All locations",
    score: "All matches",
    skill: "All skills",
    availability: "All availability",
  });
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const { entries, shortlistedIds, shortlistCandidate, updateStatus } = useEmployerShortlist();

  const filterOptions = useMemo(() => ({
    roles: ["All roles", ...new Set(candidates.map((candidate) => candidate.role))],
    locations: ["All locations", ...new Set(candidates.map((candidate) => candidate.location))],
    scores: scoreOptions,
    skills: ["All skills", ...new Set(candidates.flatMap((candidate) => candidate.skills))],
    availability: ["All availability", ...new Set(candidates.map((candidate) => candidate.availability))],
  }), []);

  const visibleCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      if (shortlistedIds.includes(candidate.id) || skippedIds.includes(candidate.id)) {
        return false;
      }

      if (filters.role !== "All roles" && !candidate.role.toLowerCase().includes(filters.role.toLowerCase())) {
        return false;
      }

      if (filters.location !== "All locations" && !candidate.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.skill !== "All skills" && !candidate.skills.includes(filters.skill)) {
        return false;
      }

      if (filters.availability !== "All availability" && candidate.availability !== filters.availability) {
        return false;
      }

      if (filters.score === "90%+" && candidate.score < 90) {
        return false;
      }

      if (filters.score === "85%+" && candidate.score < 85) {
        return false;
      }

      if (filters.score === "80%+" && candidate.score < 80) {
        return false;
      }

      if (filters.score === "75%+" && candidate.score < 75) {
        return false;
      }

      return true;
    });
  }, [filters, shortlistedIds, skippedIds]);

  const shortlistedCandidates = useMemo(
    () =>
      entries
        .map((entry) => ({
          entry,
          candidate: candidates.find((candidate) => candidate.id === entry.candidateId),
        }))
        .filter((item): item is { entry: (typeof entries)[number]; candidate: (typeof candidates)[number] } => Boolean(item.candidate)),
    [entries],
  );

  const handleShortlist = (candidateId: string) => {
    shortlistCandidate(candidateId);
    toast.success("Candidate shortlisted", {
      description: "The profile has been added to your shortlist for quick follow-up.",
    });
  };

  const handleSkip = (candidateId: string) => {
    setSkippedIds((current) => [...current, candidateId]);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const handleMessage = (candidateId: string) => {
    updateStatus(candidateId, "awaiting_response");
    toast.success("Candidate message queued", {
      description: "The shortlist status has been updated to awaiting response.",
    });
  };

  const stats = [
    { label: "Matches", value: "24" },
    { label: "Strong Fits", value: "8" },
    { label: "Shortlisted", value: String(Math.max(shortlistedCandidates.length, 5)) },
    { label: "Awaiting Response", value: String(Math.max(shortlistedCandidates.filter((item) => item.entry.status === "awaiting_response").length, 3)) },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-36 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/84 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Employer dashboard
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Welcome back, Nova Labs</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                You have 24 matched candidates ready to review.
              </p>
              <div className="mt-8">
                <EmployerStats stats={stats} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Hiring brief</p>
                  <p className="mt-1 text-2xl font-extrabold">{dashboardBrief.roles.join(", ")}</p>
                </div>
                <Star className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {dashboardBrief.skills.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-bold text-white/84">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-white/62">Review, shortlist, and move quickly without falling into a heavy ATS workflow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8">
        <EmployerFilterBar filters={filters} options={filterOptions} onChange={handleFilterChange} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.34fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">Matched Candidates</h2>
                <p className="mt-1 text-sm text-slate-500">Designed to be scanned in seconds, not reviewed like a traditional job board.</p>
              </div>
              <div className="text-sm font-semibold text-slate-500">{visibleCandidates.length} candidates</div>
            </div>

            {visibleCandidates.length === 0 ? (
              <EmptyState
                title="No matches yet"
                copy="Add your hiring needs to receive better matches."
                actionLabel="Add Hiring Needs"
                onAction={() => {
                  window.location.href = "/employer-onboarding";
                }}
              />
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
                    <CandidateSmartCard
                      candidate={candidate}
                      isShortlisted={shortlistedIds.includes(candidate.id)}
                      isSkipped={skippedIds.includes(candidate.id)}
                      onShortlist={() => handleShortlist(candidate.id)}
                      onSkip={() => handleSkip(candidate.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <ShortlistedPanel items={shortlistedCandidates} onMessage={handleMessage} />
            <HiringNeedsSummary brief={dashboardBrief.roles.length ? dashboardBrief : defaultBrief} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmployerDashboard;
