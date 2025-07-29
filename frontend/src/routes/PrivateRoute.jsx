import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (requiredRole && user.rol !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
};
