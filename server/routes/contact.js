import express from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../utils/validators.js';
import { db, schema } from '../db/index.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many messages. Please try again later.' }
});

// CREATE - Public contact form submission
router.post('/', contactLimiter, validate(contactSchema), async (req, res) => {
  await db.insert(schema.messages).values(req.body);
  res.status(201).json({ status: 'success', message: "Thanks! We'll get back to you soon." });
});

export default router;
