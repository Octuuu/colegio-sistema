import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  actualizarStock
} from '../../services/productoService';
import { obtenerProveedores } from '../../services/proveedorService';
import ProductForm from './ProductForm';

const Productos = () => {
  const { token } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [proveedores, setProveedores] = useState([]);

  const fetchProductos = async () => {
    try {
      const data = await obtenerProductos(token);
      setProductos(data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener productos');
    }
  };

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
    fetchProductos();
    fetchProveedores();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await crearProducto(formData, token);
      fetchProductos();
      alert('Producto creado');
    } catch (err) {
      console.error(err);
      alert('Error al crear producto');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await actualizarProducto(editing.id, formData, token);
      setEditing(null);
      fetchProductos();
      alert('Producto actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar producto');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Desea eliminar este producto?')) return;
    try {
      await eliminarProducto(id, token);
      fetchProductos();
      alert('Producto eliminado');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto');
    }
  };

  const handleStockChange = async (id) => {
    const cantidad = parseInt(prompt('Ingrese cantidad para agregar o restar del stock (negativo para disminuir):'));
    if (isNaN(cantidad)) return;
    try {
      await actualizarStock(id, cantidad, token);
      fetchProductos();
      alert('Stock actualizado');
    } catch (err) {
      console.error(err);
      alert('Error al actualizar stock');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>

      <ProductForm
        producto={editing}
        onSubmit={editing ? handleUpdate : handleCreate}
        onCancel={() => setEditing(null)}
        proveedores={proveedores}
      />

      <table className="min-w-full mt-6 bg-white dark:bg-gray-800 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Proveedor</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.descripcion}</td>
              <td className="p-2">{p.precio}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">{p.proveedor_nombre || '-'}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleStockChange(p.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Stock
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
          {productos.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4">No hay productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
