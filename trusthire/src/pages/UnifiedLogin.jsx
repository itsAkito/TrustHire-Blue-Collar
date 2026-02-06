import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import '../styles/UnifiedLogin.css';

const UnifiedLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [emailFocused, setEmailFocused] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Track mouse movement for background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Automatic role detection from backend response
      const { user, token } = data;
      const userRole = user.role; // 'worker', 'user', or 'admin'

      // Store authentication
      login(user, token, userRole);

      // Redirect based on detected role
      const dashboardRoutes = {
        worker: '/worker-dashboard',
        user: '/employee-dashboard',
        employer: '/employee-dashboard',
        admin: '/admin-dashboard',
      };

      const redirectPath = dashboardRoutes[userRole] || '/';
      navigate(redirectPath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="unified-login-container"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
      }}
    >
      {/* Animated gradient mesh background */}
      <div className="gradient-mesh">
        <div className="mesh-blob mesh-blob-1"></div>
        <div className="mesh-blob mesh-blob-2"></div>
        <div className="mesh-blob mesh-blob-3"></div>
      </div>

      <div className="login-card-wrapper">
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <h1>🔐 TrustHire Login</h1>
            <p>Automatic Role Detection - Login Once, Access Everything</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="error-alert">
              <AlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Field with Glow */}
            <div className="form-group">
              <label>Email Address</label>
              <div className={`input-wrapper ${emailFocused ? 'focused' : ''}`}>
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="Enter your email"
                  required
                  className="email-input"
                />
              </div>
              <small className="field-hint">
                Worker, Regular User, or Admin - all use this login
              </small>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="password-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? (
                <>
                  <Loader className="spinner" />
                  <span>Detecting role & logging in...</span>
                </>
              ) : (
                <span>Login with Role Detection</span>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="info-box">
            <h4>✨ Automatic Role Detection</h4>
            <ul>
              <li>🪛 Worker? → Redirected to Worker Dashboard</li>
              <li>👔 Employer? → Redirected to Employer Dashboard</li>
              <li>⚙️ Admin? → Redirected to Admin Panel</li>
            </ul>
          </div>

          {/* Footer Links */}
          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="footer-link">
                Sign up here
              </a>
            </p>
            <p>
              <a href="#" className="footer-link">
                Forgot password?
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;
