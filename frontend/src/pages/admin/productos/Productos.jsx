import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  actualizarStock
} from '../../../services/productoService';
import { obtenerProveedores } from '../../../services/proveedorService';
import Modal from '../../../components/Modal';
import ProductForm from './ProductForm';

const Productos = () => {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // <- Notificación

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await obtenerProductos(token);
      setProductos(data);
    } catch (err) {
      console.error(err);
      showNotification('Error al obtener productos', 'error');
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
    fetchProductos();
    fetchProveedores();
  }, []);

  const handleCreate = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const handleEdit = (producto) => {
    setEditing(producto);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ ¿Desea eliminar este producto?')) return;
    try {
      await eliminarProducto(id, token);
      await fetchProductos();
      showNotification('Producto eliminado correctamente');
    } catch (err) {
      console.error(err);
      showNotification('Error al eliminar producto', 'error');
    }
  };

  const handleStockChange = async (id) => {
    const cantidad = parseInt(prompt('Ingrese cantidad para agregar o restar del stock (negativo para disminuir):'));
    if (isNaN(cantidad)) return;
    try {
      await actualizarStock(id, cantidad, token);
      await fetchProductos();
      showNotification('Stock actualizado correctamente');
    } catch (err) {
      console.error(err);
      showNotification('Error al actualizar stock', 'error');
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editing) {
        await actualizarProducto(editing.id, formData, token);
        showNotification('Producto actualizado correctamente');
      } else {
        await crearProducto(formData, token);
        showNotification('Producto creado correctamente');
      }
      setEditing(null);
      setIsModalOpen(false);
      fetchProductos();
    } catch (err) {
      console.error(err);
      showNotification('Error al guardar producto', 'error');
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
          Gestión de Productos
        </h1>
        <button
          onClick={handleCreate}
          className="bg-gray-50 px-2 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          + Crear Producto
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white dark:bg-gray-800 ">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase">
              <th className="p-3">Nombre</th>
              <th className="p-3 ">Descripción</th>
              <th className="p-3 ">Precio</th>
              <th className="p-3 ">Stock</th>
              <th className="p-3 ">Proveedor</th>
              <th className="p-3  text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6">Cargando productos...</td>
              </tr>
            ) : productos.length > 0 ? (
              productos.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.descripcion}</td>
                  <td className="p-3">{p.precio}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.proveedor_nombre || '-'}</td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 bg-blue-100 px-3 py-1 rounded hover:bg-blue-200 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleStockChange(p.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Stock
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm
          producto={editing}
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

export default Productos;
