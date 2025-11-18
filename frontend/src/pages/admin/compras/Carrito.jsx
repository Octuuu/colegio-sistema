import { FiMinus, FiPlus, FiTrash2, FiPackage, FiBox } from "react-icons/fi";

const Carrito = ({ titulo, carrito, cambiarCantidad, eliminarUno, total, formatCurrency, tipo }) => {
  if (carrito.length === 0) return null;

  const bgColor = tipo === "producto" ? "green" : "yellow";

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 bg-${bgColor}-100 dark:bg-${bgColor}-900/30 rounded-lg`}>
              {tipo === "producto" ? (
                <FiPackage className={`text-${bgColor}-600 dark:text-${bgColor}-400 text-xl`} />
              ) : (
                <FiBox className={`text-${bgColor}-600 dark:text-${bgColor}-400 text-xl`} />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {titulo}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {carrito.length} {tipo === "producto" ? "productos" : "insumos"} en el carrito
              </p>
            </div>
          </div>
          <span className={`px-3 py-1 bg-${bgColor}-100 text-${bgColor}-700 dark:bg-${bgColor}-900 dark:text-${bgColor}-300 rounded-full text-sm font-medium`}>
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Precio Unit.
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subtotal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {carrito.map((item, index) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  index % 2 === 0 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  <div className="font-medium">{item.nombre}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                      className={`p-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg min-w-12 text-center font-medium">
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                      className="p-1 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {formatCurrency(item.precio_unitario)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">
                  {formatCurrency(item.subtotal)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => eliminarUno(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Eliminar del carrito"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Carrito;