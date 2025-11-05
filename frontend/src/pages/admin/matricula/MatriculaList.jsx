import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);

  const porPagina = 10; // Total por página original

  // 🔹 Obtener pagos desde API
  const fetchPagos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/matriculas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  // 🔹 Eliminar pago
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/matriculas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPagos();
    } catch {
      alert("Error eliminando pago");
    }
  };

  // 🔹 Paginación
  const totalPaginas = Math.ceil(pagos.length / porPagina);
  const pagosMostrados = pagos.slice(
    (pagina - 1) * porPagina,
    (pagina - 1) * porPagina + (porPagina - 1) // Mostrar una fila menos
  );

  if (loading) return <p className="text-center mt-4">Cargando pagos...</p>;

  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-900 mt-6 p-2">
      <div className="overflow-x-auto overflow-y-auto border rounded-lg shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
            <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <th className="p-2 font-semibold">Alumno</th>
              <th className="p-2 font-semibold">Fecha Pago</th>
              <th className="p-2 font-semibold">Monto</th>
              <th className="p-2 font-semibold">Método</th>
              <th className="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosMostrados.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500 dark:text-gray-400">
                  No hay pagos registrados
                </td>
              </tr>
            ) : (
              pagosMostrados.map((p, i) => (
                <tr
                  key={p.id}
                  className={`text-center ${
                    i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-2">{p.alumno_nombre} {p.alumno_apellido}</td>
                  <td className="p-2">{new Date(p.fecha_pago).toLocaleDateString()}</td>
                  <td className="p-2 font-semibold">${p.monto}</td>
                  <td className="p-2">{p.metodo_pago}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setPagina((p) => Math.max(p - 1, 1))}
          disabled={pagina === 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
          disabled={pagina === totalPaginas}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MatriculaList;
