/* BACKEND DEVELOPER 1
 * Responsible for:
 * - Authentication routes
 * - JWT management
 * CRUD Operations:
 * - CREATE: Register users, log in
 * - READ: Current user
 * - UPDATE: Password reset
 */

import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { and, eq, gt } from 'drizzle-orm';
import { validate } from '../middleware/validate.js';
import {
  userSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../utils/validators.js';
import { authenticate } from '../middleware/auth.js';
import { db, schema } from '../db/index.js';
import {
  findUserByEmail,
  getPublicUser,
  hashPassword,
  hashToken,
  publicUser,
  verifyPassword
} from '../db/users.js';

const { users } = schema;
const router = express.Router();

// Only failed attempts count toward the limit
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many attempts. Please try again in 15 minutes.' }
});

const signToken = (user) =>
  jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d', algorithm: 'HS256' }
  );

const authPayload = (user) => ({ ...user, token: signToken(user) });

// CREATE - Register a member (public registration is always role "member")
router.post('/register', authLimiter, validate(userSchema), async (req, res) => {
  const { name, email, password } = req.body;

  if (await findUserByEmail(email)) {
    return res.status(409).json({ status: 'error', message: 'Email is already registered' });
  }

  const [user] = await db.insert(users).values({
    name,
    email,
    passwordHash: await hashPassword(password),
    role: 'member',
    lastLogin: new Date()
  }).returning();

  res.status(201).json({ status: 'success', data: authPayload(publicUser(user)) });
});

// CREATE - Log in; the account's role decides where the client sends the user
router.post('/login', authLimiter, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
  }

  await db.update(users).set({ lastLogin: new Date() }).where(eq(users.id, user.id));

  res.json({ status: 'success', data: authPayload(await getPublicUser(user.id)) });
});

// READ - Current user from the token
router.get('/me', authenticate, (req, res) => {
  res.json({ status: 'success', data: req.user });
});

// Kept for older clients
router.get('/verify', authenticate, (req, res) => {
  res.json({ status: 'success', data: req.user });
});

// UPDATE - Start a password reset
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  const response = {
    status: 'success',
    message: 'If an account exists for that email, a reset link has been sent.'
  };

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    await db.update(users).set({
      resetTokenHash: hashToken(token),
      resetTokenExpires: new Date(Date.now() + 60 * 60 * 1000)
    }).where(eq(users.id, user.id));

    const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').split(',')[0].trim();
    const resetUrl = `${clientUrl}/reset-password/${token}`;

    // No email provider is configured yet: log the link, and return it
    // outside production so the flow can be completed locally.
    console.log(`🔑 Password reset link for ${user.email}: ${resetUrl}`);
    if (process.env.NODE_ENV !== 'production') {
      response.devResetUrl = resetUrl;
    }
  }

  res.json(response);
});

// UPDATE - Finish a password reset (token is single use)
router.post('/reset-password/:token', authLimiter, validate(resetPasswordSchema), async (req, res) => {
  const [user] = await db.update(users)
    .set({
      passwordHash: await hashPassword(req.body.password),
      resetTokenHash: null,
      resetTokenExpires: null,
      lastLogin: new Date()
    })
    .where(and(
      eq(users.resetTokenHash, hashToken(req.params.token)),
      gt(users.resetTokenExpires, new Date())
    ))
    .returning({ id: users.id });

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'This reset link is invalid or has expired.' });
  }

  res.json({ status: 'success', message: 'Password updated', data: authPayload(await getPublicUser(user.id)) });
});

// Logout is client-side (token removal)
router.post('/logout', (req, res) => {
  res.json({ status: 'success', message: 'Logged out successfully' });
});

export default router;
