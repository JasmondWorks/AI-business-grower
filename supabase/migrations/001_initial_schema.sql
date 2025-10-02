-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Provider accounts table
CREATE TABLE provider_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scopes TEXT[],
  capabilities JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content items table
CREATE TABLE content_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_account_id UUID REFERENCES provider_accounts(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  payload JSONB,
  status TEXT DEFAULT 'draft',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  insights JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interactions table
CREATE TABLE interactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  text TEXT,
  author_handle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insight snapshots table
CREATE TABLE insight_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  provider_account_id UUID REFERENCES provider_accounts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  reach INTEGER,
  impressions INTEGER,
  ctr FLOAT,
  engagement_rate FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funding opportunities table
CREATE TABLE funding_opportunities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  deadline DATE,
  eligibility TEXT,
  description TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id UUID REFERENCES funding_opportunities(id) ON DELETE CASCADE,
  draft_text TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL,
  payload JSONB,
  status TEXT DEFAULT 'pending',
  scheduled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_provider_accounts_user_id ON provider_accounts(user_id);
CREATE INDEX idx_content_items_provider_account_id ON content_items(provider_account_id);
CREATE INDEX idx_interactions_content_item_id ON interactions(content_item_id);
CREATE INDEX idx_insight_snapshots_provider_account_id ON insight_snapshots(provider_account_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);