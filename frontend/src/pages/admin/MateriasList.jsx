import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerMaterias, eliminarMateria } from '../../services/crearMateria.js';
import { Link } from 'react-router-dom';

const MateriasList = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);

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

  useEffect(() => {
    cargarMaterias();
  }, [cargarMaterias]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Materias registradas</h2>
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
            <tr key={m.id}>
              <td className="p-2">{m.nombre}</td>
              <td className="p-2">{m.descripcion}</td>
              <td className="p-2 space-x-2">
                <Link to={`/admin/editarMaterias/${m.id}`} className="text-blue-600">Editar</Link>
                <button onClick={() => handleDelete(m.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MateriasList;
