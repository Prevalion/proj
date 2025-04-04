import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet'; // Security headers
import rateLimit from 'express-rate-limit'; // Basic rate limiting
import mongoSanitize from 'express-mongo-sanitize'; // NoSQL injection protection
import xss from 'xss-clean'; // Basic XSS protection
import pinoHttp from 'pino-http'; // Request logging

import connectDB from './config/db.js';
import logger from './utils/logger.js'; // Import the shared logger
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// --- Security Middleware ---
// Set various security HTTP headers
app.use(helmet());

// Prevent NoSQL query injection
app.use(mongoSanitize());

// Prevent basic XSS attacks (sanitizes req.body, req.query, req.params)
app.use(xss());

// Rate limiting - apply to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter); // Apply limiter only to API routes

// --- Core Middleware ---
// Enable CORS - configure origins properly in production
app.use(cors({
  // origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Example: restrict to frontend URL
  credentials: true, // Allow cookies
}));

// Body parser middleware (JSON and URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// HTTP Request Logger Middleware (using Pino)
// Logs request details like method, url, status code, response time
app.use(pinoHttp({ logger }));

// --- Routes ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// --- PayPal Route ---
// Keep PayPal client ID accessible on the backend
app.get('/api/config/paypal', (req, res) => {
  if (!process.env.PAYPAL_CLIENT_ID) {
    logger.error('PayPal Client ID not configured in environment variables.');
    return res.status(500).send('Server configuration error');
  }
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// --- Error Handling Middleware ---
// Custom middleware for 404 Not Found errors
app.use(notFound);
// Custom middleware for handling other errors
app.use(errorHandler);

// Start the server
app.listen(port, () =>
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
