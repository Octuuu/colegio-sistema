import { useState, useEffect } from 'react';

const ProductForm = ({ producto, onSubmit, onCancel, proveedores }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    proveedor_id: ''
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        proveedor_id: producto.proveedor_id || ''
      });
    } else {
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', proveedor_id: '' });
    }
  }, [producto]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow grid gap-4 max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        {producto ? 'Editar Producto' : 'Crear Producto'}
      </h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
        title="Solo se permiten letras y espacios"
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="text"
        name="descripcion"
        pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
        title="Solo se permiten letras y espacios"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="number"
        name="stock"
        placeholder="Stock inicial"
        value={formData.stock}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <select
        name="proveedor_id"
        value={formData.proveedor_id}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      >
        <option value="">Seleccionar proveedor</option>
        {proveedores.map((p) => (
          <option key={p.id} value={p.id}>{p.nombre}</option>
        ))}
      </select>

      <div className="flex justify-between mt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {producto ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
