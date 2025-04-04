import mongoose from 'mongoose';
import logger from '../utils/logger.js'; // Import the shared logger

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      logger.error('MONGO_URI not defined in environment variables.');
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
