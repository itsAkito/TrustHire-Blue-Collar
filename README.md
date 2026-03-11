# TrustHire - Blue Collar Platform

A comprehensive platform connecting skilled blue-collar professionals with employers. Built with modern web technologies for reliability and scalability.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-brightgreen)](https://nodejs.org)
[![React Version](https://img.shields.io/badge/react-18%2B-blue)](https://react.dev)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Locally](#running-locally)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- 
---

## ✨ Features

### Worker Features
- ✅ Create and manage profile with skills & experience
- ✅ Search and apply for jobs
- ✅ Track applications (pending, accepted, rejected)
- ✅ Receive notifications for job matches
- ✅ View employer ratings and reviews
- ✅ Real-time job alerts

### Employer Features
- ✅ Post and manage job listings
- ✅ Review applications from workers
- ✅ Hire workers and track employees
- ✅ Dashboard with analytics
- ✅ Manage job requirements and descriptions
- ✅ Communication with potential hires

### Admin Features
- ✅ Monitor platform activity
- ✅ View user counts (workers & employers)
- ✅ Manage listings and users
- ✅ System notifications
- ✅ Employee management interface

### Technical Features
- ✅ **OTP Verification** - Email/SMS via Gmail & Twilio
- ✅ **Real-time Notifications** - Database-backed notification system
- ✅ **Role-based Access Control** - Worker, Employer, Admin roles
- ✅ **Image Upload** - Cloudinary integration
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Database Persistence** - PostgreSQL with Neon

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Sequelize
- **Authentication**: JWT
- **Email**: Nodemailer (Gmail SMTP)
- **SMS**: Twilio
- **File Storage**: Cloudinary
- **API**: RESTful

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: React Context + Hooks
- **Routing**: React Router v6

### Deployment
- **Backend**: Render.com
- **Frontend**: Vercel
- **Database**: Neon (PostgreSQL)
- **CI/CD**: GitHub Actions (automatic on push)

---

## 📁 Project Structure

```
TrustHire-Blue Collar Platform/
│
├── 📂 server/                          # Backend (Express API)
│   ├── src/
│   │   ├── index.js                   # Express server entry point
│   │   ├── config/
│   │   │   ├── database.js            # Sequelize DB config
│   │   │   └── constants.js           # App constants & roles
│   │   ├── models/                    # Sequelize models
│   │   │   ├── User.js                # User model (worker/employer/admin)
│   │   │   ├── Job.js                 # Job listings
│   │   │   ├── Application.js         # Job applications
│   │   │   ├── Employee.js            # Employee records
│   │   │   ├── Notification.js        # User notifications (NEW)
│   │   │   └── Review.js              # User reviews
│   │   ├── controllers/               # Business logic
│   │   │   ├── authController.js      # Registration/Login
│   │   │   ├── adminController.js     # Admin operations
│   │   │   ├── employerController.js  # Employer operations
│   │   │   ├── workerController.js    # Worker operations
│   │   │   ├── jobController.js       # Job management
│   │   │   ├── applicationController.js
│   │   │   ├── notificationController.js # Notification handling (NEW)
│   │   │   └── userController.js
│   │   ├── routes/                    # API route handlers
│   │   │   ├── userRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── employerRoutes.js
│   │   │   ├── workerRoutes.js
│   │   │   ├── jobRoutes.js
│   │   │   ├── applicationRoutes.js
│   │   │   ├── notificationRoutes.js  # Notification endpoints (NEW)
│   │   │   └── ...
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # JWT verification
│   │   │   ├── errorHandler.js        # Global error handler
│   │   │   ├── uploadMiddleware.js    # File upload handling
│   │   │   └── validators.js          # Input validation (Joi)
│   │   └── services/
│   │       └── otpService.js          # OTP generation & sending
│   ├── .env                           # ⚠️ NOT IN GIT (add manually)
│   ├── .env.example                   # ✅ Template for .env
│   ├── .gitignore                     # Protects sensitive files
│   ├── package.json
│   └── README.md
│
├── 📂 trusthire/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── main.jsx                   # React entry point
│   │   ├── App.jsx                    # Route configuration
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── components/                # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── AlertContainer.jsx
│   │   │   ├── CreateEmployeeForm.jsx
│   │   │   └── ...
│   │   ├── pages/                     # Full pages/views
│   │   │   ├── Home.jsx               # Landing page (role-aware)
│   │   │   ├── Login.jsx
│   │   │   ├── WorkerSignup.jsx
│   │   │   ├── EmployerSignup.jsx
│   │   │   ├── AdminDashboard.jsx     # Real DB data (UPDATED)
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   ├── WorkerProfile.jsx
│   │   │   └── ...
│   │   ├── context/                   # React Context (state management)
│   │   │   ├── AuthContext.jsx
│   │   │   └── AlertContext.jsx
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   ├── useAlert.js
│   │   │   └── ...
│   │   ├── services/                  # API client
│   │   │   └── api.js                 # Axios instance & API calls
│   │   └── assets/                    # Images, logos, etc.
│   ├── public/
│   ├── .env                           # ⚠️ NOT IN GIT (add manually)
│   ├── .env.example                   # ✅ Template for .env
│   ├── .gitignore                     # Protects sensitive files
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── 📄 GITHUB_DEPLOYMENT_GUIDE.md      # Complete deployment instructions
├── 📄 README_UPDATES.md               # Recent documentation updates
└── 📄 LICENSE                         # MIT License
```

---

## ⚙️ Installation

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- **PostgreSQL** (local) or **Neon** account (cloud)
- **Git**

### Clone Repository
```bash
git clone https://github.com/yourusername/trusthire-platform.git
cd "TrustHire-Blue Collar Platform"
```

### Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your credentials
# See Configuration section below
```

### Frontend Setup
```bash
cd ../trusthire

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with API base URL
# VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔐 Configuration

### Backend (.env)

**CRITICAL: Never commit the actual .env file!**

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/dbname?sslmode=require

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d

# Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=YourSecurePassword123

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password  # Use app password, not regular password!
SMTP_FROM="TrustHire <no-reply@trusthire.com>"

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# File Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=TrustHire
VITE_APP_VERSION=1.0.0
```

---

## 🚀 Running Locally

### Terminal 1: Start Backend
```bash
cd server
npm start

# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
cd trusthire
npm run dev

# App runs on http://localhost:5173
```

### Access Application
- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

### Test Admin Login
- **Email**: (from ADMIN_EMAIL in .env)
- **Password**: (from ADMIN_PASSWORD in .env)

---

## 📚 API Documentation

### Authentication
```bash
POST /api/users/register
POST /api/users/login
POST /api/users/validate-token
```

### Worker Routes (Protected)
```bash
GET /api/workers/profile
PUT /api/workers/profile
GET /api/workers/jobs
GET /api/workers/applications
```

### Employer Routes (Protected)
```bash
GET /api/employers/profile
POST /api/employers/jobs
GET /api/employers/jobs
PUT /api/employers/jobs/:jobId
GET /api/employers/dashboard/stats
GET /api/employers/applications
```

### Admin Routes (Protected)
```bash
GET /api/admin/dashboard/stats
GET /api/admin/users
GET /api/admin/jobs
GET /api/admin/applications
POST /api/admin/employees
```

### Notifications (NEW - Protected)
```bash
GET /api/notifications
PUT /api/notifications/:notificationId/read
PUT /api/notifications/read-all
DELETE /api/notifications/:notificationId
```

**Full API docs**: See [server/API_DOCUMENTATION.md](server/API_DOCUMENTATION.md)

---

## 🌐 Deployment

### Quick Deploy to Render + Vercel

**Full instructions**: [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md)

**Summary**:
1. Push code to GitHub
2. Connect GitHub to Render (backend) and Vercel (frontend)
3. Add environment variables in both platforms
4. Auto-deploy on push

**Deployed URLs** (example):
- Backend: `https://trusthire-backend.onrender.com`
- Frontend: `https://trusthire.vercel.app`

---

## 🆘 Troubleshooting

### OTP Emails Not Sending
- Verify `SMTP_PASSWORD` is Gmail app password (not regular password)
- Enable 2FA on Gmail: https://myaccount.google.com/apppasswords
- Check `SMTP_USER` email is correct

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check database is accessible from your IP
- For Neon: Add your IP to whitelist

### API Not Responding
- Check backend is running (`npm start` in server/)
- Verify `VITE_API_BASE_URL` in frontend matches backend URL
- Check CORS is enabled in backend

### Images Not Uploading
- Verify Cloudinary credentials in .env
- Check Cloudinary account has upload quota
- Images must be < 5MB

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style
- Use ES6+ JavaScript
- Follow ESLint configuration
- 2-space indentation
- Meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👥 Support

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Documentation**: See [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md)

---

## 📅 Recent Updates

### February 2026
- ✅ Fixed OTP email delivery (SMTP password configuration)
- ✅ Admin Dashboard now shows real database data
- ✅ Added real-time notifications system
- ✅ Implemented state management for employee creation
- ✅ Prepared project for GitHub deployment
- ✅ Created comprehensive deployment guide

---

**Built with ❤️ for blue-collar professionals**

*Last Updated: February 4, 2026*
#   T r u s t H i r e - B l u e C o l l a r - 
 
 


