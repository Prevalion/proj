// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import promClient from 'prom-client';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).send(`Error generating metrics: ${error.message}`);
  }
});

// Setup Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

register.registerMetric(httpRequestDurationMicroseconds);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:3050', 'http://frontend:3000'];
app.use(cors({ 
  origin: allowedOrigins,
  credentials: true
}));

// Middleware to record request duration
app.use((req, res, next) => {
  if (process.env.ENABLE_METRICS === 'true') {
    const end = httpRequestDurationMicroseconds.startTimer();
    res.on('finish', () => {
      end({ 
        method: req.method, 
        route: req.originalUrl, 
        status_code: res.statusCode 
      });
    });
  }
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Static file serving
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
 
  // Any route that is not API will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));