import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  copy: string;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState = ({ title, copy, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-card-soft">
      <h3 className="text-2xl font-extrabold text-slate-950">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-500">{copy}</p>
      {actionLabel && onAction && (
        <Button className="mt-5 bg-primary-gradient text-white" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
