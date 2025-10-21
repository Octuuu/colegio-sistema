import React from "react";

const ProductosDisponibles = ({ productos, agregarAlCarrito, formatCurrency }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold">Productos disponibles:</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {productos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => agregarAlCarrito(p)}
            className="border p-2 rounded flex justify-between items-center hover:bg-green-100"
          >
            <span>{p.nombre} - {formatCurrency(p.precio_unitario)}</span>
            <span className="text-green-600 font-bold ml-2">+</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductosDisponibles;
