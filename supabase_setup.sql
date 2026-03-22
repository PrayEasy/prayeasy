-- PrayEasy Beta Signup Table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new

CREATE TABLE IF NOT EXISTS public.event_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  interested_in_beta boolean DEFAULT false,
  source text DEFAULT 'Website',
  created_at timestamptz DEFAULT now()
);

-- Create unique constraint on email to prevent duplicates
ALTER TABLE public.event_signups ADD CONSTRAINT event_signups_email_unique UNIQUE (email);

-- Enable Row Level Security
ALTER TABLE public.event_signups ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for anonymous form submissions)
CREATE POLICY "Allow public insert" ON public.event_signups
  FOR INSERT
  WITH CHECK (true);

-- Allow reading own data (optional, for admin)
CREATE POLICY "Allow public select" ON public.event_signups
  FOR SELECT
  USING (true);
