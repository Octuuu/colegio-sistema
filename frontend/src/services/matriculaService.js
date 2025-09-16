import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Crear pago de matrícula
export const crearMatricula = async (datos, token) => {
  const res = await axios.post(`${API_URL}/matriculas`, datos, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Obtener pagos por inscripción
export const obtenerMatriculasPorInscripcion = async (inscripcionId, token) => {
  const res = await axios.get(`${API_URL}/matriculas/inscripcion/${inscripcionId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Obtener todos los pagos
export const obtenerTodosLosPagos = async (token) => {
  const res = await axios.get(`${API_URL}/matriculas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Eliminar pago
export const eliminarMatricula = async (id, token) => {
  const res = await axios.delete(`${API_URL}/matriculas/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
