"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Provider } from "@supabase/supabase-js";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { createClient } from "@/lib/supabase";

interface ProviderAccount {
  id: string;
  provider: string;
  scopes: string[];
  created_at: string;
}

type ProviderKey = "instagram" | "facebook" | "twitter" | "linkedin" | "youtube";

const providerToOAuth: Record<ProviderKey, Provider> = {
  instagram: "facebook",
  facebook: "facebook",
  twitter: "twitter",
  linkedin: "linkedin_oidc",
  youtube: "google",
};

const PROVIDERS: Array<{
  key: ProviderKey;
  name: string;
  accent: string;
  description: string;
}> = [
  {
    key: "instagram",
    name: "Instagram",
    accent: "from-purple-500 to-pink-500",
    description: "Feed, reels, comments, analytics",
  },
  {
    key: "facebook",
    name: "Facebook",
    accent: "from-blue-500 to-blue-700",
    description: "Pages, messages, insights",
  },
  {
    key: "twitter",
    name: "Twitter / X",
    accent: "from-neutral-900 to-neutral-700",
    description: "Tweets, mentions, DMs",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    accent: "from-blue-700 to-sky-600",
    description: "Company page posts, analytics",
  },
  {
    key: "youtube",
    name: "YouTube",
    accent: "from-red-600 to-rose-500",
    description: "Uploads, shorts, engagement",
  },
];

const autopilotPlaybooks = [
  {
    title: "Momentum Builder",
    cadence: "4 posts + 2 stories per week",
    status: "Running",
    completion: 72,
  },
  {
    title: "Engage & Reply",
    cadence: "Comment triage every 3 hours",
    status: "Learning",
    completion: 45,
  },
  {
    title: "Video Spotlight",
    cadence: "Weekly highlight reel",
    status: "Queued",
    completion: 20,
  },
];

const ingestionJobs = [
  { name: "Instagram analytics", schedule: "Daily 06:00", lastRun: "2h ago", status: "Success" },
  { name: "Facebook webhooks", schedule: "Real time", lastRun: "3m ago", status: "Success" },
  { name: "X mentions sync", schedule: "Hourly", lastRun: "Pending", status: "Warning" },
];

export default function SocialPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = useMemo(() => createClient(), []);
  const { data: user, isLoading: userLoading } = useSupabaseUser();
  const [autopilotEnabled, setAutopilotEnabled] = useState(true);

  const { data: accounts, isLoading: accountsLoading } = useQuery({
    queryKey: ["provider-accounts", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async (): Promise<ProviderAccount[]> => {
      const { data, error } = await supabase
        .from("provider_accounts")
        .select("id, provider, scopes, created_at")
        .eq("user_id", user?.id ?? "");
      if (error) {
        throw error;
      }
      return data ?? [];
    },
  });

  const connectMutation = useMutation({
    mutationFn: async (provider: ProviderKey) => {
      const oauthProvider = providerToOAuth[provider];
      const { error } = await supabase.auth.signInWithOAuth({
        provider: oauthProvider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/social`,
          scopes: getScopesForProvider(provider),
        },
      });
      if (error) {
        throw error;
      }
    },
  });

  const disconnectMutation = useMutation({
    mutationFn: async (accountId: string) => {
      const { error } = await supabase.from("provider_accounts").delete().eq("id", accountId);
      if (error) {
        throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["provider-accounts", user?.id] }),
  });

  const handleDisconnect = (account: ProviderAccount) => {
    disconnectMutation.mutate(account.id);
  };

  const getScopesForProvider = (provider: ProviderKey) => {
    switch (provider) {
      case "facebook":
      case "instagram":
        return "pages_read_engagement,pages_manage_posts,pages_read_user_content";
      case "twitter":
        return "tweet.read,tweet.write,users.read";
      case "linkedin":
        return "r_liteprofile,r_emailaddress,w_member_social";
      case "youtube":
        return "https://www.googleapis.com/auth/youtube.upload";
      default:
        return "";
    }
  };

  const resolveProviderState = (providerKey: ProviderKey) =>
    accounts?.find((account) => account.provider === providerKey);

  const renderStatus = (status: string) => {
    if (status === "Success") {
      return <Badge variant="success">Success</Badge>;
    }
    if (status === "Warning") {
      return <Badge variant="warning">Needs attention</Badge>;
    }
    return <Badge variant="danger">Failed</Badge>;
  };

  if (userLoading || accountsLoading) {
    return (
      <DashboardShell title="Loading social stack" subtitle="Checking connected providers...">
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
      title="Social autopilot"
      subtitle="Connect accounts, orchestrate publishing, and monitor engagement loops."
      actions={
        <Button variant="outline" onClick={() => setAutopilotEnabled((prev) => !prev)}>
          Autopilot: {autopilotEnabled ? "On" : "Off"}
        </Button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Connected accounts"
          description="OAuth tokens are stored encrypted. Add each channel to unlock read/write capabilities."
        >
          <div className="grid gap-3">
            {PROVIDERS.map((provider) => {
              const account = resolveProviderState(provider.key);
              return (
                <div
                  key={provider.key}
                  className="flex items-start justify-between gap-4 rounded-lg border border-slate-800/70 bg-slate-900/60 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r ${provider.accent}`}
                    >
                      <span className="text-sm font-semibold text-white">
                        {provider.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{provider.name}</p>
                      <p className="text-xs text-slate-400">{provider.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {account ? (
                      <>
                        <Badge variant="success">Connected</Badge>
                        <Button
                          variant="ghost"
                          onClick={() => handleDisconnect(account)}
                          disabled={disconnectMutation.isPending}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => connectMutation.mutate(provider.key)}
                        disabled={connectMutation.isPending}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          title="Publishing cadence"
          description="This week’s autopilot playbooks and queue health."
          actions={<Button variant="ghost">View calendar</Button>}
        >
          <div className="space-y-3">
            {autopilotPlaybooks.map((playbook) => (
              <div
                key={playbook.title}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{playbook.title}</p>
                    <p className="text-xs text-slate-400">{playbook.cadence}</p>
                  </div>
                  <Badge variant={playbook.status === "Running" ? "success" : "info"}>
                    {playbook.status}
                  </Badge>
                </div>
                <div className="mt-3">
                  <Progress value={playbook.completion} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card
          title="Ingestion jobs"
          description="Combine cron jobs and webhooks for fast feedback loops."
        >
          <div className="space-y-3">
            {ingestionJobs.map((job) => (
              <div
                key={job.name}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{job.name}</p>
                  <p className="text-xs text-slate-400">
                    {job.schedule} · Last run {job.lastRun}
                  </p>
                </div>
                {renderStatus(job.status)}
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Feedback loop"
          description="AI analyses performance to refine next recommendations."
        >
          <div className="space-y-3 text-sm text-slate-300">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <p className="font-medium text-white">Insights applied</p>
              <p className="mt-2 text-slate-400">
                Click-through rate improved by 18% after shortening captions to 140
                characters and adding CTA links above the fold.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <p className="font-medium text-white">Upcoming experiments</p>
              <ul className="mt-2 space-y-1">
                <li>• A/B test carousel vs reels for announcement posts</li>
                <li>• Auto-reply to comments with personalised follow-up prompts</li>
                <li>• Collect top posts for tone retraining dataset</li>
              </ul>
            </div>
          </div>
        </Card>
      </section>
    </DashboardShell>
  );
}