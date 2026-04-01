# Drop Client Enhancement Task

## Status: In Progress

### Steps:
- [x] 1. Create this TODO.md
- [ ] 2. Read & analyze lead.service.ts dropLead method
- [x] 3. Implement transactional dropLead: Update LeadServices to DROPPED, Proposals to REJECTED, Lead to LOST
- [x] 4. Edit lead.service.ts with changes
- [ ] 5. Test endpoints:
  - POST /leads/{id}/drop
  - Verify /assigned-services/list excludes
  - Verify /proposals excludes
  - Verify /dropped-list includes
- [ ] 6. Mark complete & attempt_completion

**Next step:** Proceed to step 2-4 (edit lead.service.ts)

