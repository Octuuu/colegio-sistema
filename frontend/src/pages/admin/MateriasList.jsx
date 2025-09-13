import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerMaterias, eliminarMateria } from '../../services/crearMateria.js';
import Modal from '../../components/Modal';
import EditarMateria from './EditMateria';
import CreateSubject from './CreateSubject.jsx';

const MateriasList = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  const cargarMaterias = useCallback(async () => {
    const data = await obtenerMaterias(token);
    setMaterias(data);
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta materia?')) {
      await eliminarMateria(id, token);
      await cargarMaterias(); // Recargar lista
    }
  };

  const handleEdit = (materia) => {
    setMateriaSeleccionada(materia);
    setIsModalOpen(true);
  };

  useEffect(() => {
    cargarMaterias();
  }, [cargarMaterias]);

  return (
    <div className="p-6">

      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Materias registradas</h2>

        <div className='flex gap-10'>
          <h1 >Crear materia</h1>
          <h1>volver al tablero</h1>
        </div>
      </div>
    
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id} className='text-center'>
              <td className="p-2">{m.nombre}</td>
              <td className="p-2">{m.descripcion}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {materiaSeleccionada && (
            <EditarMateria
            materia={materiaSeleccionada}
            onClose={() => {
              setIsModalOpen(false);
              cargarMaterias(); 
            }}
          />
          
        )}
      </Modal>
    </div>
  );
};

export default MateriasList;
