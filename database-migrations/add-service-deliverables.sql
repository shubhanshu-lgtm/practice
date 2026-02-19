-- Migration: Create service_deliverable table
-- Date: 2026-02-17
-- Description: Creates deliverables table for tracking tasks, reports, and outcomes for services and subservices

CREATE TABLE service_deliverable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  dueDate DATE NULL,
  isCompleted BOOLEAN DEFAULT FALSE,
  isActive BOOLEAN DEFAULT TRUE,
  serviceId INT NOT NULL,
  sortOrder INT DEFAULT 0 NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_deliverable_service
    FOREIGN KEY (serviceId) REFERENCES service_master(id)
    ON DELETE CASCADE
);

-- Add indexes for better query performance
CREATE INDEX idx_deliverable_service ON service_deliverable(serviceId);
CREATE INDEX idx_deliverable_active ON service_deliverable(isActive);
CREATE INDEX idx_deliverable_completed ON service_deliverable(isCompleted);
CREATE INDEX idx_deliverable_sort ON service_deliverable(sortOrder);

-- Sample deliverables for VAPT services (assuming service IDs from previous migration)
-- Note: Adjust service IDs based on your actual data

-- Example: Android VAPT deliverables
INSERT INTO service_deliverable (name, description, serviceId, sortOrder, isCompleted) 
VALUES 
  ('Security Assessment Report', 'Detailed report on vulnerabilities found in the Android application', 3, 1, false),
  ('Penetration Testing Results', 'Comprehensive penetration testing findings and recommendations', 3, 2, false),
  ('Remediation Guidance', 'Step-by-step guide for fixing identified vulnerabilities', 3, 3, false);

-- Example: iOS VAPT deliverables  
INSERT INTO service_deliverable (name, description, serviceId, sortOrder, isCompleted)
VALUES
  ('iOS Security Assessment Report', 'Detailed security analysis of the iOS application', 4, 1, false),
  ('Code Review Findings', 'Security issues identified during code review', 4, 2, false),
  ('Compliance Report', 'iOS App Store security compliance documentation', 4, 3, false);
