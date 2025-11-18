import { FiPackage, FiPlus, FiX } from "react-icons/fi";

const ProductosDisponibles = ({ productos, agregarAlCarrito, formatCurrency }) => {
  if (productos.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <FiPackage className="text-gray-400 dark:text-gray-500 mx-auto mb-2" size={32} />
          <p className="text-gray-500 dark:text-gray-400">No hay productos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <FiPackage className="text-green-600 dark:text-green-400 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Productos y Servicios Disponibles
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {productos.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {productos.map((producto) => (
          <button
            key={producto.id}
            onClick={() => agregarAlCarrito(producto)}
            disabled={producto.stock <= 0}
            className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all duration-200 group ${
              producto.stock > 0
                ? "border-gray-200 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                : "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60"
            }`}
          >
            <div className="text-left flex-1">
              <h3 className={`font-semibold ${
                producto.stock > 0
                  ? "text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300"
                  : "text-gray-500 dark:text-gray-400"
              }`}>
                {producto.nombre}
              </h3>
              <p className={`text-sm ${
                producto.stock > 0
                  ? "text-gray-600 dark:text-gray-400"
                  : "text-gray-500 dark:text-gray-500"
              }`}>
                {formatCurrency(producto.precio_unitario)}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  producto.stock > 0
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}>
                  Stock: {producto.stock}
                </span>
              </div>
            </div>
            {producto.stock > 0 ? (
              <FiPlus className="text-green-600 group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300" size={20} />
            ) : (
              <FiX className="text-red-500" size={20} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductosDisponibles;