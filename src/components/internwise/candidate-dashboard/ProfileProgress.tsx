import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProfileChecklistItem } from "@/components/internwise/candidate-dashboard/dashboardData";

type ProfileProgressProps = {
  progress: number;
  items: ProfileChecklistItem[];
};

const ProfileProgress = ({ progress, items }: ProfileProgressProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-950">Profile completion</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">A stronger profile unlocks better match quality and faster employer trust.</p>
        </div>
        <span className="rounded-full bg-primary/8 px-4 py-2 text-sm font-bold text-primary">{progress}%</span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-primary-gradient" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 text-sm text-slate-600">
            {item.complete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <Circle className="h-4 w-4 text-slate-300" />
            )}
            <span className={cn(item.complete ? "text-slate-700" : "text-slate-500")}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileProgress;
