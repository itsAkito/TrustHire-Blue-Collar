# 🚀 TrustHire - Complete Setup Instructions

## 📋 Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL connection (Neon serverless provided)
- Modern web browser

## 🔧 Installation & Setup

### Step 1: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Verify .env file has credentials
cat .env
# Should contain:
# ADMIN_EMAIL=jayantkumar@gmail.com
# ADMIN_PASSWORD=Jayant@123
# USER_EMAIL=jayan1504@gmail.com
# USER_PASSWORD=jayant222

# Start the server
npm start
```

**Expected Output:**
```
✅ Database connection established successfully
✅ Database models synced
✅ Admin created: jayantkumar@gmail.com / Jayant@123
✅ User created: jayan1504@gmail.com / jayant222
🚀 Server running on port 5000
📝 Environment: development
🌐 Frontend URL: http://localhost:5173
📡 API URL: http://localhost:5000/api

📋 Login Credentials:
Admin: jayantkumar@gmail.com / Jayant@123
User: jayan1504@gmail.com / jayant222
```

**If server doesn't start:**
1. Check if port 5000 is already in use:
   ```bash
   Get-Process -Name node | Stop-Process -Force
   ```
2. Verify .env file exists and has DATABASE_URL
3. Check internet connection for Neon PostgreSQL

### Step 2: Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd trusthire

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Test the Application

#### Test Admin Login
1. Open browser: `http://localhost:5173`
2. Click "Admin"
3. Click "Login"
4. Enter credentials:
   - Email: `jayantkumar@gmail.com`
   - Password: `Jayant@123`
5. Click "Sign In"
6. Should redirect to Admin Dashboard

#### Test User Login
1. Go back to: `http://localhost:5173/role-selection`
2. Click "User / Employee"
3. Click "Already have account? Login"
4. Enter credentials:
   - Email: `jayan1504@gmail.com`
   - Password: `jayant222`
5. Click "Sign In"
6. Should redirect to User Home

## 📍 Navigation Map

```
http://localhost:5173
│
├─ /                          ← Home page
├─ /role-selection            ← Role selection (Admin/User)
│
├─ /login-admin               ← Admin login page
│  └─ /admin-dashboard        ← Admin dashboard (protected)
│
├─ /login-worker              ← User/Employee login page
│  ├─ /worker-signup          ← User registration with OTP
│  └─ /user-home              ← User home (protected)
│
└─ /employer-signup           ← Employer registration with OTP
```

## 🔐 Authentication Details

### Credentials Created Automatically

**Admin User** (Created on server start):
```
Name: Admin User
Email: jayantkumar@gmail.com
Password: Jayant@123
Role: admin
Verified: Yes (OTP skipped for demo)
```

**Employee User** (Created on server start):
```
Name: jayantkumar
Email: jayan1504@gmail.com
Password: jayant222
Role: worker
Verified: Yes (OTP skipped for demo)
```

### How to Change Default Credentials

Edit `.env` file:
```env
ADMIN_EMAIL=your-email@domain.com
ADMIN_PASSWORD=YourPassword@123
USER_EMAIL=employee-email@domain.com
USER_PASSWORD=EmployeePassword@123
```

Restart server - new credentials will be created automatically.

## 🧪 Testing with cURL

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"jayantkumar@gmail.com",
    "password":"Jayant@123"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "jayantkumar@gmail.com",
    "role": "admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Test User Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"jayan1504@gmail.com",
    "password":"jayant222"
  }'
```

### Test Protected Endpoint (User Profile)
```bash
# Replace TOKEN with token from login response
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

## 📊 Database Information

**Neon PostgreSQL:**
- Host: ep-noisy-thunder-a1x2xp65-pooler.ap-southeast-1.aws.neon.tech
- Database: neondb
- SSL: Enabled
- Connection Pooling: Active

**Tables Created:**
- `users` - All user credentials and profiles
- `jobs` - Job postings
- `applications` - Job applications
- `employees` - Employee records
- `reviews` - User reviews

## 🔒 Security Features

✅ **Password Security**
- Hashed with bcryptjs (10 salt rounds)
- Never stored in plain text
- Verified securely on login

✅ **JWT Tokens**
- Generated on successful login
- 7-day expiration
- Role-based claims (admin/worker/employer)

✅ **Email Verification**
- OTP sent on registration (console-logged for development)
- 10-minute expiration
- User can resend OTP

✅ **CORS Security**
- Origin: http://localhost:5173
- Credentials allowed
- Specific HTTP methods allowed

## 📱 API Endpoints Reference

### Authentication Endpoints

**Admin Login (Public)**
```
POST /api/admin/login
Headers: Content-Type: application/json
Body: {
  "email": "string",
  "password": "string"
}
Response: {
  "success": true,
  "message": "Login successful",
  "user": {...},
  "token": "jwt_token"
}
```

**User Login (Public)**
```
POST /api/users/login
Headers: Content-Type: application/json
Body: {
  "email": "string",
  "password": "string"
}
Response: {
  "success": true,
  "message": "Login successful",
  "user": {...},
  "token": "jwt_token"
}
```

**User Registration (Public)**
```
POST /api/users/register
Headers: Content-Type: application/json
Body: {
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string",
  "role": "worker|employer"
}
Response: {
  "success": true,
  "message": "User registered. Please verify OTP",
  "user": {...}
}
```

**Verify OTP (Public)**
```
POST /api/users/verify-otp
Headers: Content-Type: application/json
Body: {
  "email": "string",
  "otp": "string"
}
Response: {
  "success": true,
  "message": "Email verified successfully",
  "user": {...}
}
```

### Protected Endpoints (Require JWT Token)

**Get User Profile**
```
GET /api/users/profile
Headers: Authorization: Bearer <token>
Response: {
  "success": true,
  "user": {...}
}
```

**Update User Profile**
```
PUT /api/users/profile
Headers: Authorization: Bearer <token>
Body: {user data to update}
Response: {
  "success": true,
  "user": {...}
}
```

**Admin Dashboard**
```
GET /api/admin/dashboard/stats
Headers: Authorization: Bearer <token>
Response: {
  "success": true,
  "data": {
    "totalUsers": number,
    "totalJobs": number,
    "totalApplications": number,
    ...
  }
}
```

## 🐛 Troubleshooting

### Issue: "An error occurred. Please try again."

**Solution 1: Check server is running**
```bash
# In server terminal, should show:
# 🚀 Server running on port 5000
```

**Solution 2: Check backend logs**
- Look at server terminal for error messages
- Check browser console (F12) for network errors

**Solution 3: Verify credentials exist in database**
- Login to Neon console
- Run: `SELECT email, role FROM users;`
- Should show admin and user entries

### Issue: Server won't start

**Check 1: Port 5000 in use**
```bash
Get-Process -Name node | Stop-Process -Force
npm start
```

**Check 2: Database connection**
- Verify DATABASE_URL in .env is correct
- Check internet connection
- Try connecting to Neon directly

**Check 3: Dependencies missing**
```bash
rm -r node_modules
npm install
npm start
```

### Issue: Frontend won't start

**Check 1: Port 5173 in use**
```bash
# Kill existing vite process
Get-Process -Name node | Stop-Process -Force
npm run dev
```

**Check 2: Dependencies missing**
```bash
rm -r node_modules
npm install
npm run dev
```

## 📚 Documentation Files

- `COMPLETE_REFACTORING.md` - Complete refactoring details
- `QUICK_SETUP_GUIDE.md` - Quick setup guide
- `AUTHENTICATION_GUIDE.md` - Detailed authentication docs
- `server/README.md` - Backend documentation
- `server/AUTHENTICATION_GUIDE.md` - Backend auth guide
- `server/REFACTORING_SUMMARY.md` - Backend changes summary

## ✅ Verification Checklist

After setup, verify:

- [ ] Backend server starts on port 5000
- [ ] Frontend starts on port 5173
- [ ] Admin credentials are created automatically
- [ ] User credentials are created automatically
- [ ] Can login as Admin
- [ ] Can login as User
- [ ] JWT token is generated and saved
- [ ] Dashboard loads after login
- [ ] Can navigate between pages
- [ ] Logout works properly
- [ ] Session persists on page refresh

## 🎯 Next Steps

1. **Customize Credentials**: Edit .env with your own credentials
2. **Implement Email Service**: Replace console.log with real email (Nodemailer, SendGrid)
3. **Add Profile Photo Upload**: Integrate Cloudinary for image uploads
4. **Setup CI/CD**: Deploy to production environment
5. **Add More Features**: Jobs, applications, reviews, etc.

## 💡 Tips & Best Practices

1. **During Development**
   - Keep backend terminal visible to see logs
   - Use browser DevTools (F12) to debug frontend
   - Check server console for API errors

2. **Credentials Management**
   - Never commit .env file to git
   - Use different credentials for production
   - Store sensitive data in environment variables

3. **Testing**
   - Test authentication first before other features
   - Use curl/Postman to test API endpoints
   - Clear browser localStorage if session stuck

4. **Performance**
   - Backend caches may need clearing (restart server)
   - Frontend uses Vite for fast development
   - Database queries are optimized with Sequelize

## 📞 Support

For issues, check:
1. Server logs in terminal
2. Browser console (F12)
3. Network tab in DevTools
4. Documentation files (see above)

---

**Version**: 1.0.0  
**Updated**: February 1, 2026  
**Status**: ✅ Ready for Development  

**Default Login Credentials:**
- Admin: jayantkumar@gmail.com / Jayant@123
- User: jayan1504@gmail.com / jayant222
