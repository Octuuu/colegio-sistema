import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { obtenerCalificaciones } from "../../services/calificacionService";

const VerCalificaciones = ({ alumnoId }) => {
  const { token } = useContext(AuthContext);
  const [calificaciones, setCalificaciones] = useState([]);

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        const res = await obtenerCalificaciones(alumnoId, token);
        setCalificaciones(res);
      } catch (error) {
        console.error("Error al obtener calificaciones:", error.response?.data || error.message);
      }
    };

    fetchCalificaciones();
  }, [token, alumnoId]);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Calificaciones</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border px-4 py-2">Alumno</th>
            <th className="border px-4 py-2">Materia</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Nota</th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="border px-4 py-2">{c.nombre} {c.apellido}</td>
              <td className="border px-4 py-2">{c.materia}</td>
              <td className="border px-4 py-2">{c.fecha}</td>
              <td className="border px-4 py-2">{c.nota}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {calificaciones.length === 0 && <p className="text-center mt-4">No hay calificaciones registradas.</p>}
    </div>
  );
};

export default VerCalificaciones;
