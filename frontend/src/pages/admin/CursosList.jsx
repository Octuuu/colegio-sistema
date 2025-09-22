import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerCurso, eliminarCurso } from '../../services/cursoService.js';
import Modal from '../../components/Modal';
import CrearCurso from './CreateCourse.jsx';
import EditarCurso from './EditCurso.jsx';
import Notification from '../../components/Notification.jsx';

const CursosList = () => {
  const { token } = useContext(AuthContext);
  const [cursos, setCursos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modo, setModo] = useState(null);
  const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [error, setError] = useState(null);

  const cargarCursos = useCallback(async () => {
    try {
      const data = await obtenerCurso(token);
      setCursos(data);
    } catch (err) {
      console.error('Error al obtener cursos:', err);
      setNotification({ message: 'Error al cargar cursos', type: 'error' });
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await eliminarCurso(id, token);
        setNotification({ message: 'Curso eliminado correctamente', type: 'success' });
        await cargarCursos();
      } catch (error) {
        setError('❌ No se puede eliminar el curso porque tiene alumnos asignados. Edita o elimina los alumnos primero.');
      }
    }
  };

  const handleEdit = (curso) => {
    setCursoSeleccionado(curso);
    setModo("editar");
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setCursoSeleccionado(null);
    setModo("crear");
    setIsModalOpen(true);
  };

  const cerrarError = () => {
    setError(null);
  };

  useEffect(() => {
    cargarCursos();
  }, [cargarCursos]);

  return (
    <div className="relative p-6">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

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

      <div className={`${error ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <div className="flex justify-between mb-5">
          <h1 className="font-medium text-2xl">Cursos Registrados</h1>
          <div>
            <button
              onClick={handleCreate}
              className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
            >
              Crear curso
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
            >
              Volver
            </button>
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto border rounded">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="p-2">Año</th>
                <th className="p-2">Nombre del curso</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((c) => (
                <tr key={c.id} className="text-center border-t">
                  <td className="p-2">{c.anio}°</td>
                  <td className="p-2">{c.bachillerato}</td>
                  <td className="p-3 space-x-2 font-medium">
                    <button
                      onClick={() => handleEdit(c)}
                      className="text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                    <a
                      href={`/admin/${c.id}/alumnos`}
                      className="text-green-700 bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                    >
                      Ver alumnos
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modo === "editar" && cursoSeleccionado && (
          <EditarCurso
            curso={cursoSeleccionado}
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Curso actualizado correctamente', type: 'success' });
              cargarCursos();
            }}
          />
        )}
        {modo === "crear" && (
          <CrearCurso
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Curso creado correctamente', type: 'success' });
              cargarCursos();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default CursosList;
