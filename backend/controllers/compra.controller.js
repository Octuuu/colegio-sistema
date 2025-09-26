import {
  crearCompra,
  obtenerCompras,
  obtenerCompraPorId
} from '../models/compra.model.js';

export const crearCompraController = async (req, res) => {
  try {
    const { proveedor_id, productos, fecha, estado } = req.body;

    if (!proveedor_id || !productos || productos.length === 0) {
      return res.status(400).json({ message: 'Proveedor y productos son obligatorios' });
    }

    const result = await crearCompra({ proveedor_id, productos, fecha, estado });
    res.status(201).json({ message: 'Compra registrada con éxito', ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la compra' });
  }
};

export const obtenerComprasController = async (req, res) => {
  try {
    const compras = await obtenerCompras();
    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compras' });
  }
};

export const obtenerCompraController = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await obtenerCompraPorId(id);
    if (!compra) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener compra' });
  }
};
