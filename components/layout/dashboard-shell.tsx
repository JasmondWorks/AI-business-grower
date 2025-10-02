"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/social", label: "Social" },
  { href: "/autopilot", label: "Autopilot" },
  { href: "/funding", label: "Funding" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

interface DashboardShellProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({
  title,
  subtitle,
  actions,
  children,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-slate-800 bg-slate-950/90 p-6 md:flex">
        <div className="text-xl font-semibold tracking-tight">Amplifyr</div>
        <p className="mt-2 text-sm text-slate-400">
          AI growth partner for visibility and funding.
        </p>
        <nav className="mt-6 flex flex-1 flex-col gap-1 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 font-medium transition hover:bg-slate-800/60 hover:text-white ${
                  isActive ? "bg-slate-800 text-white" : "text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="rounded-md border border-slate-800/60 bg-slate-900/80 p-4 text-xs text-slate-400">
          <p className="font-semibold text-slate-200">MVP Milestones</p>
          <ul className="mt-2 space-y-1">
            <li>• Phase 1: IG/FB Read+Write</li>
            <li>• Phase 2: Autopilot + Feedback</li>
            <li>• Phase 3: Funding Hub Lite</li>
          </ul>
        </div>
      </div>

      <div className="md:pl-64">
        <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {title ? (
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  {title}
                </h1>
              ) : null}
              {subtitle ? (
                <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">{actions}</div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-6 py-8">
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}