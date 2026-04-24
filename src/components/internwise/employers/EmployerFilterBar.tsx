type EmployerFilterValue = {
  role: string;
  location: string;
  score: string;
  skill: string;
  availability: string;
};

type EmployerFilterBarProps = {
  filters: EmployerFilterValue;
  options: {
    roles: string[];
    locations: string[];
    scores: string[];
    skills: string[];
    availability: string[];
  };
  onChange: (key: keyof EmployerFilterValue, value: string) => void;
};

const filterConfig: { key: keyof EmployerFilterValue; label: string }[] = [
  { key: "role", label: "Role" },
  { key: "location", label: "Location" },
  { key: "score", label: "Match %" },
  { key: "skill", label: "Skills" },
  { key: "availability", label: "Availability" },
];

const EmployerFilterBar = ({ filters, options, onChange }: EmployerFilterBarProps) => {
  const optionMap = {
    role: options.roles,
    location: options.locations,
    score: options.scores,
    skill: options.skills,
    availability: options.availability,
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-card-soft">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {filterConfig.map((filter) => (
          <label key={filter.key} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{filter.label}</span>
            <select
              value={filters[filter.key]}
              onChange={(event) => onChange(filter.key, event.target.value)}
              className="w-full bg-transparent font-semibold text-slate-900 outline-none"
            >
              {optionMap[filter.key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </section>
  );
};

export default EmployerFilterBar;
