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
import Notification from '../../../components/Notification';
import { Package } from 'lucide-react';

const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat('es-PY', {
    style: 'currency',
    currency: 'PYG',
    minimumFractionDigits: 0,
  }).format(number);
};

const Productos = () => {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await obtenerProductos(token);
      setProductos(data);
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al obtener productos', type: 'error' });
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
      setNotification({ message: 'Error al obtener proveedores', type: 'error' });
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
      setNotification({ message: 'Producto eliminado correctamente', type: 'success' });
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al eliminar producto', type: 'error' });
    }
  };

  const handleStockChange = async (id) => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const cantidad = parseInt(prompt('Ingrese cantidad para agregar o restar del stock (negativo para disminuir):'));
    if (isNaN(cantidad)) return;

    if (producto.stock + cantidad < 0) {
      setNotification({ message: 'No se puede reducir el stock por debajo de 0', type: 'error' });
      return;
    }

    try {
      await actualizarStock(id, cantidad, token);
      await fetchProductos();
      setNotification({ message: 'Stock actualizado correctamente', type: 'success' });
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al actualizar stock', type: 'error' });
    }
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (editing) {
        await actualizarProducto(editing.id, formData, token);
        setNotification({ message: 'Producto actualizado correctamente', type: 'success' });
      } else {
        await crearProducto(formData, token);
        setNotification({ message: 'Producto creado correctamente', type: 'success' });
      }
      setEditing(null);
      setIsModalOpen(false);
      fetchProductos();
    } catch (err) {
      console.error(err);
      setNotification({ message: 'Error al guardar producto', type: 'error' });
    }
  };

  return (
    <div className="relative mt-5 h-[80vh] flex flex-col">
      {/* 🔔 Notificación global */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}

      {/* 💠 Encabezado */}
      <div className="flex items-center justify-between mb-7 ml-4 sm:ml-0">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Gestión de Productos
          </h1>
        </div>
        <button
          onClick={handleCreate}
          className="border border-gray-400 text-gray-700 bg-gray-100 px-3 py-1 rounded-xl shadow-sm hover:bg-gray-200 transition"
        >
          + Crear Producto
        </button>
      </div>

      {/* 🧾 Tabla de productos */}
      <div className="flex-1 overflow-x-auto overflow-y-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 shadow-sm">
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Nombre</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Descripción</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Precio</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Stock</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Proveedor</th>
              <th className="p-3 text-center font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 dark:text-gray-400">
                  Cargando productos...
                </td>
              </tr>
            ) : productos.length > 0 ? (
              productos.map((p, index) => (
                <tr
                  key={p.id}
                  className={`group text-center transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-3">{p.nombre}</td>
                  <td className="p-3">{p.descripcion}</td>
                  <td className="p-3">{formatCurrency(p.precio_unitario)}</td>
                  <td className="p-3 relative">
                    {p.stock <= 5 ? (
                      <span className="relative inline-block group">
                        <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold cursor-pointer">
                          {p.stock}
                        </span>
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Stock bajo: ¡Quedan {p.stock} unidades!
                        </span>
                      </span>
                    ) : (
                      p.stock
                    )}
                  </td>
                  <td className="p-3">{p.proveedor_nombre || '-'}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="border border-blue-400 text-blue-700 bg-blue-100 px-2 py-1 rounded-xl hover:bg-blue-200 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleStockChange(p.id)}
                        className="border border-green-400 text-green-700 bg-green-100 px-2 py-1 rounded-xl hover:bg-green-200 transition"
                      >
                        Stock
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="border border-red-400 text-red-700 bg-red-100 px-2 py-1 rounded-xl hover:bg-red-200 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 dark:text-gray-400">
                  No hay productos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🪟 Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditing(null);
        }}
      >
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
