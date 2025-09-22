import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from '../../../services/proveedorService';
import ProveedorForm from './ProveedorForm';
import Modal from '../../../components/Modal';
import Notification from '../../../components/Notification';

const Proveedores = () => {
  const { token } = useContext(AuthContext);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchProveedores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await obtenerProveedores(token);
      setProveedores(data);
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al cargar proveedores', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProveedores();
  }, [fetchProveedores]);

  
  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await actualizarProveedor(editing.id, formData, token);
        setNotification({ message: 'Proveedor actualizado correctamente', type: 'success' });
      } else {
        await crearProveedor(formData, token);
        setNotification({ message: 'Proveedor creado correctamente', type: 'success' });
      }
      setIsModalOpen(false);
      setEditing(null);
      fetchProveedores();
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al guardar proveedor', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este proveedor?')) return;
    try {
      await eliminarProveedor(id, token);
      fetchProveedores();
      setNotification({ message: 'Proveedor eliminado correctamente', type: 'success' });
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al eliminar proveedor', type: 'error' });
    }
  };

  const handleCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (proveedor) => {
    setEditing(proveedor);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
     
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Gestión de Proveedores
        </h1>
        <button
          onClick={handleCreate}
          className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          + Crear Proveedor
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase">
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Tipo</th>
              <th className="p-3 border">Teléfono</th>
              <th className="p-3 border">Correo</th>
              <th className="p-3 border">Dirección</th>
              <th className="p-3 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6">Cargando proveedores...</td>
              </tr>
            ) : proveedores.length > 0 ? (
              proveedores.map((p) => (
                <tr key={p.id} className="border-b dark:hover:bg-gray-700 transition">
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.tipo}</td>
                  <td className="p-3">{p.telefono}</td>
                  <td className="p-3">{p.correo}</td>
                  <td className="p-3">{p.direccion}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition border border-red-300 "
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No hay proveedores registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditing(null); }}>
        <ProveedorForm
          proveedor={editing}
          onSubmit={handleSubmit}
          onCancel={() => { setIsModalOpen(false); setEditing(null); }}
        />
      </Modal>
    </div>
  );
};

export default Proveedores;
