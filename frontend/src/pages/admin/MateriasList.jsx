import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerMaterias, eliminarMateria } from '../../services/crearMateria.js';
import Modal from '../../components/Modal';
import EditarMateria from './EditMateria';
import CreateSubject from './CreateSubject.jsx';
import Notification from '../../components/Notification.jsx';
import ListaGenerica from '../../components/ListaGenerica.jsx';

const MateriasList = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [modo, setModo] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // 🔹 Cargar materias
  const cargarMaterias = useCallback(async () => {
    try {
      const data = await obtenerMaterias(token);
      setMaterias(data);
    } catch (error) {
      console.error('Error al cargar materias:', error);
      setNotification({ message: 'Error al cargar materias', type: 'error' });
    }
  }, [token]);

  // 🔹 Eliminar materia
  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta materia?')) {
      try {
        await eliminarMateria(id, token);
        setNotification({ message: 'Materia eliminada correctamente', type: 'success' });
        await cargarMaterias();
      } catch (error) {
        console.error(error);
        setNotification({ message: 'No se pudo eliminar la materia', type: 'error' });
      }
    }
  };

  // 🔹 Editar materia
  const handleEdit = (materia) => {
    setMateriaSeleccionada(materia);
    setModo('editar');
    setIsModalOpen(true);
  };

  // 🔹 Crear materia
  const handleCreate = () => {
    setMateriaSeleccionada(null);
    setModo('crear');
    setIsModalOpen(true);
  };

  useEffect(() => {
    cargarMaterias();
  }, [cargarMaterias]);

  return (
    <div className="p-6">
      {/* 🔸 Notificación */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      {/* 🔸 Encabezado */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Materias registradas</h2>
        <div className="flex gap-4">
          <button
            onClick={handleCreate}
            className="bg-gray-50 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            Crear materia
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-gray-50 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
          >
            Volver al tablero
          </button>
        </div>
      </div>

      {/* 🔸 Lista genérica */}
      <ListaGenerica
        title="Listado de materias"
        columns={[
          { key: 'nombre', label: 'Nombre' },
          { key: 'descripcion', label: 'Descripción' },
        ]}
        data={materias}
        renderActions={(materia) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(materia)}
              className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(materia.id)}
              className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
            >
              Eliminar
            </button>
          </div>
        )}
      />

      {/* 🔸 Modal para Crear / Editar */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modo === 'editar' && materiaSeleccionada && (
          <EditarMateria
            materia={materiaSeleccionada}
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Materia actualizada correctamente', type: 'success' });
              cargarMaterias();
            }}
          />
        )}
        {modo === 'crear' && (
          <CreateSubject
            onSuccess={() => {
              setIsModalOpen(false);
              setNotification({ message: 'Materia creada correctamente', type: 'success' });
              cargarMaterias();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default MateriasList;
