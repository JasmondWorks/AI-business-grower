import { ReactNode } from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "neutral" | "info";
  children: ReactNode;
}

const variantStyles: Record<Required<BadgeProps>["variant"], string> = {
  success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  warning: "bg-amber-500/10 text-amber-200 border-amber-500/30",
  danger: "bg-rose-500/10 text-rose-300 border-rose-500/40",
  neutral: "bg-slate-500/10 text-slate-200 border-slate-600/30",
  info: "bg-sky-500/10 text-sky-200 border-sky-500/30",
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}