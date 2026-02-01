#!/bin/bash

# TrustHire API - Quick Testing Script
# Run individual commands in terminal

# ============================================
# 1. USER REGISTRATION & OTP
# ============================================

# Register Worker
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Worker",
    "email": "worker@example.com",
    "password": "Password@123",
    "phone": "9876543210",
    "role": "worker"
  }'

# Register Employer
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Employer",
    "email": "employer@example.com",
    "password": "Password@123",
    "phone": "9876543211",
    "role": "employer"
  }'

# Verify OTP (replace OTP with actual value)
curl -X POST http://localhost:5000/api/users/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@example.com",
    "otp": "123456"
  }'

# Resend OTP
curl -X POST http://localhost:5000/api/users/resend-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@example.com"
  }'

# ============================================
# 2. USER LOGIN
# ============================================

# Worker Login (save token for later use)
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "worker@example.com",
    "password": "Password@123"
  }'

# Employer Login
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "employer@example.com",
    "password": "Password@123"
  }'

# Admin Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trusthire.com",
    "password": "Admin@123"
  }'

# ============================================
# 3. USER PROFILE MANAGEMENT
# ============================================

# Get User Profile (Protected)
TOKEN="your_jwt_token_here"
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Update User Profile
curl -X PUT http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "phone": "9876543210",
    "bio": "Experienced plumber",
    "skills": "Plumbing,Electrical"
  }'

# Change Password
curl -X POST http://localhost:5000/api/users/change-password \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "Password@123",
    "newPassword": "NewPassword@123"
  }'

# Get Public User Profile
curl -X GET http://localhost:5000/api/users/user_id_here

# ============================================
# 4. JOB MANAGEMENT
# ============================================

# Get All Jobs (Public)
curl -X GET "http://localhost:5000/api/jobs?page=1&limit=10"

# Search Jobs
curl -X GET "http://localhost:5000/api/jobs?search=plumber&location=Delhi&jobType=full-time"

# Get Job Details
curl -X GET http://localhost:5000/api/jobs/job_id_here

# Create Job (Employer - Protected)
EMPLOYER_TOKEN="your_employer_token_here"
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Experienced Plumber Needed",
    "description": "Looking for experienced plumber for residential projects",
    "location": "Delhi, India",
    "salary": "50000",
    "jobType": "full-time",
    "requirements": "5+ years experience, certification required"
  }'

# Update Job
curl -X PUT http://localhost:5000/api/jobs/job_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Job Title",
    "salary": "60000"
  }'

# Delete Job
curl -X DELETE http://localhost:5000/api/jobs/job_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# ============================================
# 5. EMPLOYER FEATURES
# ============================================

# Get Employer Profile
curl -X GET http://localhost:5000/api/employers/profile \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# Update Employer Profile
curl -X PUT http://localhost:5000/api/employers/profile \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Company Name Updated",
    "bio": "We are a leading recruitment agency"
  }'

# Get Dashboard Stats
curl -X GET http://localhost:5000/api/employers/dashboard/stats \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# Get All Applications
curl -X GET http://localhost:5000/api/employers/applications \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# Update Application Status
curl -X PUT http://localhost:5000/api/employers/applications/app_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "accepted"
  }'

# ============================================
# 6. EMPLOYEE MANAGEMENT
# ============================================

# Add Employee (with image upload)
curl -X POST http://localhost:5000/api/employers/employees \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -F "name=Rajesh Kumar" \
  -F "email=rajesh@example.com" \
  -F "phone=9876543210" \
  -F "aadhaar=123456789012" \
  -F "position=Senior Plumber" \
  -F "address=123 Main Street, Delhi" \
  -F "salary=35000" \
  -F "joiningDate=2024-02-01" \
  -F "profilePhoto=@/path/to/image.jpg"

# Get All Employees
curl -X GET "http://localhost:5000/api/employers/employees?page=1&limit=10&status=active" \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# Get Employee Details
curl -X GET http://localhost:5000/api/employers/employees/employee_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# Update Employee
curl -X PUT http://localhost:5000/api/employers/employees/employee_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "position": "Lead Plumber",
    "salary": "40000",
    "status": "active"
  }'

# Update Employee with Photo
curl -X PUT http://localhost:5000/api/employers/employees/employee_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN" \
  -F "name=Rajesh Kumar Updated" \
  -F "salary=45000" \
  -F "profilePhoto=@/path/to/new/image.jpg"

# Delete Employee
curl -X DELETE http://localhost:5000/api/employers/employees/employee_id_here \
  -H "Authorization: Bearer $EMPLOYER_TOKEN"

# ============================================
# 7. ADMIN FEATURES
# ============================================

ADMIN_TOKEN="your_admin_token_here"

# Get Dashboard Stats
curl -X GET http://localhost:5000/api/admin/dashboard/stats \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get All Users
curl -X GET "http://localhost:5000/api/admin/users?page=1&limit=10&role=worker" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get All Jobs
curl -X GET "http://localhost:5000/api/admin/jobs?page=1&limit=10" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get All Applications
curl -X GET "http://localhost:5000/api/admin/applications?page=1&limit=10&status=pending" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get All Employees
curl -X GET "http://localhost:5000/api/admin/employees?page=1&limit=10&status=active" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Get Admin Profile
curl -X GET http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Update Admin Profile
curl -X PUT http://localhost:5000/api/admin/profile \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Name Updated"
  }'

# Delete User (by ID)
curl -X DELETE http://localhost:5000/api/admin/users/user_id_here \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Delete Job
curl -X DELETE http://localhost:5000/api/admin/jobs/job_id_here \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Delete Employee
curl -X DELETE http://localhost:5000/api/admin/employees/employee_id_here \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# ============================================
# TIPS:
# ============================================
# 1. Replace token with actual JWT token from login response
# 2. Replace IDs (job_id, user_id, etc.) with actual values
# 3. Replace email, names, and other data as needed
# 4. For file uploads, update the file path
# 5. Run one command at a time
# 6. Check response for success/error messages
# 7. Use Postman for easier testing with GUI

# ============================================
# NOTES:
# ============================================
# - OTP is logged to console in development
# - Admin account must be created via database first
# - Employee Aadhaar must be unique
# - Profile photos are stored locally or on cloud storage
# - Token expires after JWT_EXPIRE duration (default: 7d)
