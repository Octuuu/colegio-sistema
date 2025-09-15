import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerProfesor, eliminarProfesor } from '../../services/profesorService';
import Modal from '../../components/Modal';
import EditarProfesor from './EditProfesor';

const ProfesorList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(null);
  const { token } = useContext(AuthContext);
  const [profesores, setProfesores] = useState([]);

  const cargarProfesores = useCallback(async () => {
    const data = await obtenerProfesor(token);
    setProfesores(data);
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este profesor?')) {
      await eliminarProfesor(id, token);
      await cargarProfesores();
    }
  };

  const handleEdit = (profesor) => {
    setProfesorSeleccionado(profesor);
    setIsModalOpen(true);
  };

  useEffect(() => {
    cargarProfesores();
  }, [cargarProfesores]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profesores registrados</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Cédula</th>
            <th className="p-2">Dirección</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesores.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.apellido}</td>
              <td className="p-2">{p.telefono}</td>
              <td className="p-2">{p.correo}</td>
              <td className="p-2">{p.cedula}</td>
              <td className="p-2">{p.direccion}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {profesorSeleccionado && (
          <EditarProfesor
            profesor={profesorSeleccionado}
            onClose={() => {
              setIsModalOpen(false);
              cargarProfesores();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ProfesorList;
