import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import MovimientosTable from './MovimientosTable';

export default function CajaDetalle() {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [caja, setCaja] = useState(null);
  const [movimientos, setMovimientos] = useState([]);

  const cargarDetalle = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/caja/detalle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCaja(res.data.caja);
      setMovimientos(res.data.movimientos);
    } catch (error) {
      console.error('Error al cargar detalle de caja:', error);
    }
  };

  useEffect(() => {
    if (token) cargarDetalle();
  }, [token, id]);

  if (!caja) return <p className="p-6">Cargando detalle...</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Detalle de Caja #{caja.id}</h1>
      <Link to="/admin/caja/lista" className="text-blue-600 hover:underline">
        ← Volver al listado
      </Link>

      <div className="grid grid-cols-2 gap-4 border p-4 rounded bg-gray-50 dark:bg-gray-800">
        <p><strong>Apertura:</strong> {caja.fecha_apertura ? new Date(caja.fecha_apertura).toLocaleString() : '-'}</p>
        <p><strong>Usuario Apertura:</strong> {caja.usuario_apertura}</p>
        <p><strong>Monto Apertura:</strong> ₲{Number(caja.monto_apertura).toLocaleString()}</p>
        <p><strong>Cierre:</strong> {caja.fecha_cierre ? new Date(caja.fecha_cierre).toLocaleString() : '-'}</p>
        <p><strong>Usuario Cierre:</strong> {caja.usuario_cierre}</p>
        <p><strong>Monto Cierre:</strong> ₲{Number(caja.monto_cierre).toLocaleString()}</p>
        <p><strong>Estado:</strong> {caja.estado}</p>
        <p><strong>Descripción:</strong> {caja.descripcion}</p>
      </div>

      <h2 className="text-xl font-semibold mt-4">Movimientos de esta caja</h2>
      <MovimientosTable movimientos={movimientos} />
    </div>
  );
}
