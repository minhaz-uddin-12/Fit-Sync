/* FRONTEND DEVELOPER
 * Responsible for:
 * - API integration layer
 * - Request/response handling
 * - Error management
 * - Authentication headers
 */

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fit-sync-backend.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timed out. Please try again.'
      });
    }

    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection.'
      });
    }

    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        break;
      case 503:
        return Promise.reject({
          message: 'Server is unavailable. Please try again later.'
        });
    }

    return Promise.reject({
      status: error.response.status,
      message: error.response.data.message || 'An error occurred',
      details: error.response.data.details
    });
  }
);

// Add health check method
api.checkConnection = async () => {
  try {
    const response = await api.get('/health');
    return response.status === 'ok';
  } catch (error) {
    console.error('API Connection Error:', error);
    return false;
  }
};

export default api;
