/* FRONTEND DEVELOPER
 * Workout API integration
 * - CREATE: POST /api/workouts
 * - READ: GET /api/workouts, /api/workouts/stats
 * - UPDATE: PUT /api/workouts/:id
 * - DELETE: DELETE /api/workouts/:id
 */

import api from './api';

export const workoutService = {
  async getWorkouts(params = {}) {
    const { data } = await api.get('/api/workouts', { params });
    return data;
  },

  async getWorkoutStats() {
    const { data } = await api.get('/api/workouts/stats');
    return data;
  },

  async createWorkout(workout) {
    const { data } = await api.post('/api/workouts', workout);
    return data;
  },

  async updateWorkout(id, workout) {
    const { data } = await api.put(`/api/workouts/${id}`, workout);
    return data;
  },

  deleteWorkout(id) {
    return api.delete(`/api/workouts/${id}`);
  }
};
