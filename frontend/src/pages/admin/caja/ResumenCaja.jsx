export default function ResumenCaja({ resumen, loading = false }) {
  const formatoGs = (valor) => {
    if (isNaN(valor) || valor === null || valor === undefined) return '0 Gs';
    return new Intl.NumberFormat('es-PY').format(valor) + ' Gs';
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resumen de Caja</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-green-600 dark:text-green-400 mb-1">
            
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Ingresos</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {formatoGs(resumen.total_ingresos)}
          </p>
        </div>
        
        <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400 mb-1">
          
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Egresos</p>
          <p className="text-xl font-bold text-red-600 dark:text-red-400">
            {formatoGs(resumen.total_egresos)}
          </p>
        </div>
        
        <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-blue-600 dark:text-blue-400 mb-1">
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Saldo Final</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatoGs(resumen.saldo_final)}
          </p>
        </div>
      </div>
    </div>
  );
}