import { useState, useEffect } from 'react';

const ProveedorForm = ({ proveedor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  useEffect(() => {
    if (proveedor) {
      setFormData({
        nombre: proveedor.nombre || '',
        tipo: proveedor.tipo || '',
        telefono: proveedor.telefono || '',
        correo: proveedor.correo || '',
        direccion: proveedor.direccion || ''
      });
    } else {
      setFormData({ nombre: '', tipo: '', telefono: '', correo: '', direccion: '' });
    }
  }, [proveedor]);

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
        {proveedor ? 'Editar Proveedor' : 'Crear Proveedor'}
      </h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="text"
        name="tipo"
        placeholder="Tipo (local, externo...)"
        value={formData.tipo}
        onChange={handleChange}
        required
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
        className="border border-slate-500 h-[36px] font-semibold pl-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
      />

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
          {proveedor ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default ProveedorForm;
