import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './components/AlertContainer';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import RoleSelection from './pages/RoleSelection';
import UnifiedLogin from './pages/UnifiedLogin';
import LoginAdmin from './pages/LoginAdmin';
import LoginWorker from './pages/LoginWorker';
import LoginEmployer from './pages/LoginEmployer';
import UserSignup from './pages/UserSignup';
import WorkerSignup from './pages/WorkerSignup';
import EmployerSignup from './pages/EmployerSignup';
import AdminLogin from './pages/AdminLogin';
import WorkerProfile from './pages/WorkerProfile';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Loading...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Unified Login with Automatic Role Detection */}
          <Route path="/login" element={<UnifiedLogin />} />
          
          {/* Separate Admin Login (Secure/Independent) */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Other Logins */}
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-worker" element={<LoginWorker />} />
          <Route path="/login-employer" element={<LoginEmployer />} />
          
          {/* Signup Routes */}
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/worker-signup" element={<WorkerSignup />} />
          <Route path="/employer-signup" element={<EmployerSignup />} />
          
          <Route
            path="/user-home"
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/worker-profile"
            element={
              <ProtectedRoute requiredRole="worker">
                <WorkerProfile />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/employee-dashboard"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/worker-dashboard"
            element={
              <ProtectedRoute requiredRole="worker">
                <WorkerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AlertProvider>
          <AppContent />
        </AlertProvider>
      </AuthProvider>
    </Router>
  );
}
