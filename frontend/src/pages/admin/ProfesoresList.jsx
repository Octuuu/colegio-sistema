import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerProfesor, eliminarProfesor } from '../../services/profesorService';
import { Link } from 'react-router-dom';

const ProfesorList = () => {
  const { token } = useContext(AuthContext);
  const [profesor, setProfesor] = useState([]);

  const cargarProfesor = useCallback(async () => {
    const data = await obtenerProfesor(token);
    setProfesor(data);
  }, [token]);

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este profesor?')) {
      await eliminarProfesor(id, token);
      await cargarProfesor(); // Recargar lista
    }
  };

  useEffect(() => {
    cargarProfesor();
  }, [cargarProfesor]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Materias registradas</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">Telefono</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Cedula</th>
            <th className="p-2">Direccion</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesor.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.apellido}</td>
              <td className="p-2">{p.telefono}</td>
              <td className="p-2">{p.correo}</td>
              <td className="p-2">{p.cedula}</td>
              <td className="p-2">{p.direccion}</td>
              <td className="p-2 space-x-2">
                <Link to={`/admin/editarProfesor/${p.id}`} className="text-blue-600">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfesorList;
