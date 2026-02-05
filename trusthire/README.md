# TrustHire Frontend Application

A modern React-based frontend for the TrustHire Blue Collar Platform - connecting skilled workers with employers.

## 🎯 Overview

TrustHire is a web application that bridges the gap between blue-collar workers and employers. This frontend provides:

- **For Workers**: Profile management, job search, applications, and ratings
- **For Employers**: Job posting, worker management, application review, and dashboard analytics

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Features](#features)
- [Project Structure](#project-structure)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Documentation](#documentation)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend server running on port 5000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env and set VITE_API_BASE_URL
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## ✨ Features

### Authentication & Authorization
- ✅ User registration with role selection (Worker/Employer)
- ✅ JWT-based login system
- ✅ Token persistence via localStorage
- ✅ Protected routes with role-based access control
- ✅ Automatic logout on token expiration

### Worker Features
- ✅ Comprehensive profile management
- ✅ Skills and experience tracking
- ✅ Job search with advanced filters
- ✅ Location-based job discovery
- ✅ Apply for jobs
- ✅ Track job applications
- ✅ Worker ratings and reviews

### Employer Features
- ✅ Company profile management
- ✅ Create and manage job postings
- ✅ Review job applications
- ✅ Hire workers
- ✅ Dashboard with key statistics
- ✅ Worker management

### UI/UX
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean interface
- ✅ Form validation and error handling
- ✅ Loading states and animations
- ✅ User-friendly navigation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Card.jsx
│   └── Button.jsx
├── context/             # React Context providers
│   └── AuthContext.jsx
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   └── useGeolocation.js
├── pages/               # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── WorkerProfile.jsx
│   └── EmployeeDashboard.jsx
├── services/            # API services
│   └── api.js
├── App.jsx              # Main app with routing
└── main.jsx             # Entry point
```

## 👨‍💻 Development

### Start Development Server
```bash
npm run dev
```

### Running in Production Mode
```bash
npm run build
npm run preview
```

## 🏗️ Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **AWS S3**: Upload `dist/` contents
- **Docker**: Build with included Dockerfile

## 📚 Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [FRONTEND_STRUCTURE.md](./FRONTEND_STRUCTURE.md) - Detailed structure
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - API reference
- [ENV_SETUP.md](./ENV_SETUP.md) - Environment setup
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Implementation details

## 🆘 Troubleshooting

### Components not rendering?
- Ensure AuthProvider wraps the app
- Verify routes are configured correctly
- Check browser console for errors

### API calls failing?
- Backend must be running
- Check VITE_API_BASE_URL in .env
- Verify token is sent in headers
- Check backend CORS configuration

### Styling issues?
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R)
- Restart dev server

## 📊 Project Statistics

- **Components**: 3 (Navbar, Card, Button)
- **Pages**: 4 (Home, Login, WorkerProfile, EmployeeDashboard)
- **Hooks**: 2 (useAuth, useGeolocation)
- **Build Size**: ~15KB CSS + ~93KB JS (gzipped)
- **Total Files**: 30+

## 🚀 Performance

- Fast initial load
- Efficient component rendering
- Optimized CSS and JavaScript
- Production build optimizations

---

**Version**: 1.0.0  
**Status**: ✅ Ready for Development  
**Last Updated**: January 2026

For detailed information, please refer to the documentation files listed above.

**Happy coding! 🎉**
<<<<<<
=======
>>>>>>> 7b998c4bf8830d11e446f79e1aad3bba7f2d9861
