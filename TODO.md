# Rollback API - Task 2

## Task 1 Status: COMPLETE ✅

## Task 2: Rollback API (Proposals/Services → Active Lists)

**Goal**: `POST /leads/{id}/rollback` - reverse dropLead

**Rollback**:
- LeadServices.status = 'REQUIREMENT_CONFIRMED' 
- Proposals.status = 'DRAFT'
- Lead.status = 'SERVICES', isActive=true

### Plan Steps:
1. Add RollbackLeadDto to libs/dtos/master_management/lead.dto.ts
2. Add @Post(':id/rollback') in lead.controller.ts
3. Add rollbackLead() in lead.service.ts (transactional)
4. Update TODO.md ✓

**DTO**:
```
{
  "reason": "Client reconsidered",
  "notes": "Budget approved"
}
```

Confirm plan → implement.

**Next**: Create RollbackLeadDto

