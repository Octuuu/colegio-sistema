import axios from "axios";

const API_URL = "http://localhost:3000/api";

// 🔹 Obtener alumnos de una materia
export const obtenerAlumnosPorMateria = async (materiaId, token) => {
  const res = await axios.get(`${API_URL}/profesor/materia/${materiaId}/alumnos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// registrar calificación
export const registrarCalificacion = async ({ alumno_id, materia_id, nota, token }) => {
  const res = await axios.post(
    `${API_URL}/calificacion`,
    { alumno_id, materia_id, nota },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};