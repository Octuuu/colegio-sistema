import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { registrarMovimiento, obtenerMovimientos } from "../../../services/insumoService";

const InsumosMovimientos = ({ insumoId }) => {
  const { token } = useContext(AuthContext);
  const [movimientos, setMovimientos] = useState([]);
  const [form, setForm] = useState({ tipo: "entrada", cantidad: "", descripcion: "" });
  const [loading, setLoading] = useState(false);

  // Obtener movimientos del insumo
  const fetchMovimientos = async () => {
    if (!insumoId) return;
    try {
      setLoading(true);
      const data = await obtenerMovimientos(insumoId, token);
      setMovimientos(data);
    } catch (err) {
      console.error("Error al obtener movimientos:", err);
      alert("Error al cargar los movimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimientos();
  }, [insumoId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cantidad || Number(form.cantidad) <= 0) {
      alert("La cantidad debe ser mayor que 0");
      return;
    }

    try {
      await registrarMovimiento(insumoId, { ...form, cantidad: Number(form.cantidad) }, token);
      setForm({ tipo: "entrada", cantidad: "", descripcion: "" });
      fetchMovimientos();
    } catch (err) {
      console.error("Error al registrar movimiento:", err);
      alert("Error al registrar movimiento");
    }
  };

  return (
    <div className="p-4 mt-4 border rounded bg-gray-50 dark:bg-gray-800">
      <h3 className="text-lg font-bold mb-4">Registrar Movimiento</h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Cantidad"
          className="p-2 border rounded"
          required
        />
        <input
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 border rounded flex-1 min-w-[150px]"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>
      </form>

      <h3 className="text-lg font-bold mb-2">Historial de Movimientos</h3>
      <table className="min-w-full bg-white dark:bg-gray-700 border">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-600">
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center p-4">Cargando...</td>
            </tr>
          ) : movimientos.length > 0 ? (
            movimientos.map((m) => (
              <tr key={m.id} className="border-b">
                <td className="p-2">{new Date(m.fecha).toLocaleString()}</td>
                <td className="p-2">{m.tipo}</td>
                <td className="p-2">{m.cantidad}</td>
                <td className="p-2">{m.descripcion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No hay movimientos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InsumosMovimientos;
