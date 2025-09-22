import axios from "axios";
const API_URL = "http://localhost:3000/api/insumos";

export const obtenerInsumos = async (token) => {
  const { data } = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const crearInsumo = async (insumo, token) => {
  const { data } = await axios.post(API_URL, insumo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const actualizarInsumo = async (id, insumo, token) => {
  const { data } = await axios.put(`${API_URL}/${id}`, insumo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const eliminarInsumo = async (id, token) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// stock bajo
export const obtenerInsumosStockBajo = async (limite = 5, token) => {
  const { data } = await axios.get(`${API_URL}/reportes/stock-bajo?limite=${limite}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// movimientos
export const registrarMovimiento = async (insumoId, movimiento, token) => {
  const { tipo, cantidad, descripcion } = movimiento;
  const { data } = await axios.post(`${API_URL}/${insumoId}/movimientos`, 
    { tipo, cantidad, descripcion }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};


export const obtenerMovimientos = async (insumoId, token) => {
  const { data } = await axios.get(`${API_URL}/${insumoId}/movimientos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};