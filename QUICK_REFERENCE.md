# Quick Reference Guide - Backend & Frontend Integration

## 🚀 Start Both Servers (60 seconds)

### Terminal 1: Backend
```bash
cd server
npm install  # First time only
npm run dev
# Expected: 🚀 Server running on port 5000
```

### Terminal 2: Frontend  
```bash
cd trusthire
npm install  # First time only
npm run dev
# Expected: ➜ Local: http://localhost:5173
```

### Access Application
- **Frontend:** http://localhost:5173
- **API Endpoint:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

---

## 📋 Environment Files

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trusthire_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔐 Authentication Flow

### 1. Register
```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "worker" | "employer"
}
// Returns: { success: true, token: "...", user: {...} }
```

### 2. Login
```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
// Returns: { success: true, token: "...", user: {...} }
```

### 3. Use Token
```javascript
// Add to all protected requests
Authorization: Bearer {token}
```

### 4. Validate Token
```javascript
GET /api/auth/validate
Authorization: Bearer {token}
// Returns: { success: true, user: {...} }
```

---

## 🛠️ API Quick Commands

### Test Backend
```bash
# Health check
curl http://localhost:5000/health

# API info
curl http://localhost:5000/api

# Get jobs (public)
curl http://localhost:5000/api/jobs

# With token (replace TOKEN)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/auth/validate
```

### Test Frontend from Console
```javascript
// Test API connection
fetch('http://localhost:5000/api/jobs')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

---

## 📁 Important File Locations

### Configuration
- Backend config: `server/.env`
- Frontend config: `trusthire/.env.local`
- API service: `trusthire/src/services/api.js`

### Documentation
- API Reference: `server/API_DOCUMENTATION.md`
- Integration Guide: `INTEGRATION_GUIDE.md`
- Setup Checklist: `SETUP_CHECKLIST.md`
- Changes Summary: `BACKEND_CHANGES_SUMMARY.md`

### Backend Routes
- Auth: `server/src/routes/authRoutes.js`
- Jobs: `server/src/routes/jobRoutes.js`
- Workers: `server/src/routes/workerRoutes.js`
- Employers: `server/src/routes/employerRoutes.js`
- Applications: `server/src/routes/applicationRoutes.js`

---

## ✅ Common Test Scenarios

### Scenario 1: User Registration
1. Open frontend at http://localhost:5173
2. Click Register
3. Fill form with unique email
4. Select role (worker/employer)
5. Submit
6. ✓ Should redirect to login or dashboard

### Scenario 2: Job Listing (Public)
1. Visit http://localhost:5173
2. View jobs list (no login needed)
3. Click on job details
4. ✓ Should show job information

### Scenario 3: Apply for Job (Worker)
1. Login as worker
2. Browse jobs
3. Click "Apply"
4. ✓ Should confirm application

### Scenario 4: Post Job (Employer)
1. Login as employer
2. Click "Post Job"
3. Fill job details
4. Submit
5. ✓ Should see job in your listings

---

## 🐛 Quick Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000
# Kill process using port
kill -9 <PID>
# Check database connection
psql -U postgres -d trusthire_db
```

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS Errors
- Verify `FRONTEND_URL=http://localhost:5173` in backend `.env`
- Verify `VITE_API_BASE_URL=http://localhost:5000/api` in frontend `.env.local`
- Clear browser cache (Ctrl+Shift+Delete)

### Token Issues
- Token stored? Check: `localStorage.getItem('token')`
- Token format? Should be: `Bearer eyJhbGc...`
- Token expired? Check browser console for errors

---

## 📊 API Response Examples

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_here"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Specific error message"
}
```

---

## 🔗 Key Endpoints Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| /api/auth/register | POST | ❌ | Register user |
| /api/auth/login | POST | ❌ | Login user |
| /api/auth/validate | GET | ✅ | Check token |
| /api/jobs | GET | ❌ | List jobs |
| /api/jobs/:id | GET | ❌ | Job details |
| /api/jobs | POST | ✅ | Create job |
| /api/applications/:jobId | POST | ✅ | Apply job |
| /api/employers/dashboard | GET | ✅ | Employer stats |

---

## 📱 Using the API from Frontend

### Setup API Client
```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Use in Components
```javascript
import api from '@/services/api';

// Login
const response = await api.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});

localStorage.setItem('token', response.data.token);

// Fetch jobs
const jobs = await api.get('/jobs');

// Create job (with token)
const newJob = await api.post('/jobs', {
  title: 'Plumber',
  description: '...',
  location: 'NYC',
  salary: 50000,
  jobType: 'full-time'
});
```

---

## 🔑 Default Test Credentials

After registration, use these to test:
```
Email: test@example.com
Password: test123456
Role: worker (or employer)
```

---

## 📈 Monitoring

### Backend Logs
Check terminal where `npm run dev` is running for:
- HTTP requests
- Database queries (development mode)
- Errors and warnings

### Frontend Errors
Check browser DevTools:
- Console tab for JavaScript errors
- Network tab for API calls
- Application tab for stored tokens

---

## 🎯 Next Steps

1. ✅ Start both servers
2. ✅ Register a test user
3. ✅ Login and get token
4. ✅ Test job listing
5. ✅ Apply for job (worker) or post job (employer)
6. ✅ Check dashboard
7. ✅ Ready for production

---

## 📞 Need Help?

### Check These Files
1. `INTEGRATION_GUIDE.md` - Detailed setup guide
2. `SETUP_CHECKLIST.md` - Verification steps
3. `API_DOCUMENTATION.md` - Endpoint details
4. `BACKEND_CHANGES_SUMMARY.md` - What was changed

### Common Solutions
- **API not responding?** Check if both servers running
- **Auth failing?** Verify credentials and token format
- **Database error?** Check PostgreSQL and .env credentials
- **CORS error?** Check environment URLs match

---

**Last Updated:** January 24, 2026  
**Status:** ✅ Production Ready

---

## 🎉 You're All Set!

Your TrustHire platform is ready for development and testing. Both backend and frontend are fully configured to work together!
