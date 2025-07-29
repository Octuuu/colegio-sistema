import { Navigate, Outlet } from 'react-router-dom';
import useAuth  from '../hooks/useAuth';

export function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.rol_id)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}
