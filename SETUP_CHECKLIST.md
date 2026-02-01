# Backend & Frontend Connection - Setup Checklist

## ✅ Backend Setup Checklist

### Environment & Dependencies
- [ ] Navigate to `server/` directory
- [ ] Run `npm install` to install all dependencies
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in database credentials in `.env`:
  - [ ] `DB_HOST` (default: localhost)
  - [ ] `DB_PORT` (default: 5432)
  - [ ] `DB_NAME` (default: trusthire_db)
  - [ ] `DB_USER` (default: postgres)
  - [ ] `DB_PASSWORD` (your postgres password)
  - [ ] `JWT_SECRET` (set a secure key)
  - [ ] `FRONTEND_URL` (http://localhost:5173)

### Database Setup
- [ ] PostgreSQL is installed and running
- [ ] Create database: `createdb trusthire_db`
- [ ] Database user has proper permissions

### Server Startup
- [ ] Run `npm run dev` to start backend
- [ ] Verify output shows:
  - ✓ Database connection established
  - ✓ Database models synced
  - ✓ Server running on port 5000
  - ✓ Frontend URL configured correctly

### Backend Testing
- [ ] Visit `http://localhost:5000/health` - should return success
- [ ] Visit `http://localhost:5000/api` - should show API info
- [ ] All routes initialized successfully

---

## ✅ Frontend Setup Checklist

### Environment & Dependencies
- [ ] Navigate to `trusthire/` directory
- [ ] Run `npm install` to install all dependencies
- [ ] Create `.env.local` file in `trusthire/` directory
- [ ] Add environment variables:
  - [ ] `VITE_API_BASE_URL=http://localhost:5000/api`
  - [ ] `VITE_API_TIMEOUT=10000` (optional)

### Frontend Startup
- [ ] Run `npm run dev` to start frontend
- [ ] Verify output shows:
  - ✓ Dev server running
  - ✓ Available at http://localhost:5173
  - ✓ No build errors

### Frontend Testing
- [ ] Visit `http://localhost:5173` - page loads
- [ ] Browser console has no CORS errors
- [ ] DevTools Network tab shows successful API calls

---

## ✅ Integration Testing Checklist

### CORS Configuration
- [ ] Backend accepts requests from `http://localhost:5173`
- [ ] No CORS errors in browser console
- [ ] Authorization headers are properly sent

### Authentication Flow
- [ ] Registration endpoint works (`POST /api/auth/register`)
- [ ] Token is returned on successful registration
- [ ] Token is stored in localStorage
- [ ] Login endpoint works (`POST /api/auth/login`)
- [ ] Token validation works (`GET /api/auth/validate`)

### API Communication
- [ ] Frontend can fetch jobs list
- [ ] Frontend can create jobs (employer)
- [ ] Frontend can submit applications (worker)
- [ ] All error messages display properly

### Token Management
- [ ] Auth token is included in API requests
- [ ] Token is sent in Authorization header
- [ ] Protected routes require valid token
- [ ] Expired tokens are handled gracefully

---

## ✅ Running Both Servers

### Terminal Window 1 - Backend
```bash
cd server
npm run dev
# Wait for: 🚀 Server running on port 5000
```

### Terminal Window 2 - Frontend
```bash
cd trusthire
npm run dev
# Wait for: ➜  Local: http://localhost:5173
```

### Verification
- [ ] Backend terminal shows no errors
- [ ] Frontend terminal shows no errors
- [ ] Both are running simultaneously
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:5000/health

---

## ✅ File Changes Made

### Backend Files Updated

#### Authentication
- [ ] `src/controllers/authController.js` - Added validateToken endpoint
- [ ] `src/routes/authRoutes.js` - Added validation routes
- [ ] All responses include `success` field

#### Middleware
- [ ] `src/middleware/authMiddleware.js` - Enhanced error messages
- [ ] `src/middleware/errorHandler.js` - Standardized error responses
- [ ] All responses consistent format

#### Controllers
- [ ] `src/controllers/jobController.js` - Added getAllJobs, getJobById
- [ ] `src/controllers/workerController.js` - Updated responses
- [ ] `src/controllers/employerController.js` - Updated responses
- [ ] `src/controllers/applicationController.js` - Updated responses

#### Routes
- [ ] `src/routes/jobRoutes.js` - Separated public/protected routes
- [ ] All routes configured for frontend integration
- [ ] CORS properly configured

#### Configuration
- [ ] `src/index.js` - Enhanced logging and middleware
- [ ] `.env` file created with proper values
- [ ] `API_DOCUMENTATION.md` - Comprehensive API docs created

---

## ✅ Testing API Endpoints

### Public Endpoints (No Auth Needed)
- [ ] `GET /api` - API info
- [ ] `GET /api/health` - Server status
- [ ] `GET /api/jobs` - List all jobs
- [ ] `GET /api/jobs/:jobId` - Get specific job
- [ ] `POST /api/auth/register` - User registration
- [ ] `POST /api/auth/login` - User login

### Protected Endpoints (Auth Required)
- [ ] `GET /api/auth/validate` - Validate token
- [ ] `GET /api/auth/me` - Get current user
- [ ] `POST /api/auth/logout` - Logout
- [ ] `GET /api/workers/profile` - Worker profile
- [ ] `PUT /api/workers/profile` - Update profile
- [ ] `GET /api/workers/applications` - Worker applications
- [ ] `POST /api/jobs` - Create job (employer only)
- [ ] `GET /api/jobs/employer/list` - Employer's jobs
- [ ] `PUT /api/jobs/:jobId` - Update job
- [ ] `DELETE /api/jobs/:jobId` - Delete job
- [ ] `POST /api/applications/:jobId` - Submit application
- [ ] `GET /api/applications/:applicationId` - Application status
- [ ] `PUT /api/applications/:applicationId/withdraw` - Withdraw app

---

## ✅ Common Commands

### Backend
```bash
# Install dependencies
npm install

# Run in development (with auto-reload)
npm run dev

# Run in production
npm start

# Check if running
curl http://localhost:5000/health
```

### Frontend
```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build

# Check if running
curl http://localhost:5173
```

---

## ✅ Troubleshooting

### Backend Won't Start
- [ ] Check port 5000 is not in use: `lsof -i :5000`
- [ ] Verify PostgreSQL is running
- [ ] Check database credentials in `.env`
- [ ] Review error messages in terminal

### Frontend Won't Start
- [ ] Check port 5173 is not in use: `lsof -i :5173`
- [ ] Verify `npm install` completed successfully
- [ ] Check `.env.local` has correct `VITE_API_BASE_URL`
- [ ] Review error messages in terminal

### CORS Errors
- [ ] Verify backend is running on 5000
- [ ] Check `FRONTEND_URL` in backend `.env`
- [ ] Ensure frontend is on `http://localhost:5173`
- [ ] Clear browser cache

### Authentication Issues
- [ ] Check token is being stored in localStorage
- [ ] Verify Authorization header format: `Bearer {token}`
- [ ] Check token expiration (default 7 days)
- [ ] Validate JWT_SECRET is same everywhere

### Database Connection Issues
- [ ] PostgreSQL service is running
- [ ] Database `trusthire_db` exists
- [ ] User credentials are correct
- [ ] Network connectivity to database

---

## ✅ Performance Tips

1. **Backend Performance**
   - Set `NODE_ENV=production` for production
   - Disable logging in production
   - Use connection pooling
   - Implement caching for frequently accessed data

2. **Frontend Performance**
   - Use lazy loading for routes
   - Implement pagination for long lists
   - Cache API responses when appropriate
   - Optimize images and assets

3. **Network Performance**
   - Use compression for responses
   - Implement API rate limiting
   - Cache static assets
   - Use CDN for frontend

---

## ✅ Security Checklist

- [ ] Change default `JWT_SECRET` in production
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Implement rate limiting
- [ ] Use secure password hashing (bcryptjs)
- [ ] Store tokens securely (httpOnly cookies recommended)
- [ ] Validate file uploads if implemented
- [ ] Use environment variables for sensitive data
- [ ] Implement CORS properly
- [ ] Regular security audits

---

## ✅ Final Verification

Before considering the integration complete:

- [ ] Both servers running without errors
- [ ] API documentation is accurate
- [ ] All endpoints tested and working
- [ ] Authentication flow works end-to-end
- [ ] Error handling is consistent
- [ ] CORS issues resolved
- [ ] Frontend can communicate with backend
- [ ] Database is syncing properly
- [ ] No console errors in browser
- [ ] No console errors in terminal

---

## 🎉 Ready to Deploy!

Once all items are checked, your backend and frontend are successfully integrated and ready for:
- [ ] Development
- [ ] Testing
- [ ] Production deployment

---

**Last Updated:** January 24, 2026
**Status:** Complete ✅
