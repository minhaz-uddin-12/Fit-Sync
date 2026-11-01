// Applies pending migrations to DATABASE_URL, then seeds default accounts.
// Runs as the Vercel build step (see vercel.json) and can be run manually:
//   npm run db:migrate

import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { initDb, closeDb, MIGRATIONS_DIR } from '../db/index.js';
import { seedDefaults } from './seed.js';

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Local development migrates the embedded database automatically on startup.');
  process.exit(1);
}

try {
  const db = await initDb();
  await migrate(db, { migrationsFolder: MIGRATIONS_DIR });
  console.log('✅ Migrations applied');
  await seedDefaults({ production: process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL) });
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await closeDb();
}
