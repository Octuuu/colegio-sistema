import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerCurso } from '../../services/cursoService.js';
import { Link } from 'react-router-dom';

const AlumnosCursos = () => {
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
        <div className='flex justify-between mb-5'>
          <h1 className='font-medium text-2xl'>Ver alumnos de cada curso</h1>
          <div className=''>
                <Link
                    to={``}
                    className="text-blue-600  m-10"
                  >
                    Inscribir alumno
                </Link> 
                <Link
                    to={``}
                    className="text-blue-600"
                  >
                    Volver
                </Link> 
          </div>
        </div>
        <table className="w-full ">
          <thead>
            <tr className="">
              <th className="p-2">Año</th>
              <th className="p-2">Nombre del curso</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((c) => (
              <tr key={c.id} className='border-y text-center'>
                <td className="p-2">{c.anio}°</td>
                <td className="p-2">{c.bachillerato}</td>
                <td className="p-3 space-x-16 font-medium">

                  <Link
                    to={`/admin/${c.id}/alumnos`}
                    className="text-green-700 bg-green-100 px-2 py-1 rounded hover:bg-green-200"
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

export default AlumnosCursos;
