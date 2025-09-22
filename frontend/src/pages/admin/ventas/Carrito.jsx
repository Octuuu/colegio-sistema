import React from "react";

const Carrito = ({ carrito, cambiarCantidad, eliminarUno, total, formatCurrency }) => {
  if (carrito.length === 0) return null;

  return (
    <div className="mb-4">
      <h3 className="font-bold mb-2">Carrito:</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Producto</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Precio Unitario</th>
            <th className="p-2">Subtotal</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">
                <div className="flex items-center gap-2">
  <button
    onClick={() => cambiarCantidad(p.id, p.cantidad - 1)}
    disabled={p.cantidad <= 1}
    className="px-2 bg-gray-300 rounded"
  >
    -
  </button>
  <span>{p.cantidad}</span>
  <button
    onClick={() => cambiarCantidad(p.id, p.cantidad + 1)}
    disabled={p.cantidad >= p.cantidad + p.stock}
    className="px-2 bg-gray-300 rounded"
  >
    +
  </button>
</div>

              </td>
              <td className="p-2">{formatCurrency(p.precio_unitario)}</td>
              <td className="p-2">{formatCurrency(p.subtotal)}</td>
              <td className="p-2 flex gap-1">
                <button
                  onClick={() => eliminarUno(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  ➖
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 font-bold">Total: {formatCurrency(total)}</p>
    </div>
  );
};

export default Carrito;
