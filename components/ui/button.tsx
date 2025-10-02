import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400/40 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50";

const variants: Record<Required<ButtonProps>["variant"], string> = {
  primary: "bg-indigo-500 text-white hover:bg-indigo-400",
  outline: "border border-slate-700 text-slate-100 hover:bg-slate-800/60",
  ghost: "text-slate-200 hover:bg-slate-800/60",
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}