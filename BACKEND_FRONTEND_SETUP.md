# TrustHire Backend-Frontend Integration Setup

## ✅ Changes Made

### Backend Updates
1. **CORS Configuration** - Frontend can now connect from `http://localhost:5173`
2. **API Response Format** - All endpoints now return standardized responses with `success` field
3. **Auth Routes** - Added token validation endpoints (`/api/auth/validate`, `/api/auth/me`)
4. **Job Routes** - Added public job listing endpoints
5. **Error Handling** - Improved error messages and status codes
6. **Database Connection** - Configured for Supabase

### Frontend Updates
1. **API Service** - Updated endpoints to match backend routes
2. **Job Service** - Changed from `/workers/jobs` to `/jobs`
3. **Application Service** - Changed from `/workers/jobs/:jobId/apply` to `/applications/:jobId`
4. **React Keys** - Fixed missing unique keys in job list rendering
5. **API Response Handling** - Updated to use `data.data` structure

## 🚀 Getting Started

### Step 1: Start the Backend Server
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
🌐 Frontend URL: http://localhost:5173
📡 API URL: http://localhost:5000/api
```

### Step 2: Start the Frontend
```bash
cd trusthire
npm run dev
```

Access at: `http://localhost:5173`

## 🔧 Database Configuration

### Using Supabase (Recommended)
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Create a new project or use existing
3. Go to **Settings → Database**
4. Copy the connection details
5. Update `server/.env`:
```env
DB_HOST=your-project.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=true
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate token (requires auth)
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout (requires auth)

### Jobs (Public)
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:jobId` - Get job details

### Worker (Protected)
- `GET /api/workers/profile` - Get worker profile
- `PUT /api/workers/profile` - Update worker profile
- `GET /api/workers/applications` - Get worker applications

### Employer (Protected)
- `GET /api/employers/profile` - Get employer profile
- `PUT /api/employers/profile` - Update employer profile
- `POST /api/employers/jobs` - Create job
- `GET /api/employers/jobs` - Get employer jobs
- `PUT /api/employers/jobs/:jobId` - Update job
- `DELETE /api/employers/jobs/:jobId` - Delete job

### Applications (Protected)
- `POST /api/applications/:jobId` - Submit application
- `GET /api/applications/:applicationId` - Get application status
- `PUT /api/applications/:applicationId/withdraw` - Withdraw application

## 🧪 Test Endpoints

### Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "status": "Server is running",
  "timestamp": "2026-01-24T..."
}
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "worker"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

## 🐛 Troubleshooting

### Backend Connection Refused
**Problem**: `ECONNREFUSED` error
**Solution**: 
1. Ensure backend is running: `npm run dev` in server directory
2. Check if port 5000 is available
3. Verify database credentials in `.env`

### CORS Errors
**Problem**: `Access to XMLHttpRequest blocked by CORS`
**Solution**:
1. Backend CORS is configured for `http://localhost:5173`
2. Verify frontend URL in `server/.env` FRONTEND_URL
3. Restart backend server

### Database Connection Errors
**Problem**: `SequelizeConnectionRefusedError`
**Solution**:
1. Check database credentials in `server/.env`
2. Ensure PostgreSQL/Supabase is running
3. Verify network connectivity to database host

### Missing Data in Responses
**Problem**: Fields like `employer.name` are undefined
**Solution**:
1. Check API response structure matches frontend expectations
2. Verify database associations are properly defined
3. Check that related records exist in database

## 📚 Frontend File Structure

```
trusthire/src/
├── services/api.js          # API configuration & endpoints
├── pages/
│   ├── Home.jsx            # Job listing page
│   ├── Login.jsx            # Login page
│   ├── LoginWorker.jsx      # Worker login
│   ├── LoginEmployer.jsx    # Employer login
│   └── ...
├── components/             # Reusable components
├── context/AuthContext.jsx  # Auth state management
└── hooks/useAuth.js         # Auth hook
```

## 📚 Backend File Structure

```
server/src/
├── index.js                 # Main server file
├── config/
│   ├── database.js         # Database connection
│   └── constants.js        # Constants
├── controllers/            # Business logic
├── models/                 # Sequelize models
├── routes/                 # API routes
├── middleware/             # Auth, validation, error handling
└── services/               # External services
```

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=your-host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=true

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# Cloudinary (optional)
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Frontend (.env)
Create `trusthire/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## ✨ Next Steps

1. ✅ Start backend server
2. ✅ Start frontend server
3. ✅ Test registration/login flow
4. ✅ Test job listing and application
5. ✅ Test employer job creation
6. ✅ Deploy to production

## 📞 Support

For issues or questions, check:
- Backend logs: Terminal running `npm run dev`
- Frontend console: Browser DevTools → Console
- Database: Verify tables are created via `npm run migrate` (if migrations set up)

