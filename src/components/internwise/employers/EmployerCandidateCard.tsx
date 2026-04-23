import { ArrowRight, Check, Clock3, MapPin, MessageSquare, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type Candidate } from "@/components/internwise/employers/employerMockData";
import { cn } from "@/lib/utils";
import { type ShortlistStatus } from "@/components/internwise/employers/useEmployerShortlist";

type EmployerCandidateCardProps = {
  candidate: Candidate;
  className?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  primaryDisabled?: boolean;
  onSecondary?: () => void;
  secondaryLabel?: string;
  isAnimating?: boolean;
  status?: ShortlistStatus;
  timestampLabel?: string;
  notes?: string;
  onNotesChange?: (value: string) => void;
  onContact?: () => void;
};

const EmployerCandidateCard = ({
  candidate,
  className,
  primaryLabel = "Shortlist",
  onPrimary,
  primaryDisabled,
  onSecondary,
  secondaryLabel = "Skip",
  isAnimating = false,
  status,
  timestampLabel,
  notes,
  onNotesChange,
  onContact,
}: EmployerCandidateCardProps) => {
  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card-soft transition",
        isAnimating && "ring-1 ring-primary/25",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/8 via-primary-light/10 to-transparent" />

      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={candidate.avatar} alt={candidate.name} className="h-16 w-16 rounded-2xl object-cover shadow-sm" />
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950">{candidate.name}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {candidate.role} · {candidate.location}
              </p>
              {(status || timestampLabel) && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {status && (
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
                        status === "contacted" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-primary",
                      )}
                    >
                      {status}
                    </span>
                  )}
                  {timestampLabel && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      {timestampLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-primary-gradient px-4 py-3 text-center text-white shadow-sm">
            <div className="text-2xl font-extrabold">{candidate.score}%</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/76">Match</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              {skill}
            </span>
          ))}
        </div>

        <div className="rounded-[1.6rem] bg-slate-50 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Why this candidate fits</p>
          <div className="space-y-2.5">
            {candidate.reasons.map((reason) => (
              <p key={reason} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-emerald-500" />
                {reason}
              </p>
            ))}
          </div>
        </div>

        {typeof notes === "string" && onNotesChange && (
          <div className="rounded-[1.6rem] bg-slate-50 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Notes</p>
            <textarea
              value={notes}
              onChange={(event) => onNotesChange(event.target.value)}
              placeholder="Add a quick note for your team"
              className="min-h-[96px] w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {onPrimary && (
            <Button onClick={onPrimary} disabled={primaryDisabled} className="bg-cta-gradient text-white shadow-cta disabled:opacity-60">
              {primaryLabel}
            </Button>
          )}
          {onSecondary && (
            <Button onClick={onSecondary} variant="outline">
              {secondaryLabel === "Remove from shortlist" && <X className="mr-2 h-4 w-4" />}
              {secondaryLabel}
            </Button>
          )}
          <Button asChild variant="outline">
            <Link to={`/employer-dashboard/candidate/${candidate.id}`}>
              View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          {onContact && (
            <Button onClick={onContact} variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact
            </Button>
          )}
        </div>

        {(status || timestampLabel) && (
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {candidate.location}
          </div>
        )}
      </div>
    </article>
  );
};

export default EmployerCandidateCard;
