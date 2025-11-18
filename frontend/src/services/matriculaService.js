import axios from 'axios';
import { buscarAlumnosPorCedulaService } from './alumnoService.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Buscar alumnos por cédula o nombre (usa la función existente)
export const buscarAlumnosPorCedula = async (busqueda, token) => {
  return await buscarAlumnosPorCedulaService(busqueda, token);
};

// Crear pago de matrícula
export const crearMatricula = async (pagoData, token) => {
  const response = await axios.post(`${API_URL}/matriculas`, pagoData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Obtener todos los pagos
export const obtenerPagosMatricula = async (token) => {
  const response = await axios.get(`${API_URL}/matriculas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Verificar si alumno ya tiene matrícula pagada
export const verificarMatriculaPagada = async (alumnoId, token) => {
  const response = await axios.get(`${API_URL}/matriculas/verificar-matricula/${alumnoId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Eliminar pago (usa DELETE en lugar de PATCH)
export const eliminarPago = async (pagoId, token) => {
  const response = await axios.delete(`${API_URL}/matriculas/${pagoId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Descargar factura PDF
export const descargarFacturaMatriculaPDF = async (pagoId, token) => {
  const response = await axios.get(`${API_URL}/matriculas/${pagoId}/pdf`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'blob'
  });
  
  // Crear URL del blob y descargar
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `factura-matricula-${pagoId}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};