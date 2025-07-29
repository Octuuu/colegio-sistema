import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.js';

const DashboardAlumno = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Panel del Alumno';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          ¡Bienvenido, {user?.nombre || 'Alumno'}!
        </h1>

        <p className="text-gray-700 mb-6">
          Este es tu panel de control donde podrás ver tus materias, tus calificaciones y tus asistencias.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">📚 Materias</h2>
            <p className="text-gray-600">Ver materias asignadas</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-green-700 mb-2">📝 Calificaciones</h2>
            <p className="text-gray-600">Revisar notas y promedios</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">📅 Asistencias</h2>
            <p className="text-gray-600">Ver registro de asistencias</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAlumno;
