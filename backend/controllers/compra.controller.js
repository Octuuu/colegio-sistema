import * as compraModel from '../models/compra.model.js';

export const crearCompraController = async (req, res) => {
  try {
    const { proveedor_id, productos = [], insumos = [], fecha, estado } = req.body;

    if (!proveedor_id) return res.status(400).json({ message: "Proveedor es requerido" });
    if (!productos.length && !insumos.length) return res.status(400).json({ message: "Debe haber al menos un producto o insumo" });

    const result = await compraModel.crearCompra({ proveedor_id, productos, insumos, fecha, estado });

    res.status(201).json({ message: "Compra registrada con éxito", ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar compra" });
  }
};

export const obtenerComprasController = async (req, res) => {
  try {
    const compras = await compraModel.obtenerCompras();
    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener compras" });
  }
};

export const obtenerCompraController = async (req, res) => {
  try {
    const compra = await compraModel.obtenerCompraPorId(req.params.id);
    if (!compra) return res.status(404).json({ message: "Compra no encontrada" });
    res.json(compra);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener compra" });
  }
};
