"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const opportunities = [
  {
    id: "grant-1",
    name: "Community Resilience Grant",
    deadline: "Oct 12",
    amount: "$25k",
    fit: "High",
  },
  {
    id: "grant-2",
    name: "Digital Equity Challenge",
    deadline: "Nov 4",
    amount: "$50k",
    fit: "Medium",
  },
  {
    id: "investor-1",
    name: "Seed Impact Angels",
    deadline: "Rolling",
    amount: "$150k",
    fit: "Nurture",
  },
];

const pipeline = [
  { stage: "To Apply", count: 4, notes: "AI can generate drafts" },
  { stage: "Drafting", count: 2, notes: "Initial reviews pending" },
  { stage: "Applied", count: 1, notes: "Awaiting response" },
  { stage: "Response", count: 0, notes: "Follow-ups scheduled" },
];

const drafts = [
  {
    name: "Community Resilience Grant",
    status: "Needs review",
    outline: ["Executive summary", "Impact metrics", "Budget narrative"],
  },
  {
    name: "Seed Impact Angels",
    status: "AI revision",
    outline: ["Problem", "Solution", "Go-to-market", "Ask"],
  },
];

export default function FundingPage() {
  return (
    <DashboardShell
      title="Funding hub"
      subtitle="Discover opportunities, direct the grant workflow, and keep investors warm."
      actions={<Button variant="outline">Export pipeline</Button>}
    >
      <section className="grid gap-4 lg:grid-cols-3">
        {pipeline.map((item) => (
          <Card
            key={item.stage}
            title={item.stage}
            description={`${item.count} active`}
          >
            <p className="text-sm text-slate-300">{item.notes}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Recommended opportunities"
          description="AI matches focus area, eligibility, and deadline fit."
          actions={<Button variant="ghost">Filter</Button>}
        >
          <div className="space-y-3">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">
                    {opportunity.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    Deadline {opportunity.deadline} • {opportunity.amount}
                  </p>
                </div>
                <Badge
                  variant={
                    opportunity.fit === "High"
                      ? "success"
                      : opportunity.fit === "Medium"
                      ? "info"
                      : "warning"
                  }
                >
                  {opportunity.fit}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="AI drafted materials"
          description="Review before exporting as PDF or deck."
          actions={<Button variant="outline">Generate deck</Button>}
        >
          <div className="space-y-3">
            {drafts.map((draft) => (
              <div
                key={draft.name}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    {draft.name}
                  </p>
                  <Badge variant="info">{draft.status}</Badge>
                </div>
                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  {draft.outline.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <Button
                  variant="ghost"
                  className="mt-3 px-0 text-indigo-300 hover:text-indigo-200"
                >
                  Open draft
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card
        title="Reminders"
        description="Deadline alerts and stakeholder updates."
      >
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-white">
              Community Resilience
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Draft review with programs team tomorrow.
            </p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-white">
              Seed Impact Angels
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Send traction dashboard update on Friday.
            </p>
          </div>
        </div>
      </Card>
    </DashboardShell>
  );
}
