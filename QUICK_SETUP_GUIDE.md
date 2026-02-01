# TrustHire - Simplified Authentication Setup

## ✅ Current Setup (Simplified)

The authentication system has been simplified to include:
1. **Admin Login** - For platform administrators
2. **User/Employee Login** - For workers/employees

Worker and Employer signup buttons have been removed from the UI.

## 🔐 Default Credentials

These credentials are **automatically created** when the server starts:

### Admin Account
```
Email: jayantkumar@gmail.com
Password: Jayant@123
```

### Employee/User Account  
```
Email: jayan1504@gmail.com
Password: jayant222
```

## 🚀 Getting Started

### 1. Start the Backend Server
```bash
cd server
npm start
```

**Expected Output:**
```
✅ Database connection established successfully
✅ Database models synced
✅ Admin created: jayantkumar@gmail.com / Jayant@123
✅ User created: jayan1504@gmail.com / jayant222
🚀 Server running on port 5000
📋 Login Credentials:
Admin: jayantkumar@gmail.com / Jayant@123
User: jayan1504@gmail.com / jayant222
```

### 2. Start the Frontend
```bash
cd trusthire
npm run dev
```

### 3. Test Login

#### Admin Login
1. Navigate to: `http://localhost:5173/role-selection`
2. Click "Admin"
3. Click "Login"
4. Enter credentials:
   - Email: `jayantkumar@gmail.com`
   - Password: `Jayant@123`
5. Click "Sign In"

#### User/Employee Login
1. Navigate to: `http://localhost:5173/role-selection`
2. Click "User / Employee"
3. Click "Already have account? Login"
4. Enter credentials:
   - Email: `jayan1504@gmail.com`
   - Password: `jayant222`
5. Click "Sign In"

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────┐
│      Role Selection Page                 │
│  [User/Employee] [Admin]                 │
└──────────┬──────────────────────┬────────┘
           │                      │
           ▼                      ▼
    ┌──────────────┐      ┌──────────────┐
    │User Login    │      │Admin Login   │
    │/login-worker │      │/login-admin  │
    └──────────────┘      └──────────────┘
           │                      │
           ├─────────────────────►├─ POST /api/users/login
           │                      │ POST /api/admin/login
           │                      │
           ▼                      ▼
    ┌──────────────┐      ┌──────────────┐
    │User Home     │      │Admin Dashboard
    │/user-home    │      │/admin-dashboard
    └──────────────┘      └──────────────┘
```

## 📝 API Endpoints

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/admin/login` | POST | Admin login | ❌ |
| `/api/users/login` | POST | User login | ❌ |
| `/api/users/register` | POST | User registration | ❌ |
| `/api/users/verify-otp` | POST | Verify email | ❌ |
| `/api/users/profile` | GET | Get user profile | ✅ |
| `/api/users/profile` | PUT | Update profile | ✅ |
| `/api/admin/dashboard/stats` | GET | Admin dashboard | ✅ |

## 🛠️ Customizing Credentials

To change default credentials, edit `.env` file:

```env
# Admin credentials
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=YourAdminPassword@123

# User/Employee credentials
USER_NAME=Employee Name
USER_EMAIL=your-employee@email.com
USER_PASSWORD=EmployeePassword@123
```

Then restart the server. The new credentials will be created automatically.

## 🗑️ Removed Features

The following have been removed to simplify the UI:
- ❌ "Join as Worker" button
- ❌ "Join as Employer" button
- ❌ Separate Worker/Employer signup flows
- ❌ Worker-specific routes
- ❌ Multiple role selection cards

## ✨ Simplified Pages

### Role Selection Page
Now shows only 2 options:
- **User / Employee** - Login or join as user
- **Admin** - Administrator login

### Login Flow
- Removed separate Worker/Employer signup buttons
- Single "Create Account" button for new users
- Cleaner, simplified UI

## 📊 Database Credentials Storage

All credentials are securely stored in Neon PostgreSQL:

```javascript
Users Table:
├── id: UUID
├── name: VARCHAR
├── email: VARCHAR (UNIQUE)
├── password: VARCHAR (HASHED with bcryptjs)
├── phone: VARCHAR
├── role: ENUM ('admin', 'worker', 'employer')
├── otpVerified: BOOLEAN
├── emailVerified: BOOLEAN
└── ... other fields
```

**Security:**
- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ Never stored in plain text
- ✅ Verified using bcrypt.compare() on login

## 🔒 Login Process

1. User enters email and password
2. Backend checks if user exists
3. Backend compares password using bcryptjs
4. If valid, JWT token is generated
5. Token is stored in localStorage
6. User is redirected to dashboard

## ✅ Testing Checklist

- [ ] Backend server starts successfully
- [ ] Admin credentials are created automatically
- [ ] User credentials are created automatically
- [ ] Can login as Admin
- [ ] Can login as User
- [ ] JWT token is generated on login
- [ ] Token is stored in localStorage
- [ ] Dashboard loads after login
- [ ] Logout works properly
- [ ] Session persists on page refresh

## 🐛 Troubleshooting

### "An error occurred. Please try again."
1. Check if backend server is running on port 5000
2. Check if credentials exist in database:
   ```bash
   # Use Neon console to verify
   SELECT email, role FROM users;
   ```
3. Ensure correct email/password combination
4. Check browser console for detailed error messages

### Server won't start
1. Ensure PostgreSQL connection string is correct in `.env`
2. Check if port 5000 is available
3. Run: `npm start` from server directory

### Credentials not created
1. Check if server has write permissions
2. Verify `.env` file has ADMIN_EMAIL and ADMIN_PASSWORD
3. Check server console for error messages
4. Manually create users via database

## 📚 Additional Resources

- `AUTHENTICATION_GUIDE.md` - Detailed authentication documentation
- `REFACTORING_SUMMARY.md` - Backend changes summary
- `server/README.md` - Backend setup guide

---

**Status**: ✅ Ready for Testing
**Version**: 1.0.0
**Last Updated**: Feb 1, 2026
