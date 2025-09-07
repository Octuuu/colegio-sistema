import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { obtenerAlumnosPorMateria, registrarCalificacion } from "../../services/calificacionService";

const RegistrarCalificacion = () => {
  const { token } = useContext(AuthContext);
  const { materiaId } = useParams();

  const [alumnos, setAlumnos] = useState([]);
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const fetchAlumnos = async () => {
    try {
      const data = await obtenerAlumnosPorMateria(materiaId, token);
      setAlumnos(data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar alumnos:", err);
      setError("No se pudieron cargar los alumnos");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, [materiaId]);

  const handleChange = (alumnoId, value) => {
    setNotas((prev) => ({ ...prev, [alumnoId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      for (const alumno of alumnos) {
        const nota = notas[alumno.alumno_id];
        if (!nota) continue;
        await registrarCalificacion({ alumno_id: alumno.alumno_id, materia_id: Number(materiaId), nota: Number(nota), token });
      }
      setMensaje("Calificaciones registradas correctamente");
      setNotas({});
    } catch (err) {
      console.error("Error al registrar calificaciones:", err);
      setError("No se pudieron registrar las calificaciones");
    }
  };

  if (loading) return <p>Cargando alumnos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registrar Calificaciones</h2>
      {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Alumno</th>
              <th className="p-2">Curso</th>
              <th className="p-2">Nota</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.alumno_id} className="text-center">
                <td className="p-2">{alumno.nombre} {alumno.apellido}</td>
                <td className="p-2">{alumno.curso} {alumno.anio}</td>
                <td className="p-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={notas[alumno.alumno_id] || ""}
                    onChange={(e) => handleChange(alumno.alumno_id, e.target.value)}
                    className="border p-1 w-20 text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar calificaciones
        </button>
      </form>
    </div>
  );
};

export default RegistrarCalificacion;
