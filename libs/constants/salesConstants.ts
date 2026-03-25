export enum LEAD_SOURCE {
    GOOGLE_ADS = 'Google Ads',
    LINKEDIN = 'LinkedIn',
    CAMPAIGNS = 'Campaigns',
    EMAIL = 'Email',
    WEBSITE = 'Website',
    VERBAL = 'Verbal',
    EVENTS = 'Events',
    REFERENCE = 'Reference',
    REPEAT_CLIENT = 'Repeat Client',
    B2B = 'B2B',
    SPRINTO = 'Sprinto',
    SCYTALE = 'Scytale',
    OTHERS = 'Others'
}

export enum LEAD_STATUS {
    NEW = 'New',
    CONTACTED = 'Contacted',
    SERVICES = 'Services', // Requirement Confirmed
    PROPOSAL = 'Proposal', // Proposal Submitted
    AWARDED = 'Awarded',
    LOST = 'Lost'
}

export enum LEAD_QUALITY {
    COLD = 'Cold',
    WARM = 'Warm',
    HOT = 'Hot'
}

export enum PROPOSAL_STATUS {
    DRAFT = 'Draft',
    SENT = 'Sent',
    APPROVED = 'Approved', // Accepted
    REJECTED = 'Rejected',
    EXPIRED = 'Expired'
}

export enum PROJECT_STATUS {
    PENDING = 'Pending',
    IN_PROGRESS = 'In Progress',
    ON_HOLD = 'On Hold',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled'
}

export enum INVOICE_STATUS {
    DRAFT = 'Draft',
    SENT = 'Sent',
    PAID = 'Paid',
    PARTIAL = 'Partial',
    OVERDUE = 'Overdue',
    CANCELLED = 'Cancelled'
}

export enum INVOICE_TAX_TYPE {
    CGST_SGST = 'CGST_SGST',
    IGST = 'IGST',
    NONE = 'None'
}

export enum PAYMENT_METHOD {
    NEFT = 'NEFT',
    RTGS = 'RTGS',
    CHEQUE = 'Cheque',
    CASH = 'Cash',
    ONLINE = 'Online',
    UPI = 'UPI'
}
