-- ============================================================
-- Migration: Add Invoice, InvoiceItem, PaymentRecord tables
-- And alter Project table with new columns
-- ============================================================

-- 1. Alter project table
ALTER TABLE `project`
  ADD COLUMN IF NOT EXISTS `teamId` INT NULL,
  ADD COLUMN IF NOT EXISTS `assignedToUserId` INT NULL,
  ADD COLUMN IF NOT EXISTS `closureId` INT NULL,
  ADD COLUMN IF NOT EXISTS `endDate` DATE NULL,
  ADD COLUMN IF NOT EXISTS `description` TEXT NULL,
  ADD COLUMN IF NOT EXISTS `notes` TEXT NULL,
  ADD COLUMN IF NOT EXISTS `updatedAt` TIMESTAMP DEFAULT NOW() ON UPDATE NOW();

ALTER TABLE `project`
  ADD CONSTRAINT `FK_project_team` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_project_assignedToUser` FOREIGN KEY (`assignedToUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL;

-- 2. Create invoice table
CREATE TABLE IF NOT EXISTS `invoice` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `invoiceNumber` VARCHAR(50) NOT NULL UNIQUE,
  `closureId` INT NOT NULL,
  `projectId` INT NULL,
  `leadId` INT NOT NULL,
  `paymentTermId` INT NULL,
  `accountDepartmentId` INT NULL,
  `billFromEntity` VARCHAR(255) NULL,
  `billToCompanyName` VARCHAR(255) NULL,
  `billToAddress` JSON NULL,
  `billToGstNumber` VARCHAR(50) NULL,
  `invoiceDate` DATE NOT NULL,
  `dueDate` DATE NULL,
  `subTotal` DECIMAL(10,2) DEFAULT 0,
  `totalDiscount` DECIMAL(10,2) DEFAULT 0,
  `taxType` ENUM('CGST_SGST','IGST','None') DEFAULT 'None',
  `cgstPercentage` DECIMAL(5,2) DEFAULT 0,
  `sgstPercentage` DECIMAL(5,2) DEFAULT 0,
  `igstPercentage` DECIMAL(5,2) DEFAULT 0,
  `cgstAmount` DECIMAL(10,2) DEFAULT 0,
  `sgstAmount` DECIMAL(10,2) DEFAULT 0,
  `igstAmount` DECIMAL(10,2) DEFAULT 0,
  `totalTaxAmount` DECIMAL(10,2) DEFAULT 0,
  `grandTotal` DECIMAL(10,2) DEFAULT 0,
  `advancePaid` DECIMAL(10,2) DEFAULT 0,
  `netPayable` DECIMAL(10,2) DEFAULT 0,
  `amountReceived` DECIMAL(10,2) DEFAULT 0,
  `remainingBalance` DECIMAL(10,2) DEFAULT 0,
  `currency` VARCHAR(3) DEFAULT 'INR',
  `status` ENUM('Draft','Sent','Paid','Partial','Overdue','Cancelled') DEFAULT 'Draft',
  `pdfUrl` VARCHAR(1000) NULL,
  `notes` TEXT NULL,
  `createdAt` TIMESTAMP DEFAULT NOW(),
  `updatedAt` TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_invoice_closure` FOREIGN KEY (`closureId`) REFERENCES `proposal_acceptance`(`id`),
  CONSTRAINT `FK_invoice_project` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_invoice_lead` FOREIGN KEY (`leadId`) REFERENCES `lead`(`id`),
  CONSTRAINT `FK_invoice_paymentTerm` FOREIGN KEY (`paymentTermId`) REFERENCES `proposal_payment_term`(`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_invoice_accountDept` FOREIGN KEY (`accountDepartmentId`) REFERENCES `department`(`id`) ON DELETE SET NULL
);

-- 3. Create invoice_item table
CREATE TABLE IF NOT EXISTS `invoice_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `invoiceId` INT NOT NULL,
  `proposalItemId` INT NULL,
  `serviceName` VARCHAR(255) NOT NULL,
  `serviceDescription` TEXT NULL,
  `qty` INT DEFAULT 1,
  `unitPrice` DECIMAL(10,2) NOT NULL,
  `discount` DECIMAL(5,2) DEFAULT 0,
  `discountAmount` DECIMAL(10,2) DEFAULT 0,
  `taxableAmount` DECIMAL(10,2) NOT NULL,
  `taxPercentage` DECIMAL(5,2) DEFAULT 0,
  `taxAmount` DECIMAL(10,2) DEFAULT 0,
  `netAmount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) DEFAULT 'INR',
  `createdAt` TIMESTAMP DEFAULT NOW(),
  `updatedAt` TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_invoiceItem_invoice` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE
);

-- 4. Create payment_record table
CREATE TABLE IF NOT EXISTS `payment_record` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `invoiceId` INT NOT NULL,
  `orderId` VARCHAR(100) NULL,
  `paymentDate` DATE NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `paymentMethod` ENUM('NEFT','RTGS','Cheque','Cash','Online','UPI') DEFAULT 'NEFT',
  `bankName` VARCHAR(255) NULL,
  `transactionId` VARCHAR(255) NULL,
  `chequeNumber` VARCHAR(100) NULL,
  `remainingBalance` DECIMAL(10,2) DEFAULT 0,
  `notes` TEXT NULL,
  `createdAt` TIMESTAMP DEFAULT NOW(),
  `updatedAt` TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_paymentRecord_invoice` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE
);

-- 5. Alter proposal_acceptance: add accountDepartmentId for "Assign to Account" step
ALTER TABLE `proposal_acceptance`
  ADD COLUMN IF NOT EXISTS `accountDepartmentId` INT NULL,
  ADD CONSTRAINT `FK_proposalAcceptance_accountDept` FOREIGN KEY (`accountDepartmentId`) REFERENCES `department`(`id`) ON DELETE SET NULL;
