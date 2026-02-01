# TrustHire Authentication System - Refactored

## Overview

The backend has been refactored to support only **Admin Login** and **Employee Registration/Login** flows. The worker controller and routes have been removed to simplify the architecture.

## System Architecture

### User Roles
- **Admin**: Platform administrator with access to dashboard and management features
- **Employee/Worker**: Registered users who can apply for jobs

### Authentication Flow

#### 1. Admin Login
- **Endpoint**: `POST /api/admin/login`
- **Required Fields**: 
  - `email` (string)
  - `password` (string)
- **Credentials saved in database**:
  - Email stored as-is
  - Password hashed with bcryptjs (10 salt rounds)
  - Role: `'admin'`
- **Response**: JWT token + admin user data

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jayantkumar@gmail.com","password":"Jayant@123"}'
```

#### 2. Employee Registration
- **Endpoint**: `POST /api/users/register`
- **Required Fields**:
  - `name` (string)
  - `email` (string)
  - `password` (string, min 6 chars)
  - `phone` (string, 10 digits)
  - `role` (string, must be 'worker' or 'employer')
- **Credentials saved in database**:
  - All fields stored
  - Password hashed with bcryptjs
  - OTP generated and sent (mock implementation)
  - Status: pending verification
- **Response**: User details with message to verify OTP

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "password":"Test@123",
    "phone":"9876543210",
    "role":"worker"
  }'
```

#### 3. OTP Verification
- **Endpoint**: `POST /api/users/verify-otp`
- **Required Fields**:
  - `email` (string)
  - `otp` (string, 6 digits)
- **Database Updates**:
  - Sets `otpVerified = true`
  - Sets `emailVerified = true`
  - Clears OTP and expiration
- **Response**: Verification success message

```bash
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456"}'
```

#### 4. Employee Login
- **Endpoint**: `POST /api/users/login`
- **Required Fields**:
  - `email` (string)
  - `password` (string)
- **Validation**:
  - Email and password must match (using bcrypt comparison)
  - Email must be verified (otpVerified = true)
- **Response**: JWT token + user data

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Test@123"}'
```

## Database Credential Storage

### User Table Structure
```javascript
{
  id: UUID,
  name: VARCHAR(255),
  email: VARCHAR(255) UNIQUE NOT NULL,
  password: VARCHAR(255) NOT NULL,  // Hashed with bcryptjs
  phone: VARCHAR(255),
  role: ENUM('worker', 'employer', 'admin'),
  
  // OTP verification fields
  otp: VARCHAR(255),                // 6-digit code
  otpExpires: TIMESTAMP,            // 10 minutes from generation
  otpVerified: BOOLEAN DEFAULT false,
  emailVerified: BOOLEAN DEFAULT false,
  
  // Profile fields
  profilePhoto: VARCHAR(255),
  bio: TEXT,
  skills: TEXT,
  experience: INTEGER DEFAULT 0,
  rating: FLOAT DEFAULT 0,
  verified: BOOLEAN DEFAULT false,
  
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

## Default Credentials

### Admin User
Automatically created from `.env` configuration:
```
Email: jayantkumar@gmail.com
Password: Jayant@123
```

### Employee User (Optional Demo Account)
Optionally created from `.env` configuration:
```
Email: jayan1504@gmail.com
Password: jayant222
```

## Setup Instructions

### 1. Start the server
```bash
npm start
```

### 2. Initialize default credentials (Optional)
```bash
npm run init-credentials
```

This script will:
- Create an admin user with credentials from `.env`
- Create a demo employee user (optional)
- Display all credentials in terminal

### 3. Update `.env` file with your credentials
```env
# Admin login credentials
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=YourAdminPassword@123

# Default employee user (optional)
USER_NAME=Employee Name
USER_EMAIL=employee@email.com
USER_PASSWORD=EmployeePassword@123
```

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/admin/login` | No | Admin login |
| POST | `/api/users/register` | No | Employee/Employer registration |
| POST | `/api/users/verify-otp` | No | Verify email with OTP |
| POST | `/api/users/resend-otp` | No | Resend OTP |
| POST | `/api/users/login` | No | Employee/Employer login |
| GET | `/api/users/profile` | Yes | Get profile |
| PUT | `/api/users/profile` | Yes | Update profile |
| POST | `/api/users/change-password` | Yes | Change password |
| GET | `/api/admin/dashboard/stats` | Yes | Dashboard statistics |
| GET | `/api/admin/users` | Yes | List all users |
| GET | `/api/admin/jobs` | Yes | List all jobs |
| GET | `/api/admin/employees` | Yes | List all employees |

## JWT Token

All authenticated endpoints require a Bearer token:

```bash
Authorization: Bearer <jwt_token>
```

**Token Structure**:
```javascript
{
  id: user_id,
  email: user_email,
  role: 'admin' || 'worker' || 'employer',
  iat: timestamp,
  exp: timestamp + 7 days
}
```

## Security Features

1. **Password Hashing**: Bcryptjs with 10 salt rounds
2. **JWT Authentication**: Token-based API access
3. **OTP Verification**: Email verification before login
4. **Email Validation**: Format validation on registration
5. **Password Validation**: Minimum 6 characters
6. **Error Handling**: Generic error messages to prevent info leakage

## File Structure (After Refactor)

```
server/src/
├── controllers/
│   ├── userController.js         (Employee registration, OTP, login)
│   ├── adminController.js        (Admin login, dashboard, management)
│   ├── jobController.js          (Job management)
│   ├── employerController.js     (Employer specific endpoints)
│   └── authController.js         (DELETED)
├── routes/
│   ├── userRoutes.js             (Employee routes)
│   ├── adminRoutes.js            (Admin routes)
│   ├── jobRoutes.js              (Job routes)
│   ├── employerRoutes.js         (Employer routes)
│   ├── applicationRoutes.js      (Application routes)
│   ├── workerRoutes.js           (DELETED)
│   └── authRoutes.js             (DELETED)
├── models/
│   ├── User.js                   (Single user model for all roles)
│   ├── Job.js
│   ├── Application.js
│   ├── Employee.js
│   └── Review.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── validators.js
│   ├── uploadMiddleware.js
│   └── workerMiddleware.js       (DELETED)
├── scripts/
│   └── initializeCredentials.js  (NEW - Initialize admin/employee)
└── config/
    ├── database.js
    └── constants.js
```

## Removed Components

The following have been removed to simplify the architecture:

1. ❌ **workerController.js** - Consolidated into userController
2. ❌ **workerRoutes.js** - Consolidated into userRoutes
3. ❌ **authRoutes.js** - Split into userRoutes and adminRoutes
4. ❌ **workerMiddleware.js** - Replaced with role-based checks

## Testing Credentials

### Admin Test
```bash
POST /api/admin/login
{
  "email": "jayantkumar@gmail.com",
  "password": "Jayant@123"
}
```

### Employee Registration Test
```bash
POST /api/users/register
{
  "name": "Test Worker",
  "email": "test@example.com",
  "password": "TestPassword@123",
  "phone": "9876543210",
  "role": "worker"
}
```

## Notes

- All passwords are stored as bcryptjs hashes in the database
- OTP is sent to email (currently console logged - implement email service for production)
- Both admin and employee credentials are persisted in Neon PostgreSQL
- JWT tokens expire after 7 days (configurable via JWT_EXPIRE env variable)
- Single User model handles all roles (admin, worker, employer)
