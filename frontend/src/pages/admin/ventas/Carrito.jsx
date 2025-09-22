const Carrito = ({ carrito, cambiarCantidad, total }) => {
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
          </tr>
        </thead>
        <tbody>
          {carrito.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">
                <input
                  type="number"
                  min="1"
                  value={p.cantidad}
                  onChange={(e) => cambiarCantidad(p.id, parseInt(e.target.value))}
                  className="w-16 border rounded p-1"
                />
              </td>
              <td className="p-2">${p.precio_unitario}</td>
              <td className="p-2">${p.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 font-bold">Total: ${total}</p>
    </div>
  );
};

export default Carrito;
