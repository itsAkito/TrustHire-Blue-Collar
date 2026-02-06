import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * useRoleDetection Hook
 * Automatically detects user role and redirects to appropriate dashboard
 */
export const useRoleDetection = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user && userRole) {
      const dashboardRoutes = {
        worker: '/worker-dashboard',
        user: '/employee-dashboard',
        employer: '/employee-dashboard',
        admin: '/admin-dashboard',
      };

      const redirectPath = dashboardRoutes[userRole];
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, userRole, navigate]);

  return { user, userRole };
};

export default useRoleDetection;
