import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext.js';
import { obtenerAlumnos, eliminarAlumno } from '../../../services/alumnoService.js';
import Modal from '../../../components/Modal.jsx';
import EditarAlumno from './EditAlumno.jsx';
import CrearAlumno from './Alumnos.jsx';
import InscribirAlumno from '../InscripcionForm.jsx';
import Notification from '../../../components/Notification.jsx';

const AlumnosList = () => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modo, setModo] = useState(null);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const cargarAlumnos = useCallback(async () => {
    try {
      const data = await obtenerAlumnos(token);
      setAlumnos(data);
    } catch (err) {
      console.error('Error al cargar alumnos:', err);
      setNotification({ message: 'Error al cargar alumnos', type: 'error' });
    }
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      try {
        await eliminarAlumno(id, token);
        setNotification({ message: 'Alumno eliminado correctamente', type: 'success' });
        await cargarAlumnos();
      } catch (err) {
        console.error('Error al eliminar alumno:', err);
        setNotification({ message: 'No se pudo eliminar el alumno', type: 'error' });
      }
    }
  };

  const handleEdit = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setModo('editar');
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setAlumnoSeleccionado(null);
    setModo('crear');
    setIsModalOpen(true);
  };

  const handleInscribir = () => {
    setAlumnoSeleccionado(null);
    setModo('inscribir');
    setIsModalOpen(true);
  };

  useEffect(() => {
    cargarAlumnos();
  }, [cargarAlumnos]);

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
        <h2 className="text-2xl font-bold">Alumnos registrados</h2>
        <div className="space-x-3">
          <button
            onClick={handleCreate}
            className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            Crear alumno
          </button>
          <button
            onClick={handleInscribir}
            className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            Inscribir alumno
          </button>
        </div>
      </div>

      <div className="max-h-[500px] overflow-y-auto border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Email</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((a) => (
              <tr key={a.id} className="text-center border-t">
                <td className="p-2">{a.nombre}</td>
                <td className="p-2">{a.apellido}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modo === 'editar' && alumnoSeleccionado && (
          <EditarAlumno
            alumno={alumnoSeleccionado}
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Alumno actualizado correctamente', type: 'success' });
              cargarAlumnos();
            }}
          />
        )}
        {modo === 'crear' && (
          <CrearAlumno
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Alumno creado correctamente', type: 'success' });
              cargarAlumnos();
            }}
          />
        )}
        {modo === 'inscribir' && (
          <InscribirAlumno
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Alumno inscrito correctamente', type: 'success' });
              
              cargarAlumnos();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default AlumnosList;
