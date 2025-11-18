import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerAuditorias, descargarAuditoriaPDF } from "../../../services/auditoriaService";
import Notification from "../../../components/Notification";
import AuditoriaFilters from "./AuditoriaFilters";
import AuditoriaTable from "./AuditoriaTable";
import AuditoriaPagination from "./AuditoriaPagination";
import { FiFileText, FiDownload } from "react-icons/fi";

const Auditoria = () => {
  const { token } = useContext(AuthContext);
  const [auditorias, setAuditorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [filters, setFilters] = useState({ usuario: "", evento: "" });
  const [sort, setSort] = useState({ column: "fecha", direction: "desc" });
  const [pagination, setPagination] = useState({ 
    page: 1, 
    limit: 10, 
    total: 0,
    totalPages: 0 
  });

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
      const total = data.total || data.length;
      setPagination(prev => ({ 
        ...prev, 
        total,
        totalPages: Math.ceil(total / prev.limit)
      }));
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "", type: "" })}
          />
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <FiFileText className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Auditoría del Sistema
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Registro de todas las actividades del sistema
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              <FiDownload className="text-lg" />
              Descargar PDF
            </button>
          </div>
        </div>

        {/* Filtros */}
        <AuditoriaFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Tabla */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiFileText className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Registros de Auditoría
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pagination.total} registros encontrados
                  </p>
                </div>
              </div>
              {auditorias.length > 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm font-medium">
                  Página {pagination.page} de {pagination.totalPages}
                </span>
              )}
            </div>
          </div>
          
          <AuditoriaTable 
            auditorias={auditorias}
            loading={loading}
            sort={sort}
            onSort={handleSort}
            currentPage={pagination.page}
            itemsPerPage={pagination.limit}
            totalItems={pagination.total}
          />
        </div>

        {/* Paginación */}
        {pagination.totalPages > 1 && (
          <AuditoriaPagination 
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            totalItems={pagination.total}
          />
        )}
      </div>
    </div>
  );
};

export default Auditoria;