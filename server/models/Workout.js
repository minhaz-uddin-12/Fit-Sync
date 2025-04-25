/* DATABASE DEVELOPER
 * Responsible for:
 * - Workout schema design
 * - Exercise subdocuments
 * - Performance optimization
 * - Data relationships
 */

import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Workout title is required'],
    trim: true
  },
  exercises: [{
    name: {
      type: String,
      required: [true, 'Exercise name is required']
    },
    sets: {
      type: Number,
      required: [true, 'Number of sets is required'],
      min: [1, 'Minimum 1 set required']
    },
    reps: {
      type: Number,
      required: [true, 'Number of reps is required'],
      min: [1, 'Minimum 1 rep required']
    },
    weight: {
      type: Number,
      default: 0
    },
    notes: String
  }],
  duration: {
    type: Number,
    min: [1, 'Duration must be at least 1 minute']
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;
