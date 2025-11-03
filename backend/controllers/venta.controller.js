import * as ventaModel from '../models/venta.model.js';

export const crearVentaController = async (req, res) => {
  try {
    const resultado = await ventaModel.crearVenta(req.body);
    res.json({ message: 'Venta registrada y factura generada', ...resultado });
  } catch (err) {
    console.error('Error en crearVentaController:', err);
    res.status(500).json({ error: 'Error al registrar la venta' });
  }
};

export const obtenerVentasController = async (req, res) => {
  try {
    const ventas = await ventaModel.obtenerVentas();
    res.json(ventas);
  } catch (err) {
    console.error('Error en obtenerVentasController:', err);
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

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

export const obtenerResumenVentasController = async (req, res) => {
  try {
    const resumen = await ventaModel.obtenerResumenVentas();
    res.json(resumen);
  } catch (err) {
    console.error('Error en obtenerResumenVentasController:', err);
    res.status(500).json({ error: 'Error al obtener resumen' });
  }
};

export const obtenerResumenMensualController = async (req, res) => {
  try {
    const data = await ventaModel.obtenerResumenMensual();
    res.json(data);
  } catch (err) {
    console.error('Error en obtenerResumenMensualController:', err);
    res.status(500).json({ error: 'Error al obtener resumen mensual' });
  }
};

export const obtenerProductosMasVendidosController = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 6;
    const productos = await ventaModel.obtenerProductosMasVendidos(limit);
    res.json(productos);
  } catch (err) {
    console.error('Error en obtenerProductosMasVendidosController:', err);
    res.status(500).json({ error: 'Error al obtener productos más vendidos' });
  }
};
