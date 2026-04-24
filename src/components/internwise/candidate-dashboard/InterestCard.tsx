import { Check, Eye, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { EmployerInterest } from "@/components/internwise/candidate-dashboard/dashboardData";

type InterestCardProps = {
  item: EmployerInterest;
  accepted: boolean;
  onAccept: (id: string) => void;
};

const interestConfig = {
  shortlisted: {
    label: "You were shortlisted by",
    icon: Sparkles,
    tone: "text-emerald-600 bg-emerald-50",
  },
  viewed: {
    label: "Viewed your profile",
    icon: Eye,
    tone: "text-primary bg-primary/8",
  },
  saved: {
    label: "Saved your profile",
    icon: Heart,
    tone: "text-amber-600 bg-amber-50",
  },
} as const;

const InterestCard = ({ item, accepted, onAccept }: InterestCardProps) => {
  const config = interestConfig[item.action];
  const Icon = config.icon;

  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-card-soft transition hover:-translate-y-0.5 hover:border-primary/15">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className={cn("grid h-10 w-10 place-items-center rounded-2xl", config.tone)}>
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-500">{config.label}</p>
            <h3 className="mt-1 text-lg font-extrabold text-slate-950">{item.company}</h3>
            <p className="mt-1 text-sm text-slate-500">
              {item.opportunity ?? "Candidate profile interest"} · {item.time}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          {item.time}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button variant="outline">View Opportunity</Button>
        {item.action === "shortlisted" && (
          <Button
            className={cn("bg-cta-gradient text-white", accepted && "bg-emerald-600 hover:bg-emerald-600")}
            onClick={() => onAccept(item.id)}
            disabled={accepted}
          >
            {accepted ? (
              <>
                Accepted <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Accept Interest"
            )}
          </Button>
        )}
      </div>
    </article>
  );
};

export default InterestCard;
