import { FiPackage, FiPlus } from "react-icons/fi";

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
            Productos Disponibles
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {productos.length} productos encontrados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {productos.map((producto) => (
          <button
            key={producto.id}
            onClick={() => agregarAlCarrito(producto)}
            className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 group"
          >
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300">
                {producto.nombre}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatCurrency(producto.precio_unitario)}
              </p>
              {producto.descripcion && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                  {producto.descripcion}
                </p>
              )}
            </div>
            <FiPlus className="text-green-600 group-hover:text-green-700 dark:text-green-400 dark:group-hover:text-green-300" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductosDisponibles;