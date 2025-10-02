"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase";

const growthMetrics = [
  { label: "Posts last 7 days", value: 14, delta: "+38%" },
  { label: "Avg engagement uplift", value: "21%", delta: "+6 pts" },
  { label: "Funding drafts", value: 3, delta: "2 this week" },
];

const autopilotInsights = [
  {
    title: "Best posting window",
    detail: "Tuesdays between 11:00-13:00",
    delta: "+28% reach",
  },
  {
    title: "Top performing theme",
    detail: "Customer wins with short-form video",
    delta: "1.6x engagement",
  },
  {
    title: "Reply automation",
    detail: "7 comments handled with templates",
    delta: "0 escalations",
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    label: "Core Marketing",
    items: ["IG/FB OAuth", "Read insights", "AI drafts", "Publish queue"],
    progress: 85,
  },
  {
    phase: "Phase 2",
    label: "Autopilot",
    items: ["Cadence engine", "Daily ingestion", "Feedback loop"],
    progress: 40,
  },
  {
    phase: "Phase 3",
    label: "Funding Hub Lite",
    items: ["Grants feed", "AI drafts", "Tracker"],
    progress: 20,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const { data: user, isLoading } = useSupabaseUser();

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push("/login");
  }, [router, supabase]);

  if (isLoading) {
    return (
      <DashboardShell title="Loading" subtitle="Fetching your workspace...">
        <Card>
          <div className="h-24 animate-pulse rounded-lg bg-slate-800/60" />
        </Card>
      </DashboardShell>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <DashboardShell
      title="Growth Control Center"
      subtitle="Track social velocity, funding progress, and autopilot health."
      actions={
        <>
          <Badge variant="info">Autopilot: Enabled</Badge>
          <Button variant="ghost">Switch goal</Button>
          <Button onClick={handleLogout}>Sign out</Button>
        </>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {growthMetrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm uppercase tracking-wide text-slate-400">
              {metric.label}
            </p>
            <div className="mt-3 text-3xl font-semibold text-white">
              {metric.value}
            </div>
            <p className="mt-2 text-sm text-emerald-300">{metric.delta}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Autopilot pulse"
          description="Live look at the AI engine that keeps your channels active."
          actions={
            <Button variant="outline" onClick={() => router.push("/autopilot")}>
              Configure
            </Button>
          }
        >
          <div className="space-y-4">
            {autopilotInsights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-lg border border-slate-800/80 bg-slate-900/70 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">
                    {insight.title}
                  </p>
                  <Badge variant="success">{insight.delta}</Badge>
                </div>
                <p className="mt-2 text-sm text-slate-300">{insight.detail}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Funding radar"
          description="Curated grants and investors ready for your organisation."
          actions={
            <Button variant="outline" onClick={() => router.push("/funding")}>
              Open hub
            </Button>
          }
        >
          <ul className="space-y-4 text-sm text-slate-200">
            <li>
              <div className="flex items-center justify-between">
                <span>Community Resilience Grant</span>
                <Badge variant="warning">Due in 5 days</Badge>
              </div>
              <p className="mt-1 text-slate-400">
                $25k for local impact stories and outreach programmes.
              </p>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Seed Impact Angels</span>
                <Badge variant="info">Pitch deck draft ready</Badge>
              </div>
              <p className="mt-1 text-slate-400">
                AI drafted deck: traction, market compare, fundraising ask.
              </p>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span>Digital Uplift Fund</span>
                <Badge variant="success">Applied</Badge>
              </div>
              <p className="mt-1 text-slate-400">
                Application submitted 2 days ago. Awaiting response.
              </p>
            </li>
          </ul>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {roadmap.map((phase) => (
          <Card
            key={phase.phase}
            title={`${phase.phase} • ${phase.label}`}
            description={`${phase.progress}% complete`}
          >
            <Progress value={phase.progress} />
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {phase.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </section>

      <Card
        title="Next steps"
        description="Stay focused on the work that moves visibility and funding."
        actions={<Button variant="outline">Share report</Button>}
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-medium text-white">
              Sync Facebook comments
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Launch the webhook listener and backlog import.
            </p>
            <Button
              variant="ghost"
              className="mt-4 px-0 text-indigo-300 hover:text-indigo-200"
              onClick={() => router.push("/social")}
            >
              View details
            </Button>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-medium text-white">Refine AI voice</p>
            <p className="mt-2 text-sm text-slate-400">
              Upload 5 top performing posts to tighten tone matching.
            </p>
            <Button
              variant="ghost"
              className="mt-4 px-0 text-indigo-300 hover:text-indigo-200"
            >
              Configure
            </Button>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-medium text-white">Finish grant draft</p>
            <p className="mt-2 text-sm text-slate-400">
              Review AI summary, add impact metrics, send for approval.
            </p>
            <Button
              variant="ghost"
              className="mt-4 px-0 text-indigo-300 hover:text-indigo-200"
              onClick={() => router.push("/funding")}
            >
              Review draft
            </Button>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
