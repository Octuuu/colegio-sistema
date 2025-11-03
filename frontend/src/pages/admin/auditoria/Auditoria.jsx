import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerAuditorias, descargarAuditoriaPDF } from "../../../services/auditoriaService";
import Notification from "../../../components/Notification";

const Auditoria = () => {
  const { token } = useContext(AuthContext);
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [filters, setFilters] = useState({ usuario: "", evento: "" });
  const [sort, setSort] = useState({ column: "fecha", direction: "desc" });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchAuditorias = async () => {
    setLoading(true);
    try {
      const data = await obtenerAuditorias(token, {
        usuario: filters.usuario,
        evento: filters.evento,
        _sort: sort.column,
        _order: sort.direction,
        _page: pagination.page,
        _limit: pagination.limit,
      });

      setAuditorias(data.items || data);
      setPagination((prev) => ({ ...prev, total: data.total || data.length }));
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al obtener auditorías", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditorias();
  }, [filters, sort, pagination.page]);

  const handleDownloadPDF = async () => {
    try {
      await descargarAuditoriaPDF(token, filters);
      setNotification({ message: "PDF descargado correctamente", type: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al descargar PDF", type: "error" });
    }
  };

  const handleSort = (column) => {
    setSort((prev) => ({
      column,
      direction: prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="p-6">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Auditoría
      </h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Filtrar por usuario"
          className="border px-2 py-1 rounded"
          value={filters.usuario}
          onChange={(e) => setFilters({ ...filters, usuario: e.target.value, page: 1 })}
        />
        <input
          type="text"
          placeholder="Filtrar por evento"
          className="border px-2 py-1 rounded"
          value={filters.evento}
          onChange={(e) => setFilters({ ...filters, evento: e.target.value, page: 1 })}
        />
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Descargar PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm uppercase">
              {["usuario_nombre", "accion", "descripcion", "fecha"].map((col) => (
                <th
                  key={col}
                  className="p-3 border cursor-pointer select-none"
                  onClick={() => handleSort(col)}
                >
                  {col === "usuario_nombre"
                    ? "Usuario"
                    : col === "fecha"
                    ? "Fecha"
                    : col.charAt(0).toUpperCase() + col.slice(1)}
                  {sort.column === col && (
                    <span>{sort.direction === "asc" ? " 🔼" : " 🔽"}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-6">
                  Cargando auditorías...
                </td>
              </tr>
            ) : auditorias.length > 0 ? (
              auditorias.map((a) => (
                <tr
                  key={a.id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{a.usuario_nombre}</td>
                  <td className="p-3">{a.accion}</td>
                  <td className="p-3">{a.descripcion}</td>
                  <td className="p-3">{new Date(a.fecha).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No hay auditorías registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
          disabled={pagination.page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="px-3 py-1">
          Página {pagination.page} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(Math.min(totalPages, pagination.page + 1))}
          disabled={pagination.page === totalPages || totalPages === 0}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Auditoria;
