import { ReactNode } from "react";

interface CardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function Card({ title, description, actions, children }: CardProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
      <header className="flex items-start justify-between gap-3">
        <div>
          {title ? (
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          ) : null}
          {description ? (
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </header>
      <div className={title || description ? "mt-4" : ""}>{children}</div>
    </section>
  );
}