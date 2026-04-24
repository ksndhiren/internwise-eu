import { useMemo, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/internwise/Footer";
import Navbar from "@/components/internwise/Navbar";
import {
  candidateMatches,
  candidateProfile,
  coachSuggestions,
  employerInterest,
  profileChecklist,
  recentActivity,
  type CandidateMatch,
  type CoachSuggestion,
} from "@/components/internwise/candidate-dashboard/dashboardData";
import ActivityTimeline from "@/components/internwise/candidate-dashboard/ActivityTimeline";
import CoachSuggestionCard from "@/components/internwise/candidate-dashboard/CoachSuggestionCard";
import InterestCard from "@/components/internwise/candidate-dashboard/InterestCard";
import MatchCard from "@/components/internwise/candidate-dashboard/MatchCard";
import ProfileProgress from "@/components/internwise/candidate-dashboard/ProfileProgress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

const CandidateDashboard = () => {
  const [acceptedInterestIds, setAcceptedInterestIds] = useState<string[]>([]);
  const [activeMatch, setActiveMatch] = useState<CandidateMatch | null>(null);
  const [activeSuggestion, setActiveSuggestion] = useState<CoachSuggestion | null>(null);

  const topMatches = useMemo(() => candidateMatches.slice(0, 5), []);
  const emptyMatches = topMatches.length === 0;

  const handleAcceptInterest = (id: string) => {
    setAcceptedInterestIds((current) => {
      if (current.includes(id)) return current;
      return [...current, id];
    });

    toast.success("Interest accepted", {
      description: "We’ve marked this employer interest as accepted. You’re ready for the next step.",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar variant="solid" />

      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-36 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/84 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Candidate dashboard
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">Welcome back, {candidateProfile.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                You have {candidateProfile.newMatches} new internship matches today.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Profile strength</p>
                  <p className="mt-1 text-2xl font-extrabold">{candidateProfile.profileStrength}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-light" />
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/12">
                <div className="h-full rounded-full bg-primary-light" style={{ width: `${candidateProfile.profileStrength}%` }} />
              </div>
              <p className="mt-3 text-sm text-white/62">Profile strength: {candidateProfile.profileStrength}%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 pt-8 lg:grid-cols-[1fr_0.36fr] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-950">Your top matches</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ranked around fit quality, employer demand, and where your profile is already strongest.
                </p>
              </div>
              <Button asChild variant="outline" className="hidden md:inline-flex">
                <Link to="/candidate-matches">
                  See all matches <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-6 space-y-5">
              {emptyMatches ? (
                <div className="rounded-[1.8rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <h3 className="text-2xl font-extrabold text-slate-950">Complete your profile to unlock better matches</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    A stronger profile helps Internwise surface more relevant opportunities with higher confidence.
                  </p>
                  <Button asChild className="mt-5 bg-primary-gradient text-white">
                    <Link to="/candidate-onboarding">Complete Profile</Link>
                  </Button>
                </div>
              ) : (
                topMatches.map((match) => <MatchCard key={match.id} match={match} onImprove={setActiveMatch} />)
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">Employer interest</h2>
                <p className="mt-1 text-sm text-slate-500">Signals that show where momentum is already building around your profile.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {employerInterest.map((item) => (
                <InterestCard
                  key={item.id}
                  item={item}
                  accepted={acceptedInterestIds.includes(item.id)}
                  onAccept={handleAcceptInterest}
                />
              ))}
            </div>
          </section>

          <ActivityTimeline items={recentActivity} />
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Wand2 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">AI Coach</h2>
                <p className="mt-1 text-sm text-slate-500">Focused suggestions to improve your match quality without turning this into a long form exercise.</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {coachSuggestions.map((suggestion) => (
                <CoachSuggestionCard key={suggestion.id} suggestion={suggestion} onFixNow={setActiveSuggestion} />
              ))}
            </div>
          </section>

          <ProfileProgress progress={candidateProfile.profileStrength} items={profileChecklist} />
        </div>
      </section>

      <Dialog open={Boolean(activeMatch)} onOpenChange={(open) => !open && setActiveMatch(null)}>
        <DialogContent className="max-w-xl rounded-[1.8rem] border-white/20 bg-white p-0 shadow-2xl">
          <div className="bg-hero-gradient p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold leading-tight">
                Improve this match
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-white/72">
                A few targeted profile upgrades can strengthen your fit for {activeMatch?.title}.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="space-y-4 p-6">
            <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              {activeMatch?.missing}
            </div>
            <Button asChild className="w-full bg-primary-gradient text-white">
              <Link to="/candidate-onboarding">Update profile now</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(activeSuggestion)} onOpenChange={(open) => !open && setActiveSuggestion(null)}>
        <DialogContent className="max-w-xl rounded-[1.8rem] border-white/20 bg-white p-0 shadow-2xl">
          <div className="bg-hero-gradient p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold leading-tight">
                AI Coach suggestion
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-white/72">
                This is a placeholder action for now, ready for deeper profile editing later.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="space-y-4 p-6">
            <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-extrabold text-slate-950">{activeSuggestion?.title}</p>
              <p className="mt-2">{activeSuggestion?.text}</p>
            </div>
            <Button asChild className="w-full bg-primary-gradient text-white">
              <Link to="/candidate-onboarding">Go to profile builder</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default CandidateDashboard;
