import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext.js';
import { obtenerCurso } from '../../../services/cursoService.js';
import Modal from '../../../components/Modal.jsx';
import CrearAlumno from './Alumnos.jsx';

const AlumnosCursos = () => {
  const { token } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarCursos = useCallback(async () => {
    try {
      const data = await obtenerCurso(token);
      setCursos(data);
    } catch (err) {
      console.error('Error al obtener cursos:', err);
      setError('Error al cargar cursos');
    }
  }, [token]);

  const cerrarError = () => {
    setError(null);
  };

  useEffect(() => {
    cargarCursos();
  }, [cargarCursos]);

  return (
    <div className="relative h-[80vh] p-6">
      {error && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
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

      <div className={`${error ? 'blur-sm pointer-events-none select-none' : ''} flex flex-col h-full`}>
        <div className="flex justify-between mb-5">
          <h1 className="text-2xl">Alumnos de cada curso</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
            >
              Crear alumno
            </button>
            <select className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm">
              <option value="">Ordenar</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto border rounded">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="font-normal p-2">Año</th>
                <th className="font-normal p-2">Nombre del curso</th>
                <th className="font-normal p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No hay cursos
                  </td>
                </tr>
              ) : (
                cursos.map((c) => (
                  <tr key={c.id} className="border-y text-center">
                    <td className="p-2">{c.anio}°</td>
                    <td className="p-2">{c.bachillerato}</td>
                    <td className="p-3 space-x-16 font-medium">
                      <a
                        href={`/admin/${c.id}/alumnos`}
                        className="text-green-700 bg-green-100 px-2 py-1 rounded-xl hover:bg-green-200 border-green-300 border font-normal"
                      >
                        Ver alumnos
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CrearAlumno
          onClose={() => {
            setIsModalOpen(false);
            cargarCursos(); 
          }}
        />
      </Modal>
    </div>
  );
};

export default AlumnosCursos;
