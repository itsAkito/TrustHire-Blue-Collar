import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import RoleSelection from './pages/RoleSelection';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import LoginWorker from './pages/LoginWorker';
import LoginEmployer from './pages/LoginEmployer';
import WorkerSignup from './pages/WorkerSignup';
import EmployerSignup from './pages/EmployerSignup';
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
          <Route path="/login" element={<Login />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-worker" element={<LoginWorker />} />
          <Route path="/login-employer" element={<LoginEmployer />} />
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
              <ProtectedRoute requiredRole="employer">
                <EmployeeDashboard />
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
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
