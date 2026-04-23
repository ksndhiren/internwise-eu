import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  viewMode?: "grid" | "list";
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
  viewMode = "grid",
}: EmployerCandidateCardProps) => {
  const reduceMotion = useReducedMotion();
  const isShortlisted = status === "new" || status === "contacted" || primaryLabel === "Shortlisted" || primaryDisabled;
  const showShortlistFeedback = isAnimating || isShortlisted;

  return (
    <motion.article
      layout
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.003, boxShadow: "0 24px 46px rgba(15, 23, 42, 0.14)" }}
      whileTap={reduceMotion ? undefined : { scale: 0.992 }}
      animate={
        reduceMotion
          ? undefined
          : isAnimating
            ? {
                scale: [1, 0.988, 1.012, 1],
                boxShadow: [
                  "0 18px 40px rgba(15, 23, 42, 0.10)",
                  "0 0 0 1px rgba(52, 211, 153, 0.26), 0 0 28px rgba(52, 211, 153, 0.18), 0 24px 44px rgba(15, 23, 42, 0.12)",
                  "0 18px 40px rgba(15, 23, 42, 0.10)",
                ],
              }
            : undefined
      }
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-[1.15rem] border bg-white/95 p-5 shadow-card-soft backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20",
        isShortlisted ? "border-emerald-200/90" : "border-slate-200",
        isAnimating && "ring-1 ring-primary/25",
        viewMode === "list" && "md:p-6",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/8 via-primary-light/10 to-transparent opacity-90" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.15rem] ring-1 ring-transparent transition group-hover:ring-primary/15" />

      {showShortlistFeedback && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700 shadow-sm"
        >
          <Check className="h-3.5 w-3.5" />
          Shortlisted
        </motion.div>
      )}

      <div className="relative flex flex-col gap-5">
        <div className={cn("flex items-start justify-between gap-4", viewMode === "list" && "md:flex-row")}>
          <div className="flex items-center gap-4">
            <img src={candidate.avatar} alt={candidate.name} className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-white" />
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

          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className={cn(
              "rounded-full bg-primary-gradient px-4 py-3 text-center text-white shadow-sm",
              isAnimating && "shadow-[0_0_26px_rgba(95,167,229,0.28)]",
            )}
          >
            <div className="text-2xl font-extrabold">{candidate.score}%</div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/76">Match</div>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 5).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 transition group-hover:bg-blue-50 group-hover:text-primary"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="rounded-[1.6rem] bg-slate-50 p-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">Why this candidate fits</p>
          <div className="space-y-2.5">
            {candidate.reasons.slice(0, 2).map((reason) => (
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
            <Button
              onClick={onPrimary}
              disabled={primaryDisabled}
              className={cn(
                "shadow-cta disabled:opacity-60",
                isShortlisted ? "bg-emerald-600 text-white hover:bg-emerald-600" : "bg-cta-gradient text-white",
              )}
            >
              {isShortlisted ? "Shortlisted ✓" : primaryLabel}
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
    </motion.article>
  );
};

export default memo(EmployerCandidateCard);
