import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { workoutSchema } from '../utils/validators.js';
import Workout from '../models/Workout.js';

const router = express.Router();

/* BACKEND DEVELOPER 2
 * Responsible for:
 * - Workout operations
 * - Data aggregation
 * - Performance optimization
 * CRUD Operations:
 * - CREATE: New workouts
 * - READ: Get workouts/stats
 * - UPDATE: Modify workouts
 * - DELETE: Remove workouts
 */

// READ: Get workout statistics
router.get('/stats', authenticate, async (req, res, next) => {
  try {
    const { startDate, endDate, type } = req.query;
    const match = { user: req.user._id };

    // Add date range filter if provided
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = new Date(startDate);
      if (endDate) match.date.$lte = new Date(endDate);
    }

    // Add exercise type filter if provided
    if (type) {
      match['exercises.name'] = new RegExp(type, 'i');
    }

    const stats = await Workout.aggregate([
      { $match: match },
      { $unwind: '$exercises' },
      {
        $group: {
          _id: '$exercises.name',
          totalSets: { $sum: '$exercises.sets' },
          totalReps: { $sum: '$exercises.reps' },
          avgWeight: { $avg: '$exercises.weight' },
          workoutCount: { $addToSet: '$_id' },
          maxWeight: { $max: '$exercises.weight' },
          minWeight: { $min: '$exercises.weight' }
        }
      },
      {
        $project: {
          exercise: '$_id',
          totalSets: 1,
          totalReps: 1,
          avgWeight: { $round: ['$avgWeight', 1] },
          workoutCount: { $size: '$workoutCount' },
          maxWeight: 1,
          minWeight: 1,
          _id: 0
        }
      },
      { $sort: { totalSets: -1 } }
    ]);

    // Get total workout duration and count
    const summary = await Workout.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalWorkouts: { $sum: 1 },
          totalDuration: { $sum: '$duration' },
          avgDuration: { $avg: '$duration' }
        }
      },
      {
        $project: {
          _id: 0,
          totalWorkouts: 1,
          totalDuration: 1,
          avgDuration: { $round: ['$avgDuration', 1] }
        }
      }
    ]);

    res.json({
      stats,
      summary: summary[0] || { totalWorkouts: 0, totalDuration: 0, avgDuration: 0 }
    });
  } catch (error) {
    next(error);
  }
});

// READ: Get all workouts with filters
router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sortBy = 'date', order = 'desc', type } = req.query;
    const skip = (page - 1) * limit;
    
    const query = { user: req.user._id };
    if (type) {
      query['exercises.name'] = new RegExp(type, 'i');
    }

    const workouts = await Workout.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Workout.countDocuments(query);

    res.json({
      workouts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

/* BACKEND DEVELOPER 1
 * Responsible for:
 * - Data validation
 * - Route protection
 * - Request handling
 */

// CREATE: New workout
router.post('/', authenticate, validate(workoutSchema), async (req, res, next) => {
  try {
    const workout = await Workout.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(workout);
  } catch (error) {
    next(error);
  }
});

// UPDATE: Modify workout
router.put('/:id', authenticate, validate(workoutSchema), async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    next(error);
  }
});

// DELETE: Remove workout
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
