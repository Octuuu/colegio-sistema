import React from "react";

const ProductosDisponibles = ({ productos, agregarAlCarrito, formatCurrency }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold">Productos/Servicios:</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {productos.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => agregarAlCarrito(p)}
            disabled={p.stock <= 0}
            className={`border p-2 rounded flex justify-between items-center
              ${p.stock > 0 ? "hover:bg-gray-200" : "bg-gray-300 cursor-not-allowed"}
            `}
          >
            <span>
              {p.nombre} - {formatCurrency(p.precio_unitario)}
            </span>
            {p.stock <= 0 ? (
              <span className="text-red-600 font-bold ml-2">Agotado</span>
            ) : (
              <span className="text-red-600 font-bold ml-2" title="Stock disponible">
                {p.stock}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductosDisponibles;
