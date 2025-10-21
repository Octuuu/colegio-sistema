import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerTodosPagos, eliminarPago } from "../../../services/mensualidadService";

const MensualidadesList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await obtenerTodosPagos(token);
      setPagos(data || []);
    } catch (err) {
      console.error(err);
      alert("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    try {
      await eliminarPago(id, token);
      alert("Eliminado");
      fetch();
    } catch (err) {
      console.error(err);
      alert("Error eliminando");
    }
  };

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pagos registrados</h2>
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Alumno</th>
              <th className="p-2 border">Mes</th>
              <th className="p-2 border">Fecha Pago</th>
              <th className="p-2 border">Monto</th>
              <th className="p-2 border">Método</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 && (
              <tr><td className="p-4" colSpan="7">No hay pagos</td></tr>
            )}
            {pagos.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-2 border">{p.alumno_nombre} {p.alumno_apellido}</td>
                <td className="p-2 border">{p.mes || p.month || "-"}</td>
                <td className="p-2 border">{p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString() : "-"}</td>
                <td className="p-2 border">{p.monto}</td>
                <td className="p-2 border">{p.metodo_pago}</td>
                <td className="p-2 border">{p.estado}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MensualidadesList;
