import logger from '../utils/logger.js'; // Import the shared logger

// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next error handler
};

// General error handling middleware
// This should be the last middleware used
const errorHandler = (err, req, res, next) => {
  // Determine the status code: use the response status code if it's already set and not 200, otherwise default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose specific error handling
  // Check for Mongoose bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404; // Treat invalid IDs as Not Found
    message = 'Resource not found';
  }

  // Mongoose validation error (ValidationError)
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    // Combine multiple validation error messages if they exist
    const errors = Object.values(err.errors).map((el) => el.message);
    message = `Invalid input data: ${errors.join('. ')}`;
  }

  // Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = 400; // Bad Request
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered for: ${field}. Please use another value.`;
  }

  // Log the error using Pino logger
  // Log the full error in development for debugging, less detail in production
  logger.error(
    {
      err: {
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'omitted' : err.stack,
        name: err.name,
        code: err.code, // Include error code if available
      },
      statusCode,
      request: {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
      },
    },
    'Error handled by errorHandler middleware'
  );


  // Send the error response to the client
  res.status(statusCode).json({
    message: message,
    // Include stack trace only in development environment
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
