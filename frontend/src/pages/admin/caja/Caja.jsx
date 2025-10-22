import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import MovimientoForm from './MovimientoForm';
import MovimientosTable from './MovimientosTable';
import ResumenCaja from './ResumenCaja';
import { obtenerMovimientos, resumenCaja, abrirCaja, cerrarCaja, getCajaAbierta } from '../../../services/CajaService';
import { AuthContext } from '../../../context/AuthContext';

export default function Caja() {
  const { token, user } = useContext(AuthContext);

  const [movimientos, setMovimientos] = useState([]);
  const [resumen, setResumen] = useState({ total_ingresos: 0, total_egresos: 0, saldo_final: 0 });
  const [fechaHoy] = useState(new Date().toISOString().split('T')[0]);

  // Cargar movimientos del día
  const cargarMovimientos = async () => {
    if (!token) return;

    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (!cajaAbierta) {
        setMovimientos([]); // Si no hay caja abierta, limpiamos movimientos
        return;
      }

      const data = await obtenerMovimientos(
        { desde: fechaHoy + ' 00:00:00', hasta: fechaHoy + ' 23:59:59', caja_apertura_id: cajaAbierta.id },
        token
      );
      setMovimientos(data);
    } catch (error) {
      console.error('Error cargarMovimientos:', error);
      setMovimientos([]);
    }
  };

  // Cargar resumen del día
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
  };

  // Abrir caja
  const handleAbrirCaja = async () => {
    if (!token) return;

    try {
      const cajaAbierta = await getCajaAbierta(token);
      if (cajaAbierta) return alert('Ya hay una caja abierta. Cierra la caja actual antes de abrir otra.');

      const saldo = prompt('Ingrese saldo inicial de caja:');
      if (!saldo || isNaN(saldo)) return alert('Debes ingresar un valor numérico');

      await abrirCaja({ monto_apertura: parseFloat(saldo), usuario_apertura_id: user.id }, token);
      alert('Caja abierta correctamente');
      cargarMovimientos();
      cargarResumen();
    } catch (error) {
      alert(error.message || 'Error al abrir caja');
    }
  };

  // Cerrar caja
  const handleCerrarCaja = async () => {
    if (!token) return;

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
            onClick={handleAbrirCaja}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Abrir Caja
          </button>
          <button
            onClick={handleCerrarCaja}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar Caja
          </button>
          <Link to="/admin/caja/lista" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Ver historial
          </Link>
        </div>
      </div>

      <ResumenCaja resumen={resumen} />
      <MovimientoForm onMovimientoCreado={handleMovimientoCreado} />
      <MovimientosTable movimientos={movimientos} />
    </div>
  );
}
