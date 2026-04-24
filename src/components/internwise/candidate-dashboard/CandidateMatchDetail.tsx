import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Briefcase, Check, Sparkles, TrendingUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Footer from "@/components/internwise/Footer";
import Navbar from "@/components/internwise/Navbar";
import {
  candidateMatches,
  candidateProfile,
} from "@/components/internwise/candidate-dashboard/dashboardData";
import CoachRecommendationCard from "@/components/internwise/candidate-dashboard/CoachRecommendationCard";
import EmployerPreviewCard from "@/components/internwise/candidate-dashboard/EmployerPreviewCard";
import GapCard from "@/components/internwise/candidate-dashboard/GapCard";
import MatchBreakdown from "@/components/internwise/candidate-dashboard/MatchBreakdown";
import SimilarMatchCard from "@/components/internwise/candidate-dashboard/SimilarMatchCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

type GapStatus = "already-have" | "learning" | "not-yet";

const CandidateMatchDetail = () => {
  const { id } = useParams();
  const match = candidateMatches.find((item) => item.id === id);
  const similarMatches = useMemo(
    () => candidateMatches.filter((item) => item.id !== id).slice(0, 3),
    [id],
  );
  const missingRef = useRef<HTMLElement | null>(null);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false);
  const [activeGapId, setActiveGapId] = useState<string | null>(null);
  const [proofText, setProofText] = useState("");
  const [dialogStatus, setDialogStatus] = useState<GapStatus | null>(null);
  const [gapStates, setGapStates] = useState<Record<string, { status: GapStatus; proof?: string }>>({});

  const activeGap = match?.gaps.find((gap) => gap.id === activeGapId);

  if (!match) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar variant="solid" />
        <section className="mx-auto max-w-4xl px-4 pb-20 pt-36">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-card-soft">
            <h1 className="text-3xl font-extrabold text-slate-950">Match not found</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">This match is not available in the current mock dashboard data.</p>
            <Button asChild className="mt-6 bg-primary-gradient text-white">
              <Link to="/candidate/dashboard">Back to dashboard</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const handleImproveMatch = () => {
    missingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExpressInterest = () => {
    setHasExpressedInterest(true);
    toast.success("Interest sent", {
      description: `We’ve recorded your interest in ${match.title} at ${match.company}.`,
    });
  };

  const closeGapDialog = () => {
    setActiveGapId(null);
    setProofText("");
    setDialogStatus(null);
  };

  const updateGapState = (status: GapStatus, closeAfter = true) => {
    if (!activeGapId) return;

    setGapStates((current) => ({
      ...current,
      [activeGapId]: {
        status,
        proof: status === "already-have" ? proofText : undefined,
      },
    }));

    setDialogStatus(status);

    if (closeAfter) {
      closeGapDialog();
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar variant="solid" />

      <section className="relative overflow-hidden bg-hero-gradient px-4 pb-16 pt-36 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="relative mx-auto max-w-7xl">
          <Button asChild variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white">
            <Link to="/candidate/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to dashboard
            </Link>
          </Button>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.4fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/84 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-primary-light" />
                Match detail
              </div>
              <h1 className="text-5xl font-extrabold leading-tight md:text-6xl">{match.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
                {match.company} · {match.location}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button className="bg-cta-gradient text-white shadow-cta" onClick={handleExpressInterest} disabled={hasExpressedInterest}>
                  {hasExpressedInterest ? "Interest sent" : "Apply / Express Interest"}
                </Button>
                <Button variant="outline" className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white" onClick={handleImproveMatch}>
                  Improve Match
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Match confidence</p>
                  <p className="mt-1 text-4xl font-extrabold">{match.score}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-light" />
              </div>
              <p className="mt-4 text-sm text-white/68">{match.overview}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 pt-8 lg:grid-cols-[1fr_0.34fr]">
        <div className="space-y-6">
          <MatchBreakdown breakdown={match.breakdown} />

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Briefcase className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">Why you match</h2>
                <p className="mt-1 text-sm text-slate-500">The strongest signals Internwise is currently seeing for this opportunity.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {match.reasons.map((reason) => (
                <div key={reason} className="flex items-start gap-3 rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <h2 className="text-2xl font-extrabold text-slate-950">Team context</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{match.teamNote}</p>
          </section>

          <section ref={missingRef} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <h2 className="text-2xl font-extrabold text-slate-950">What&apos;s missing</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              These are the current gaps keeping this match from moving even higher.
            </p>
            <div className="mt-6 grid gap-4">
              {match.gaps.map((gap) => (
                <GapCard
                  key={gap.id}
                  gap={gap}
                  status={gapStates[gap.id]?.status}
                  onImprove={setActiveGapId}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-950">AI Coach recommendations</h2>
                <p className="mt-1 text-sm text-slate-500">Focused actions that could move this match higher with the least effort.</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {match.recommendations.map((recommendation) => (
                <CoachRecommendationCard key={recommendation.id} recommendation={recommendation} onStart={() => setActiveGapId(match.gaps[0]?.id ?? null)} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <EmployerPreviewCard candidateName={candidateProfile.name} score={match.score} preview={match.employerPreview} />

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
            <h2 className="text-2xl font-extrabold text-slate-950">Similar matches</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Related opportunities that may also fit your current profile.</p>
            <div className="mt-5 space-y-4">
              {similarMatches.map((similarMatch) => (
                <SimilarMatchCard key={similarMatch.id} match={similarMatch} />
              ))}
            </div>
          </section>
        </aside>
      </section>

      <Dialog open={Boolean(activeGap)} onOpenChange={(open) => !open && closeGapDialog()}>
        <DialogContent className="max-w-xl rounded-[1.8rem] border-white/20 bg-white p-0 shadow-2xl">
          <div className="bg-hero-gradient p-6 text-white">
            <DialogHeader>
              <DialogTitle className="text-3xl font-extrabold leading-tight">
                Improve this gap
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-6 text-white/72">
                Tell Internwise how to treat this gap so your profile can be updated more intelligently later.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="space-y-4 p-6">
            <div className="rounded-[1.4rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              <p className="font-extrabold text-slate-950">{activeGap?.name}</p>
              <p className="mt-2">{activeGap?.explanation}</p>
            </div>

            <div className="grid gap-3">
              <Button variant="outline" className="justify-start" onClick={() => updateGapState("learning")}>
                I&apos;m learning this
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => updateGapState("not-yet", false)}>
                I don&apos;t have this yet
              </Button>
            </div>

            <div className="rounded-[1.4rem] border border-slate-200 p-4">
              <p className="text-sm font-extrabold text-slate-950">I already have this</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Add a short proof note, such as a project, coursework, tool use, or experience example.
              </p>
              <textarea
                value={proofText}
                onChange={(event) => setProofText(event.target.value)}
                className="mt-3 min-h-24 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white"
                placeholder="Example: Built a SQL dashboard project for a university consultancy sprint."
              />
              <Button className="mt-3 bg-primary-gradient text-white" onClick={() => updateGapState("already-have")} disabled={!proofText.trim()}>
                Save proof <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {dialogStatus === "not-yet" && (
              <div className="rounded-[1.4rem] bg-blue-50 p-4 text-sm leading-6 text-slate-600">
                Suggested learning path placeholder: we can later connect this to a skill builder, course library, or guided improvement flow.
                <Button variant="ghost" className="mt-3 px-0 text-primary hover:bg-transparent hover:text-primary" onClick={closeGapDialog}>
                  Got it
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default CandidateMatchDetail;
