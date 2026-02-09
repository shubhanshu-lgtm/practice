# Project Flow Graph

## 1. Authentication Flow
```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant GoogleStrategy
    participant AuthService
    participant DB
    
    Client->>AuthController: GET /auth/google
    AuthController->>GoogleStrategy: Redirect to Google
    GoogleStrategy-->>AuthController: Callback with Google Profile
    AuthController->>AuthService: validateGoogleUser(profile)
    AuthService->>DB: Find User by Email
    alt User Not Found
        AuthService-->>AuthController: Throw Unauthorized (Pre-reg required)
        AuthController-->>Client: Error Redirect
    else User Found
        AuthService->>DB: Update Avatar (if needed)
        AuthService->>AuthService: generateAuthResponse(user)
        AuthService->>DB: Create LoginSession
        AuthService-->>AuthController: Return JWT (with Roles, Modules, UserGroup)
        AuthController-->>Client: Redirect with Token
    end
```

## 2. User Creation & Module Assignment Flow
```mermaid
sequenceDiagram
    participant Admin
    participant UserMgmtController
    participant UserMgmtService
    participant UserRepository
    participant DB

    Admin->>UserMgmtController: POST /user-management/users (DTO: name, email, role, user_group, modules)
    UserMgmtController->>UserMgmtController: Check Actor is Admin/SuperAdmin
    UserMgmtController->>UserMgmtService: createUser(payload)
    UserMgmtService->>UserRepository: addOrUpdateUser(payload)
    UserRepository->>DB: Insert User
    DB-->>UserRepository: Return ID
    UserMgmtService->>UserMgmtService: Assign Modules (if provided)
    UserMgmtService->>DB: Save User-Module Relations
    UserMgmtService-->>UserMgmtController: Return Created User
```

## 3. Module Access Control Flow
```mermaid
flowchart TD
    A[Request] --> B{JwtAuthGuard}
    B -- Valid Token --> C[Attach User, Modules, UserGroup to Request]
    B -- Invalid --> D[Unauthorized]
    C --> E{ModuleAccessGuard}
    E -- Check @ModuleAccess Decorator --> F{User Has Module?}
    F -- Yes --> G[Controller Action]
    F -- No --> H[Forbidden]
```

## 4. Sales / Lead Management Flow
```mermaid
sequenceDiagram
    participant SalesUser
    participant LeadController
    participant LeadService
    participant DB

    SalesUser->>LeadController: POST /lead (CreateLeadDto)
    LeadController->>LeadController: Guard: Sales Module Access
    LeadController->>LeadService: createLead(payload)
    LeadService->>DB: Generate Enquiry ID
    LeadService->>DB: Create/Find Customer
    LeadService->>DB: Save Addresses/Contacts
    LeadService->>DB: Link Services (ManyToMany)
    LeadService->>DB: Save Lead
    DB-->>LeadService: Return Lead
    LeadService-->>LeadController: Response
```

## 5. System Architecture Overview
```mermaid
graph TD
    subgraph Frontend
        AngularApp
    end
    
    subgraph Backend_NestJS
        AuthModule
        UserMgmtModule
        SalesModule
        MasterMgmtModule
        
        subgraph Guards
            JwtAuthGuard
            ModuleAccessGuard
        end
        
        subgraph Repositories
            UserRepo
            LeadRepo
            CustomerRepo
            ServiceMasterRepo
        end
    end
    
    subgraph Database_MySQL
        Users
        Leads
        Customers
        Services
        Modules
    end

    AngularApp --> AuthModule
    AngularApp --> UserMgmtModule
    AngularApp --> SalesModule
    
    AuthModule --> JwtAuthGuard
    UserMgmtModule --> ModuleAccessGuard
    SalesModule --> ModuleAccessGuard
    
    ModuleAccessGuard --> UserRepo
```
