import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// crear asistencia
export const crearAsistencia = async (datos, token) => {
  const res = await axios.post(`${API_URL}/asistencias`, 
    datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  )

  return res.data;
}

// obtener alumnos
export const obtenerAlumnos = async (token) => {
  const res = await axios.get(`${API_URL}/alumnos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data;
};

// traer la materia
export const obtenerMaterias = async (token) => {
  const res = await axios.get(`${API_URL}/materias/profesor/mis-materias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

// traer el curso

