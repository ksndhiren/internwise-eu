type MatchBreakdownProps = {
  breakdown: {
    overall: number;
    skills: number;
    experience: number;
    preferences: number;
  };
};

const rows = [
  { key: "overall", label: "Overall match" },
  { key: "skills", label: "Skills match" },
  { key: "experience", label: "Experience match" },
  { key: "preferences", label: "Location / preference match" },
] as const;

const MatchBreakdown = ({ breakdown }: MatchBreakdownProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <h2 className="text-2xl font-extrabold text-slate-950">Match breakdown</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        A simple view of where this opportunity is strongest and where your profile still has room to improve.
      </p>

      <div className="mt-6 space-y-5">
        {rows.map((row) => {
          const value = breakdown[row.key];
          return (
            <div key={row.key}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-slate-700">{row.label}</span>
                <span className="text-sm font-extrabold text-slate-950">{value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-primary-gradient" style={{ width: `${value}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MatchBreakdown;
