/* FRONTEND DEVELOPER
 * Responsible for:
 * - Authentication API integration
 * - User session management
 * CRUD Operations:
 * - CREATE: Login (POST /api/auth/login)
 * - CREATE: Register (POST /api/auth/register)
 * - DELETE: Logout (client-side)
 */

import api from './api';

export const authService = {
  // API: POST /api/auth/login - Create user session
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      if (response.status === 'success' && response.data) {
        const { token, ...userData } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(userData));
        return response;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      throw {
        message: error.response?.data?.message || 'Invalid credentials or role'
      };
    }
  },

  // API: POST /api/auth/register - Create new user account
  async register(userData) {
    try {
      const response = await api.post('/api/auth/register', userData);
      // response = { status, data }
      if (response.status === 'success' && response.data) {
        return response;
      }
      throw new Error(response.message || 'Registration failed. Please try again.');
    } catch (error) {
      if (error.response?.status === 409) {
        throw {
          response: error.response,
          message: 'Email is already registered. Please try logging in instead.'
        };
      }
      throw {
        message: error.response?.data?.message || 'Registration failed. Please try again.'
      };
    }
  },

  // Client-side session cleanup
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
