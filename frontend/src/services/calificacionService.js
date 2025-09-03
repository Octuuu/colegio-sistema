import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// regsitrar calificacion 
export const registrarCalificacion = async (datos, token) => {
    const res = await axios.post(`${API_URL}/calificacion`, datos, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
}

// obetener calificaciones por alumno
export const obtenerCalificaciones = async (id, token) => {
  const endpoint = id ? `${API_URL}/calificacion/${id}` : `${API_URL}/calificaciones/mis-calificaciones`;
  const res = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};