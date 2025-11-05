import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/mensualidades";

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const obtenerTodosPagos = async (token) => {
  const res = await axios.get(`${API_URL}`, authHeader(token));
  return res.data;
};

export const obtenerPagosAlumno = async (alumnoId, token) => {
  const res = await axios.get(`${API_URL}/${alumnoId}`, authHeader(token));
  return res.data;
};

export const obtenerMensualesPendientes = async (alumnoId, token) => {
  const res = await axios.get(`${API_URL}/pendientes/${alumnoId}`, authHeader(token));
  return res.data;
};

export const pagarMensualidad = async (payload, token) => {
  const res = await axios.post(`${API_URL}/pagar`, payload, authHeader(token));
  return res.data;
};

export const pagarMultiples = async (payload, token) => {
  const res = await axios.post(`${API_URL}/pagar-multiples`, payload, authHeader(token));
  return res.data;
};

export const eliminarPago = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader(token));
  return res.data;
};

export const descargarFacturaMensualidad = async (id, token) => {
  const res = await axios.get(`${API_URL}/factura/${id}`, { 
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `factura_mensualidad_${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
