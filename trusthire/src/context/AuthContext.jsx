import React, { createContext, useState, useEffect } from 'react';
import { validateToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin', 'worker', 'employer'

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      if (token && role) {
        try {
          const userData = await validateToken(token);
          setUser(userData);
          setUserRole(role);
        } catch (err) {
          console.error('Token validation failed:', err);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData, token, role = 'worker') => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    setUser(userData);
    setUserRole(role);
    setError(null);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setUser(null);
    setUserRole(null);
  };

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading,
        error,
        setError,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
