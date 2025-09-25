import { useState, useEffect } from "react";

const InsumoForm = ({ insumo, onSubmit, onCancel, proveedores }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    unidad: "kg",
    proveedor_id: "",
  });

  useEffect(() => {
    if (insumo) setForm(insumo);
  }, [insumo]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ nombre: "", descripcion: "", cantidad: 0, unidad: "kg", proveedor_id: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded shadow mb-6">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="p-2 border rounded"
          required
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 border rounded"
          required
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          className="p-2 border rounded"
          required
        />
        <select
          name="unidad"
          value={form.unidad}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="kg">Kg</option>
          <option value="litros">Litros</option>
          <option value="cajas">Cajas</option>
          <option value="unidades">Unidades</option>
        </select>
        <select
          name="proveedor_id"
          value={form.proveedor_id}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Seleccionar proveedor</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {insumo ? "Actualizar" : "Crear"}
        </button>
        {insumo && (
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
  );
};

export default InsumoForm;
