import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CoachSuggestion } from "@/components/internwise/candidate-dashboard/dashboardData";

type CoachSuggestionCardProps = {
  suggestion: CoachSuggestion;
  onFixNow: (suggestion: CoachSuggestion) => void;
};

const CoachSuggestionCard = ({ suggestion, onFixNow }: CoachSuggestionCardProps) => {
  const Icon = suggestion.icon;

  return (
    <article className="rounded-[1.6rem] bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-primary shadow-sm">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-extrabold text-slate-950">{suggestion.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{suggestion.text}</p>
        </div>
      </div>
      <Button variant="ghost" className="mt-3 px-0 text-primary hover:bg-transparent hover:text-primary" onClick={() => onFixNow(suggestion)}>
        Fix Now <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </article>
  );
};

export default CoachSuggestionCard;
