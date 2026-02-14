import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSuccess, showError } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          password, 
          role: 'admin' 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Verify user is actually an admin
      if (data.user.role !== 'admin') {
        throw new Error('Access Denied: Admin credentials required');
      }

      login(data.user, data.token, 'admin');
      showSuccess('Admin login successful!');
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message);
      showError(err.message, 'Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Animated Background */}
      <div className="admin-background">
        <div className="admin-blob admin-blob-1"></div>
        <div className="admin-blob admin-blob-2"></div>
        <div className="admin-blob admin-blob-3"></div>
      </div>

      {/* Login Card */}
      <div className="admin-login-card">
        <div className="admin-header">
          <div className="admin-icon-wrapper">
            <Shield className="admin-icon" />
          </div>
          <h1>🔐 Admin Portal</h1>
          <p>Secure Administrator Access Only</p>
        </div>

        {error && (
          <div className="admin-error-alert">
            <AlertCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Admin Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="admin@trusthire.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter admin password"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="admin-login-btn"
          >
            {loading ? (
              <>
                <Loader className="spinner" />
                <span>Verifying Admin Credentials...</span>
              </>
            ) : (
              <>
                <Shield style={{ width: '20px', height: '20px' }} />
                <span>Access Admin Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="notice-badge">🔒 Secure Connection</div>
          <p>This portal is restricted to authorized administrators only.</p>
          <p>All login attempts are logged and monitored.</p>
        </div>

        <div className="admin-footer">
          <p><a href="/role-selection">← Back to Role Selection</a></p>
        </div>
      </div>

      {/* Security Footer */}
      <div className="admin-security-footer">
        <span>🛡️ Enterprise-Grade Security</span>
        <span>|</span>
        <span>⏱️ Session Timeout: 30 minutes</span>
      </div>
    </div>
  );
};

export default AdminLogin;
