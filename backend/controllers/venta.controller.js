import * as ventaModel from '../models/venta.model.js';

// Crear venta
export const crearVentaController = async (req, res) => {
  try {
    const resultado = await ventaModel.crearVenta(req.body);
    res.json({ message: 'Venta registrada y factura generada', ...resultado });
  } catch (err) {
    console.error('Error en crearVentaController:', err);
    res.status(500).json({ error: 'Error al registrar la venta' });
  }
};

// Obtener todas las ventas
export const obtenerVentasController = async (req, res) => {
  try {
    const ventas = await ventaModel.obtenerVentas();
    res.json(ventas);
  } catch (err) {
    console.error('Error en obtenerVentasController:', err);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

// Obtener venta por ID
export const obtenerVentaController = async (req, res) => {
  try {
    const venta = await ventaModel.obtenerVentaPorId(req.params.id);
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(venta);
  } catch (err) {
    console.error('Error en obtenerVentaController:', err);
    res.status(500).json({ error: 'Error al obtener venta' });
  }
};
