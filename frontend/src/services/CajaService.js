import axios from 'axios';

const API_URL = 'http://localhost:3000/api/caja';

export const obtenerMovimientos = async ({ desde, hasta }, token) => {
  try {
    const res = await axios.get(`${API_URL}/movimientos`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { desde, hasta }
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (error) {
    console.error('Error obtenerMovimientos:', error.response?.data || error.message);
    return [];
  }
};

export const getCajaAbierta = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/abierta`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data; // null si no hay caja abierta
  } catch (error) {
    console.error('Error getCajaAbierta:', error.response?.data || error.message);
    return null;
  }
};

export const abrirCaja = async (datos, token) => {
  try {
    const res = await axios.post(`${API_URL}/abrir`, datos, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error('Error abrirCaja:', error.response?.data || error.message);
    throw error;
  }
};

export const cerrarCaja = async (datos, token) => {
  try {
    if (!datos.caja_id) throw new Error('Falta el ID de la caja para cerrar');
    const res = await axios.post(`${API_URL}/cerrar`, datos, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error('Error cerrarCaja:', error.response?.data || error.message);
    throw error;
  }
};

export const resumenCaja = async (fecha, token) => {
  try {
    const res = await axios.get(`${API_URL}/balance`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { desde: fecha + ' 00:00:00', hasta: fecha + ' 23:59:59' },
    });
    return {
      total_ingresos: res.data.total_ingresos || 0,
      total_egresos: res.data.total_egresos || 0,
      saldo_final: res.data.neto || 0,
    };
  } catch (error) {
    console.error('Error resumenCaja:', error.response?.data || error.message);
    return { total_ingresos: 0, total_egresos: 0, saldo_final: 0 };
  }
};

export const crearMovimiento = async (datos, token) => {
  try {
    const res = await axios.post(`${API_URL}/movimiento`, datos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error crearMovimiento:', error.response?.data || error.message);
    throw error;
  }
};

export const obtenerTodasLasCajas = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/todas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error obtenerTodasLasCajas:', error.response?.data || error.message);
    return [];
  }
};

export const obtenerDetalleCaja = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/detalle/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Error obtenerDetalleCaja:', error.response?.data || error.message);
    return null;
  }
};
