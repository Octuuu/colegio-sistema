import axios from 'axios';

const API_URL = 'http://localhost:3000/api/productos'; 

// obtener todos los productos
export const obtenerProductos = async (token) => {
  const { data } = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// crear un nuevo producto
export const crearProducto = async (producto, token) => {
  const { data } = await axios.post(API_URL, producto, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// actualizar producto existente
export const actualizarProducto = async (id, producto, token) => {
  const { data } = await axios.put(`${API_URL}/${id}`, producto, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// eliminar producto
export const eliminarProducto = async (id, token) => {
  const { data } = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

// actualizar stock
export const actualizarStock = async (id, cantidad, token) => {
  const { data } = await axios.patch(`${API_URL}/${id}/stock`, { cantidad }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};

export const productosBajoStock = async (token, limite = 5) => {
  const { data } = await axios.get(`${API_URL}/bajo-stock?limite=${limite}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
};
