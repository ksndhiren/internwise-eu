type EmployerPreviewCardProps = {
  candidateName: string;
  score: number;
  preview: {
    topSkills: string[];
    fitSummary: string;
  };
};

const EmployerPreviewCard = ({ candidateName, score, preview }: EmployerPreviewCardProps) => {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card-soft">
      <h2 className="text-2xl font-extrabold text-slate-950">Employer view preview</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        A quick look at how this match appears from the employer side.
      </p>

      <div className="mt-6 rounded-[1.8rem] border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-slate-950">{candidateName}</h3>
            <p className="mt-1 text-sm text-slate-500">Candidate smart card preview</p>
          </div>
          <div className="rounded-full bg-primary-gradient px-4 py-2 text-sm font-extrabold text-white">
            {score}% Match
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {preview.topSkills.map((skill) => (
            <span key={skill} className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 rounded-[1.3rem] bg-white p-4 text-sm leading-6 text-slate-600">
          {preview.fitSummary}
        </div>
      </div>
    </section>
  );
};

export default EmployerPreviewCard;
