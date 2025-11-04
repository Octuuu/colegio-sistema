import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const crearAlumno = async (datos, token) => {
  const res = await axios.post(`${API_URL}/alumnos`, datos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const actualizarAlumno = async (id, datos, token) => {
  const res = await axios.put(`${API_URL}/alumnos/${id}`, datos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const eliminarAlumno = async (id, token) => {
  const res = await axios.delete(`${API_URL}/alumnos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const obtenerAlumnosPorId = async (id, token) => {
  const res = await axios.get(`${API_URL}/alumnos/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const obtenerAlumnos = async (token) => {
  const res = await axios.get(`${API_URL}/alumnos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const buscarAlumnosPorCedulaService = async (query, token) => {
  const res = await axios.get(`${API_URL}/alumnos/search?q=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
