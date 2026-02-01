# Complete TrustHire Setup Guide

## Overview
This guide covers the complete setup of TrustHire with:
- User Authentication with OTP
- Job Management System
- Employee Management with Image Upload
- Admin Dashboard
- Neon PostgreSQL Database

---

## Database Setup (Neon PostgreSQL)

### 1. Create Neon Account
1. Go to https://console.neon.tech
2. Sign up for a free account
3. Create a new project called "TrustHire"
4. Copy the connection string

### 2. Update `.env` File
```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-your-endpoint.us-east-1.neon.tech/trusthire_db?sslmode=require

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=trusthireblue
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Admin Credentials (for initial setup)
ADMIN_EMAIL=admin@trusthire.com
ADMIN_PASSWORD=Admin@123
```

---

## Authentication System

### User Registration Flow
1. User registers with name, email, password, role
2. System generates OTP and sends to email
3. User verifies OTP
4. User can now login

### OTP Verification
- OTP valid for 10 minutes
- User can resend OTP
- Must verify before login

### Roles
- **Worker** - Blue collar professionals
- **Employer** - Company representatives
- **Admin** - System administrators

---

## API Endpoints Overview

### User Authentication (`/api/users`)
```
POST   /register           - Register new user
POST   /verify-otp         - Verify OTP
POST   /resend-otp         - Resend OTP
POST   /login              - Login user
GET    /profile            - Get current user profile
PUT    /profile            - Update profile
POST   /change-password    - Change password
GET    /:userId            - Get public user profile
```

### Jobs (`/api/jobs`)
```
GET    /                   - Get all jobs (public)
GET    /:jobId             - Get job details
POST   /                   - Create job (employer)
PUT    /:jobId             - Update job (employer)
DELETE /:jobId             - Delete job (employer)
GET    /:jobId/applications - Get job applications (employer)
```

### Employer Management (`/api/employers`)
```
GET    /profile            - Get employer profile
PUT    /profile            - Update profile
GET    /dashboard/stats    - Get dashboard stats
GET    /applications       - Get all applications
PUT    /applications/:id   - Update application status

Employee Management:
POST   /employees                    - Add employee
GET    /employees                    - Get all employees
GET    /employees/:id                - Get employee details
PUT    /employees/:id                - Update employee
DELETE /employees/:id                - Delete employee
```

### Admin Management (`/api/admin`)
```
POST   /login              - Admin login
GET    /dashboard/stats    - Get dashboard statistics
GET    /users              - Get all users
GET    /jobs               - Get all jobs
GET    /applications       - Get all applications
GET    /employees          - Get all employees
GET    /profile            - Get admin profile
PUT    /profile            - Update admin profile
DELETE /users/:id          - Delete user
DELETE /jobs/:id           - Delete job
DELETE /employees/:id      - Delete employee
```

---

## Employee Management Schema

### Add Employee Request
```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "aadhaar": "123456789012",
  "position": "Senior Plumber",
  "address": "123 Main Street, Delhi",
  "salary": "35000",
  "joiningDate": "2024-02-01",
  "profilePhoto": "<file_upload>"
}
```

### Employee Record Structure
```javascript
{
  id: UUID,
  employerId: UUID,              // Employer ID
  name: String,
  email: String,
  phone: String,
  aadhaar: String,              // Unique identifier
  profilePhoto: String,         // Image URL
  position: String,
  address: Text,
  salary: Decimal,
  joiningDate: Date,
  status: Enum,                 // active, inactive, on_leave, terminated
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## File Upload Configuration

### Middleware Setup
- Multer for image uploads
- Supported formats: JPG, PNG, GIF
- Max file size: 5MB
- Storage: Local (./uploads) or Cloudinary

### Cloudinary Configuration (Optional)
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Running the Application

### Development Server
```bash
cd server
npm install
npm start
```

Server runs on: http://localhost:5000

### Frontend
```bash
cd trusthire
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

---

## Database Models & Relationships

### User Model
- One-to-Many with Jobs (employer)
- One-to-Many with Applications (worker)
- One-to-Many with Employees (employer)
- One-to-Many with Reviews

### Job Model
- Belongs-to User (employer)
- One-to-Many with Applications

### Employee Model
- Belongs-to User (employer)
- Stores Aadhaar for KYC

### Application Model
- Belongs-to Job
- Belongs-to User (worker)

---

## Admin User Setup

### Create Admin via Database
```sql
INSERT INTO users (id, name, email, password, phone, role, verified, otpVerified, emailVerified)
VALUES (
  gen_random_uuid(),
  'Admin User',
  'admin@trusthire.com',
  '$2a$10$...hashed_password...',  -- bcrypt hashed
  '9876543210',
  'admin',
  true,
  true,
  true
);
```

### Or via API (if endpoint created)
POST `/api/admin/create-admin`
```json
{
  "name": "Admin User",
  "email": "admin@trusthire.com",
  "password": "Admin@123"
}
```

---

## Testing the API

### Using Postman
1. Import the provided Postman collection
2. Set environment variables (base_url, token)
3. Test each endpoint

### Sample Requests

**Register Worker**
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Worker",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "role": "worker"
  }'
```

**Verify OTP**
```bash
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

**Admin Login**
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trusthire.com",
    "password": "Admin@123"
  }'
```

**Add Employee**
```bash
curl -X POST http://localhost:5000/api/employers/employees \
  -H "Authorization: Bearer <token>" \
  -F "name=Rajesh Kumar" \
  -F "email=rajesh@example.com" \
  -F "phone=9876543210" \
  -F "aadhaar=123456789012" \
  -F "position=Plumber" \
  -F "salary=25000" \
  -F "profilePhoto=@/path/to/image.jpg"
```

---

## Security Features

1. **Password Hashing** - bcrypt with 10 salt rounds
2. **JWT Authentication** - Token-based auth
3. **OTP Verification** - Email-based OTP for registration
4. **Role-Based Access** - Different permissions per role
5. **SSL Connection** - Neon uses SSL for database
6. **CORS** - Configured for frontend URL
7. **Data Validation** - Joi schemas for all inputs
8. **Aadhaar Uniqueness** - Unique constraint on Aadhaar

---

## Environment-Specific Configuration

### Development
```env
NODE_ENV=development
LOGGING=true
DATABASE_LOGGING=true
```

### Production
```env
NODE_ENV=production
LOGGING=false
DATABASE_LOGGING=false
```

---

## Troubleshooting

### Database Connection Error
- Check DATABASE_URL format
- Verify Neon account status
- Test connection: `psql <DATABASE_URL>`

### OTP Not Sending
- Configure email service (Nodemailer)
- Check email configuration
- Verify SMTP credentials

### Image Upload Issues
- Check upload middleware configuration
- Verify file permissions
- Check disk space

### JWT Token Expired
- Token expires after JWT_EXPIRE duration
- Re-login to get new token
- Implement token refresh logic

---

## Next Steps

1. ✅ Setup Neon PostgreSQL database
2. ✅ Configure environment variables
3. ✅ Install dependencies
4. ✅ Run migrations (if using)
5. ✅ Create admin user
6. ✅ Start server
7. ✅ Test API endpoints
8. ✅ Connect frontend

---

## Support & Resources

- API Documentation: `/server/API_DOCUMENTATION.md`
- Database Models: `/server/src/models/`
- Controllers: `/server/src/controllers/`
- Routes: `/server/src/routes/`
