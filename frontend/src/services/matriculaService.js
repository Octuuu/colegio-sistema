import axios from "axios";

const API_URL = "http://localhost:3000/api/matriculas";
const API_URL_ALUMNOS = "http://localhost:3000/api/alumnos";

export const obtenerTodosLosPagos = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const obtenerPagosPorMatricula = async (matriculaId, token) => {
  const res = await axios.get(`${API_URL}/${matriculaId}/pagos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const crearMatricula = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const eliminarMatricula = async (id, token) => {
  const res = await axios.delete(`${API_URL}/pagos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// BUSCADOR: usa el endpoint de alumnos que ya existe (/api/alumnos/search?q=...)
export const buscarAlumnosPorCedula = async (cedula, token) => {
  const res = await axios.get(`${API_URL_ALUMNOS}/search?q=${encodeURIComponent(cedula)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
