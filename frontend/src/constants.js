// It's generally better to manage API endpoints via environment variables,
// especially when deploying. Create React App requires env vars to be prefixed
// with REACT_APP_. You would set these in a .env file in the frontend root.
// Example .env file:
// REACT_APP_API_BASE_URL=/api
// REACT_APP_PRODUCTS_URL=/api/products
// REACT_APP_USERS_URL=/api/users
// REACT_APP_ORDERS_URL=/api/orders
// REACT_APP_PAYPAL_URL=/api/config/paypal

// Using environment variables (Recommended approach):
// export const BASE_URL = process.env.REACT_APP_API_BASE_URL || ''; // Use empty string as default in development if proxy is set up
// export const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL || '/api/products';
// export const USERS_URL = process.env.REACT_APP_USERS_URL || '/api/users';
// export const ORDERS_URL = process.env.REACT_APP_ORDERS_URL || '/api/orders';
// export const PAYPAL_URL = process.env.REACT_APP_PAYPAL_URL || '/api/config/paypal';

// --- Current Hardcoded Approach (Less flexible) ---
// If you are using the proxy setting in package.json during development,
// these relative paths will work. For production builds, ensure your web server
// correctly proxies requests to the backend API.
export const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : ''; // Use localhost for development, empty for production (where proxy is set up)
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';

//export const UPLOAD_URL = '/api/upload';