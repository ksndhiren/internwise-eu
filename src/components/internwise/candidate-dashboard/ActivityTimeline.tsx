import { Sparkles } from "lucide-react";
import type { ActivityItem } from "@/components/internwise/candidate-dashboard/dashboardData";

type ActivityTimelineProps = {
  items: ActivityItem[];
};

const ActivityTimeline = ({ items }: ActivityTimelineProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-950">Recent activity</h2>
          <p className="mt-1 text-sm text-slate-500">A quick read on how your profile is moving through the system.</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {items.map((item, index) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex w-6 flex-col items-center">
              <span className="mt-1 h-3 w-3 rounded-full bg-primary" />
              {index < items.length - 1 && <span className="mt-2 h-full w-px bg-slate-200" />}
            </div>
            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-extrabold text-slate-950">{item.title}</h3>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.time}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityTimeline;
