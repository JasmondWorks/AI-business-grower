"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const channelBreakdown = [
  { name: "Instagram", reach: "48k", growth: "+26%", conversion: "3.4%" },
  { name: "Facebook", reach: "31k", growth: "+14%", conversion: "2.1%" },
  { name: "X", reach: "12k", growth: "+6%", conversion: "1.3%" },
  { name: "LinkedIn", reach: "19k", growth: "+18%", conversion: "4.6%" },
];

const experiments = [
  {
    name: "Reel vs static",
    metric: "Engagement",
    result: "+41%",
    status: "Winner",
  },
  {
    name: "CTA placement",
    metric: "Click-through",
    result: "+19%",
    status: "Winner",
  },
  {
    name: "Grant storytelling",
    metric: "Completion",
    result: "-3%",
    status: "Retest",
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardShell
      title="Analytics"
      subtitle="Unified performance view across channels and experiments."
      actions={<Button variant="outline">Export PDF</Button>}
    >
      <section className="grid gap-4 md:grid-cols-4">
        <Card title="Reach" description="Past 30 days">
          <p className="mt-2 text-3xl font-semibold text-white">110k</p>
          <p className="mt-1 text-sm text-emerald-300">+22% vs previous</p>
        </Card>
        <Card title="Engagement" description="Clicks + comments">
          <p className="mt-2 text-3xl font-semibold text-white">8.4k</p>
          <p className="mt-1 text-sm text-emerald-300">+15% vs previous</p>
        </Card>
        <Card title="Autopilot coverage" description="Posts handled by AI">
          <p className="mt-2 text-3xl font-semibold text-white">68%</p>
          <Progress value={68} />
        </Card>
        <Card title="Funding drafts" description="AI assisted">
          <p className="mt-2 text-3xl font-semibold text-white">6</p>
          <p className="mt-1 text-sm text-emerald-300">3 new this week</p>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Channel breakdown"
          description="Normalized metrics across connected accounts."
        >
          <div className="space-y-3">
            {channelBreakdown.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{channel.name}</p>
                  <p className="text-xs text-slate-400">Reach {channel.reach}</p>
                </div>
                <div className="text-right text-sm text-slate-300">
                  <p>{channel.growth}</p>
                  <p className="text-xs text-slate-500">Conv {channel.conversion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Experiments"
          description="High velocity tests with lift summaries."
          actions={<Button variant="ghost">View backlog</Button>}
        >
          <div className="space-y-3">
            {experiments.map((experiment) => (
              <div
                key={experiment.name}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{experiment.name}</p>
                  <p className="text-xs text-slate-400">Primary metric {experiment.metric}</p>
                </div>
                <Badge variant={experiment.status === "Winner" ? "success" : "warning"}>
                  {experiment.result}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </DashboardShell>
  );
}