type EmployerStatsProps = {
  stats: { label: string; value: string }[];
};

const EmployerStats = ({ stats }: EmployerStatsProps) => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-[1.5rem] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur">
          <div className="text-2xl font-extrabold text-white">{stat.value}</div>
          <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/58">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default EmployerStats;
