import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from '../../services/proveedorService';
import ProveedorForm from './ProveedorForm';

const Proveedores = () => {
  const { token } = useContext(AuthContext);
  const [proveedores, setProveedores] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProveedores = async () => {
    try {
      const data = await obtenerProveedores(token);
      setProveedores(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener proveedores');
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await crearProveedor(formData, token);
      fetchProveedores();
      alert('Proveedor creado');
    } catch (err) {
      console.error(err);
      alert('Error al crear proveedor');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarProveedor(editing.id, formData, token);
      setEditing(null);
      fetchProveedores();
      alert('Proveedor actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar proveedor');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este proveedor?')) return;
    try {
      await eliminarProveedor(id, token);
      fetchProveedores();
      alert('Proveedor eliminado');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar proveedor');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Proveedores</h1>

      <ProveedorForm
        proveedor={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={() => setEditing(null)}
      />

      <table className="min-w-full mt-6 bg-white dark:bg-gray-800 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Dirección</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.tipo}</td>
              <td className="p-2">{p.telefono}</td>
              <td className="p-2">{p.correo}</td>
              <td className="p-2">{p.direccion}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {proveedores.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4">No hay proveedores</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;
