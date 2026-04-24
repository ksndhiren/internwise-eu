import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type CoachRecommendationCardProps = {
  recommendation: {
    id: string;
    title: string;
    impact: string;
  };
  onStart: (id: string) => void;
};

const CoachRecommendationCard = ({ recommendation, onStart }: CoachRecommendationCardProps) => {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-card-soft">
      <h3 className="text-lg font-extrabold text-slate-950">{recommendation.title}</h3>
      <p className="mt-2 text-sm font-semibold text-primary">{recommendation.impact}</p>
      <Button variant="ghost" className="mt-3 px-0 text-primary hover:bg-transparent hover:text-primary" onClick={() => onStart(recommendation.id)}>
        Start <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </article>
  );
};

export default CoachRecommendationCard;
