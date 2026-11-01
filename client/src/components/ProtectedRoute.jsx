import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, dashboardPath } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Signed in with the wrong role: send them to their own dashboard
  if (roles && !roles.includes(user?.role)) {
    return <Navigate to={dashboardPath(user?.role)} replace />;
  }

  return children;
};
