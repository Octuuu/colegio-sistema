import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
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
  const [fechaHoy] = useState(new Date().toISOString().split('T')[0]);
  const [showAbrirModal, setShowAbrirModal] = useState(false);
  const [showMovimientoModal, setShowMovimientoModal] = useState(false);

  const cargarMovimientos = async () => {
    if (!token) return;
    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (!cajaAbierta) {
        setMovimientos([]);
        return;
      }
      const data = await obtenerMovimientos(
        { desde: `${fechaHoy} 00:00:00`, hasta: `${fechaHoy} 23:59:59`, caja_apertura_id: cajaAbierta.id },
        token
      );
      setMovimientos(data);
    } catch (error) {
      console.error('Error cargarMovimientos:', error);
      setMovimientos([]);
    }
  };

  const cargarResumen = async () => {
    if (!token) return;
    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (!cajaAbierta) {
        setResumen({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
        return;
      }
      const data = await resumenCaja(fechaHoy, token);
      setResumen(data);
    } catch (error) {
      console.error('Error cargarResumen:', error);
      setResumen({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
    }
  };

  useEffect(() => {
    if (token) {
      cargarMovimientos();
      cargarResumen();
    }
  }, [token]);

  const handleMovimientoCreado = () => {
    cargarMovimientos();
    cargarResumen();
    setShowMovimientoModal(false);
  };

  const handleAbrirCaja = async (saldoInicial) => {
    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (cajaAbierta) return alert('Ya hay una caja abierta.');

      await abrirCaja({ monto_apertura: parseFloat(saldoInicial), usuario_apertura_id: user.id }, token);
      alert('Caja abierta correctamente');
      setShowAbrirModal(false);
      cargarMovimientos();
      cargarResumen();
    } catch (error) {
      alert(error.message || 'Error al abrir caja');
    }
  };

  const handleCerrarCaja = async () => {
    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (!cajaAbierta) return alert('No hay caja abierta para cerrar');

      await cerrarCaja({ caja_id: cajaAbierta.id, usuario_cierre_id: user.id }, token);
      alert('Caja cerrada correctamente');
      cargarMovimientos();
      cargarResumen();
    } catch (error) {
      alert(error.message || 'Error al cerrar caja');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Caja del día {fechaHoy}</h1>
        <div className="space-x-2">
          <button
            onClick={() => setShowAbrirModal(true)}
            className="border-blue-400 text-blue-700 border bg-blue-100 px-2 py-1 rounded-xl hover:bg-blue-200"
          >
            Abrir Caja
          </button>
          <button
            onClick={handleCerrarCaja}
            className="bg-red-100 text-red-500 px-2 py-1 rounded-xl border border-red-300 hover:bg-red-200"
          >
            Cerrar Caja
          </button>
          <button
            onClick={() => setShowMovimientoModal(true)}
            className="bg-yellow-50 text-yellow-600 border-yellow-300 border px-2 py-1 rounded-xl hover:bg-yellow-100"
          >
            Registrar Movimiento
          </button>
          <Link to="/admin/caja/lista" className="bg-green-100 text-green-600 px-2 py-1 rounded-xl border border-green-400 hover:bg-green-200">
            Ver historial
          </Link>
        </div>
      </div>

      <ResumenCaja resumen={resumen} />
      <MovimientosTable movimientos={movimientos} />

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
        />
      )}
    </div>
  );
}

function AbrirCajaModal({ onClose, onAbrirCaja }) {
  const [saldo, setSaldo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!saldo || isNaN(saldo)) return alert('Ingrese un valor numérico');
    onAbrirCaja(saldo);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Abrir Caja</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Saldo inicial (Gs)</label>
          <input
            type="number"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Ej: 500000"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Abrir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
