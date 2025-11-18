import { FiArrowUp, FiArrowDown, FiLoader } from "react-icons/fi";

const AuditoriaTable = ({ auditorias, loading, sort, onSort, currentPage, itemsPerPage, totalItems }) => {
  const columns = [
    { key: "usuario_nombre", label: "Usuario" },
    { key: "accion", label: "Acción" },
    { key: "descripcion", label: "Descripción" },
    { key: "fecha", label: "Fecha" }
  ];

  const getSortIcon = (columnKey) => {
    if (sort.column !== columnKey) return null;
    return sort.direction === "asc" ? <FiArrowUp size={14} /> : <FiArrowDown size={14} />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <FiLoader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (auditorias.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <FiLoader className="text-gray-400 dark:text-gray-500 mx-auto mb-2" size={32} />
        <p className="text-gray-500 dark:text-gray-400">No hay registros de auditoría</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
          Los registros aparecerán aquí cuando se realicen actividades en el sistema
        </p>
      </div>
    );
  }

  // Calcular índices para mostrar en la paginación
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                onClick={() => onSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {getSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
          {auditorias.map((auditoria, index) => (
            <tr 
              key={auditoria.id} 
              className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                index % 2 === 0 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                <div className="font-medium">{auditoria.usuario_nombre}</div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {auditoria.accion}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white max-w-xs">
                <div className="truncate" title={auditoria.descripcion}>
                  {auditoria.descripcion}
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {new Date(auditoria.fecha).toLocaleString('es-PY', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Información de paginación en la tabla */}
      <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Mostrando {startIndex} - {endIndex} de {totalItems} registros
        </div>
      </div>
    </div>
  );
};

export default AuditoriaTable;