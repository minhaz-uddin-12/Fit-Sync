/* DATABASE DEVELOPER
 * PostgreSQL schema (Drizzle ORM).
 * After changing this file run `npm run db:generate` to create a migration.
 */

import { sql } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  integer,
  real,
  timestamp,
  index,
  uniqueIndex,
  check
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['member', 'trainer', 'admin']);
export const planEnum = pgEnum('plan', ['Drop-In', 'Unlimited', 'Premium']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'paid']);
export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'cancelled']);
export const messageStatusEnum = pgEnum('message_status', ['new', 'read']);

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date())
};

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  role: roleEnum('role').notNull().default('member'),
  phone: varchar('phone', { length: 20 }),
  // Public trainer profile
  title: varchar('title', { length: 80 }),
  bio: varchar('bio', { length: 500 }),
  specialties: text('specialties').array().notNull().default(sql`'{}'::text[]`),
  image: text('image'),
  resetTokenHash: text('reset_token_hash'),
  resetTokenExpires: timestamp('reset_token_expires', { withTimezone: true }),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  ...timestamps
}, (t) => [
  uniqueIndex('users_email_unique').on(sql`lower(${t.email})`),
  index('users_role_idx').on(t.role)
]);

// One current membership per member (re-enrolling replaces it)
export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  plan: planEnum('plan').notNull(),
  price: integer('price').notNull(),
  months: integer('months').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull().defaultNow(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  paymentStatus: paymentStatusEnum('payment_status').notNull().default('pending'),
  ...timestamps
}, (t) => [
  uniqueIndex('memberships_user_unique').on(t.userId)
]);

export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 100 }).notNull(),
  duration: integer('duration').notNull(),
  calories: integer('calories').notNull().default(0),
  notes: varchar('notes', { length: 500 }),
  date: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
  ...timestamps
}, (t) => [
  index('workouts_user_date_idx').on(t.userId, t.date),
  check('workouts_duration_positive', sql`${t.duration} > 0`),
  check('workouts_calories_non_negative', sql`${t.calories} >= 0`)
]);

export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutId: uuid('workout_id').notNull().references(() => workouts.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  sets: integer('sets').notNull(),
  reps: integer('reps').notNull(),
  weight: real('weight').notNull().default(0)
}, (t) => [
  index('exercises_workout_idx').on(t.workoutId, t.position),
  check('exercises_sets_positive', sql`${t.sets} > 0`),
  check('exercises_reps_positive', sql`${t.reps} > 0`)
]);

export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  trainerId: uuid('trainer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).notNull(),
  duration: integer('duration').notNull(),
  status: bookingStatusEnum('status').notNull().default('pending'),
  notes: varchar('notes', { length: 500 }),
  ...timestamps
}, (t) => [
  index('bookings_trainer_date_idx').on(t.trainerId, t.date),
  index('bookings_user_date_idx').on(t.userId, t.date),
  check('bookings_duration_range', sql`${t.duration} between 30 and 120`)
]);

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 80 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 120 }).notNull(),
  message: varchar('message', { length: 2000 }).notNull(),
  status: messageStatusEnum('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});
