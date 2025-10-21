import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/mensualidades";

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

// Obtener todos los pagos (admin)
export const obtenerTodosPagos = async (token) => {
  const res = await axios.get(`${API_URL}`, authHeader(token));
  return res.data;
};

// Obtener pagos / historial de un alumno
export const obtenerPagosAlumno = async (alumnoId, token) => {
  const res = await axios.get(`${API_URL}/${alumnoId}`, authHeader(token));
  return res.data;
};

// Obtener mensualidades pendientes de un alumno
export const obtenerMensualesPendientes = async (alumnoId, token) => {
  const res = await axios.get(`${API_URL}/pendientes/${alumnoId}`, authHeader(token));
  return res.data;
};

// Pagar una mensualidad
// payload: { alumnoId, month: "YYYY-MM", fechaPago: "YYYY-MM-DD", monto: number, metodoPago, recibidoPor }
export const pagarMensualidad = async (payload, token) => {
  const res = await axios.post(`${API_URL}/pagar`, payload, authHeader(token));
  return res.data;
};

// Pagar varias mensualidades
// payload: { alumnoId, months: ["YYYY-MM", ...], fechaPago, monto, metodoPago, recibidoPor }
export const pagarMultiples = async (payload, token) => {
  const res = await axios.post(`${API_URL}/pagar-multiples`, payload, authHeader(token));
  return res.data;
};

// Eliminar pago
export const eliminarPago = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, authHeader(token));
  return res.data;
};
