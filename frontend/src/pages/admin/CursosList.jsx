import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerCurso, eliminarCurso } from '../../services/cursoService.js';
import { Link } from 'react-router-dom';

const CursosList = () => {
  const { token } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);

  const cargarCursos = useCallback(async () => {
    try {
      const data = await obtenerCurso(token);
      setCursos(data);
    } catch (err) {
      console.error('Error al obtener cursos:', err);
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await eliminarCurso(id, token);
        await cargarCursos();
      } catch (error) {
        error
        setError('❌ No se puede eliminar el curso porque tiene alumnos asignados. Edita o elimina los alumnos primero.');
      }
    }
  };

  const cerrarError = () => {
    setError(null);
  };

  useEffect(() => {
    cargarCursos();
  }, [cargarCursos]);

  return (
    <div className="relative">
    
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
        <h2 className="text-2xl font-bold mb-4">Cursos registrados</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Año</th>
              <th className="p-2">Nombre del curso</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((c) => (
              <tr key={c.id}>
                <td className="p-2">{c.anio}°</td>
                <td className="p-2">{c.bachillerato}</td>
                <td className="p-2 space-x-2">
                  <Link
                    to={`/admin/editarCursos/${c.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>

                  <Link
                    to={`/admin/${c.id}/alumnos`}
                    className="text-blue-600 hover:underline"
                  >
                    Ver alumnos
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CursosList;
