import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { EmployerBrief } from "@/components/internwise/employers/employerMockData";

type HiringNeedsSummaryProps = {
  brief: EmployerBrief;
};

const HiringNeedsSummary = ({ brief }: HiringNeedsSummaryProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <h2 className="text-2xl font-extrabold text-slate-950">Hiring needs summary</h2>
      <div className="mt-5 space-y-4">
        <div className="rounded-[1.4rem] bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Active role</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{brief.roles[0]}</p>
        </div>
        <div className="rounded-[1.4rem] bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Location</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">{brief.location}</p>
        </div>
        <div className="rounded-[1.4rem] bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Required skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {brief.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Button asChild className="mt-6 w-full bg-primary-gradient text-white">
        <Link to="/employer-onboarding">Edit Hiring Needs</Link>
      </Button>
    </section>
  );
};

export default HiringNeedsSummary;
