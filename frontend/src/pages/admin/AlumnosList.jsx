import { useEffect, useState, useContext, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { obtenerAlumnosPorCurso } from "../../services/cursoService";
import { eliminarAlumno } from "../../services/alumnoService";

const AlumnosPorCurso = () => {
  const { id: cursoId } = useParams();
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado del modal de tutor
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const cargarAlumnos = useCallback(async () => {
    try {
      const data = await obtenerAlumnosPorCurso(cursoId, token);

      // 🔹 Para cada alumno consultamos si tiene tutor
      const alumnosConTutor = await Promise.all(
        data.map(async (alumno) => {
          try {
            const res = await fetch(
              `http://localhost:3000/api/tutores/alumno/${alumno.id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const tutores = await res.json();
            return { ...alumno, tutor_asignado: tutores.length > 0 };
          } catch {
            return { ...alumno, tutor_asignado: false };
          }
        })
      );

      setAlumnos(alumnosConTutor);
    } catch (err) {
      console.error("Error al cargar alumnos:", err);
    } finally {
      setLoading(false);
    }
  }, [cursoId, token]);

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este alumno?")) {
      try {
        await eliminarAlumno(id, token);
        await cargarAlumnos();
      } catch (error) {
        console.error("Error al eliminar alumno:", error);
        setError(
          "❌ No se puede eliminar este alumno. Puede estar vinculado a otros registros o ha ocurrido un error."
        );
      }
    }
  };

  const cerrarError = () => setError(null);

  useEffect(() => {
    cargarAlumnos();
  }, [cargarAlumnos]);

  // Abrir modal para agregar tutor
  const handleAddTutorClick = (alumno) => {
    setSelectedAlumno(alumno);
    setShowTutorForm(true);
  };

  // Manejo de inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar tutor
  const handleSubmitTutor = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/tutores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, alumno_id: selectedAlumno.id }),
      });

      alert("Tutor agregado con éxito ✅");
      setShowTutorForm(false);
      setFormData({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        direccion: "",
      });
      await cargarAlumnos();
    } catch (error) {
      console.error("Error al agregar tutor:", error);
    }
  };

  if (loading) return <p className="p-4">Cargando alumnos...</p>;

  return (
    <div className="relative">
      {error && (
        <div className="min-h-[100vh] absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md text-center max-w-md w-full">
            <p className="text-red-600 font-semibold mb-4">{error}</p>
            <button
              onClick={cerrarError}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      <div
        className={`${
          error ? "blur-sm pointer-events-none select-none" : ""
        } p-6`}
      >
        <h2 className="text-2xl font-bold mb-4">
          Alumnos del curso {cursoId}
        </h2>

        {alumnos.length === 0 ? (
          <p>No hay alumnos registrados en este curso.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Nombre</th>
                <th className="p-2">Apellido</th>
                <th className="p-2">Email</th>
                <th className="p-2">Acciones</th>
                <th className="p-2">Tutor</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td className="p-2">{alumno.nombre}</td>
                  <td className="p-2">{alumno.apellido}</td>
                  <td className="p-2">{alumno.email}</td>
                  <td className="p-2">
                    <Link
                      to={`/admin/editarAlumnos/${alumno.id}`}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(alumno.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    {alumno.tutor_asignado ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded">
                        Tutor asignado
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddTutorClick(alumno)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Agregar tutor
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal formulario tutor */}
      {showTutorForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-bold mb-4">
              Agregar tutor a {selectedAlumno?.nombre}{" "}
              {selectedAlumno?.apellido}
            </h3>
            <form onSubmit={handleSubmitTutor} className="space-y-3">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTutorForm(false)}
                  className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumnosPorCurso;
