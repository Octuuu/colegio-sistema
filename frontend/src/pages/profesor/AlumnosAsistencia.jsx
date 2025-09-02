// components/AlumnosAsistencia.jsx
import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { obtenerAlumnos, guardarAsistencia } from "../../services/profesorService";
import { useParams } from "react-router-dom";

const AlumnosAsistencia = () => {
  const { token } = useContext(AuthContext);
  const { materiaId } = useParams(); // id de la materia desde la URL
  const [alumnos, setAlumnos] = useState([]);
  const [asistencia, setAsistencia] = useState({}); // { alumno_id: true/false }
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar alumnos
  const cargarAlumnos = useCallback(async () => {
    try {
      const data = await obtenerAlumnos(token, materiaId);
      setAlumnos(data);

      // Inicializar asistencia en false
      const inicial = {};
      data.forEach((a) => {
        inicial[a.alumno_id] = false;
      });
      setAsistencia(inicial);
    } catch (err) {
      console.error("Error al obtener alumnos", err);
    }
  }, [token, materiaId]);

  useEffect(() => {
    cargarAlumnos();
  }, [cargarAlumnos]);

  // Cambiar checkbox
  const handleCheckbox = (alumnoId) => {
    setAsistencia((prev) => ({
      ...prev,
      [alumnoId]: !prev[alumnoId],
    }));
  };

  // Guardar asistencia
  const handleGuardar = async () => {
    try {
      setLoading(true);

      // Fecha actual en formato YYYY-MM-DD
      const hoy = new Date().toISOString().split("T")[0];

      // Crear array de asistencias
      const arrayAsistencia = Object.entries(asistencia).map(([alumno_id, presente]) => ({
        alumno_id: Number(alumno_id),
        presente,
        fecha: hoy,
      }));

      await guardarAsistencia(token, materiaId, arrayAsistencia);

      setMensaje("Asistencia guardada correctamente ✅");
    } catch (err) {
      console.error("Error al guardar asistencia", err);
      setMensaje("Error al guardar asistencia ❌");
    } finally {
      setLoading(false);
      setTimeout(() => setMensaje(""), 3000); // limpiar mensaje
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Alumnos de la materia</h2>

      {mensaje && (
        <div
          className={`mb-4 ${
            mensaje.includes("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </div>
      )}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Curso</th>
            <th className="p-2 border">Año</th>
            <th className="p-2 border">Presente</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((a) => (
            <tr key={a.alumno_id} className="border-t">
              <td className="p-2 border">{a.nombre}</td>
              <td className="p-2 border">{a.apellido}</td>
              <td className="p-2 border">{a.curso}</td>
              <td className="p-2 border">{a.anio}°</td>
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={asistencia[a.alumno_id] || false}
                  onChange={() => handleCheckbox(a.alumno_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleGuardar}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Guardando..." : "Guardar Asistencia"}
      </button>
    </div>
  );
};

export default AlumnosAsistencia;
