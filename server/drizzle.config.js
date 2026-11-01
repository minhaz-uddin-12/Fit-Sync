import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.js',
  out: './drizzle',
  // Only needed for `npm run db:studio` against a real database
  ...(process.env.DATABASE_URL && { dbCredentials: { url: process.env.DATABASE_URL } })
});
