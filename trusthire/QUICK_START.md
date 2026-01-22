# TrustHire Frontend - Quick Start Guide

## ✅ What's Been Created

### UI Components
- ✅ **Navbar** - Navigation with user authentication status and role-based links
- ✅ **Card** - Reusable card component with multiple variants and styling
- ✅ **Button** - Button component with variants, sizes, and states

### Pages
- ✅ **Home** - Landing page with job listings, search, filters, and geolocation
- ✅ **Login** - Combined login/signup with role selection (Worker/Employer)
- ✅ **WorkerProfile** - Worker profile with edit functionality and skills management
- ✅ **EmployeeDashboard** - Employer dashboard with statistics and job management

### Hooks
- ✅ **useAuth** - Authentication hook for managing user state
- ✅ **useGeolocation** - Geolocation hook for location-based services

### Services
- ✅ **API Service** - Axios-based API client with interceptors
- ✅ Complete service methods for:
  - Authentication (register, login, logout, validate)
  - Workers (profile, jobs, applications, location)
  - Employers (profile, jobs, applications, statistics)
  - Jobs (search, filter, details)
  - Reviews (get, add, update)

### Context
- ✅ **AuthContext** - Global authentication state management

## 🚀 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

This will install:
- react-router-dom (for routing)
- axios (for API calls)

### 2. Create Environment File
```bash
cp .env.example .env
```

Then update `.env` with your backend API URL:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📖 File Structure Created

```
src/
├── components/
│   ├── Navbar.jsx & Navbar.css
│   ├── Card.jsx & Card.css
│   ├── Button.jsx & Button.css
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useGeolocation.js
├── pages/
│   ├── Home.jsx & Home.css
│   ├── Login.jsx & Login.css
│   ├── WorkerProfile.jsx & WorkerProfile.css
│   └── EmployeeDashboard.jsx & EmployeeDashboard.css
├── services/
│   └── api.js
├── App.jsx (Updated with routing)
├── App.css (Global styles)
└── index.css (Updated base styles)
```

## 🔗 Routing Configuration

| Route | Component | Protection | Allowed Roles |
|-------|-----------|------------|---------------|
| `/` | Home | None | Everyone |
| `/login` | Login | None | Everyone |
| `/worker-profile` | WorkerProfile | Protected | Worker only |
| `/employee-dashboard` | EmployeeDashboard | Protected | Employer only |

## 🎯 Key Features

### Authentication Flow
1. User signs up/logs in
2. JWT token stored in localStorage
3. Token automatically added to API requests
4. Invalid tokens redirect to login
5. Role-based page access control

### API Integration
- Base URL configured via environment variable
- Automatic token attachment to requests
- Error interceptors for 401 handling
- Pre-built service methods for common operations

### Geolocation
- Get user's current location
- Watch location for real-time updates
- Error handling and accuracy tracking

### Responsive Design
- Mobile-first approach
- Breakpoints: Desktop (>768px), Tablet (768px), Mobile (<480px)
- All components mobile responsive

## 💡 Usage Examples

### Using Authentication
```javascript
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  if (!user) return <p>Not logged in</p>;
  return <p>Welcome, {user.name}</p>;
}
```

### Using API Services
```javascript
import { workerService } from './services/api';

async function fetchProfile() {
  try {
    const response = await workerService.getProfile();
    console.log(response.data);
  } catch (error) {
    console.error('Failed to fetch profile', error);
  }
}
```

### Using Geolocation
```javascript
import { useGeolocation } from './hooks/useGeolocation';

function LocationComponent() {
  const { location, getLocation, error } = useGeolocation();
  
  return (
    <div>
      <button onClick={getLocation}>Get Location</button>
      {location && <p>Lat: {location.latitude}, Lng: {location.longitude}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

## 🎨 Component Usage Examples

### Button Component
```javascript
<Button variant="primary" size="large" fullWidth disabled={false}>
  Click Me
</Button>
```

### Card Component
```javascript
<Card 
  title="My Card"
  description="Card description"
  image="image.jpg"
  variant="success"
>
  Card content goes here
</Card>
```

## 🔒 Protected Routes

Routes are automatically protected based on user role:
```javascript
<Route
  path="/worker-profile"
  element={
    <ProtectedRoute requiredRole="worker">
      <WorkerProfile />
    </ProtectedRoute>
  }
/>
```

Attempting to access without proper role will redirect to home.

## 🌐 Backend API Integration

The application expects the following backend endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/validate` - Validate token
- `POST /auth/logout` - Logout user

### Worker Endpoints
- `GET /workers/profile` - Get worker profile
- `PUT /workers/profile` - Update profile
- `GET /workers/jobs` - Get available jobs
- `POST /workers/jobs/{jobId}/apply` - Apply for job

### Employer Endpoints
- `POST /employers/jobs` - Create job
- `GET /employers/jobs` - Get employer's jobs
- `PUT /employers/jobs/{jobId}` - Update job
- `DELETE /employers/jobs/{jobId}` - Delete job
- `GET /employers/dashboard/stats` - Get statistics

## 📋 Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Other optional variables you can add:
```env
VITE_APP_NAME=TrustHire
VITE_VERSION=1.0.0
```

## 🛠️ Common Tasks

### Add a New Page
1. Create `NewPage.jsx` in `src/pages/`
2. Create `NewPage.css` for styling
3. Add route in `App.jsx`:
```javascript
<Route path="/new-page" element={<NewPage />} />
```

### Add a New API Service
1. Add method in `src/services/api.js`:
```javascript
export const myService = {
  getData: () => api.get('/endpoint'),
  postData: (data) => api.post('/endpoint', data),
};
```

### Add Global State
1. Create new context in `src/context/`
2. Wrap app with provider in `App.jsx`
3. Create custom hook to use context

## 🧪 Testing

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🆘 Troubleshooting

### Components not rendering?
- Check if AuthProvider wraps the app
- Verify routes are correctly configured
- Check browser console for errors

### API calls failing?
- Ensure backend is running
- Check VITE_API_BASE_URL in `.env`
- Verify token is being sent in headers
- Check CORS configuration on backend

### Styling issues?
- Clear browser cache
- Verify CSS files are imported
- Check for CSS conflicts
- Use browser DevTools to inspect

### Login not working?
- Verify backend endpoint returns correct format
- Check localStorage for token storage
- Verify JWT structure
- Check token validation on backend

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

When adding new features:
1. Follow existing code structure
2. Create reusable components
3. Add proper error handling
4. Include responsive design
5. Update this documentation

## 📄 License

This project is part of TrustHire - Blue Collar Platform

---

**Happy coding! 🚀**

For more detailed information, see `FRONTEND_STRUCTURE.md`
