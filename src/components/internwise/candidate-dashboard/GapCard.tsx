import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GapCardProps = {
  gap: {
    id: string;
    name: string;
    explanation: string;
  };
  status?: "already-have" | "learning" | "not-yet";
  onImprove: (gapId: string) => void;
};

const statusLabel = {
  "already-have": "Added as proof",
  learning: "Marked as learning",
  "not-yet": "Learning path suggested",
} as const;

const GapCard = ({ gap, status, onImprove }: GapCardProps) => {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-card-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-950">{gap.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{gap.explanation}</p>
        </div>
        {status && (
          <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
            {statusLabel[status]}
          </span>
        )}
      </div>
      <Button variant="outline" className="mt-4" onClick={() => onImprove(gap.id)}>
        Improve This <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </article>
  );
};

export default GapCard;
