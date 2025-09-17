import axios from 'axios';

const API_URL = 'http://localhost:3000/api/servicios';

export const obtenerServicios = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const crearServicio = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const actualizarServicio = async (id, formData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const eliminarServicio = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
