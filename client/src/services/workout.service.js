/* FRONTEND DEVELOPER
 * Responsible for:
 * - Workout API integration
 * - Data transformation
 * CRUD Operations:
 * - CREATE: New workout (POST /api/workouts)
 * - READ: Get workouts (GET /api/workouts)
 * - UPDATE: Edit workout (PUT /api/workouts/:id)
 * - DELETE: Remove workout (DELETE /api/workouts/:id)
 */

import api from './api';

export const workoutService = {
  // READ - API: Get all workouts with optional filters
  async getWorkouts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/workouts?${queryString}`);
    } catch (error) {
      throw error;
    }
  },

  // READ - API: Get workout statistics
  async getWorkoutStats(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      return await api.get(`/workouts/stats?${queryString}`);
    } catch (error) {
      throw error;
    }
  },

  // READ - API: Get single workout by ID
  async getWorkoutById(id) {
    try {
      return await api.get(`/workouts/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // CREATE - API: Create new workout
  async createWorkout(data) {
    try {
      return await api.post('/workouts', data);
    } catch (error) {
      throw error;
    }
  },

  // UPDATE - API: Modify existing workout
  async updateWorkout(id, data) {
    try {
      return await api.put(`/workouts/${id}`, data);
    } catch (error) {
      throw error;
    }
  },

  // DELETE - API: Remove workout
  async deleteWorkout(id) {
    try {
      return await api.delete(`/workouts/${id}`);
    } catch (error) {
      throw error;
    }
  }
};
