/* DATABASE DEVELOPER
 * Responsible for:
 * - Booking schema design
 * - Scheduling constraints
 * - Index optimization
 * - Referential integrity
 */

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  duration: {
    type: Number,
    required: [true, 'Session duration is required'],
    min: [30, 'Session must be at least 30 minutes'],
    max: [120, 'Session cannot exceed 120 minutes']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  notes: String
}, {
  timestamps: true
});

// Prevent double booking for trainers
bookingSchema.index({ trainer: 1, date: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
