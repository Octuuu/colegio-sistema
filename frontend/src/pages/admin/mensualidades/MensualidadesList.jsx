import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerTodosPagos, eliminarPago } from "../../../services/mensualidadService";

const MensualidadesList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

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
      fetch();
    } catch {
      alert("Error eliminando pago");
    }
  };

  const totalPaginas = Math.ceil(pagos.length / (porPagina - 1));
  const pagosMostrados = pagos.slice((pagina - 1) * (porPagina - 1), pagina * (porPagina - 1));

  if (loading) return <p className="text-center text-gray-600 mt-4">Cargando pagos...</p>;

  return (
    <div className="relative h-auto flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="overflow-x-auto overflow-y-auto border rounded-lg shadow-sm">
        <table className="w-full min-w-[800px] border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-900 shadow-sm">
            <tr className="border-b border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center">
              <th className="p-2 font-semibold">Alumno</th>
              <th className="p-2 font-semibold">Mes</th>
              <th className="p-2 font-semibold">Fecha Pago</th>
              <th className="p-2 font-semibold">Monto</th>
              <th className="p-2 font-semibold">Método</th>
              <th className="p-2 font-semibold">Estado</th>
              <th className="p-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosMostrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500 dark:text-gray-400">
                  No hay pagos registrados
                </td>
              </tr>
            ) : (
              pagosMostrados.map((p, index) => (
                <tr
                  key={p.id}
                  className={`text-center transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.alumno_nombre} {p.alumno_apellido}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.mes || "-"}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString() : "-"}</td>
                  <td className="p-2 font-semibold text-gray-700 dark:text-gray-200">${p.monto}</td>
                  <td className="p-2 text-gray-800 dark:text-gray-200">{p.metodo_pago}</td>
                  <td className="p-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.estado === "pagado"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {p.estado}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="border-red-400 text-red-700 border bg-red-100 px-2 py-1 rounded-xl hover:bg-red-200 transition"
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

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => setPagina(p => Math.max(p - 1, 1))}
          disabled={pagina === 1}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">Página {pagina} de {totalPaginas}</span>
        <button
          onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
          disabled={pagina === totalPaginas}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MensualidadesList;
