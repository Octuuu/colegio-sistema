import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

export default function CajaLista() {
  const { token } = useContext(AuthContext);
  const [cajas, setCajas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cargarCajas = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:3000/api/caja/todas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCajas(res.data || []);
    } catch (error) {
      console.error('Error al cargar cajas:', error);
      setError('Error al cargar el historial de cajas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) cargarCajas();
  }, [token]);

  const formatearMonto = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) return '-';
    return `₲${Number(valor).toLocaleString('es-PY')}`;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-PY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoBadge = (estado) => {
    const config = {
      abierta: { color: 'green', text: 'Abierta', icon: '🟢' },
      cerrada: { color: 'gray', text: 'Cerrada', icon: '⚫' },
    };
    
    const configEstado = config[estado] || { color: 'gray', text: estado, icon: '❓' };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-${configEstado.color}-100 text-${configEstado.color}-800 dark:bg-${configEstado.color}-900 dark:text-${configEstado.color}-200`}>
        {configEstado.icon} {configEstado.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6"></div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 border-b border-gray-200 dark:border-gray-700"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Historial de Cajas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona y revisa el historial completo de cajas del sistema
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400 mr-2">⚠️</div>
              <p className="text-red-800 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fecha Apertura
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fecha Cierre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Monto Apertura
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Monto Cierre
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {cajas.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <div className="text-4xl mb-2">📊</div>
                        <p className="text-lg">No hay cajas registradas</p>
                        <p className="text-sm">Las cajas aparecerán aquí una vez que sean creadas</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  cajas.map((caja, index) => (
                    <tr 
                      key={caja.id} 
                      className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        #{caja.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {formatearFecha(caja.fecha_apertura)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {caja.fecha_cierre ? formatearFecha(caja.fecha_cierre) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getEstadoBadge(caja.estado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">
                        {formatearMonto(caja.monto_apertura)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white font-medium">
                        {formatearMonto(caja.monto_cierre)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <Link
                          to={`/admin/caja/detalle/${caja.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium"
                        >
                          <span>👁️</span>
                          Ver Detalle
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Mostrando {cajas.length} caja{cajas.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}