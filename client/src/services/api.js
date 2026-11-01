/* FRONTEND DEVELOPER
 * Responsible for:
 * - API integration layer
 * - Request/response handling
 * - Error management
 * - Authentication headers
 */

import axios from 'axios';

// Set VITE_API_URL in production (e.g. https://fitsync-api.vercel.app)
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Attach the auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Resolve with the response body; reject with { status, message, details }
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({ message: 'Request timed out. Please try again.' });
    }

    if (!error.response) {
      return Promise.reject({
        message: 'Cannot reach the server. Make sure the API is running and try again.'
      });
    }

    const { status, data } = error.response;
    const isAuthRequest = /\/api\/auth\/(login|register|forgot-password|reset-password)/.test(error.config?.url || '');

    // An expired or invalid session anywhere except the auth forms logs the user out
    if (status === 401 && !isAuthRequest && localStorage.getItem('authToken')) {
      window.dispatchEvent(new CustomEvent('auth:expired', { detail: data?.message }));
    }

    return Promise.reject({
      status,
      message: data?.message || data?.error || 'Something went wrong. Please try again.',
      details: data?.details
    });
  }
);

export default api;
