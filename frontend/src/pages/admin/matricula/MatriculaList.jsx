import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerPagosMatricula, eliminarPago, descargarFacturaMatriculaPDF } from "../../../services/matriculaService";

const MatriculaList = ({ reload }) => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [eliminando, setEliminando] = useState(null);

  const porPagina = 10;

  // Obtener pagos desde API
  const fetchPagos = async () => {
    setLoading(true);
    try {
      const res = await obtenerPagosMatricula(token);
      setPagos(res.data || res || []);
    } catch (err) {
      console.error("Error obteniendo pagos:", err);
      alert("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, [reload, token]);

  // Eliminar pago
  const handleEliminar = async (id, alumnoNombre) => {
    if (!confirm(`¿Está seguro de eliminar el pago de ${alumnoNombre}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      setEliminando(id);
      await eliminarPago(id, token);
      alert("✅ Pago eliminado correctamente");
      fetchPagos(); // Recargar lista
    } catch (err) {
      console.error("Error eliminando pago:", err);
      alert(err.response?.data?.message || "Error al eliminar pago");
    } finally {
      setEliminando(null);
    }
  };

  // Descargar factura
  const handleDescargarFactura = async (id) => {
    try {
      await descargarFacturaMatriculaPDF(id, token);
    } catch (err) {
      console.error("Error descargando factura:", err);
      alert("Error al descargar factura");
    }
  };

  // Paginación
  const totalPaginas = Math.ceil(pagos.length / porPagina);
  const pagosMostrados = pagos.slice(
    (pagina - 1) * porPagina,
    pagina * porPagina
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Alumno</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Cédula</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Fecha Pago</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Monto</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Método</th>
              <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosMostrados.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 dark:text-gray-400">
                  No hay pagos de matrícula registrados
                </td>
              </tr>
            ) : (
              pagosMostrados.map((pago, index) => (
                <tr
                  key={pago.id}
                  className={`border-b border-gray-200 dark:border-gray-600 ${
                    index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  <td className="p-3 text-gray-900 dark:text-white">
                    {pago.alumno_nombre} {pago.alumno_apellido}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {pago.cedula || "N/A"}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {new Date(pago.fecha_pago).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-semibold text-green-600 dark:text-green-400">
                    ₲ {Number(pago.monto).toLocaleString()}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300 capitalize">
                    {pago.metodo_pago}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDescargarFactura(pago.id)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                        title="Descargar Factura"
                      >
                        📄
                      </button>
                      
                      <button
                        onClick={() => handleEliminar(pago.id, `${pago.alumno_nombre} ${pago.alumno_apellido}`)}
                        disabled={eliminando === pago.id}
                        className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 disabled:opacity-50 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
                        title="Eliminar Pago"
                      >
                        {eliminando === pago.id ? "⏳" : "🗑️"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Mostrando {((pagina - 1) * porPagina) + 1} - {Math.min(pagina * porPagina, pagos.length)} de {pagos.length} pagos
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPagina(p => Math.max(p - 1, 1))}
              disabled={pagina === 1}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Anterior
            </button>
            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
              disabled={pagina === totalPaginas}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatriculaList;