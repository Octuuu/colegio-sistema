import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../../../services/servicioService';
import { obtenerProveedores } from '../../../services/proveedorService';
import ServicioForm from './ServicioForm';

const Servicios = () => {
  const { token } = useContext(AuthContext);
  const [servicios, setServicios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [proveedores, setProveedores] = useState([]); // <-- aquí

  // Traer servicios
  const fetchServicios = async () => {
    try {
      const data = await obtenerServicios(token);
      setServicios(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener servicios');
    }
  };

  // Traer proveedores
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
    fetchServicios();
    fetchProveedores(); // <-- llamar a la función
  }, []);

  const handleCreate = async (formData) => {
    try {
      await crearServicio(formData, token);
      fetchServicios();
      alert('Servicio creado');
    } catch (err) {
      console.error(err);
      alert('Error al crear servicio');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarServicio(editing.id, formData, token);
      setEditing(null);
      fetchServicios();
      alert('Servicio actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar servicio');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este servicio?')) return;
    try {
      await eliminarServicio(id, token);
      fetchServicios();
      alert('Servicio eliminado');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar servicio');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Servicios</h1>

      <ServicioForm
        servicio={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={() => setEditing(null)}
        proveedores={proveedores} // ahora sí definido
      />

      <table className="min-w-full mt-6 bg-white dark:bg-gray-800 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Costo</th>
            <th className="p-2 border">Proveedor</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-2">{s.nombre}</td>
              <td className="p-2">{s.tipo}</td>
              <td className="p-2">{s.descripcion}</td>
              <td className="p-2">{s.costo}</td>
              <td className="p-2">{s.proveedor_nombre || '-'}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => setEditing(s)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {servicios.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4">No hay servicios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Servicios;
