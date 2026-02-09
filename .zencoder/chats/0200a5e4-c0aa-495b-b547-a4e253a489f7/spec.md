# Technical Specification

## Technical Context
- Backend: NestJS (Nx workspace) with TypeORM
- DB: MySQL (TypeORM `synchronize: true` in `DBModule`)
- Apps: `apps/master-management` and `apps/authentication`
- Shared libs: `libs/database`, `libs/constants`, `libs/response-handler`, `libs/interfaces`, `libs/dtos`
- Existing auth/permission: `PermissionManager` entity with module/action permissions

## Implementation Approach
1. Extend `master-management` app with modules for departments, modules/menus, roles/permissions, and lead details.
2. Use TypeORM entities in `libs/database/src/entities` and register in `DBModule`.
3. Use constants for roles/departments as interim defaults, but drive management UI/API from database masters.
4. Align permissions to `PermissionManager.permissions` for module/action mapping.

## Source Structure Changes
- `apps/master-management/src/app/department` (module/controller/service)
- `apps/master-management/src/app/module-management` (modules/menus/permission mapping)
- `apps/master-management/src/app/lead` (lead, customer, address, contact)
- `libs/database/src/entities` additions for new masters and lead-related tables
- `libs/interfaces` + `libs/dtos` updates for new APIs
- Update `apps/master-management/src/app/app.module.ts` to include new modules and remove missing imports if unused

## Data Model Changes
### New Entities
- `Department`: id, name, code, status, createdAt
- `SystemModule` (or `MenuModule`): id, name, code, status
- `Menu`: id, name, moduleId, path, parentId, sortOrder, status
- `Lead`: enquiryId, enquiryReference, source, sourceDescription, status, notes, createdBy, createdAt
- `Customer`: customerId, name, industry, headcount
- `CustomerAddress`: customerId, line1, line2, city, state, country, postalCode, addressType
- `CustomerContact`: customerId, name, designation, email, phoneNo, countryCode, isPrimary

### Updated Entities
- `User`:
  - Replace department enum with `departmentId` relation to `Department` (pending user confirmation)
  - Remove irrelevant fields per user confirmation
- `PermissionManager.permissions`:
  - Reference `SystemModule` or `Menu` ids in `module`

## API / Interface Changes
### Department APIs
- `POST /departments`
- `GET /departments`
- `GET /departments/:id`
- `PATCH /departments/:id`
- `PATCH /departments/:id/status`

### Module/Menu APIs
- `POST /modules`
- `GET /modules`
- `POST /menus`
- `GET /menus`
- `POST /permissions/assign` (map role to module actions)

### Lead APIs
- `POST /leads`
- `GET /leads`
- `GET /leads/:id`
- `PATCH /leads/:id`
- `POST /leads/draft`
- `GET /customers/search?name=...`

## Delivery Phases
1. Phase 1: Core masters (Department, Module/Menu, Role/Permission) + User cleanup + Lead details
2. Phase 2: Work Request / Intake + Approval workflow + Audit logs
3. Phase 3: Remaining module masters and dashboards

## Verification Approach
- Lint: `npx nx run master-management:lint`
- Unit tests: `npx nx run master-management:test`
- Build: `npx nx run master-management:build`

## Open Items
- Confirm which user fields to remove.
- Confirm department mapping strategy (single vs multiple departments).
- Confirm module-permission mapping (direct vs mapping table).
- Confirm whether the missing `user_management`/`master_standard` modules should be re-created or removed from `app.module.ts`.
