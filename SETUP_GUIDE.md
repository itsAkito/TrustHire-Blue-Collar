# TrustHire - Full Stack Blue Collar Job Platform

A comprehensive platform connecting skilled blue-collar workers with employers seeking their expertise.

## 📁 Project Structure

```
TrustHire-Blue Collar Plateform/
├── trusthire/              # Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React Context providers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                 # Backend (Node.js + Express)
    ├── src/
    │   ├── config/         # Database & constants
    │   ├── models/         # Database models
    │   ├── controllers/    # Business logic
    │   ├── routes/         # API routes
    │   ├── middleware/     # Custom middleware
    │   └── index.js        # Main server file
    ├── .env.example
    ├── package.json
    └── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ and npm/yarn
- PostgreSQL 12+
- Git

### Frontend Setup

```bash
cd trusthire

# Install dependencies
npm install

# Create .env file (optional, uses defaults)
# Update Tailwind CSS configuration if needed

# Start development server
npm run dev
# Frontend will be available at http://localhost:5174

# Build for production
npm run build
```

### Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Configure database connection in .env:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=trusthire_db
# DB_USER=postgres
# DB_PASSWORD=your_password

# Start development server
npm run dev
# Backend will be available at http://localhost:5000
```

### Database Setup

1. **Create PostgreSQL Database**:
```sql
CREATE DATABASE trusthire_db;
```

2. **Backend will auto-sync models** on startup with `sequelize.sync({ alter: true })`

## 🏗️ Technology Stack

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router 7.0.0
- **HTTP Client**: Axios 1.6.0
- **Authentication**: JWT-based with Context API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: PostgreSQL 12+
- **ORM**: Sequelize 6.35.2
- **Authentication**: JWT (jsonwebtoken 9.1.2)
- **Validation**: Joi 17.11.0
- **Password Hashing**: bcryptjs 2.4.3
- **File Upload**: Multer 1.4.5

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Worker APIs
- `GET /api/workers/profile` - Get worker profile
- `PUT /api/workers/profile` - Update profile
- `GET /api/workers/jobs` - Browse available jobs
- `POST /api/workers/jobs/:jobId/apply` - Apply for job
- `GET /api/workers/applications` - View applications

### Employer APIs
- `GET /api/employers/dashboard` - Dashboard statistics
- `POST /api/jobs` - Create job posting
- `GET /api/employers/jobs` - List employer's jobs
- `PUT /api/jobs/:jobId` - Update job
- `DELETE /api/jobs/:jobId` - Delete job
- `GET /api/employers/applications` - View applications received

### Job Listings
- `GET /api/jobs` - Get all jobs with filters
- `POST /api/applications/:jobId` - Submit application
- `PUT /api/applications/:applicationId/withdraw` - Withdraw application

## 🔑 Environment Variables

### Frontend (.env optional)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env required)
```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=trusthire_db
DB_USER=postgres
DB_PASSWORD=your_password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5174

# Cloud Storage (optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🎨 Frontend Components

### Pages
- **Home** - Landing page with job listing
- **Login** - Combined login/signup form
- **WorkerProfile** - Worker profile management
- **EmployeeDashboard** - Employer dashboard with statistics

### Components
- **Navbar** - Navigation bar with auth state
- **Card** - Reusable card component
- **Button** - Reusable button component with variants

### Hooks
- **useAuth** - Authentication hook
- **useGeolocation** - Geolocation tracking

## 🗄️ Database Schema

### Users Table
- id (UUID, PK)
- name, email, password
- phone, role (worker/employer)
- profilePhoto, bio, skills, experience, rating
- verified, createdAt, updatedAt

### Jobs Table
- id (UUID, PK)
- employerId (FK to Users)
- title, description, location, salary
- jobType, requirements, isActive
- createdAt, updatedAt

### Applications Table
- id (UUID, PK)
- jobId (FK to Jobs), workerId (FK to Users)
- status (pending/accepted/rejected/withdrawn)
- appliedAt, respondedAt

### Reviews Table
- id (UUID, PK)
- reviewerId, revieweeId (FK to Users)
- jobId (FK to Jobs)
- rating (1-5), comment
- createdAt

## 🔐 Authentication Flow

1. User registers with email/password and role selection
2. Password is hashed with bcryptjs
3. JWT token issued upon successful login
4. Token stored in localStorage on frontend
5. Token sent in Authorization header for protected routes
6. Backend validates token and extracts user info

## 🌐 Frontend Pages Detailed

### Home Page
- Hero section with call-to-action
- Job search with filters (title, location, type)
- Geolocation support for nearby jobs
- Job grid with apply button
- Features section for unauthenticated users

### Login Page
- Toggle between login/signup modes
- Role selection (worker/employer)
- Form validation
- Error message display
- JWT token management

### Worker Profile
- View/edit profile information
- Skills management (comma-separated)
- Experience tracking
- Rating display
- Bio section

### Employer Dashboard
- Tabbed interface (Overview, Jobs, Applications)
- Dashboard statistics
- Job creation form
- Job management
- Application management

## 📱 Responsive Design

All pages are fully responsive with Tailwind CSS breakpoints:
- Mobile: < 640px (sm)
- Tablet: 768px and up (md)
- Desktop: 1024px and up (lg)
- Large Desktop: 1280px and up (xl)

## 🔄 State Management

- **Global Auth State**: React Context API (AuthContext)
- **Component State**: React useState hook
- **API Calls**: Axios with async/await

## 🛡️ Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token-based authentication
- Role-based authorization (middleware)
- Input validation with Joi
- CORS enabled only for trusted origins
- Secure password requirements

## 📦 Build & Deployment

### Frontend Build
```bash
npm run build
# Outputs to dist/ folder
# Optimize for production with minification
```

### Backend Deployment
```bash
# Ensure .env is configured
# Set NODE_ENV=production
npm start
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Frontend tries alternate ports (5174, 5175, etc.)
# Backend: Change PORT in .env if 5000 is used
```

### Database Connection Error
- Verify PostgreSQL is running
- Check DB credentials in .env
- Ensure database exists

### CORS Issues
- Verify FRONTEND_URL in backend .env
- Check if frontend URL matches the request origin

## 🚀 Performance Optimizations

- Lazy loading of components
- Vite for fast development and optimized builds
- Tailwind CSS purging unused styles
- Database connection pooling
- JWT token caching

## 📝 Development Guidelines

1. Use Tailwind CSS classes for styling (no additional CSS files)
2. Follow component-based architecture
3. Keep API calls in services layer
4. Use hooks for reusable logic
5. Maintain RESTful API structure
6. Validate all inputs server-side and client-side

## 🎯 Next Steps

1. Set up local development environment
2. Configure PostgreSQL database
3. Create .env files with proper credentials
4. Install dependencies for both frontend and backend
5. Start both dev servers
6. Access frontend at http://localhost:5174
7. API available at http://localhost:5000

## 📄 License

MIT License - Feel free to use for your projects

---

**Happy Coding! 🎉**
