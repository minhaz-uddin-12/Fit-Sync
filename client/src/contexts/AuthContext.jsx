import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return token && user ? JSON.parse(user) : null;
  } catch {
    authService.logout();
    return null;
  }
};

export const dashboardPath = (role) =>
  role === 'admin' ? '/admin/dashboard' : role === 'trainer' ? '/trainer/dashboard' : '/dashboard';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Refresh the stored user from the server; drops sessions that are no longer valid
  useEffect(() => {
    if (!localStorage.getItem('authToken')) return;
    authService.me().then(setUser).catch((error) => {
      if (error.status === 401 || error.status === 404) {
        authService.logout();
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const onExpired = (e) => {
      authService.logout();
      setUser(null);
      showNotification(e.detail || 'Your session has expired. Please log in again.', 'error');
      navigate('/login');
    };
    window.addEventListener('auth:expired', onExpired);
    return () => window.removeEventListener('auth:expired', onExpired);
  }, [navigate, showNotification]);

  return (
    <AuthContext.Provider value={{ user, login: setUser, updateUser: setUser, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
