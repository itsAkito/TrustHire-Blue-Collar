# TrustHire API Endpoints Reference

This document outlines all API endpoints expected by the frontend application.

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register User
```
POST /auth/register
Body: {
  name: string,
  email: string,
  password: string,
  role: "worker" | "employer"
}
Response: {
  user: { _id, name, email, role },
  token: string
}
```

### Login User
```
POST /auth/login
Body: {
  email: string,
  password: string
}
Response: {
  user: { _id, name, email, role },
  token: string
}
```

### Validate Token
```
GET /auth/validate
Headers: Authorization: Bearer {token}
Response: {
  user: { _id, name, email, role },
  valid: boolean
}
```

### Logout User
```
POST /auth/logout
Headers: Authorization: Bearer {token}
Response: { message: "Logged out successfully" }
```

---

## Worker Endpoints

### Get Worker Profile
```
GET /workers/profile
Headers: Authorization: Bearer {token}
Response: {
  _id: string,
  name: string,
  email: string,
  phone: string,
  skills: string,
  experience: number,
  bio: string,
  rating: number
}
```

### Update Worker Profile
```
PUT /workers/profile
Headers: Authorization: Bearer {token}
Body: {
  name: string,
  phone: string,
  skills: string,
  experience: number,
  bio: string
}
Response: { ...updated user data }
```

### Get Available Jobs
```
GET /workers/jobs?search={search}&jobType={type}&location={location}
Headers: Authorization: Bearer {token}
Response: [
  {
    _id: string,
    title: string,
    description: string,
    location: string,
    salary: string,
    jobType: "full-time" | "part-time" | "contract",
    employerName: string,
    applicationsCount: number
  }
]
```

### Search Jobs
```
GET /workers/jobs/search?q={query}&jobType={type}&location={location}
Headers: Authorization: Bearer {token}
Response: [ ...job objects ]
```

### Apply for Job
```
POST /workers/jobs/{jobId}/apply
Headers: Authorization: Bearer {token}
Response: { message: "Application submitted", applicationId: string }
```

### Get Worker Applications
```
GET /workers/applications
Headers: Authorization: Bearer {token}
Response: [
  {
    _id: string,
    jobId: string,
    jobTitle: string,
    status: "pending" | "accepted" | "rejected",
    appliedDate: date,
    employerName: string
  }
]
```

### Update Worker Location
```
PUT /workers/location
Headers: Authorization: Bearer {token}
Body: {
  latitude: number,
  longitude: number
}
Response: { message: "Location updated" }
```

---

## Employer Endpoints

### Get Employer Profile
```
GET /employers/profile
Headers: Authorization: Bearer {token}
Response: {
  _id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  bio: string,
  rating: number
}
```

### Update Employer Profile
```
PUT /employers/profile
Headers: Authorization: Bearer {token}
Body: {
  name: string,
  phone: string,
  company: string,
  bio: string
}
Response: { ...updated user data }
```

### Create Job
```
POST /employers/jobs
Headers: Authorization: Bearer {token}
Body: {
  title: string,
  description: string,
  location: string,
  salary: string,
  jobType: "full-time" | "part-time" | "contract",
  requirements: string
}
Response: {
  _id: string,
  ...job data
}
```

### Get Employer's Jobs
```
GET /employers/jobs
Headers: Authorization: Bearer {token}
Response: [
  {
    _id: string,
    title: string,
    description: string,
    location: string,
    salary: string,
    jobType: string,
    requirements: string,
    applicationsCount: number,
    createdDate: date
  }
]
```

### Update Job
```
PUT /employers/jobs/{jobId}
Headers: Authorization: Bearer {token}
Body: {
  title: string,
  description: string,
  location: string,
  salary: string,
  jobType: string,
  requirements: string
}
Response: { ...updated job data }
```

### Delete Job
```
DELETE /employers/jobs/{jobId}
Headers: Authorization: Bearer {token}
Response: { message: "Job deleted successfully" }
```

### Get Job Applications
```
GET /employers/jobs/{jobId}/applications
Headers: Authorization: Bearer {token}
Response: [
  {
    _id: string,
    jobId: string,
    workerId: string,
    workerName: string,
    workerEmail: string,
    status: "pending" | "accepted" | "rejected",
    appliedDate: date,
    workerRating: number
  }
]
```

### Review Application
```
PUT /employers/applications/{applicationId}
Headers: Authorization: Bearer {token}
Body: {
  status: "accepted" | "rejected"
}
Response: { message: "Application updated" }
```

### Get Dashboard Statistics
```
GET /employers/dashboard/stats
Headers: Authorization: Bearer {token}
Response: {
  totalJobs: number,
  activeJobs: number,
  totalApplications: number,
  workersHired: number
}
```

### Get Workers
```
GET /employers/workers
Headers: Authorization: Bearer {token}
Response: [
  {
    _id: string,
    name: string,
    email: string,
    skills: string,
    experience: number,
    rating: number
  }
]
```

### Hire Worker
```
POST /employers/hire
Headers: Authorization: Bearer {token}
Body: {
  workerId: string,
  jobId: string
}
Response: { message: "Worker hired successfully" }
```

---

## Job Endpoints

### Get All Jobs
```
GET /jobs?search={search}&jobType={type}&location={location}&page={page}&limit={limit}
Response: [
  {
    _id: string,
    title: string,
    description: string,
    location: string,
    salary: string,
    jobType: string,
    employerName: string
  }
]
```

### Get Job Details
```
GET /jobs/{jobId}
Response: {
  _id: string,
  title: string,
  description: string,
  location: string,
  salary: string,
  jobType: string,
  requirements: string,
  employerName: string,
  employerRating: number,
  applicationsCount: number
}
```

### Get Job Applications
```
GET /jobs/{jobId}/applications
Headers: Authorization: Bearer {token}
Response: [ ...application data ]
```

### Search Jobs
```
GET /jobs/search?q={query}&jobType={type}&location={location}
Response: [ ...matching jobs ]
```

---

## User Endpoints

### Get User Details
```
GET /users/me
Headers: Authorization: Bearer {token}
Response: { _id, name, email, role, ...profile data }
```

### Update User Details
```
PUT /users/me
Headers: Authorization: Bearer {token}
Body: {
  name: string,
  email: string,
  ...other fields
}
Response: { ...updated user data }
```

### Change Password
```
POST /users/change-password
Headers: Authorization: Bearer {token}
Body: {
  oldPassword: string,
  newPassword: string
}
Response: { message: "Password changed successfully" }
```

### Delete Account
```
DELETE /users/me
Headers: Authorization: Bearer {token}
Response: { message: "Account deleted successfully" }
```

---

## Review Endpoints

### Get Worker Reviews
```
GET /reviews/workers/{workerId}
Response: [
  {
    _id: string,
    rating: number,
    review: string,
    reviewerName: string,
    reviewerRole: string,
    createdDate: date
  }
]
```

### Get Employer Reviews
```
GET /reviews/employers/{employerId}
Response: [
  {
    _id: string,
    rating: number,
    review: string,
    reviewerName: string,
    createdDate: date
  }
]
```

### Add Review
```
POST /reviews
Headers: Authorization: Bearer {token}
Body: {
  rating: number (1-5),
  review: string,
  revieweeId: string,
  revieweeType: "worker" | "employer"
}
Response: {
  _id: string,
  ...review data
}
```

### Update Review
```
PUT /reviews/{reviewId}
Headers: Authorization: Bearer {token}
Body: {
  rating: number,
  review: string
}
Response: { ...updated review data }
```

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "statusCode": 400,
  "error": "ErrorType"
}
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

---

## Headers Required

All authenticated endpoints require:
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

---

## Testing Endpoints

Use Postman or cURL to test endpoints:

```bash
# Get jobs
curl -X GET http://localhost:5000/api/jobs

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Get profile (with token)
curl -X GET http://localhost:5000/api/workers/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting

Recommended rate limiting per backend implementation:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

For endpoints that support pagination:
```
?page=1&limit=10
```

Default values:
- page: 1
- limit: 10
- max limit: 100

---

**Last Updated**: January 2026
**API Version**: 1.0.0
