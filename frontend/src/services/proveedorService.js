import axios from 'axios';

const API_URL = 'http://localhost:3000/api/proveedores';

export const obtenerProveedores = async (token) => {
  const res = await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const crearProveedor = async (proveedor, token) => {
  const res = await axios.post(API_URL, proveedor, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const actualizarProveedor = async (id, proveedor, token) => {
  const res = await axios.put(`${API_URL}/${id}`, proveedor, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const eliminarProveedor = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
