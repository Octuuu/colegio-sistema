import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerProfesor, eliminarProfesor } from '../../services/profesorService';
import Modal from '../../components/Modal';
import EditarProfesor from './EditProfesor.jsx';
import CrearProfesor from './CreateTeacher.jsx';
import AsignarMaterias from './AsignedSubject.jsx';
import Notification from '../../components/Notification.jsx';

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
    <div className="p-6">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Profesores registrados</h2>
        <button
          onClick={handleCrear}
          className="bg-gray-50 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          Crear profesor
        </button>
      </div>

      <div className="max-h-[500px] overflow-y-auto border rounded ">
        <table className="w-full border-collapse border-0">
          <thead className="bg-gray-50 sticky top-0 z-10 border-0">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Cédula</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Estado</th> {/* 🔹 Nuevo campo */}
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((p) => (
              <tr key={p.id} className="text-center border-t">
                <td className="p-2">{p.nombre}</td>
                <td className="p-2">{p.apellido}</td>
                <td className="p-2">{p.telefono}</td>
                <td className="p-2">{p.correo}</td>
                <td className="p-2">{p.cedula}</td>
                <td className="p-2">{p.direccion}</td>
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
                    className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleAsignar(p)}
                    className="font-medium text-green-700 bg-green-100 px-2 py-1 rounded hover:bg-green-200"
                  >
                    Asignar materias
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
