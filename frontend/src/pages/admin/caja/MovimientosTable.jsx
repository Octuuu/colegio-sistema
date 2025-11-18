import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

export default function MovimientosTable({ movimientos, loading = false, cajaActualId = null }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const [itemsPorPagina, setItemsPorPagina] = useState(10);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (movimientos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">📊</div>
        <p className="text-gray-500 dark:text-gray-400">No hay movimientos registrados</p>
      </div>
    );
  }

  // Calcular páginas
  const totalPaginas = Math.ceil(movimientos.length / itemsPorPagina);
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const fin = inicio + itemsPorPagina;
  const movimientosPaginados = movimientos.slice(inicio, fin);

  // Función para cambiar página
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // Función para generar números de página
  const generarNumerosPagina = () => {
    const paginas = [];
    const paginasAMostrar = 5;
    
    let inicioPaginas = Math.max(1, paginaActual - Math.floor(paginasAMostrar / 2));
    let finPaginas = Math.min(totalPaginas, inicioPaginas + paginasAMostrar - 1);
    
    if (finPaginas - inicioPaginas + 1 < paginasAMostrar) {
      inicioPaginas = Math.max(1, finPaginas - paginasAMostrar + 1);
    }
    
    for (let i = inicioPaginas; i <= finPaginas; i++) {
      paginas.push(i);
    }
    
    return paginas;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      {/* Header con controles de paginación */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Movimientos
          </h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
            {movimientos.length} total
          </span>
          {cajaActualId && (
            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
              Caja #{cajaActualId}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            Mostrar:
          </label>
          <select
            value={itemsPorPagina}
            onChange={(e) => {
              setItemsPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Tabla con información de caja */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Caja ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Registrado Por
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {movimientosPaginados.map((mov, index) => {
              // 🔥 CORRECCIÓN: Usar tipo_movimiento en lugar de tipo
              const tipoMovimiento = mov.tipo_movimiento || mov.tipo;
              
              return (
                <tr 
                  key={mov.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 
                      ? 'bg-white dark:bg-gray-800' 
                      : 'bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {mov.fecha ? new Date(mov.fecha).toLocaleDateString('es-PY', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : '-'}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tipoMovimiento === 'ingreso' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {tipoMovimiento === 'ingreso' ? 'Ingreso' : 'Egreso'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white max-w-xs truncate" title={mov.descripcion}>
                    {mov.descripcion}
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm text-right font-medium ${
                    tipoMovimiento === 'ingreso' 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {Number(mov.monto).toLocaleString('es-PY')} Gs
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    #{mov.caja_apertura_id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {mov.registrado_por || 'Sistema'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mostrando <span className="font-medium">{inicio + 1}</span> -{' '}
              <span className="font-medium">{Math.min(fin, movimientos.length)}</span> de{' '}
              <span className="font-medium">{movimientos.length}</span> movimientos
            </div>

            {/* Controles de paginación */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => cambiarPagina(1)}
                disabled={paginaActual === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Primera página"
              >
                <FiChevronsLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página anterior"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>

              {generarNumerosPagina().map(numero => (
                <button
                  key={numero}
                  onClick={() => cambiarPagina(numero)}
                  className={`min-w-[40px] px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    paginaActual === numero
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {numero}
                </button>
              ))}

              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Página siguiente"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => cambiarPagina(totalPaginas)}
                disabled={paginaActual === totalPaginas}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Última página"
              >
                <FiChevronsRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
              Página <span className="font-medium">{paginaActual}</span> de{' '}
              <span className="font-medium">{totalPaginas}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}