/* FRONTEND DEVELOPER
 * Responsible for:
 * - Authentication API integration
 * - User session management
 */

import api from './api';

const saveSession = ({ token, ...user }) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const authService = {
  // POST /api/auth/login
  async login(credentials) {
    const { data } = await api.post('/api/auth/login', credentials);
    return saveSession(data);
  },

  // POST /api/auth/register (logs the new member in)
  async register(userData) {
    const { data } = await api.post('/api/auth/register', userData);
    return saveSession(data);
  },

  // GET /api/auth/me
  async me() {
    const { data } = await api.get('/api/auth/me');
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  // POST /api/auth/forgot-password
  forgotPassword(email) {
    return api.post('/api/auth/forgot-password', { email });
  },

  // POST /api/auth/reset-password/:token (logs the user in)
  async resetPassword(token, password) {
    const { data } = await api.post(`/api/auth/reset-password/${token}`, { password });
    return saveSession(data);
  },

  // PATCH /api/users/me
  async updateProfile(updates) {
    const { data } = await api.patch('/api/users/me', updates);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  },

  // PATCH /api/users/me/password
  changePassword(currentPassword, newPassword) {
    return api.patch('/api/users/me/password', { currentPassword, newPassword });
  },

  // Client-side session cleanup
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};
