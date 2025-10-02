"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <DashboardShell
      title="Workspace settings"
      subtitle="Configure organisation profile, notifications, and AI guardrails."
      actions={<Button variant="outline">Invite teammate</Button>}
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Organisation profile" description="Displayed on exports and investor materials.">
          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <p className="font-semibold text-white">Sproutly Labs</p>
              <p className="text-slate-400">Social impact marketing collective</p>
            </div>
            <Button variant="ghost" className="px-0 text-indigo-300 hover:text-indigo-200">
              Edit profile
            </Button>
          </div>
        </Card>

        <Card title="Notification preferences" description="Email + in-app alerts">
          <div className="space-y-2 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Autopilot alerts</span>
              <Badge variant="success">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Funding reminders</span>
              <Badge variant="info">Digest</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly summary</span>
              <Badge variant="warning">Pending setup</Badge>
            </div>
          </div>
        </Card>
      </section>

      <Card title="AI guardrails" description="Set instructions for tone, limits, and compliance.">
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            Tone guide: energetic, community-first, emphasise measurable impact.
          </p>
          <p>Restricted topics: no political endorsements, no speculative claims.</p>
          <Button variant="ghost" className="px-0 text-indigo-300 hover:text-indigo-200">
            Manage prompts
          </Button>
        </div>
      </Card>
    </DashboardShell>
  );
}