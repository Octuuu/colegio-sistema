import { useState, useEffect } from 'react';

const ServicioForm = ({ servicio, onSubmit, onCancel, proveedores }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    descripcion: '',
    costo: '',
    proveedor_id: '', 
  });

  useEffect(() => {
    if (servicio) {
      setFormData({
        nombre: servicio.nombre,
        tipo: servicio.tipo,
        descripcion: servicio.descripcion,
        costo: servicio.costo,
        proveedor_id: servicio.proveedor_id || '',
      });
    }
  }, [servicio]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      nombre: '',
      tipo: '',
      descripcion: '',
      costo: '',
      proveedor_id: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto mb-6 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">
        {servicio ? 'Editar Servicio' : 'Crear Servicio'}
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          name="tipo"
          placeholder="Tipo de servicio"
          value={formData.tipo}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          name="costo"
          type="number"
          placeholder="Costo"
          value={formData.costo}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="proveedor_id"
          value={formData.proveedor_id}
          onChange={handleChange}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Selecciona un proveedor --</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {servicio ? 'Actualizar' : 'Crear'}
          </button>
          {servicio && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServicioForm;
