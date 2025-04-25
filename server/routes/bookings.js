/* BACKEND DEVELOPER 2
 * Responsible for:
 * - Booking management
 * - Scheduling logic
 * - Trainer-client relationships
 * CRUD Operations:
 * - CREATE: New bookings
 * - READ: Get bookings
 * - UPDATE: Modify bookings
 * - DELETE: Cancel bookings
 */

import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { bookingSchema } from '../utils/validators.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// READ - Get user's bookings
router.get('/', authenticate, async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('trainer', 'name email')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

// CREATE - Make new booking
router.post('/', authenticate, validate(bookingSchema), async (req, res, next) => {
  try {
    // Check for existing booking
    const existingBooking = await Booking.findOne({
      trainer: req.body.trainerId,
      date: req.body.date,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'This time slot is already booked'
      });
    }

    const booking = await Booking.create({
      ...req.body,
      user: req.user._id,
      trainer: req.body.trainerId
    });

    await booking.populate('trainer', 'name email');
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
});

// UPDATE - Cancel existing booking (soft delete)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        status: { $ne: 'cancelled' }
      },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or already cancelled' });
    }

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
