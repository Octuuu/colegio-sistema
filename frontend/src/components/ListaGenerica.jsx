import React from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from 'lucide-react';

const ListaGenerica = ({ 
  title = 'Listado', 
  columns = [], 
  data = [], 
  error = null, 
  onCloseError, 
  onActionClick,  
  renderActions   
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[75vh] mt-5 flex flex-col">
      {error && (
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full animate-fadeIn">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button
              onClick={onCloseError}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div className={`${error ? 'blur-sm pointer-events-none select-none' : ''} flex flex-col h-full`}>
        <div className="flex items-center gap-2 mb-7 ml-4 sm:ml-0">
          <List className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
              <tr className="border-b border-gray-300 dark:border-gray-700">
                {columns.map((col) => (
                  <th key={col.key} className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300">
                    {col.label}
                  </th>
                ))}
                {(onActionClick || renderActions) && (
                  <th className="p-2 text-center font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + ((onActionClick || renderActions) ? 1 : 0)}
                    className="text-center p-4 text-gray-500 dark:text-gray-400"
                  >
                    No hay registros
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`text-center transition-colors duration-200 ${
                      index % 2 === 0 
                        ? 'bg-white dark:bg-gray-800' 
                        : 'bg-gray-50 dark:bg-gray-900'
                    } hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="p-2 text-gray-800 dark:text-gray-200 whitespace-nowrap">
                        {col.render ? col.render(item[col.key], item) : item[col.key] ?? '-'}
                      </td>
                    ))}
                    {(onActionClick || renderActions) && (
                      <td className="p-3 space-x-2 font-medium">
                        {renderActions
                          ? renderActions(item)
                          : (
                            <button
                              onClick={() => onActionClick(item, navigate)}
                              className="text-green-700 bg-green-100 px-2 py-1 rounded-xl hover:bg-green-200 border-green-300 border font-normal transition"
                            >
                              Ver detalle
                            </button>
                          )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaGenerica;
