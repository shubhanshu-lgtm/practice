-- Figma Invoice & Payment Updates Migration

-- 1. Create proposal_files table for proper multiple PDF support
CREATE TABLE IF NOT EXISTS `proposal_files` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `proposalId` INT NOT NULL,
  `fileUrl` VARCHAR(500) NOT NULL,
  `fileName` VARCHAR(255) NULL,
  `createdAt` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT `FK_proposal_files_proposal` FOREIGN KEY (`proposalId`) REFERENCES `proposal`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2. Ensure pdfUrl column exists in proposal table for backward compatibility/quick access
ALTER TABLE `proposal` ADD COLUMN IF NOT EXISTS `pdfUrl` VARCHAR(1000) NULL;

-- 3. Update invoice table with missing Figma fields
ALTER TABLE `invoice`
  ADD COLUMN IF NOT EXISTS `billToPan` VARCHAR(50) NULL,
  ADD COLUMN IF NOT EXISTS `customerPoNumber` VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS `accountManager` VARCHAR(255) NULL,
  ADD COLUMN IF NOT EXISTS `businessNumber` VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS `sacCode` VARCHAR(50) NULL,
  ADD COLUMN IF NOT EXISTS `bankDetails` JSON NULL;

-- 4. Ensure other invoice columns from figma are present
ALTER TABLE `invoice`
  MODIFY COLUMN `pdfUrl` VARCHAR(1000) NULL,
  MODIFY COLUMN `status` ENUM('Draft','Sent','Paid','Partial','Overdue','Cancelled') DEFAULT 'Draft';

-- 5. Update invoice_item for SAC code
ALTER TABLE `invoice_item`
  ADD COLUMN IF NOT EXISTS `sacCode` VARCHAR(50) NULL;
