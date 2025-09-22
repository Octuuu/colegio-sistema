import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  obtenerServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../../../services/servicioService';
import { obtenerProveedores } from '../../../services/proveedorService';
import Modal from '../../../components/Modal';
import ServicioForm from './ServicioForm';

const Servicios = () => {
  const { token } = useContext(AuthContext);
  const [servicios, setServicios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); 

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchServicios = async () => {
    setLoading(true);
    try {
      const data = await obtenerServicios(token);
      setServicios(data);
    } catch (err) {
      console.error(err);
      showNotification('Error al obtener servicios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProveedores = async () => {
    try {
      const data = await obtenerProveedores(token);
      setProveedores(data);
    } catch (err) {
      console.error(err);
      showNotification('Error al obtener proveedores', 'error');
    }
  };

  useEffect(() => {
    fetchServicios();
    fetchProveedores();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (servicio) => {
    setEditing(servicio);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ ¿Desea eliminar este servicio?')) return;
    try {
      await eliminarServicio(id, token);
      fetchServicios();
      showNotification('Servicio eliminado correctamente');
    } catch (err) {
      console.error(err);
      showNotification('Error al eliminar servicio', 'error');
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editing) {
        await actualizarServicio(editing.id, formData, token);
        showNotification('Servicio actualizado correctamente');
      } else {
        await crearServicio(formData, token);
        showNotification('Servicio creado correctamente');
      }
      setEditing(null);
      setIsModalOpen(false);
      fetchServicios();
    } catch (err) {
      console.error(err);
      showNotification('Error al guardar servicio', 'error');
    }
  };

  return (
    <div className="p-6">

      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Gestión de Servicios
        </h1>
        <button
          onClick={handleCreate}
          className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          + Crear Servicio
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white dark:bg-gray-800 border">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase">
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Tipo</th>
              <th className="p-3 border">Descripción</th>
              <th className="p-3 border">Costo</th>
              <th className="p-3 border">Proveedor</th>
              <th className="p-3 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6">Cargando servicios...</td>
              </tr>
            ) : servicios.length > 0 ? (
              servicios.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3">{s.nombre}</td>
                  <td className="p-3">{s.tipo}</td>
                  <td className="p-3">{s.descripcion}</td>
                  <td className="p-3">{s.costo}</td>
                  <td className="p-3">{s.proveedor_nombre || '-'}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="font-medium text-red-700 bg-red-100 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No hay servicios registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ServicioForm
          servicio={editing}
          onSubmit={handleSubmitForm}
          onCancel={() => {
            setEditing(null);
            setIsModalOpen(false);
          }}
          proveedores={proveedores}
        />
      </Modal>
    </div>
  );
};

export default Servicios;
