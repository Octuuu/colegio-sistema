import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiDollarSign, 
  FiLock, 
  FiUnlock, 
  FiPlusCircle, 
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiX,
  FiLoader,
  FiRefreshCw
} from 'react-icons/fi';
import { 
  HiOutlineCash, 
  HiOutlineTrendingUp,
  HiOutlineCollection
} from 'react-icons/hi';
import MovimientoFormModal from './MovimientoForm';
import ResumenCaja from './ResumenCaja';
import MovimientosTable from './MovimientosTable';
import {
  obtenerMovimientos,
  resumenCaja,
  abrirCaja,
  cerrarCaja,
  getCajaAbierta
} from '../../../services/CajaService';
import { AuthContext } from '../../../context/AuthContext';

export default function Caja() {
  const { token, user } = useContext(AuthContext);

  const [movimientos, setMovimientos] = useState([]);
  const [resumen, setResumen] = useState({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const [fechaHoy] = useState(new Date().toISOString().split('T')[0]);
  const [showAbrirModal, setShowAbrirModal] = useState(false);
  const [showMovimientoModal, setShowMovimientoModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const cargarDatos = async (isRefreshing = false) => {
    if (!token) return;
    
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError('');
      
      console.log('🔍 Buscando caja abierta...');
      const cajaActual = await getCajaAbierta(token);
      console.log('📦 Caja encontrada:', cajaActual);
      setCajaAbierta(cajaActual);

      if (!cajaActual) {
        console.log('❌ No hay caja abierta, limpiando datos...');
        setMovimientos([]);
        setResumen({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
        return;
      }

      console.log('🔄 Cargando movimientos para caja ID:', cajaActual.id);
      
      // SOLUCIÓN: Obtener todos los movimientos primero y luego filtrar manualmente
      const [todosMovimientos, resumenData] = await Promise.all([
        obtenerMovimientos(
          { 
            desde: `${fechaHoy} 00:00:00`, 
            hasta: `${fechaHoy} 23:59:59`
            // ❌ Temporalmente NO enviar caja_apertura_id porque el backend puede no filtrar
          },
          token
        ),
        resumenCaja(fechaHoy, token)
      ]);

      console.log('📊 Todos los movimientos del día:', todosMovimientos);

      // 🔥 FILTRADO MANUAL CRÍTICO - SOLUCIÓN TEMPORAL
      const movimientosFiltrados = todosMovimientos.filter(
        mov => mov.caja_apertura_id === cajaActual.id
      );

      console.log('✅ RESULTADO DEL FILTRADO MANUAL:');
      console.log('   - Movimientos totales del día:', todosMovimientos.length);
      console.log('   - Movimientos de caja actual (#${cajaActual.id}):', movimientosFiltrados.length);
      console.log('   - Movimientos de otras cajas:', todosMovimientos.length - movimientosFiltrados.length);

      // Mostrar alerta si hay movimientos de otras cajas
      if (todosMovimientos.length - movimientosFiltrados.length > 0) {
        console.warn('🚨 ALERTA: Hay movimientos de otras cajas que serán filtrados');
        
        // Mostrar algunos movimientos incorrectos para debug
        const movimientosIncorrectos = todosMovimientos.filter(mov => mov.caja_apertura_id !== cajaActual.id);
        console.log('📋 Movimientos de otras cajas encontrados:');
        movimientosIncorrectos.slice(0, 3).forEach(mov => {
          console.log(`   - ID: ${mov.id}, Caja: ${mov.caja_apertura_id}, Desc: ${mov.descripcion}`);
        });
      }

      setMovimientos(movimientosFiltrados);
      setResumen(resumenData || { total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
      
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      setError('Error al cargar los datos de caja: ' + error.message);
      setMovimientos([]);
      setResumen({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      cargarDatos();
    }
  }, [token]);

  const handleMovimientoCreado = () => {
    console.log('🔄 Recargando datos después de movimiento...');
    cargarDatos(true);
    setShowMovimientoModal(false);
  };

  const handleAbrirCaja = async (saldoInicial) => {
    try {
      setError('');
      console.log('🔓 Intentando abrir caja con saldo:', saldoInicial);
      
      const cajaExistente = await getCajaAbierta(token);
      if (cajaExistente) {
        setError('Ya hay una caja abierta');
        return;
      }

      await abrirCaja({ 
        monto_apertura: parseFloat(saldoInicial), 
        usuario_apertura_id: user.id 
      }, token);
      
      console.log('✅ Caja abierta exitosamente');
      setShowAbrirModal(false);
      
      // 🔥 FORZAR RECARGA COMPLETA después de abrir caja
      await cargarDatos(true);
      
    } catch (error) {
      console.error('❌ Error abriendo caja:', error);
      setError(error.message || 'Error al abrir caja');
    }
  };

  const handleCerrarCaja = async () => {
    if (!confirm('¿Está seguro de que desea cerrar la caja? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      setError('');
      console.log('🔒 Intentando cerrar caja...');
      
      const cajaActual = await getCajaAbierta(token);
      if (!cajaActual) {
        setError('No hay caja abierta para cerrar');
        return;
      }

      await cerrarCaja({ 
        caja_id: cajaActual.id, 
        usuario_cierre_id: user.id 
      }, token);
      
      console.log('✅ Caja cerrada exitosamente');
      
      // 🔥 FORZAR RECARGA COMPLETA después de cerrar caja
      await cargarDatos(true);
      
    } catch (error) {
      console.error('❌ Error cerrando caja:', error);
      setError(error.message || 'Error al cerrar caja');
    }
  };

  const handleRefresh = () => {
    console.log('🔄 Refrescando manualmente...');
    cargarDatos(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <HiOutlineCash className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Control de Caja
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                <FiCalendar className="text-blue-500" />
                <span>{fechaHoy}</span>
                <span className="mx-2">•</span>
                {cajaAbierta ? (
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <FiCheckCircle className="text-green-500" />
                    Caja #{cajaAbierta.id} - Abierta
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600 font-medium">
                    <FiX className="text-red-500" />
                    Caja Cerrada
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-200 font-medium"
              title="Actualizar datos"
            >
              <FiRefreshCw className={`text-lg ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualizando...' : 'Actualizar'}
            </button>
            
            <button
              onClick={() => setShowAbrirModal(true)}
              disabled={!!cajaAbierta}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <FiUnlock className="text-lg" />
              Abrir Caja
            </button>
            
            <button
              onClick={handleCerrarCaja}
              disabled={!cajaAbierta}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <FiLock className="text-lg" />
              Cerrar Caja
            </button>
            
            <button
              onClick={() => setShowMovimientoModal(true)}
              disabled={!cajaAbierta}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <FiPlusCircle className="text-lg" />
              Registrar Movimiento
            </button>
            
            <Link 
              to="/admin/caja/lista" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <HiOutlineCollection className="text-lg" />
              Ver Historial
            </Link>
          </div>
        </div>

        {/* Estado de Caja */}
        <div className={`p-6 rounded-2xl border-2 backdrop-blur-sm ${
          cajaAbierta 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-800' 
            : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 dark:from-yellow-900/20 dark:to-amber-900/20 dark:border-yellow-800'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${
              cajaAbierta 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              {cajaAbierta ? (
                <FiCheckCircle className="text-2xl" />
              ) : (
                <FiAlertCircle className="text-2xl" />
              )}
            </div>
            <div>
              <h3 className={`text-xl font-bold ${
                cajaAbierta 
                  ? 'text-green-800 dark:text-green-300' 
                  : 'text-yellow-800 dark:text-yellow-300'
              }`}>
                {cajaAbierta ? `Caja #${cajaAbierta.id} - Abierta` : 'Caja Cerrada'}
              </h3>
              <p className={`mt-1 ${
                cajaAbierta 
                  ? 'text-green-700 dark:text-green-400' 
                  : 'text-yellow-700 dark:text-yellow-400'
              }`}>
                {cajaAbierta 
                  ? `Saldo inicial: ₲${(cajaAbierta.monto_apertura || 0).toLocaleString()} - Puede registrar movimientos` 
                  : 'Abra una caja para comenzar a registrar movimientos'
                }
              </p>
              {cajaAbierta && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Movimientos actuales: {movimientos.length}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <FiAlertCircle className="text-red-600 dark:text-red-400 text-xl" />
              </div>
              <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Resumen */}
        <ResumenCaja resumen={resumen} loading={loading} />

        {/* Movimientos */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <HiOutlineTrendingUp className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Movimientos {cajaAbierta ? `de Caja #${cajaAbierta.id}` : 'del Día'}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cajaAbierta ? 'Movimientos de la caja actual' : 'No hay caja abierta'}
                  </p>
                </div>
              </div>
              {movimientos.length > 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                  {movimientos.length} movimiento{movimientos.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
          <MovimientosTable movimientos={movimientos} loading={loading} />
        </div>

        {/* Modales */}
        {showAbrirModal && (
          <AbrirCajaModal
            onClose={() => setShowAbrirModal(false)}
            onAbrirCaja={handleAbrirCaja}
          />
        )}

        {showMovimientoModal && (
          <MovimientoFormModal
            onClose={() => setShowMovimientoModal(false)}
            onMovimientoCreado={handleMovimientoCreado}
            cajaAbierta={cajaAbierta}
          />
        )}
      </div>
    </div>
  );
}

function AbrirCajaModal({ onClose, onAbrirCaja }) {
  const [saldo, setSaldo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!saldo || isNaN(saldo) || Number(saldo) < 0) {
      alert('Ingrese un valor numérico válido');
      return;
    }

    setLoading(true);
    try {
      await onAbrirCaja(saldo);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <FiUnlock className="text-green-600 dark:text-green-400 text-xl" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Abrir Caja</h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <div className="flex items-center gap-2 mb-1">
                <FiDollarSign className="text-green-500" />
                <span>Saldo Inicial (Gs)</span>
              </div>
            </label>
            <input
              type="number"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-lg font-medium transition-all duration-200"
              placeholder="Ej: 500000"
              min="0"
              step="1000"
              required
              autoFocus
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <FiAlertCircle className="text-gray-400" />
              Ingrese el monto con el que inicia la caja
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
              disabled={loading}
            >
              <FiX className="text-lg" />
              Cancelar
            </button>
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FiLoader className="text-lg animate-spin" />
                  Abriendo...
                </>
              ) : (
                <>
                  <FiUnlock className="text-lg" />
                  Abrir Caja
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}