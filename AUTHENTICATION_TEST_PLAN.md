# Authentication Flow Test Plan

## Overview
This test plan validates the authentication system ensuring:
- Only `@intercert.com` emails can register and login
- Google OAuth only works for **pre-registered** users
- Email/password login only works for **registered** users in database
- No auto-creation of users via Google login

---

## Server Configuration
- **Base URL**: `http://localhost:8094`
- **API Prefix**: `/api`
- **Auth Endpoints**: `/api/auth`

---

## Test Scenarios

### ✅ Test 1: Create User with @intercert.com Email (SHOULD PASS)

**Endpoint**: `POST /api/auth/create-user`

**Headers**:
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "Test User",
  "email": "testuser@intercert.com",
  "password": "TestPass@123",
  "role": "User",
  "user_group": "USER"
}
```

**Expected Result**: ✅ SUCCESS (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "email": "testuser@intercert.com",
    "name": "Test User"
  }
}
```

---

### ❌ Test 2: Create User with Non-@intercert.com Email (SHOULD FAIL)

**Endpoint**: `POST /api/auth/create-user`

**Headers**:
```
Authorization: Bearer <ADMIN_TOKEN>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "External User",
  "email": "external@gmail.com",
  "password": "TestPass@123",
  "role": "User"
}
```

**Expected Result**: ❌ FAIL (401 Unauthorized)
```json
{
  "success": false,
  "message": "Only @intercert.com email addresses are allowed."
}
```

---

### ✅ Test 3: Email/Password Login - Registered User (SHOULD PASS)

**Endpoint**: `POST /api/auth/login`

**Headers**:
```
devicetype: WEB
Content-Type: application/json
```

**Request Body**:
```json
{
  "identity": "testuser@intercert.com",
  "password": "TestPass@123"
}
```

**Expected Result**: ✅ SUCCESS (200)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "testuser@intercert.com",
      "name": "Test User",
      "user_group": "USER",
      "roleName": "User"
    },
    "token": "<JWT_TOKEN>"
  }
}
```

---

### ❌ Test 4: Email/Password Login - Unregistered User (SHOULD FAIL)

**Endpoint**: `POST /api/auth/login`

**Headers**:
```
devicetype: WEB
Content-Type: application/json
```

**Request Body**:
```json
{
  "identity": "notregistered@intercert.com",
  "password": "SomePass@123"
}
```

**Expected Result**: ❌ FAIL (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### ❌ Test 5: Email/Password Login - Wrong Password (SHOULD FAIL)

**Endpoint**: `POST /api/auth/login`

**Headers**:
```
devicetype: WEB
Content-Type: application/json
```

**Request Body**:
```json
{
  "identity": "testuser@intercert.com",
  "password": "WrongPassword123"
}
```

**Expected Result**: ❌ FAIL (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### ✅ Test 6: Google OAuth - Registered @intercert.com User (SHOULD PASS)

**Pre-requisite**: User `abc@intercert.com` must be created in database first

**Steps**:
1. Create user via admin:
```json
POST /api/auth/create-user
{
  "name": "ABC User",
  "email": "abc@intercert.com",
  "password": "Pass@123"
}
```

2. Visit in browser:
```
http://localhost:8094/api/auth/google
```

3. Login with Google account: `abc@intercert.com`

**Expected Result**: ✅ SUCCESS
- Redirects to: `http://localhost:4200/auth-callback?token=<JWT_TOKEN>`
- User successfully logged in
- Session created in database

---

### ❌ Test 7: Google OAuth - Unregistered @intercert.com User (SHOULD FAIL)

**Pre-requisite**: User `def@intercert.com` does NOT exist in database

**Steps**:
1. Visit in browser:
```
http://localhost:8094/api/auth/google
```

2. Login with Google account: `def@intercert.com`

**Expected Result**: ❌ FAIL (401 Unauthorized)
- Redirects to: `http://localhost:4200/login?error=User%20not%20registered.%20Please%20contact%20admin%20to%20create%20your%20account%20first.`
- Shows error message in frontend
- NO user created in database
- NO session created

---

### ❌ Test 8: Google OAuth - Non-@intercert.com Email (SHOULD FAIL)

**Steps**:
1. Visit in browser:
```
http://localhost:8094/api/auth/google
```

2. Login with Google account: `someone@gmail.com`

**Expected Result**: ❌ FAIL (401 Unauthorized)
- Redirects to: `http://localhost:4200/login?error=Access%20denied.%20Only%20@intercert.com%20email%20addresses%20are%20allowed.`
- Shows error message in frontend
- NO user created in database
- NO session created

---

### ❌ Test 9: Google OAuth - Inactive User (SHOULD FAIL)

**Pre-requisite**: User exists but status is INACTIVE

**Steps**:
1. Manually set user status to INACTIVE in database
2. Visit: `http://localhost:8094/api/auth/google`
3. Login with that user's Google account

**Expected Result**: ❌ FAIL (401 Unauthorized)
- Redirects to: `http://localhost:4200/login?error=Your%20account%20is%20inactive.%20Please%20contact%20admin.`
- NO login allowed
- NO session created

---

## Manual Testing Steps

### Step 1: Start the Server
```bash
cd d:\INTERCERT_IC_ORG_OPMS_BKND
npm run start master-management
```

Expected output:
```
🚀 Application is running at http://localhost:8094/api
```

### Step 2: Create Super Admin (First Time Only)
1. Set environment variable:
```env
CREATE_DEFAULT_SUPER_ADMIN=true
```

2. Restart server - default admin created:
   - Email: `shubhanshu@intercert.com`
   - Password: `Pass@123`

### Step 3: Login as Admin
```bash
POST http://localhost:8094/api/auth/login
{
  "identity": "shubhanshu@intercert.com",
  "password": "Pass@123"
}
```

Copy the JWT token from response.

### Step 4: Create Test Users
Use the admin token to create test users:

**User 1**: `abc@intercert.com`
```bash
POST http://localhost:8094/api/auth/create-user
Authorization: Bearer <ADMIN_TOKEN>

{
  "name": "ABC User",
  "email": "abc@intercert.com",
  "password": "Pass@123",
  "user_group": "USER"
}
```

**User 2**: Try creating `def@gmail.com` (Should FAIL)
```bash
POST http://localhost:8094/api/auth/create-user
Authorization: Bearer <ADMIN_TOKEN>

{
  "name": "DEF User",
  "email": "def@gmail.com",
  "password": "Pass@123"
}
```
Expected: ❌ Error: "Only @intercert.com email addresses are allowed."

### Step 5: Test Email/Password Login

**Test Registered User** (`abc@intercert.com`):
```bash
POST http://localhost:8094/api/auth/login
{
  "identity": "abc@intercert.com",
  "password": "Pass@123"
}
```
Expected: ✅ Success with JWT token

**Test Unregistered User**:
```bash
POST http://localhost:8094/api/auth/login
{
  "identity": "notexist@intercert.com",
  "password": "Pass@123"
}
```
Expected: ❌ Error: "Invalid email or password"

### Step 6: Test Google OAuth

**Test Registered User** (`abc@intercert.com`):
1. Open browser: `http://localhost:8094/api/auth/google`
2. Select Google account: `abc@intercert.com`
3. Expected: ✅ Redirect to `http://localhost:4200/auth-callback?token=<JWT_TOKEN>`

**Test Unregistered User** (`def@intercert.com`):
1. Open browser: `http://localhost:8094/api/auth/google`
2. Select Google account: `def@intercert.com` (NOT in database)
3. Expected: ❌ Redirect to `http://localhost:4200/login?error=User%20not%20registered...`

**Test Non-InterCert Email** (`someone@gmail.com`):
1. Open browser: `http://localhost:8094/api/auth/google`
2. Select Google account: `someone@gmail.com`
3. Expected: ❌ Redirect to `http://localhost:4200/login?error=Access%20denied...`

---

## Quick Test Checklist

- [ ] ✅ Create user with `@intercert.com` → SUCCESS
- [ ] ❌ Create user with `@gmail.com` → FAIL
- [ ] ✅ Login with registered email/password → SUCCESS
- [ ] ❌ Login with unregistered email → FAIL
- [ ] ❌ Login with wrong password → FAIL
- [ ] ✅ Google login - registered `@intercert.com` → SUCCESS
- [ ] ❌ Google login - unregistered `@intercert.com` → FAIL
- [ ] ❌ Google login - non-intercert email → FAIL
- [ ] ❌ Google login - inactive account → FAIL

---

## Validation Points

### ✅ Requirements Met:
1. **Domain Restriction**: Only `@intercert.com` emails allowed
2. **Pre-registration Required**: Users MUST be in database before login
3. **No Auto-Creation**: Google OAuth does NOT create new users
4. **Email/Password Works**: Registered users can login with credentials
5. **Proper Error Messages**: Clear unauthorized errors for unregistered users

### Database Checks:
After each test, verify in database:
```sql
-- Check user exists
SELECT * FROM user WHERE email = 'abc@intercert.com';

-- Check login session created
SELECT * FROM login_session WHERE loginIdentity = 'abc@intercert.com';

-- Verify no unauthorized users created
SELECT * FROM user WHERE email NOT LIKE '%@intercert.com';
```

---

## Notes

- All error responses now show clear messages
- Google OAuth validates email domain BEFORE checking database
- Inactive users cannot login via any method
- JWT tokens are valid for the configured expiry time
- Sessions are tracked in `login_session` table
