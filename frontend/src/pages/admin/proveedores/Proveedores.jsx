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
import ListaGenerica from '../../../components/ListaGenerica.jsx';

const Proveedores = () => {
  const { token } = useContext(AuthContext);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // 🔹 Cargar proveedores
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

  // 🔹 Crear o editar proveedor
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

  // 🔹 Eliminar proveedor
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
      {/* 🔸 Notificación */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      {/* 🔸 Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Gestión de Proveedores
        </h1>
        <button
          onClick={handleCreate}
          className="bg-gray-50 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          + Crear Proveedor
        </button>
      </div>

      {/* 🔹 Lista genérica */}
      <ListaGenerica
        title=""
        loading={loading}
        columns={[
          { key: 'nombre', label: 'Nombre' },
          { key: 'tipo', label: 'Tipo' },
          { key: 'telefono', label: 'Teléfono' },
          { key: 'correo', label: 'Correo' },
          { key: 'direccion', label: 'Dirección' },
          {
            key: 'estado',
            label: 'Estado',
            render: (estado) =>
              estado === 1 ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                  Activo
                </span>
              ) : (
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm">
                  Inactivo
                </span>
              ),
          },
        ]}
        data={proveedores}
        renderActions={(p) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(p)}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
            >
              Eliminar
            </button>
          </div>
        )}
      />

      {/* 🔹 Modal para crear/editar */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditing(null);
        }}
      >
        <ProveedorForm
          proveedor={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditing(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default Proveedores;
