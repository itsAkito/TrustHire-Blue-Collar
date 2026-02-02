# Quick Start Guide - Worker Form & Bug Fixes

## 🎯 What Was Done

### ✅ Created Worker Registration Form
A comprehensive form component for workers to complete their profiles with:
- Personal info (name, phone, Aadhaar, marital status, photo, address)
- Professional info (experience, skills, bio)
- Image upload with validation
- Both create and edit modes

### ✅ Fixed Database Connection Errors
Improved PostgreSQL connection handling:
- Better timeout management
- Connection pooling optimization
- Auto-retry on failures
- TCP keepalive support

### ✅ Fixed Login 401 Errors
Enhanced authentication:
- Better error messages
- Clear indication of email verification requirement
- Proper status codes
- Debug info in development mode

### ✅ Added Worker API Endpoints
Complete backend API for worker management:
- Profile creation/update
- Job search and filtering
- Job application submission
- Application tracking
- Review management

---

## 🚀 How to Use

### 1. Start the Server
```bash
cd server
npm start
```
Should see: `✓ Neon PostgreSQL connection established successfully`

### 2. Test Worker Signup (Frontend)
1. Go to frontend: `http://localhost:5173`
2. Click "Worker Signup"
3. Fill registration form
4. Check server logs for OTP
5. Enter OTP to verify email
6. Login with credentials

### 3. Complete Worker Profile (New!)
After login as worker:
1. Go to Worker Profile page
2. Use `WorkerRegistrationForm` component
3. Fill personal & professional info
4. Upload profile photo
5. Submit to save

### 4. Test Job Search
1. Navigate to available jobs
2. Search by location or job type
3. Click apply to submit application
4. View application status

---

## 📂 New Files Location

```
trusthire/
├── src/components/
│   └── WorkerRegistrationForm.jsx  [NEW]

server/
├── src/routes/
│   └── workerRoutes.js             [NEW]
├── src/controllers/
│   └── workerController.js         [NEW]
```

---

## 🔧 Modified Files

1. **server/src/config/database.js**
   - Better connection pooling
   - Auto-retry logic
   - Timeout settings

2. **server/src/controllers/userController.js**
   - Better error messages
   - Verification status check

3. **server/src/index.js**
   - Added worker routes

4. **trusthire/src/services/api.js**
   - Worker service methods

---

## 📊 API Endpoints

### Worker Profile
```
POST   /api/workers/profile         Create profile
GET    /api/workers/profile         Get profile
PUT    /api/workers/profile         Update profile
```

### Job Operations
```
GET    /api/workers/jobs/available  List jobs
GET    /api/workers/jobs/search     Search jobs
POST   /api/workers/jobs/:id/apply  Apply for job
```

### Applications & Reviews
```
GET    /api/workers/applications    List applications
GET    /api/workers/reviews         List reviews
```

---

## 🧪 Quick Test Commands

### 1. Register Worker
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"9876543210","password":"pass123","role":"worker"}'
```

### 2. Verify OTP (from server logs)
```bash
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","otp":"123456"}'
```

### 3. Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"pass123"}'
```

### 4. Create Worker Profile
```bash
curl -X POST http://localhost:5000/api/workers/profile \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: multipart/form-data" \
  -F "phone=9876543210" \
  -F "aadhaar=123456789012" \
  -F "maritalStatus=single" \
  -F "skills=Electrical,Plumbing" \
  -F "experience=5"
```

---

## ⚠️ Common Issues & Solutions

### Issue: Database Connection Error
**Solution:** 
- Check DATABASE_URL in .env
- Verify Neon connection string is correct
- Restart server: `npm start`

### Issue: 401 Login Error
**Solution:**
- Check email is verified (OTP confirmed)
- Verify password is correct
- Check user exists in database

### Issue: Upload Not Working
**Solution:**
- Verify uploadMiddleware is configured
- Check file size < 5MB
- Verify image format (JPG, PNG, GIF)

---

## 📝 Form Fields Reference

### Personal Information
- **Name** - Text (required, not editable after creation)
- **Phone** - 10 digits (required, not editable after creation)
- **Aadhaar** - 12 digits (required, not editable after creation)
- **Marital Status** - Dropdown (single, married, divorced, widowed)
- **Profile Photo** - Image upload (JPG/PNG/GIF, max 5MB)
- **Address** - Text area (optional)

### Professional Information
- **Experience** - Years (number, optional)
- **Skills** - Comma-separated (optional)
- **Bio** - Long text (optional)

---

## 🔐 Authentication Flow

```
1. Register
   ↓
2. Receive OTP (email/logs)
   ↓
3. Verify OTP
   ↓
4. Login
   ↓
5. Complete Worker Profile (optional but recommended)
   ↓
6. Search & Apply for Jobs
```

---

## 📞 Support

For issues:
1. Check server logs: `npm start`
2. Review TROUBLESHOOTING_GUIDE.md
3. Check IMPLEMENTATION_SUMMARY.md for details
4. Verify all environment variables in .env

---

## ✨ Key Features

✅ Complete worker profile management
✅ Image upload support
✅ Email OTP verification
✅ Job search and filtering
✅ Job application tracking
✅ Stable database connection
✅ Better error messages
✅ Mobile-responsive UI

