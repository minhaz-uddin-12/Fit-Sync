/* BACKEND DEVELOPER 1
 * Admin-only management: users, staff accounts, memberships, messages.
 */

import express from 'express';
import { and, count, desc, eq, gt, gte, ilike, ne, or, sql } from 'drizzle-orm';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, validateId } from '../middleware/validate.js';
import { privilegedUserSchema, roleSchema } from '../utils/validators.js';
import { db, schema } from '../db/index.js';
import { findUserByEmail, getPublicUser, hashPassword, publicUser } from '../db/users.js';

const { users, memberships, workouts, bookings, messages } = schema;
const router = express.Router();
router.use(authenticate, authorize('admin'));

const countWhere = async (table, where) => {
  const [{ value }] = await db.select({ value: count() }).from(table).where(where);
  return value;
};

// READ - Overview numbers
router.get('/stats', async (req, res) => {
  const now = new Date();
  const [roleCounts, activeMemberships, [revenue], totalWorkouts, upcomingBookings, newMessages] = await Promise.all([
    db.select({ role: users.role, value: count() }).from(users).groupBy(users.role),
    countWhere(memberships, gt(memberships.endDate, now)),
    db.select({ total: sql`coalesce(sum(${memberships.price}), 0)`.mapWith(Number) })
      .from(memberships)
      .where(eq(memberships.paymentStatus, 'paid')),
    countWhere(workouts),
    countWhere(bookings, and(gte(bookings.date, now), ne(bookings.status, 'cancelled'))),
    countWhere(messages, eq(messages.status, 'new'))
  ]);

  const byRole = Object.fromEntries(roleCounts.map((r) => [r.role, r.value]));
  res.json({
    status: 'success',
    data: {
      members: byRole.member || 0,
      trainers: byRole.trainer || 0,
      admins: byRole.admin || 0,
      activeMemberships,
      revenue: revenue.total,
      workouts: totalWorkouts,
      upcomingBookings,
      newMessages
    }
  });
});

// READ - Users with optional role filter and search
router.get('/users', async (req, res) => {
  const filters = [];
  if (['member', 'trainer', 'admin'].includes(req.query.role)) filters.push(eq(users.role, req.query.role));
  if (req.query.search) {
    const term = `%${String(req.query.search).replace(/[%_\\]/g, '\\$&')}%`;
    filters.push(or(ilike(users.name, term), ilike(users.email, term)));
  }

  const rows = await db.select({ user: users, membership: memberships })
    .from(users)
    .leftJoin(memberships, eq(memberships.userId, users.id))
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(users.createdAt))
    .limit(200);

  res.json({ status: 'success', data: rows.map((r) => publicUser(r.user, r.membership)) });
});

// CREATE - Staff account (trainer or admin)
router.post('/users', validate(privilegedUserSchema), async (req, res) => {
  const { password, ...fields } = req.body;
  if (await findUserByEmail(fields.email)) {
    return res.status(409).json({ status: 'error', message: 'Email is already registered' });
  }
  const [user] = await db.insert(users)
    .values({ ...fields, passwordHash: await hashPassword(password) })
    .returning();
  res.status(201).json({ status: 'success', data: publicUser(user) });
});

// UPDATE - Change a user's role
router.patch('/users/:id/role', validateId, validate(roleSchema), async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ status: 'error', message: 'You cannot change your own role' });
  }
  const [updated] = await db.update(users)
    .set({ role: req.body.role })
    .where(eq(users.id, req.params.id))
    .returning({ id: users.id });
  if (!updated) return res.status(404).json({ status: 'error', message: 'User not found' });
  res.json({ status: 'success', data: await getPublicUser(updated.id) });
});

// UPDATE - Mark a membership as paid
router.patch('/users/:id/membership/paid', validateId, async (req, res) => {
  const [updated] = await db.update(memberships)
    .set({ paymentStatus: 'paid' })
    .where(eq(memberships.userId, req.params.id))
    .returning({ userId: memberships.userId });
  if (!updated) return res.status(404).json({ status: 'error', message: 'Membership not found' });
  res.json({ status: 'success', data: await getPublicUser(updated.userId) });
});

// DELETE - Remove a user; workouts, bookings and membership cascade
router.delete('/users/:id', validateId, async (req, res) => {
  if (req.params.id === req.user.id) {
    return res.status(400).json({ status: 'error', message: 'You cannot delete your own account' });
  }
  const [deleted] = await db.delete(users).where(eq(users.id, req.params.id)).returning({ id: users.id });
  if (!deleted) return res.status(404).json({ status: 'error', message: 'User not found' });
  res.json({ status: 'success', message: 'User deleted' });
});

// READ - Contact messages
router.get('/messages', async (req, res) => {
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt)).limit(100);
  res.json({ status: 'success', data: rows });
});

// UPDATE - Mark message as read
router.patch('/messages/:id/read', validateId, async (req, res) => {
  const [message] = await db.update(messages)
    .set({ status: 'read' })
    .where(eq(messages.id, req.params.id))
    .returning();
  if (!message) return res.status(404).json({ status: 'error', message: 'Message not found' });
  res.json({ status: 'success', data: message });
});

// DELETE - Remove a message
router.delete('/messages/:id', validateId, async (req, res) => {
  const [deleted] = await db.delete(messages).where(eq(messages.id, req.params.id)).returning({ id: messages.id });
  if (!deleted) return res.status(404).json({ status: 'error', message: 'Message not found' });
  res.json({ status: 'success', message: 'Message deleted' });
});

export default router;
