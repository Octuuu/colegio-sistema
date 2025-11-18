import { useState, useEffect } from "react";
import { FiSearch, FiX, FiFilter, FiRefreshCw } from "react-icons/fi";

const AuditoriaFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (field, value) => {
    const newFilters = { ...localFilters, [field]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const clearFilters = () => {
    const newFilters = { usuario: "", evento: "" };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilters();
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por Usuario
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuario..."
              className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={localFilters.usuario}
              onChange={(e) => handleInputChange("usuario", e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filtrar por Evento
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar evento..."
              className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              value={localFilters.evento}
              onChange={(e) => handleInputChange("evento", e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={applyFilters}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
          >
            <FiSearch className="text-lg" />
            Aplicar Filtros
          </button>
          
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            <FiRefreshCw className="text-lg" />
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditoriaFilters;