# TrustHire Backend - API Documentation

## Server Setup

### Prerequisites
- Node.js 16+ installed
- PostgreSQL database running
- npm or yarn package manager

### Installation

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your database and service credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trusthire_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

4. **Create PostgreSQL database:**
```bash
createdb trusthire_db
```

5. **Start the server:**
```bash
npm run dev      # Development with auto-reload
npm start        # Production
```

Server will start on `http://localhost:5000`

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Response Format
All API responses follow this format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "token": "jwt_token_if_applicable"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Authentication Endpoints

### Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "worker" | "employer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "worker"
  },
  "token": "eyJhbGc..."
}
```

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** Returns user info and JWT token

### Logout
**POST** `/api/auth/logout`

**Headers:** `Authorization: Bearer {token}`

### Validate Token
**GET** `/api/auth/validate` or `/api/auth/me`

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "role": "worker"
  }
}
```

---

## Job Endpoints

### Get All Jobs (Public)
**GET** `/api/jobs`

**Query Parameters:**
- `page` (optional, default: 1) - Page number for pagination
- `limit` (optional, default: 10) - Results per page
- `search` (optional) - Search jobs by title or description
- `location` (optional) - Filter by location
- `jobType` (optional) - Filter by job type (full-time, part-time, contract)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Plumber",
      "description": "...",
      "location": "New York",
      "salary": 50000,
      "jobType": "full-time",
      "employer": {
        "id": 1,
        "name": "ABC Company",
        "rating": 4.5
      }
    }
  ],
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1,
    "limit": 10
  }
}
```

### Get Job Details (Public)
**GET** `/api/jobs/:jobId`

### Create Job (Employer Only)
**POST** `/api/jobs`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "title": "Electrician",
  "description": "Experienced electrician needed...",
  "location": "Boston",
  "salary": 55000,
  "jobType": "full-time",
  "requirements": "5+ years experience"
}
```

### Update Job (Employer Only)
**PUT** `/api/jobs/:jobId`

**Headers:** `Authorization: Bearer {token}`

**Request Body:** Same as create job

### Delete Job (Employer Only)
**DELETE** `/api/jobs/:jobId`

**Headers:** `Authorization: Bearer {token}`

### Get Employer's Jobs
**GET** `/api/jobs/employer/list`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Employer

---

## Worker Endpoints

### Get Worker Profile
**GET** `/api/workers/profile`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

### Update Worker Profile
**PUT** `/api/workers/profile`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+1234567890",
  "skills": "Plumbing, Repairs",
  "location": "New York"
}
```

### Get Available Jobs (for Workers)
**GET** `/api/workers/jobs`

**Headers:** `Authorization: Bearer {token}`

**Query Parameters:**
- `search` (optional)
- `location` (optional)
- `jobType` (optional)

### Get Worker Applications
**GET** `/api/workers/applications`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

---

## Employer Endpoints

### Get Employer Dashboard Stats
**GET** `/api/employers/dashboard`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Employer

**Response:**
```json
{
  "success": true,
  "data": {
    "totalJobs": 10,
    "activeJobs": 5,
    "totalApplications": 25,
    "workersHired": 3
  }
}
```

### Get Applications for Employer
**GET** `/api/employers/applications`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Employer

### Update Application Status
**PUT** `/api/employers/applications/:applicationId/status`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Employer

**Request Body:**
```json
{
  "status": "accepted" | "rejected" | "pending"
}
```

---

## Application Endpoints

### Submit Job Application
**POST** `/api/applications/:jobId`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

### Get Application Status
**GET** `/api/applications/:applicationId`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

### Withdraw Application
**PUT** `/api/applications/:applicationId/withdraw`

**Headers:** `Authorization: Bearer {token}`

**Role Required:** Worker

---

## Health Check

### Server Status
**GET** `/health`

**Response:**
```json
{
  "success": true,
  "status": "Server is running",
  "timestamp": "2024-01-24T10:00:00.000Z"
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | User lacks required permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Token is obtained from login/register endpoints and includes:
- User ID
- User Email
- User Role

Token expires in 7 days by default (configurable via JWT_EXPIRE in .env)

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (default frontend)
- Any URL specified in `FRONTEND_URL` environment variable

---

## Database Models

### User
- id
- name
- email
- password (hashed)
- role (worker/employer)
- phone
- rating
- skills
- createdAt
- updatedAt

### Job
- id
- title
- description
- location
- salary
- jobType
- requirements
- employerId (FK)
- isActive
- createdAt
- updatedAt

### Application
- id
- jobId (FK)
- workerId (FK)
- status (pending/accepted/rejected/withdrawn)
- appliedAt
- updatedAt

### Review
- id
- reviewerId (FK)
- revieweeId (FK)
- rating
- comment
- createdAt

---

## Development Tips

1. **Enable detailed logging:**
   Set `NODE_ENV=development` in .env

2. **Database debugging:**
   Logs all SQL queries when in development mode

3. **JWT token testing:**
   Use `/api/auth/validate` endpoint to verify token validity

4. **Job filtering:**
   Combine multiple query parameters for advanced filtering

---

## Support

For API issues or questions, check:
- Error response messages for specific guidance
- Server logs for debugging information
- Frontend API service configuration
