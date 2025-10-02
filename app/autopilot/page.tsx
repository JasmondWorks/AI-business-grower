"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const cadencePresets = [
  {
    id: "steady",
    name: "Steady visibility",
    description: "3 posts + 2 stories per week",
    coverage: "Organic reach",
  },
  {
    id: "accelerate",
    name: "Accelerate",
    description: "5 posts + daily micro updates",
    coverage: "Growth campaigns",
  },
  {
    id: "funding",
    name: "Funding sprint",
    description: "Investor updates + traction wins",
    coverage: "Capital readiness",
  },
];

const pipelineStages = [
  {
    name: "Gather",
    description: "Ingestion from analytics + briefs",
    status: "Synced 30m ago",
  },
  {
    name: "Generate",
    description: "AI drafts copy + media variations",
    status: "Queued 4 items",
  },
  {
    name: "Review",
    description: "Human approval + tone adjustments",
    status: "2 approvals needed",
  },
  {
    name: "Publish",
    description: "Queue, autopost, webhook replies",
    status: "Next slot 15:00",
  },
];

const learningMoments = [
  {
    title: "Carousel vs reel",
    takeaway: "Reels delivered +42% reach, keep 45s length with subtitles.",
  },
  {
    title: "CTA placement",
    takeaway: "Link in first line improved clicks by 19%.",
  },
  {
    title: "Grant storytelling",
    takeaway: "Narratives featuring beneficiary quotes outperform stats only posts.",
  },
];

export default function AutopilotPage() {
  const [selectedPreset, setSelectedPreset] = useState("accelerate");

  return (
    <DashboardShell
      title="Autopilot director"
      subtitle="Tune cadence, review the pipeline, and understand how AI adapts."
      actions={<Button variant="outline">Pause autopilot</Button>}
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {cadencePresets.map((preset) => (
          <Card
            key={preset.id}
            title={preset.name}
            description={preset.description}
            actions={
              <Badge variant={selectedPreset === preset.id ? "success" : "neutral"}>
                {preset.coverage}
              </Badge>
            }
          >
            <Button
              variant={selectedPreset === preset.id ? "primary" : "outline"}
              className="mt-4"
              onClick={() => setSelectedPreset(preset.id)}
            >
              {selectedPreset === preset.id ? "Selected" : "Use preset"}
            </Button>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Pipeline"
          description="Every cycle refreshes ingest ? generate ? review ? publish."
        >
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div
                key={stage.name}
                className="flex items-center gap-4 rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/10 text-sm font-semibold text-indigo-200">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{stage.name}</p>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </div>
                <Badge variant="info">{stage.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Learning feed"
          description="Longer term adjustments from the feedback loop."
          actions={<Button variant="ghost">View changelog</Button>}
        >
          <div className="space-y-3">
            {learningMoments.map((moment) => (
              <div
                key={moment.title}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-sm font-semibold text-white">{moment.title}</p>
                <p className="mt-2 text-sm text-slate-300">{moment.takeaway}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card
        title="Cadence health"
        description="Top-level throughput for the last sprint."
        actions={<Button variant="outline">Download schedule</Button>}
      >
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Posts shipped</p>
            <p className="mt-2 text-3xl font-semibold text-white">18</p>
            <p className="mt-1 text-sm text-emerald-300">+5 vs target</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Approval time</p>
            <p className="mt-2 text-3xl font-semibold text-white">3.2h</p>
            <p className="mt-1 text-sm text-emerald-300">-41% vs last week</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Auto replies</p>
            <p className="mt-2 text-3xl font-semibold text-white">24</p>
            <p className="mt-1 text-sm text-slate-300">3 escalations</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Scheduled queue</p>
            <Progress value={68} />
            <p className="mt-2 text-sm text-slate-300">10 drafts awaiting review</p>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}