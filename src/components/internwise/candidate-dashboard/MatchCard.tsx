import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CandidateMatch } from "@/components/internwise/candidate-dashboard/dashboardData";

type MatchCardProps = {
  match: CandidateMatch;
  onImprove: (match: CandidateMatch) => void;
};

const MatchCard = ({ match, onImprove }: MatchCardProps) => {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card-soft transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Quality match
          </div>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">{match.title}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {match.company} · {match.location}
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-center shadow-sm",
            match.score >= 80 ? "bg-primary-gradient text-white" : "bg-slate-100 text-primary",
          )}
        >
          <div className="text-3xl font-extrabold">{match.score}%</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">Match</div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.74fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Why you match</p>
          <div className="space-y-2.5">
            {match.reasons.map((reason) => (
              <p key={reason} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                {reason}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[1.6rem] bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">What&apos;s missing</p>
          {match.missing ?? "No major gaps detected for this role right now."}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild className="bg-primary-gradient text-white">
          <Link to={`/candidate/matches/${match.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" onClick={() => onImprove(match)}>
          Improve Match
        </Button>
      </div>
    </article>
  );
};

export default MatchCard;
