/* DATABASE DEVELOPER
 * Connection management.
 * - DATABASE_URL set   → PostgreSQL (Neon in production) via node-postgres
 * - DATABASE_URL empty → embedded PGlite in server/.data/pglite (development only)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const MIGRATIONS_DIR = path.join(__dirname, '..', 'drizzle');

// Live binding: route modules read `db` after initDb() has resolved
export let db;
export let dbMode;
let pool;
let pglite;
let initPromise;

const connectPostgres = () => {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    max: process.env.VERCEL ? 3 : 10,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000
  });
  pool.on('error', (err) => console.error('Postgres pool error:', err.message));
  db = drizzle({ client: pool, schema });
  dbMode = 'postgres';
};

const connectEmbedded = async () => {
  const { PGlite } = await import('@electric-sql/pglite');
  const { drizzle: drizzleLite } = await import('drizzle-orm/pglite');
  const { migrate } = await import('drizzle-orm/pglite/migrator');

  const dataDir = path.join(__dirname, '..', '.data', 'pglite');
  fs.mkdirSync(dataDir, { recursive: true });
  pglite = new PGlite(dataDir);
  db = drizzleLite({ client: pglite, schema });
  dbMode = 'embedded';

  // Keep the local database in step with the schema
  await migrate(db, { migrationsFolder: MIGRATIONS_DIR });
};

export const initDb = () => {
  initPromise ??= (async () => {
    if (process.env.DATABASE_URL) {
      connectPostgres();
    } else if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      throw new Error('DATABASE_URL must be set in production');
    } else {
      await connectEmbedded();
    }
    return db;
  })().catch((error) => {
    initPromise = undefined; // allow a retry on the next request
    throw error;
  });
  return initPromise;
};

export const closeDb = async () => {
  if (pool) await pool.end();
  if (pglite) await pglite.close();
};

export { schema };
