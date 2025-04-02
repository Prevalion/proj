import { createSlice } from '@reduxjs/toolkit';

// Helper function to check if a token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    // Decode the token (simple decode, not verifying signature)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    
    const { exp } = JSON.parse(jsonPayload);
    // Check if token is expired
    return exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

// Load user info from localStorage and validate token
const loadUserInfo = () => {
  const userInfoStr = localStorage.getItem('userInfo');
  if (!userInfoStr) return null;
  
  try {
    const userInfo = JSON.parse(userInfoStr);
    // If token exists and is not expired, return user info
    if (userInfo && userInfo.token && !isTokenExpired(userInfo.token)) {
      return userInfo;
    }
    // Otherwise clear localStorage
    localStorage.removeItem('userInfo');
    return null;
  } catch (error) {
    localStorage.removeItem('userInfo');
    return null;
  }
};

const initialState = {
  userInfo: loadUserInfo(),
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      localStorage.removeItem('userInfo');
    },
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    authSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    authFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
});

export const { 
  setCredentials, 
  clearCredentials, 
  logout, 
  authRequest, 
  authSuccess, 
  authFail,
  resetAuth
} = authSlice.actions;

export default authSlice.reducer;