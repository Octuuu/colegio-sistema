const SeleccionarProveedor = ({ proveedores, selectedProveedor, setSelectedProveedor }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold block">Seleccionar Proveedor:</label>
      <select
        value={selectedProveedor || ""}
        onChange={(e) => setSelectedProveedor(Number(e.target.value))}
        className="border p-2 rounded w-full"
      >
        <option value="">-- Seleccionar --</option>
        {proveedores.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeleccionarProveedor;
