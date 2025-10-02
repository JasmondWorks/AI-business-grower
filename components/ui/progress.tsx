interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
      <div
        className="h-full rounded-full bg-indigo-500 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}