import { MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatShortlistedTime, type ShortlistEntry } from "@/components/internwise/employers/useEmployerShortlist";
import type { Candidate } from "@/components/internwise/employers/employerMockData";

type ShortlistedPanelProps = {
  items: { candidate: Candidate; entry: ShortlistEntry }[];
  onMessage: (candidateId: string) => void;
};

const statusLabel: Record<ShortlistEntry["status"], string> = {
  new: "New",
  contacted: "Awaiting candidate response",
  awaiting_response: "Awaiting candidate response",
  accepted_interest: "Accepted interest",
};

const ShortlistedPanel = ({ items, onMessage }: ShortlistedPanelProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <h2 className="text-2xl font-extrabold text-slate-950">Shortlisted</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Keep your best-fit candidates visible and move the conversation forward quickly.
      </p>

      <div className="mt-6 space-y-4">
        {items.length > 0 ? (
          items.map(({ candidate, entry }) => (
            <article key={candidate.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start gap-3">
                <img src={candidate.avatar} alt={candidate.name} className="h-12 w-12 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="truncate font-extrabold text-slate-950">{candidate.name}</div>
                      <div className="truncate text-sm text-slate-500">{candidate.role}</div>
                    </div>
                    <div className="rounded-full bg-white px-3 py-1 text-xs font-extrabold text-primary shadow-sm">
                      {candidate.score}%
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-white px-2.5 py-1 font-bold uppercase tracking-[0.14em] text-slate-500">
                      {statusLabel[entry.status]}
                    </span>
                    <span className="font-semibold text-slate-400">{formatShortlistedTime(entry.shortlistedAt)}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/employer/candidates/${candidate.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onMessage(candidate.id)}>
                      <MessageSquare className="mr-2 h-3.5 w-3.5" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-500">
            Shortlist candidates to manage them here.
          </div>
        )}
      </div>
    </section>
  );
};

export default ShortlistedPanel;
