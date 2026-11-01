/* BACKEND DEVELOPER 2
 * Responsible for:
 * - Booking management
 * - Scheduling logic
 * - Trainer-client relationships
 * CRUD Operations:
 * - CREATE: New bookings
 * - READ: Member and trainer bookings
 * - UPDATE: Confirm / cancel
 */

import express from 'express';
import { alias } from 'drizzle-orm/pg-core';
import { and, asc, eq, ne, sql } from 'drizzle-orm';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, validateId } from '../middleware/validate.js';
import { bookingSchema, bookingStatusSchema } from '../utils/validators.js';
import { db, schema } from '../db/index.js';

const { bookings, users } = schema;
const router = express.Router();

const trainer = alias(users, 'trainer');
const member = alias(users, 'member');

const bookingFields = {
  id: bookings.id,
  date: bookings.date,
  duration: bookings.duration,
  status: bookings.status,
  notes: bookings.notes,
  createdAt: bookings.createdAt
};
const trainerFields = { id: trainer.id, name: trainer.name, email: trainer.email, title: trainer.title, image: trainer.image };
const memberFields = { id: member.id, name: member.name, email: member.email, phone: member.phone };

const memberBookingQuery = () =>
  db.select({ ...bookingFields, trainer: trainerFields })
    .from(bookings)
    .innerJoin(trainer, eq(bookings.trainerId, trainer.id));

const trainerBookingQuery = () =>
  db.select({ ...bookingFields, user: memberFields })
    .from(bookings)
    .innerJoin(member, eq(bookings.userId, member.id));

// Any active booking for `column = id` overlapping [start, start + duration)
const hasOverlap = async (column, id, start, duration) => {
  const end = new Date(start.getTime() + duration * 60 * 1000);
  const [row] = await db.select({ id: bookings.id })
    .from(bookings)
    .where(and(
      eq(column, id),
      ne(bookings.status, 'cancelled'),
      sql`${bookings.date} < ${end}`,
      sql`${bookings.date} + make_interval(mins => ${bookings.duration}) > ${start}`
    ))
    .limit(1);
  return Boolean(row);
};

// READ - Logged-in member's bookings
router.get('/', authenticate, async (req, res) => {
  const rows = await memberBookingQuery()
    .where(eq(bookings.userId, req.user.id))
    .orderBy(asc(bookings.date));
  res.json({ status: 'success', data: rows });
});

// READ - Sessions booked with the logged-in trainer
router.get('/trainer', authenticate, authorize('trainer'), async (req, res) => {
  const rows = await trainerBookingQuery()
    .where(eq(bookings.trainerId, req.user.id))
    .orderBy(asc(bookings.date));
  res.json({ status: 'success', data: rows });
});

// CREATE - Book a session with a trainer
router.post('/', authenticate, authorize('member'), validate(bookingSchema), async (req, res) => {
  const { trainerId, date, duration, notes } = req.body;
  const start = new Date(date);

  const [coach] = await db.select({ id: users.id })
    .from(users)
    .where(and(eq(users.id, trainerId), eq(users.role, 'trainer')));
  if (!coach) {
    return res.status(404).json({ status: 'error', message: 'Trainer not found' });
  }

  if (await hasOverlap(bookings.trainerId, trainerId, start, duration)) {
    return res.status(409).json({ status: 'error', message: 'This time slot is already booked. Please choose another time.' });
  }
  if (await hasOverlap(bookings.userId, req.user.id, start, duration)) {
    return res.status(409).json({ status: 'error', message: 'You already have a session at this time.' });
  }

  const [created] = await db.insert(bookings)
    .values({ userId: req.user.id, trainerId, date: start, duration, notes })
    .returning({ id: bookings.id });

  const [booking] = await memberBookingQuery().where(eq(bookings.id, created.id));
  res.status(201).json({ status: 'success', data: booking });
});

// UPDATE - Trainer (or admin) confirms or cancels a session
router.patch('/:id/status', authenticate, authorize('trainer', 'admin'), validateId, validate(bookingStatusSchema), async (req, res) => {
  let where = and(eq(bookings.id, req.params.id), ne(bookings.status, 'cancelled'));
  if (req.user.role === 'trainer') where = and(where, eq(bookings.trainerId, req.user.id));

  const [updated] = await db.update(bookings)
    .set({ status: req.body.status })
    .where(where)
    .returning({ id: bookings.id });

  if (!updated) {
    return res.status(404).json({ status: 'error', message: 'Booking not found or already cancelled' });
  }

  const [booking] = await trainerBookingQuery().where(eq(bookings.id, updated.id));
  res.json({ status: 'success', data: booking });
});

// UPDATE - Member cancels their own booking (soft delete)
router.delete('/:id', authenticate, validateId, async (req, res) => {
  const [cancelled] = await db.update(bookings)
    .set({ status: 'cancelled' })
    .where(and(
      eq(bookings.id, req.params.id),
      eq(bookings.userId, req.user.id),
      ne(bookings.status, 'cancelled')
    ))
    .returning({ id: bookings.id });

  if (!cancelled) {
    return res.status(404).json({ status: 'error', message: 'Booking not found or already cancelled' });
  }

  res.json({ status: 'success', message: 'Booking cancelled successfully' });
});

export default router;
