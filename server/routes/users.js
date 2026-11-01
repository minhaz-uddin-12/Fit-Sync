/* BACKEND DEVELOPER 1
 * Profile management for the logged-in user, membership enrollment,
 * and the public trainer directory.
 */

import express from 'express';
import { asc, eq } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { profileSchema, changePasswordSchema, membershipSchema } from '../utils/validators.js';
import { PLANS, addMonths } from '../utils/plans.js';
import { db, schema } from '../db/index.js';
import { getPublicUser, hashPassword, verifyPassword } from '../db/users.js';

const { users, memberships } = schema;
const router = express.Router();

// READ - Public list of trainers (used for booking)
router.get('/trainers', async (req, res) => {
  const trainers = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      title: users.title,
      bio: users.bio,
      specialties: users.specialties,
      image: users.image
    })
    .from(users)
    .where(eq(users.role, 'trainer'))
    .orderBy(asc(users.name));
  res.json({ status: 'success', data: trainers });
});

// UPDATE - Edit own profile
router.patch('/users/me', authenticate, validate(profileSchema), async (req, res) => {
  const allowed = ['name', 'phone'];
  if (req.user.role === 'trainer') allowed.push('title', 'bio');

  const updates = Object.fromEntries(
    allowed.filter((key) => req.body[key] !== undefined).map((key) => [key, req.body[key]])
  );
  if (Object.keys(updates).length) {
    await db.update(users).set(updates).where(eq(users.id, req.user.id));
  }

  res.json({ status: 'success', data: await getPublicUser(req.user.id) });
});

// UPDATE - Change own password
router.patch('/users/me/password', authenticate, validate(changePasswordSchema), async (req, res) => {
  if (!(await verifyPassword(req.body.currentPassword, req.userRow.passwordHash))) {
    return res.status(400).json({ status: 'error', message: 'Current password is incorrect' });
  }

  await db.update(users)
    .set({ passwordHash: await hashPassword(req.body.newPassword) })
    .where(eq(users.id, req.user.id));

  res.json({ status: 'success', message: 'Password updated successfully' });
});

// CREATE - Enroll in (or switch to) a membership plan
router.post('/membership', authenticate, validate(membershipSchema), async (req, res) => {
  if (req.user.role !== 'member') {
    return res.status(403).json({ status: 'error', message: 'Only member accounts can enroll in a plan' });
  }

  const { plan } = req.body;
  const { price, months } = PLANS[plan];
  const startDate = new Date();
  const values = {
    plan,
    price,
    months,
    startDate,
    endDate: addMonths(startDate, months),
    paymentStatus: 'pending'
  };

  // One membership per user: insert, or replace the existing one
  await db.insert(memberships)
    .values({ userId: req.user.id, ...values })
    .onConflictDoUpdate({ target: memberships.userId, set: values });

  res.status(201).json({ status: 'success', data: await getPublicUser(req.user.id) });
});

export default router;
