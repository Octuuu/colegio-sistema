import { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { obtenerAlumnosPorCurso } from '../../services/cursoService';
import { eliminarAlumno } from '../../services/alumnoService';

const AlumnosPorCurso = () => {
  const { id: cursoId } = useParams();
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarAlumnos = useCallback(async () => {
    try {
      const data = await obtenerAlumnosPorCurso(cursoId, token);
      setAlumnos(data);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
    } finally {
      setLoading(false);
    }
  }, [cursoId, token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        await eliminarAlumno(id, token);
        await cargarAlumnos();
      } catch (error) {
        console.error('Error al eliminar alumno:', error);
        setError('❌ No se puede eliminar este alumno. Puede estar vinculado a otros registros o ha ocurrido un error.');
      }
    }
  };

  const cerrarError = () => setError(null);

  useEffect(() => {
    cargarAlumnos();
  }, [cargarAlumnos]);

  if (loading) return <p className="p-4">Cargando alumnos...</p>;

  return (
    <div className="relative">
      {/* Modal de error */}
      {error && (
        <div className="min-h-[100vh] absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button
              onClick={cerrarError}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div className={`${error ? 'blur-sm pointer-events-none select-none' : ''} p-6`}>
        <h2 className="text-2xl font-bold mb-4">Alumnos del curso {cursoId}</h2>

        {alumnos.length === 0 ? (
          <p>No hay alumnos registrados en este curso.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Email</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td className="p-2">{alumno.nombre}</td>
                  <td className="p-2">{alumno.apellido}</td>
                  <td className="p-2">{alumno.email}</td>
                  <td className="p-2">
                    <Link
                      to={`/admin/editarAlumnos/${alumno.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(alumno.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AlumnosPorCurso;
