import { FiBox, FiPlus } from "react-icons/fi";

const InsumosDisponibles = ({ insumos, agregarAlCarrito, formatCurrency }) => {
  if (insumos.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center py-8">
          <FiBox className="text-gray-400 dark:text-gray-500 mx-auto mb-2" size={32} />
          <p className="text-gray-500 dark:text-gray-400">No hay insumos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <FiBox className="text-yellow-600 dark:text-yellow-400 text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Insumos Disponibles
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {insumos.length} insumos encontrados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {insumos.map((insumo) => (
          <button
            key={insumo.id}
            onClick={() => agregarAlCarrito(insumo)}
            className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-yellow-500 dark:hover:border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-200 group"
          >
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-300">
                {insumo.nombre}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatCurrency(insumo.precio_unitario)}
              </p>
              {insumo.descripcion && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                  {insumo.descripcion}
                </p>
              )}
            </div>
            <FiPlus className="text-yellow-600 group-hover:text-yellow-700 dark:text-yellow-400 dark:group-hover:text-yellow-300" size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default InsumosDisponibles;