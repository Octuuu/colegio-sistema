import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearInscripcion = async (datos, token) => {
  const res = await axios.post(`${API_URL}/inscripciones`, datos, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const obtenerAlumnosInscritos = async (cursoId, token) => {
  const res = await axios.get(`${API_URL}/inscripciones/curso/${cursoId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const actualizarInscripcion = async (id, datos, token) => {
  const res = await axios.put(`${API_URL}/inscripciones/${id}`, datos, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
