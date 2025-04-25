import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import workoutRoutes from './routes/workouts.js';
import bookingRoutes from './routes/bookings.js';
import { errorHandler } from './middleware/errorHandler.js';
import { getConnectionOptions } from './config/db.js';

dotenv.config();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Vite's default port
  credentials: true
}));
app.use(express.json());

// Root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FitSync API' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes with /api prefix
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 handler - More reliable catch-all pattern
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling
app.use(errorHandler);

// Enhanced database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, getConnectionOptions());
    console.log('🚀 MongoDB Connected Successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    return false;
  }
};

// Start server only after DB connection
const startServer = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`
🚀 Server running on port ${PORT}
📍 Local: http://localhost:${PORT}
🔋 Database Status: Connected
    `);
  });
};

startServer();
