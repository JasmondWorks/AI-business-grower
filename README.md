# Amplifyr — AI Growth Partner

Amplifyr is an AI co-pilot that automates social visibility and funding workflows for organisations. The 2.0 MVP ships Read/Write social integrations, Autopilot scheduling, and a Funding Hub that drafts grant applications and investor decks.

## Tech stack

- **Framework**: Next.js App Router (React 19, TypeScript)
- **Styling**: Tailwind (v4) utility-first classes
- **Data + Auth**: Supabase (Postgres, Auth, Storage)
- **State**: React Query for client-side data orchestration
- **AI**: OpenAI API (text + image generation, optional fine-tuning)

## App surface

| Area | Description |
| --- | --- |
| `/` | Growth Control Center with cross-channel metrics, roadmap, and key actions |
| `/social` | Account connections, publishing cadence, ingestion jobs, feedback loop |
| `/autopilot` | Configure cadence presets, monitor pipeline stages, view learning feed |
| `/funding` | Opportunity discovery, funding pipeline, AI draft manager |
| `/analytics` | Unified engagement analytics and experiment tracking |
| `/settings` | Workspace profile, notifications, AI guardrails |

## Supabase schema

Migrations live in `supabase/migrations`. The initial schema sets up social, content, funding, and job tables. `002_expand_schema.sql` introduces organisations, autopilot config/runs, AI recommendations, notifications, and export tracking.

### Credentials

Populate `.env.local` with your Supabase and OpenAI keys:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. The middleware redirects unauthenticated users to `/login`.

To run database migrations:

```bash
npx supabase migrate up
```

## Next up

1. Implement Supabase edge functions for ingestion cron and autopilot jobs.
2. Wire provider OAuth flows (Meta, X, LinkedIn, YouTube) and store scopes.
3. Connect AI generation endpoints for content, grants, and deck exports.
4. Build real analytics dashboards backed by Supabase RPC/materialized views.