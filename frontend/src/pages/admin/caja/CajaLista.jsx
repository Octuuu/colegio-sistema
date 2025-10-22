import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

export default function CajaLista() {
  const { token } = useContext(AuthContext);
  const [cajas, setCajas] = useState([]);

  const cargarCajas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/caja/todas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCajas(res.data);
    } catch (error) {
      console.error('Error al cargar cajas:', error);
    }
  };

  useEffect(() => {
    if (token) cargarCajas();
  }, [token]);

  // Función para formatear montos de manera segura
  const formatearMonto = (valor) => {
    if (valor === null || valor === undefined || isNaN(valor)) return '-';
    return `₲${Number(valor).toLocaleString('es-PY')}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historial de Cajas</h1>
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Apertura</th>
            <th className="border p-2">Cierre</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Monto Apertura</th>
            <th className="border p-2">Monto Cierre</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cajas.map((caja) => (
            <tr key={caja.id} className="text-center hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border p-2">{caja.id}</td>
              <td className="border p-2">
                {caja.fecha_apertura ? new Date(caja.fecha_apertura).toLocaleString() : '-'}
              </td>
              <td className="border p-2">
                {caja.fecha_cierre ? new Date(caja.fecha_cierre).toLocaleString() : '-'}
              </td>
              <td className="border p-2">{caja.estado || '-'}</td>
              <td className="border p-2">{formatearMonto(caja.monto_apertura)}</td>
              <td className="border p-2">
                {caja.monto_cierre !== null && caja.monto_cierre !== undefined
                    ? `₲${Number(caja.monto_cierre).toLocaleString()}`
                    : '-'}
              </td>

              <td className="border p-2">
                <Link
                  to={`/admin/caja/detalle/${caja.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver Detalle
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
