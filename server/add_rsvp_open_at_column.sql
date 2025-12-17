-- Add rsvp_open_at column to events table if it doesn't exist
-- Run this in Supabase SQL Editor

ALTER TABLE events 
ADD COLUMN IF NOT EXISTS rsvp_open_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 minute');

-- Update existing events to have rsvp_open_at = created_at + 1 minute
UPDATE events 
SET rsvp_open_at = created_at + INTERVAL '1 minute'
WHERE rsvp_open_at IS NULL;

