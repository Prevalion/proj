import pino from 'pino';

// Configure Pino logger
// In development, use pino-pretty for human-readable logs
// In production, use standard JSON format for log aggregation tools
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true, // Colorize output
            translateTime: 'SYS:standard', // Use system time format
            ignore: 'pid,hostname', // Ignore pid and hostname
          },
        }
      : undefined, // Use default JSON transport in production
});

export default logger;
