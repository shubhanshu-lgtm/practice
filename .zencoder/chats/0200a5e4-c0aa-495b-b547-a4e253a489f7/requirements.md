# Product Requirements Document

## Summary
Build OPMS as a unified platform covering sales, accounts, task management, VAPT, GRC, audit operations, auditor management, certificate management, document/templates, and dashboards. Implement Lead Details capture as specified and establish core administration (departments, roles, permissions, users, menus, masters). Clean up the existing user model by removing irrelevant fields.

## Objectives
- Deliver the mandatory Phase 1 screens and core admin masters required to start operations.
- Implement Lead Details capture with de-duplication, standardized IDs, and validations.
- Provide department, role, permission, menu, and user management aligned to the defined roles and access levels.
- Align the user data model to OPMS needs by removing unused fields.

## Scope
### In Scope
1. **Phase 1 Mandatory Screens**
   - Login + Forgot Password
   - Role-based Sidebar Menu
   - User Management
   - Role & Permission Management
   - Organization/Client Management
   - Task Management
   - Manager Dashboard (Request Inbox + Assign)
   - Individual Dashboard (My Tasks)
2. **Departments & Manager Roles**
   - Department master list as defined in the document
   - Manager role setup per department with assignment and approval rights
3. **Menu & Module Access**
   - Full menu structure for Administration, Masters, Sales, Accounts, Task, VAPT, GRC, Audit, Auditor, Certificate, Document, Reports
   - Menu permission mapping
4. **Master Data (System Masters)**
   - Company, Branch/Site, Department, Team, Designation, User, Role, Permission, Menu
   - Number Series, Notification Rules, SLA Rules, Escalation Rules
   - Status, Priority, Task Type, Activity Type, Document Type, Tags/Categories
   - Organization/Client, Contact, Location (Country/State/City)
5. **Lead Details Capture**
   - Enquiry info, source, customer details, addresses, contacts, business info
   - Audit fields, validation rules, draft support
6. **Missing Items (Recommended)**
   - Work Request / Intake module
   - Approval workflow module
   - Audit trail & logs
   - File storage access controls (S3 upload flow)
7. **User Model Cleanup**
   - Remove irrelevant fields from user entity/interfaces per user confirmation

### Out of Scope
- UI redesign or new visual system beyond current patterns.
- Phase 2–4 functional modules unless explicitly prioritized.
- Data migrations for removed user fields unless requested.

## Functional Requirements
### Lead Details
- Enquiry ID auto-generated as `IS/{YY}/{MM}/{DD}/{Sequence}` and not editable.
- Enquiry reference optional (max 100).
- Source of enquiry required; if `Others`, Source Description required.
- Customer name autocomplete with duplicate detection.
- Customer ID auto-generated as `IS/{COMP}/{CNT}`.
- At least one address and one contact required; contacts allow single primary.
- Email and phone format validation.
- Draft save and submit only when valid.

### Departments, Roles, and Access
- Department master reflects the listed departments.
- Manager roles exist per department with assign/approve capabilities.
- Access levels support: All Clients (leadership), Department Clients (manager), Assigned Projects, Own Tasks.

### Dashboards
- Manager Dashboard pages: summary, request inbox, request details, allocation, task allocation, team workload, approvals, escalations.
- Individual Dashboard pages: summary, tasks, task detail, projects, notifications.

### Menus and Masters
- Menus and masters align to the defined complete menu list and master list.
- Menu permission mapping controls visibility and access.

### Work Intake and Approvals
- Work Request module to route sales requests to delivery.
- Approval workflow for reports/invoices with approval masters.
- Audit logs for compliance (admin-only access).

### User Model Cleanup
- Remove irrelevant fields from `user` entity/interfaces.
- Update dependent DTOs/services/validators accordingly.

## Non-Functional Requirements
- Follow existing NestJS/TypeORM patterns.
- Enforce validations server-side and client-side where applicable.
- Use existing auth/permission patterns.

## Open Questions
1. Which specific user fields are irrelevant and must be removed?
2. Should a user belong to multiple departments or only one?
3. How should modules map to permissions: direct link or a mapping table?
4. Confirm that Phase 1 scope is the initial build target and that Phase 2–4 are deferred.
