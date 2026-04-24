import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { CandidateMatch } from "@/components/internwise/candidate-dashboard/dashboardData";

type SimilarMatchCardProps = {
  match: CandidateMatch;
};

const SimilarMatchCard = ({ match }: SimilarMatchCardProps) => {
  return (
    <article className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-card-soft transition hover:-translate-y-0.5 hover:border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-950">{match.title}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {match.company} · {match.location}
          </p>
        </div>
        <span className="rounded-full bg-primary/8 px-3 py-1 text-sm font-extrabold text-primary">{match.score}%</span>
      </div>
      <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary">
        <Link to={`/candidate/matches/${match.id}`}>
          View Match <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
};

export default SimilarMatchCard;
