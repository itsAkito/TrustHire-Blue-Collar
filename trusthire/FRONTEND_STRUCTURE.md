# TrustHire Frontend - Component & Structure Documentation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar with user menu
│   ├── Navbar.css
│   ├── Card.jsx        # Reusable card component
│   ├── Card.css
│   ├── Button.jsx      # Reusable button component
│   └── Button.css
│
├── context/            # React context for state management
│   └── AuthContext.jsx # Authentication context provider
│
├── hooks/             # Custom React hooks
│   ├── useAuth.js     # Hook for accessing auth context
│   └── useGeolocation.js  # Hook for geolocation services
│
├── pages/             # Page components
│   ├── Home.jsx       # Landing/home page with job listings
│   ├── Home.css
│   ├── Login.jsx      # Login/signup page
│   ├── Login.css
│   ├── WorkerProfile.jsx  # Worker profile page
│   ├── WorkerProfile.css
│   ├── EmployeeDashboard.jsx  # Employer dashboard
│   └── EmployeeDashboard.css
│
├── services/          # API services
│   └── api.js        # Axios API client & service methods
│
├── App.jsx           # Main app component with routing
├── App.css
├── main.jsx
├── index.css
└── vite.config.js
```

## 🎨 Components Overview

### Navbar
- Sticky navigation bar
- User authentication status display
- Dynamic role-based navigation
- Logout functionality
- Responsive design

### Card
- Reusable card component
- Supports multiple variants (default, success, warning, danger, info)
- Image support
- Flexible content structure
- Hover effects

### Button
- Multiple variants: primary, secondary, success, danger, warning, outline
- Three sizes: small, medium, large
- Full-width option
- Disabled state
- Loading animation support

## 📄 Pages Overview

### Home Page
- Hero section for non-authenticated users
- Job search and filtering
- Geolocation integration
- Job listings in grid format
- Features section
- Mobile responsive

### Login Page
- Combined login/signup form
- Role selection (Worker/Employer)
- Form validation
- Error handling
- Toggle between login and signup modes
- Gradient background design

### Worker Profile Page
- View worker information
- Edit profile functionality
- Skills management
- Experience tracking
- Bio section
- Rating display
- Responsive layout

### Employee Dashboard
- Dashboard overview with statistics
- Job management
- Create new job postings
- View applications
- Job deletion
- Tabbed interface
- Real-time stats

## 🔧 Hooks

### useAuth
```javascript
const { user, login, logout, updateUser, loading, error } = useAuth();
```
- Provides authentication state and methods
- Manages user data
- Token validation

### useGeolocation
```javascript
const { location, error, loading, getLocation, watchLocation } = useGeolocation();
```
- Get current user location
- Watch for location changes
- Error handling
- Accuracy information

## 📡 API Services

### Authentication Services
- `register()` - Create new account
- `login()` - User login
- `validateToken()` - Token validation
- `logout()` - User logout

### Worker Services
- `getProfile()` - Get worker profile
- `updateProfile()` - Update profile
- `getAvailableJobs()` - Fetch available jobs
- `applyForJob()` - Apply for a job
- `getApplications()` - Get job applications
- `updateLocation()` - Update worker location
- `searchJobs()` - Search for jobs

### Employer Services
- `getProfile()` - Get employer profile
- `updateProfile()` - Update profile
- `createJob()` - Create new job posting
- `getJobs()` - Get all posted jobs
- `updateJob()` - Update job details
- `deleteJob()` - Delete job posting
- `getApplications()` - Get job applications
- `reviewApplication()` - Review/approve applications
- `getDashboardStats()` - Get dashboard statistics

### Job Services
- `getAllJobs()` - Get all jobs with filters
- `getJobDetails()` - Get single job details
- `searchJobs()` - Search jobs

### Review Services
- `getWorkerReviews()` - Get worker reviews
- `getEmployerReviews()` - Get employer reviews
- `addReview()` - Add new review
- `updateReview()` - Update existing review

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd trusthire
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.example .env
```

4. Update `.env` with your backend API URL
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🎨 Styling

- Global CSS variables in `App.css`
- Component-specific styles in separate CSS files
- Responsive design with media queries
- Color scheme:
  - Primary: #3498db
  - Secondary: #2c3e50
  - Success: #27ae60
  - Danger: #e74c3c
  - Warning: #f39c12

## 🔐 Authentication Flow

1. User navigates to Login page
2. Chooses role (Worker/Employer)
3. Fills registration/login form
4. Backend returns JWT token
5. Token stored in localStorage
6. AuthContext updated with user data
7. Protected routes validate user role

## 🗺️ Routing

- `/` - Home page
- `/login` - Login/Signup page
- `/worker-profile` - Worker profile (protected, worker only)
- `/employee-dashboard` - Employer dashboard (protected, employer only)

## 📱 Responsive Breakpoints

- Desktop: > 768px
- Tablet: 768px
- Mobile: < 480px

## 🐛 Error Handling

- API interceptors handle 401 errors (redirect to login)
- Form validation errors displayed
- Error messages with styling
- Success notifications

## 🔄 State Management

- AuthContext for global authentication state
- Component-level state for forms and UI
- localStorage for token persistence

## 🚧 Future Enhancements

- Add pagination for job listings
- Implement notifications/alerts system
- Add payment integration
- Implement chat functionality
- Add advanced filters
- Analytics dashboard
- Mobile app version

---

For more information or issues, please refer to the main project README.
