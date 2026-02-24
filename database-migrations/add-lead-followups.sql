-- Description: Creates table for tracking lead follow-ups
-- Includes type, priority, dates, outcome, audit fields

CREATE TABLE IF NOT EXISTS lead_followup (
  id SERIAL PRIMARY KEY,
  "leadId" INTEGER NOT NULL REFERENCES lead(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL DEFAULT 'Follow Up',
  description TEXT NOT NULL,
  "followUpDate" TIMESTAMP NULL,
  "completedAt" TIMESTAMP NULL,
  "isCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
  priority VARCHAR(20) NOT NULL DEFAULT 'Medium',
  outcome TEXT NULL,
  "nextAction" TEXT NULL,
  "createdBy" INTEGER NULL REFERENCES "user"(id),
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "updatedBy" INTEGER NULL REFERENCES "user"(id),
  "updatedAt" TIMESTAMP NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE
);
