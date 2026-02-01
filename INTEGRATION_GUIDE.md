# Frontend & Backend Integration Guide

## Quick Start

### Step 1: Backend Setup (Server)

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
# Copy example to create your .env file
cp .env.example .env
```

4. **Edit `.env` file with your settings:**
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trusthire_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

5. **Create database (if using PostgreSQL locally):**
```bash
createdb trusthire_db
```

6. **Start backend server:**
```bash
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📝 Environment: development
🌐 Frontend URL: http://localhost:5173
📡 API URL: http://localhost:5000/api
Database connection established successfully
Database models synced
```

✅ Backend is ready!

---

### Step 2: Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd trusthire
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local` file:**
```bash
# Create the file in trusthire directory
```

4. **Add frontend environment variables:**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
```

5. **Start frontend development server:**
```bash
npm run dev
```

Expected output:
```
  VITE v... dev server running at:

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Frontend is ready!

---

## Connection Verification

### 1. Test Backend Health
Open browser and visit:
```
http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "status": "Server is running",
  "timestamp": "2024-01-24T10:00:00.000Z"
}
```

### 2. Test API Info
Visit:
```
http://localhost:5000/api
```

Expected response:
```json
{
  "success": true,
  "message": "TrustHire API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "workers": "/api/workers",
    "employers": "/api/employers",
    "jobs": "/api/jobs",
    "applications": "/api/applications"
  }
}
```

### 3. Test API Connection from Frontend
Use browser DevTools to test:
```javascript
// Open browser console and run:
fetch('http://localhost:5000/api/jobs')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

---

## API Service Configuration

The frontend API service is located at `src/services/api.js`

### Configure API Base URL
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

---

## Testing Authentication Flow

### 1. Register a New User

**Frontend:**
```javascript
// In your registration component
const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'worker'  // or 'employer'
    });
    
    // Save token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    console.log('Registration successful:', response.data);
  } catch (error) {
    console.error('Registration error:', error.response.data.message);
  }
};
```

### 2. Login User

```javascript
const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response.data.message);
  }
};
```

### 3. Verify Token

```javascript
const validateToken = async () => {
  try {
    const response = await api.get('/auth/validate');
    return response.data;
  } catch (error) {
    console.error('Token invalid');
    localStorage.removeItem('token');
  }
};
```

---

## Common Issues & Solutions

### Issue 1: CORS Error
**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env` matches your frontend URL
- Verify CORS middleware is enabled in `server/src/index.js`

### Issue 2: Cannot Connect to Backend
**Error:** `Failed to fetch` or `Network request failed`

**Solution:**
- Check backend is running: `http://localhost:5000/health`
- Verify `VITE_API_BASE_URL` in frontend `.env.local`
- Ensure no firewall is blocking port 5000

### Issue 3: Token Not Working
**Error:** `Invalid or expired token`

**Solution:**
- Check token is being sent in Authorization header
- Verify `JWT_SECRET` matches between login and validation
- Check token expiration time (default: 7 days)

### Issue 4: Database Connection Error
**Error:** `Unable to connect to database`

**Solution:**
- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check database exists: `createdb trusthire_db`
- Try clearing and re-syncing models

---

## Project Structure

```
TrustHire-Blue Collar Platform/
├── server/
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example env file
│   ├── package.json
│   ├── src/
│   │   ├── index.js        # Main server file
│   │   ├── config/
│   │   │   ├── constants.js
│   │   │   └── database.js
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── middleware/     # Express middleware
│   │   └── routes/         # API routes
│   └── API_DOCUMENTATION.md
│
└── trusthire/
    ├── .env.local           # Frontend env (create this)
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   ├── services/
    │   │   └── api.js      # API configuration
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   └── context/        # Context providers
    └── vite.config.js
```

---

## Key Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `trusthire_db` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password123` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `JWT_SECRET` | JWT secret key | `your_secret` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:5173` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_API_TIMEOUT` | API timeout (ms) | `10000` |

---

## Running Both Servers

### Terminal 1: Backend
```bash
cd server
npm run dev
```

### Terminal 2: Frontend
```bash
cd trusthire
npm run dev
```

### Access Application
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **API:** http://localhost:5000/api

---

## Production Deployment

For deployment to production:

### Backend
1. Build: Already a Node.js app, no build needed
2. Set `NODE_ENV=production` in `.env`
3. Use a process manager (PM2, Forever, etc.)
4. Configure database credentials securely
5. Update `FRONTEND_URL` to production domain

### Frontend
```bash
npm run build
```
This creates a `dist/` folder ready for deployment.

---

## Additional Resources

- [API Documentation](./API_DOCUMENTATION.md)
- [Backend README](./server/README.md)
- [Frontend README](../trusthire/README.md)

---

## Support

If you encounter issues:
1. Check error messages in browser console
2. Check backend logs in terminal
3. Verify all environment variables are set
4. Ensure both servers are running
5. Clear browser cache if needed

---

**Last Updated:** January 24, 2026
