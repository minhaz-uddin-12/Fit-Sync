import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { sql } from 'drizzle-orm';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import workoutRoutes from './routes/workouts.js';
import bookingRoutes from './routes/bookings.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initDb, closeDb } from './db/index.js';
import { seedDefaults } from './scripts/seed.js';

const isVercel = Boolean(process.env.VERCEL);

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not set. Copy server/.env.example to server/.env and fill it in.');
  if (!isVercel) process.exit(1);
}

const app = express();

const allowedOrigins = [
  ...(process.env.CLIENT_URL || '').split(',').map(o => o.trim().replace(/\/$/, '')).filter(Boolean),
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

// Behind Vercel's proxy the client IP comes from X-Forwarded-For (needed for rate limiting)
app.set('trust proxy', 1);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '100kb' }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FitSync API' });
});

// Connect lazily so serverless cold starts only open the pool when needed
app.use(async (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ status: 'error', message: 'Server is missing JWT_SECRET' });
  }
  try {
    await initDb();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/health', async (req, res) => {
  const { db } = await import('./db/index.js');
  await db.execute(sql`select 1`);
  res.json({ status: 'ok', database: 'connected' });
});

app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Resource not found' });
});

app.use(errorHandler);

// Vercel imports the default export; locally we listen on a port
export default app;

if (!isVercel) {
  try {
    await initDb();
    const { dbMode } = await import('./db/index.js');
    console.log(`🐘 Database connected (${dbMode === 'embedded' ? 'embedded PGlite in server/.data' : 'PostgreSQL'})`);
    if (process.env.NODE_ENV !== 'production') await seedDefaults();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });

  const shutdown = async () => {
    server.close();
    await closeDb();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
