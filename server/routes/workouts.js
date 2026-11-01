/* BACKEND DEVELOPER 2
 * Responsible for:
 * - Workout operations
 * - Data aggregation
 * CRUD Operations:
 * - CREATE: New workouts
 * - READ: Get workouts/stats
 * - UPDATE: Modify workouts
 * - DELETE: Remove workouts
 */

import express from 'express';
import { and, asc, count, desc, eq, gte, ilike, inArray, or, sql, exists } from 'drizzle-orm';
import { authenticate } from '../middleware/auth.js';
import { validate, validateId } from '../middleware/validate.js';
import { workoutSchema } from '../utils/validators.js';
import { db, schema } from '../db/index.js';

const { workouts, exercises } = schema;
const router = express.Router();

const SORTABLE = {
  date: workouts.date,
  duration: workouts.duration,
  title: workouts.title,
  createdAt: workouts.createdAt
};

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// Attach ordered exercises to a list of workout rows
const withExercises = async (rows) => {
  if (!rows.length) return [];
  const items = await db
    .select()
    .from(exercises)
    .where(inArray(exercises.workoutId, rows.map((w) => w.id)))
    .orderBy(asc(exercises.position));

  const byWorkout = new Map(rows.map((w) => [w.id, []]));
  for (const { workoutId, name, sets, reps, weight } of items) {
    byWorkout.get(workoutId).push({ name, sets, reps, weight });
  }
  return rows.map(({ userId, updatedAt, ...w }) => ({ ...w, exercises: byWorkout.get(w.id) }));
};

const exerciseRows = (workoutId, list) =>
  list.map((e, position) => ({ workoutId, position, name: e.name, sets: e.sets, reps: e.reps, weight: e.weight ?? 0 }));

const ownWorkout = (req) => and(eq(workouts.id, req.params.id), eq(workouts.userId, req.user.id));

// READ: Workout statistics for the dashboard
router.get('/stats', authenticate, async (req, res) => {
  const userId = req.user.id;
  const today = startOfDay(new Date());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(weekStart.getDate() - 7);

  const [[summary], topExercises, recent] = await Promise.all([
    db.select({
      totalWorkouts: count(),
      totalDuration: sql`coalesce(sum(${workouts.duration}), 0)`.mapWith(Number),
      totalCalories: sql`coalesce(sum(${workouts.calories}), 0)`.mapWith(Number),
      avgDuration: sql`coalesce(round(avg(${workouts.duration})), 0)`.mapWith(Number)
    }).from(workouts).where(eq(workouts.userId, userId)),

    db.select({
      exercise: sql`min(${exercises.name})`,
      totalSets: sql`sum(${exercises.sets})`.mapWith(Number),
      totalReps: sql`sum(${exercises.sets} * ${exercises.reps})`.mapWith(Number),
      maxWeight: sql`max(${exercises.weight})`.mapWith(Number)
    })
      .from(exercises)
      .innerJoin(workouts, eq(exercises.workoutId, workouts.id))
      .where(eq(workouts.userId, userId))
      .groupBy(sql`lower(${exercises.name})`)
      .orderBy(desc(sql`sum(${exercises.sets})`))
      .limit(5),

    db.select({ date: workouts.date, duration: workouts.duration, calories: workouts.calories })
      .from(workouts)
      .where(and(eq(workouts.userId, userId), gte(workouts.date, prevWeekStart)))
  ]);

  // Minutes per day for the last 7 days (oldest first)
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return { date: day.toISOString(), day: day.toLocaleDateString('en-US', { weekday: 'short' }), minutes: 0 };
  });
  const thisWeek = { workouts: 0, minutes: 0, calories: 0 };
  let lastWeekWorkouts = 0;

  for (const w of recent) {
    const d = startOfDay(w.date);
    if (d >= weekStart) {
      const idx = Math.round((d - weekStart) / 86400000);
      if (week[idx]) week[idx].minutes += w.duration;
      thisWeek.workouts += 1;
      thisWeek.minutes += w.duration;
      thisWeek.calories += w.calories;
    } else {
      lastWeekWorkouts += 1;
    }
  }

  res.json({
    status: 'success',
    data: { summary, thisWeek, lastWeekWorkouts, week, topExercises }
  });
});

// READ: Paginated workouts (search matches title or exercise names)
router.get('/', authenticate, async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
  const sortColumn = SORTABLE[req.query.sortBy] || workouts.date;
  const order = req.query.order === 'asc' ? asc : desc;

  let where = eq(workouts.userId, req.user.id);
  if (req.query.search) {
    const term = `%${String(req.query.search).replace(/[%_\\]/g, '\\$&')}%`;
    where = and(where, or(
      ilike(workouts.title, term),
      exists(db.select({ one: sql`1` }).from(exercises).where(and(eq(exercises.workoutId, workouts.id), ilike(exercises.name, term))))
    ));
  }

  const [rows, [{ total }]] = await Promise.all([
    db.select().from(workouts).where(where).orderBy(order(sortColumn), desc(workouts.createdAt)).limit(limit).offset((page - 1) * limit),
    db.select({ total: count() }).from(workouts).where(where)
  ]);

  res.json({
    status: 'success',
    data: {
      workouts: await withExercises(rows),
      pagination: { total, page, pages: Math.max(Math.ceil(total / limit), 1) }
    }
  });
});

// READ: Single workout
router.get('/:id', authenticate, validateId, async (req, res) => {
  const rows = await db.select().from(workouts).where(ownWorkout(req));
  if (!rows.length) {
    return res.status(404).json({ status: 'error', message: 'Workout not found' });
  }
  const [workout] = await withExercises(rows);
  res.json({ status: 'success', data: workout });
});

// CREATE: New workout with its exercises (one transaction)
router.post('/', authenticate, validate(workoutSchema), async (req, res) => {
  const { exercises: list, ...fields } = req.body;

  const workout = await db.transaction(async (tx) => {
    const [row] = await tx.insert(workouts).values({ ...fields, userId: req.user.id }).returning();
    await tx.insert(exercises).values(exerciseRows(row.id, list));
    return row;
  });

  const [created] = await withExercises([workout]);
  res.status(201).json({ status: 'success', data: created });
});

// UPDATE: Replace a workout and its exercises
router.put('/:id', authenticate, validateId, validate(workoutSchema), async (req, res) => {
  const { exercises: list, ...fields } = req.body;

  const workout = await db.transaction(async (tx) => {
    const [row] = await tx.update(workouts)
      .set({ calories: 0, notes: null, ...fields })
      .where(ownWorkout(req))
      .returning();
    if (!row) return null;
    await tx.delete(exercises).where(eq(exercises.workoutId, row.id));
    await tx.insert(exercises).values(exerciseRows(row.id, list));
    return row;
  });

  if (!workout) {
    return res.status(404).json({ status: 'error', message: 'Workout not found' });
  }
  const [updated] = await withExercises([workout]);
  res.json({ status: 'success', data: updated });
});

// DELETE: Remove workout (exercises cascade)
router.delete('/:id', authenticate, validateId, async (req, res) => {
  const [deleted] = await db.delete(workouts).where(ownWorkout(req)).returning({ id: workouts.id });
  if (!deleted) {
    return res.status(404).json({ status: 'error', message: 'Workout not found' });
  }
  res.json({ status: 'success', message: 'Workout deleted successfully' });
});

export default router;
