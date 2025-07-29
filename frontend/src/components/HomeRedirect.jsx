import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js'; // ✅ Import correcto

export default function HomeRedirect() {
  const { user } = useContext(AuthContext); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.rol_id) {
    case 1:
      return <Navigate to="/admin/dashboard" replace />;
    case 2:
      return <Navigate to="/profesor/dashboard" replace />;
    case 3:
      return <Navigate to="/alumno/dashboard" replace />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
}
