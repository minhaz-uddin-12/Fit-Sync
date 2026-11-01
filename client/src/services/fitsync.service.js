/* FRONTEND DEVELOPER
 * Bookings, trainers, membership, contact and admin API integration
 */

import api from './api';

const unwrap = (promise) => promise.then((res) => res.data);

export const bookingService = {
  getTrainers: () => unwrap(api.get('/api/trainers')),
  getMyBookings: () => unwrap(api.get('/api/bookings')),
  getTrainerBookings: () => unwrap(api.get('/api/bookings/trainer')),
  create: (booking) => unwrap(api.post('/api/bookings', booking)),
  cancel: (id) => api.delete(`/api/bookings/${id}`),
  setStatus: (id, status) => unwrap(api.patch(`/api/bookings/${id}/status`, { status }))
};

export const membershipService = {
  enroll: (plan) => unwrap(api.post('/api/membership', { plan }))
};

export const contactService = {
  send: (message) => api.post('/api/contact', message)
};

export const adminService = {
  getStats: () => unwrap(api.get('/api/admin/stats')),
  getUsers: (params) => unwrap(api.get('/api/admin/users', { params })),
  createUser: (user) => unwrap(api.post('/api/admin/users', user)),
  setRole: (id, role) => unwrap(api.patch(`/api/admin/users/${id}/role`, { role })),
  markPaid: (id) => unwrap(api.patch(`/api/admin/users/${id}/membership/paid`)),
  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  getMessages: () => unwrap(api.get('/api/admin/messages')),
  markRead: (id) => unwrap(api.patch(`/api/admin/messages/${id}/read`)),
  deleteMessage: (id) => api.delete(`/api/admin/messages/${id}`)
};
