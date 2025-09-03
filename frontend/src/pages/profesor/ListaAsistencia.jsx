import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { obtenerHistorialMateria, descargarPDFHistorial } from "../../services/asistenciaService";

// 👉 Usamos directamente el string "YYYY-MM-DD" (sin new Date)
const formateaFechaLindo = (fecha) => {
  if (!fecha) return "";
  const [yy, mm, dd] = fecha.split("-");
  return `${dd}/${mm}/${yy}`;
};

const HistorialAsistenciaMateria = () => {
  const { token } = useContext(AuthContext);
  const { materiaId } = useParams();
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");

  const cargarHistorial = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (from) params.from = from;
      if (to) params.to = to;
      const data = await obtenerHistorialMateria(token, materiaId, params);
      setHistorial(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando historial:", e);
      setError("No se pudo cargar el historial");
    } finally {
      setLoading(false);
    }
  }, [token, materiaId, from, to]);

  useEffect(() => {
    cargarHistorial();
  }, [cargarHistorial]);

  // Agrupar por alumno
  const alumnosMap = useMemo(() => {
    const map = new Map();
    historial.forEach((r) => {
      const fechaStr = r.fecha?.split("T")[0] || r.fecha; // "YYYY-MM-DD"
      if (!map.has(r.alumno_id)) {
        map.set(r.alumno_id, {
          nombre: r.nombre,
          apellido: r.apellido,
          asistencias: {}
        });
      }
      map.get(r.alumno_id).asistencias[fechaStr] =
        Number(r.presente) === 1 ? "Presente" : "Ausente";
    });
    return map;
  }, [historial]);

  // Todas las fechas únicas en orden
  const fechas = useMemo(() => {
    const set = new Set(historial.map((r) => r.fecha?.split("T")[0] || r.fecha));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [historial]);

  // Descargar PDF
  const handleDescargarPDF = async () => {
    try {
      await descargarPDFHistorial(token, materiaId);
    } catch (err) {
      console.error("Error descargando PDF:", err);
      alert("Error al descargar el PDF");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">
          Historial de asistencia — Materia #{materiaId}
        </h1>
        <Link to="/profesor/listaMaterias" className="text-blue-600 hover:underline">
          ← Volver a materias
        </Link>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-sm mb-1">Desde</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Hasta</label>
          <input
            type="date"
            className="border rounded px-2 py-1"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <button
          onClick={cargarHistorial}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Filtrar
        </button>

        {/* Botón PDF */}
        <button
          onClick={handleDescargarPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Descargar PDF
        </button>
      </div>

      {loading && <div>Cargando historial...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && historial.length === 0 && (
        <div className="text-gray-600">No hay asistencias registradas en este rango.</div>
      )}

      {!loading && historial.length > 0 && (
        <table className="w-full border-collapse border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Alumno</th>
              {fechas.map((fecha) => (
                <th key={fecha} className="p-2 border text-center">
                  {formateaFechaLindo(fecha)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(alumnosMap.values())
              .sort((a, b) => a.apellido.localeCompare(b.apellido))
              .map((alumno, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border font-medium">
                    {alumno.apellido}, {alumno.nombre}
                  </td>
                  {fechas.map((fecha) => (
                    <td key={fecha} className="p-2 border text-center">
                      {alumno.asistencias[fecha] || "—"}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HistorialAsistenciaMateria;
