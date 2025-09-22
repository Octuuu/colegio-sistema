const ProductosDisponibles = ({ productos, agregarAlCarrito }) => {
  return (
    <div className="mb-4">
      <label>Productos/Servicios:</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {productos.map((p) => (
          <button
            key={p.id}
            type="button"
            className="border p-2 rounded hover:bg-gray-200"
            onClick={() => agregarAlCarrito(p)}
          >
            {p.nombre} - ${p.precio_unitario}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductosDisponibles;
