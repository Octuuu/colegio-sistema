import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerProfesor, eliminarProfesor } from '../../services/profesorService';
import Modal from '../../components/Modal';
import EditarProfesor from './EditProfesor.jsx';
import CrearProfesor from './CreateTeacher.jsx';
import AsignarMaterias from './AsignedSubject.jsx';
import Notification from '../../components/Notification.jsx';
import { Users } from 'lucide-react';

const ProfesorList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const { token } = useContext(AuthContext);
  const [profesores, setProfesores] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const cargarProfesores = useCallback(async () => {
    try {
      const data = await obtenerProfesor(token);
      setProfesores(data);
    } catch (error) {
      console.error('Error al cargar profesores:', error);
      setNotification({ message: 'Error al cargar profesores', type: 'error' });
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este profesor?')) {
      try {
        await eliminarProfesor(id, token);
        setNotification({ message: 'Profesor eliminado correctamente', type: 'success' });
        await cargarProfesores();
      } catch (error) {
        console.error(error);
        setNotification({ message: 'No se pudo eliminar el profesor', type: 'error' });
      }
    }
  };

  const handleEdit = (profesor) => {
    setProfesorSeleccionado(profesor);
    setModalType('editar');
    setIsModalOpen(true);
  };

  const handleAsignar = (profesor) => {
    setProfesorSeleccionado(profesor);
    setModalType('asignar');
    setIsModalOpen(true);
  };

  const handleCrear = () => {
    setModalType('crear');
    setIsModalOpen(true);
  };

  useEffect(() => {
    cargarProfesores();
  }, [cargarProfesores]);

  return (
    <div className="relative h-[75vh] mt-5 flex flex-col">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Profesores registrados</h1>
        </div>

        <button
          onClick={handleCrear}
          className="text-violet-700 bg-violet-100 hover:bg-violet-200 border border-violet-300 px-3 py-2 rounded-xl transition font-medium"
        >
          Crear profesor
        </button>
      </div>

      {/* Tabla */}
      <div className="flex-1 overflow-x-auto overflow-y-auto border rounded-lg shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
            <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <th className="p-2 font-semibold">Nombre</th>
              <th className="p-2 font-semibold">Apellido</th>
              <th className="p-2 font-semibold">Teléfono</th>
              <th className="p-2 font-semibold">Correo</th>
              <th className="p-2 font-semibold">Cédula</th>
              <th className="p-2 font-semibold">Dirección</th>
              <th className="p-2 font-semibold">Estado</th>
              <th className="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500 dark:text-gray-400">
                  No hay profesores registrados
                </td>
              </tr>
            ) : (
              profesores.map((p, index) => (
                <tr
                  key={p.id}
                  className={`text-center transition-colors duration-200 ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-gray-800'
                      : 'bg-gray-50 dark:bg-gray-900'
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.nombre}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.apellido}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.telefono}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.correo}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.cedula}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.direccion}</td>
                  <td className="p-2">
                    {p.estado === 1 ? (
                      <span className="text-green-600 font-semibold">Activo</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Inactivo</span>
                    )}
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="border-blue-400 text-blue-700 border bg-blue-100 px-2 py-1 rounded-xl hover:bg-blue-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="border-red-400 text-red-700 border bg-red-100 px-2 py-1 rounded-xl hover:bg-red-200 transition"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleAsignar(p)}
                      className="border-green-400 text-green-700 border bg-green-100 px-2 py-1 rounded-xl hover:bg-green-200 transition"
                    >
                      Asignar materias
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalType === 'editar' && profesorSeleccionado && (
          <EditarProfesor
            profesor={profesorSeleccionado}
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Profesor actualizado correctamente', type: 'success' });
              cargarProfesores();
            }}
          />
        )}
        {modalType === 'crear' && (
          <CrearProfesor
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Profesor creado correctamente', type: 'success' });
              cargarProfesores();
            }}
          />
        )}
        {modalType === 'asignar' && profesorSeleccionado && (
          <AsignarMaterias
            profesor={profesorSeleccionado}
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Materias asignadas correctamente', type: 'success' });
              cargarProfesores();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProfesorList;
