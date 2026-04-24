import { ArrowRight, Check, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Candidate } from "@/components/internwise/employers/employerMockData";

type CandidateSmartCardProps = {
  candidate: Candidate;
  isShortlisted?: boolean;
  isSkipped?: boolean;
  onShortlist: () => void;
  onSkip: () => void;
};

const CandidateSmartCard = ({ candidate, isShortlisted = false, isSkipped = false, onShortlist, onSkip }: CandidateSmartCardProps) => {
  return (
    <article
      className={cn(
        "group rounded-[1.8rem] border bg-white/95 p-5 shadow-card-soft backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl",
        isShortlisted ? "border-emerald-200" : "border-slate-200",
        isSkipped && "opacity-55 grayscale-[0.08]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={candidate.avatar} alt={candidate.name} className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-sm" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{candidate.name}</h3>
              {isShortlisted && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  Shortlisted
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {candidate.role} · {candidate.location}
            </p>
          </div>
        </div>

        <div className={cn("rounded-full px-4 py-3 text-center shadow-sm", candidate.score >= 85 ? "bg-primary-gradient text-white" : "bg-slate-100 text-primary")}>
          <div className="text-2xl font-extrabold">{candidate.score}%</div>
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-80">Match</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        <Clock3 className="h-3.5 w-3.5 text-primary" />
        Availability: {candidate.availability}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition group-hover:bg-blue-50 group-hover:text-primary">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[1.4rem] bg-slate-50 p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">Why this candidate fits</p>
        <div className="space-y-2.5">
          {candidate.reasons.slice(0, 2).map((reason) => (
            <p key={reason} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
              <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
              {reason}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button className={cn("shadow-cta", isShortlisted ? "bg-emerald-600 text-white hover:bg-emerald-600" : "bg-cta-gradient text-white")} onClick={onShortlist} disabled={isShortlisted}>
          {isShortlisted ? "Shortlisted ✓" : "Shortlist"}
        </Button>
        <Button variant="outline" onClick={onSkip}>
          {isSkipped ? "Skipped" : "Skip"}
        </Button>
        <Button asChild variant="outline">
          <Link to={`/employer/candidates/${candidate.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default CandidateSmartCard;
