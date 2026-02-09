# Full SDD workflow

## Workflow Steps

### [x] Step: Requirements

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `d:\INTERCERT_IC_ORG_OPMS_BKND\.zencoder\chats\0200a5e4-c0aa-495b-b547-a4e253a489f7/requirements.md`.

### [x] Step: Technical Specification

Create a technical specification based on the PRD in `d:\INTERCERT_IC_ORG_OPMS_BKND\.zencoder\chats\0200a5e4-c0aa-495b-b547-a4e253a489f7/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `d:\INTERCERT_IC_ORG_OPMS_BKND\.zencoder\chats\0200a5e4-c0aa-495b-b547-a4e253a489f7/spec.md` with:

- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning

1. Create `Department` entity, DTOs, service, controller, module.
   - Contracts: `libs/constants/autenticationConstants/userContants.ts` (departments) and `libs/database/src/entities`.
   - Verification: `npx nx run master-management:lint`.
2. Create `SystemModule` + `Menu` entities and permission mapping update for `PermissionManager.permissions`.
   - Contracts: `libs/constants/autenticationConstants/permissionManagerConstants.ts`.
   - Verification: `npx nx run master-management:lint`.
3. Implement Lead entities (Lead, Customer, Address, Contact) and Lead APIs.
   - Contracts: `libs/templates/Documentation for OPMS.txt`.
   - Verification: `npx nx run master-management:lint`.
4. Update `User` entity and interfaces to remove irrelevant fields and map to department.
   - Contracts: `libs/database/src/entities/user.entity.ts`, `libs/interfaces/authentication/user.interface.ts`.
   - Verification: `npx nx run master-management:lint`.
5. Wire new modules into `apps/master-management/src/app/app.module.ts` and route permission checks.
   - Verification: `npx nx run master-management:lint`.
6. Add minimal tests for new controllers/services.
   - Verification: `npx nx run master-management:test`.
7. Run build for master-management.
   - Verification: `npx nx run master-management:build`.

Save to `d:\INTERCERT_IC_ORG_OPMS_BKND\.zencoder\chats\0200a5e4-c0aa-495b-b547-a4e253a489f7/plan.md`.

### [ ] Step: Implementation

1. [x] Implement `Department` entity, DTOs, service, controller, module.
2. [x] Implement `SystemModule` + `Menu` entities and update permission mapping.
3. [x] Implement Lead entities and APIs.
4. [x] Update `User` entity and interfaces to remove irrelevant fields and map department.
5. [x] Wire new modules into `apps/master-management/src/app/app.module.ts`.
6. [ ] Add tests for new modules.
7. [x] Run lint/test/build and record results.
