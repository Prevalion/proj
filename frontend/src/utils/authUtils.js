import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useVerifyTokenQuery, 
  useLogoutMutation 
} from '../slices/usersApiSlice';
import { 
  logout, 
  setCredentials
} from '../slices/authSlice';

/**
 * Custom hook to manage authentication state
 * - Verifies token on mount
 * - Provides authentication status
 * - Provides logout capability
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  
  // Skip verification if no user info exists
  const shouldVerify = Boolean(userInfo);
  
  // Verify token on component mount if user is logged in
  const { 
    data, 
    isLoading: verifying, 
    error: verifyError, 
    refetch 
  } = useVerifyTokenQuery(undefined, {
    skip: !shouldVerify,
  });
  
  const [logoutApiCall] = useLogoutMutation();
  
  const handleLogout = useCallback(async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
    } catch (err) {
      dispatch(logout());
    }
  }, [logoutApiCall, dispatch]);
  
  useEffect(() => {
    // Handle token verification results
    if (shouldVerify && !verifying) {
      if (verifyError) {
        // Token verification failed - logout user
        handleLogout();
      } else if (data) {
        // Token is valid, update user info if needed
        dispatch(setCredentials({ ...data }));
      }
    }
  }, [dispatch, handleLogout, data, shouldVerify, verifyError, verifying]);
  
  return {
    userInfo,
    isAuthenticated: Boolean(userInfo),
    isAdmin: userInfo?.isAdmin || false,
    loading: verifying,
    logout: handleLogout,
    verifyToken: refetch,
  };
}; 