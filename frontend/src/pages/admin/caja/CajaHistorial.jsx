import { useEffect, useState, useContext } from 'react';
import { obtenerTodasLasCajas } from '../../../services/CajaService';
import { AuthContext } from '../../../context/AuthContext';

export default function CajasHistorial() {
  const { token } = useContext(AuthContext);
  const [cajas, setCajas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerTodasLasCajas(token);
      setCajas(data);
    };
    if (token) cargar();
  }, [token]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Historial de Cajas</h1>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Apertura</th>
            <th className="p-2 border">Cierre</th>
            <th className="p-2 border">Monto Apertura</th>
            <th className="p-2 border">Monto Cierre</th>
            <th className="p-2 border">Ingresos</th>
            <th className="p-2 border">Egresos</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cajas.map((caja) => (
            <tr key={caja.id} className="text-center border-t">
              <td className="p-2">{caja.id}</td>
              <td className="p-2">{caja.fecha_apertura?.slice(0, 19).replace('T', ' ')}</td>
              <td className="p-2">{caja.fecha_cierre ? caja.fecha_cierre.slice(0, 19).replace('T', ' ') : '—'}</td>
              <td className="p-2">{caja.monto_apertura}</td>
              <td className="p-2">{caja.monto_cierre || '—'}</td>
              <td className="p-2 text-green-600 font-semibold">{caja.total_ingresos || 0}</td>
              <td className="p-2 text-red-600 font-semibold">{caja.total_egresos || 0}</td>
              <td className="p-2 font-bold">
                {caja.estado === 'abierta' ? (
                  <span className="text-green-600">Abierta</span>
                ) : (
                  <span className="text-gray-600">Cerrada</span>
                )}
              </td>
              <td className="p-2">
                <button
                  onClick={() => alert(`Mostrar detalles de la caja #${caja.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
