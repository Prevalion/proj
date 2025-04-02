import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authUtils';
import Loader from './Loader';

/**
 * Protects routes that require authentication
 * @param {ReactNode} children - Child components to render when authenticated
 * @param {boolean} adminOnly - Whether the route is for admins only
 * @returns {ReactNode} - Protected route
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading, verifyToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Verify token when route changes
    verifyToken();
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect admin-only routes to home if user is not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; 