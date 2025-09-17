import { useState, useEffect } from 'react';

const ProveedorForm = ({ proveedor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    telefono: '',
    correo: '',
    direccion: ''
  });

  // Si hay un proveedor seleccionado para editar, rellenamos el formulario
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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow grid gap-4">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="tipo"
        placeholder="Tipo (local, externo...)"
        value={formData.tipo}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="telefono"
        placeholder="Teléfono"
        value={formData.telefono}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={formData.direccion}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {proveedor ? 'Actualizar' : 'Crear'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProveedorForm;
