import axios from "axios";

const API_URL = "http://localhost:3000/api/matriculas";

// Obtener todos los pagos
export const obtenerTodosLosPagos = async (token) => {
  const res = await axios.get(`${API_URL}/pagos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Obtener pagos por matrícula específica
export const obtenerPagosPorMatricula = async (matriculaId, token) => {
  const res = await axios.get(`${API_URL}/${matriculaId}/pagos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Crear un nuevo pago/matrícula
export const crearMatricula = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Eliminar un pago
export const eliminarMatricula = async (id, token) => {
  const res = await axios.delete(`${API_URL}/pagos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Obtener todas las matrículas pendientes (si las necesitas)
export const obtenerMatriculasPendientes = async (token) => {
  const res = await axios.get(`${API_URL}/pendientes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

