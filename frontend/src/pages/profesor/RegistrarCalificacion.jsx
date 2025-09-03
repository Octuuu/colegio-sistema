import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { registrarCalificacion } from "../../services/calificacionService";
import axios from "axios";

const RegistrarCalificacion = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({
    alumno_id: "",
    materia_id: "",
    nota: "",
  });

  // Obtener alumnos y materias
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/alumnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlumnos(res.data);
      } catch (error) {
        console.error("Error al obtener alumnos:", error.response?.data || error.message);
      }
    };

    const fetchMaterias = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/materias", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaterias(res.data);
      } catch (error) {
        console.error("Error al obtener materias:", error.response?.data || error.message);
      }
    };

    fetchAlumnos();
    fetchMaterias();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarCalificacion(form, token);
      alert("Calificación registrada con éxito");
      setForm({ alumno_id: "", materia_id: "", nota: "" });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Error al registrar calificación");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">Registrar Calificación</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          name="alumno_id"
          value={form.alumno_id}
          onChange={handleChange}
          required
          className="border border-gray-400 p-2 rounded"
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre} {a.apellido}
            </option>
          ))}
        </select>

        <select
          name="materia_id"
          value={form.materia_id}
          onChange={handleChange}
          required
          className="border border-gray-400 p-2 rounded"
        >
          <option value="">Seleccione una materia</option>
          {materias.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="nota"
          value={form.nota}
          onChange={handleChange}
          placeholder="Nota"
          min="0"
          max="100"
          required
          className="border border-gray-400 p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistrarCalificacion;
