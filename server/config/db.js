/* DATABASE DEVELOPER
 * Responsible for:
 * - Database configuration
 * - Connection management
 * - Performance monitoring
 * - Backup strategy
 */

import mongoose from 'mongoose';

export const getConnectionOptions = () => ({
  retryWrites: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
});

// Basic connection monitoring
mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
