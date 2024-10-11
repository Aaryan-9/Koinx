import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config();
const logger = new Logger('DatabaseConnection');
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.log('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB', error);
  }
};
