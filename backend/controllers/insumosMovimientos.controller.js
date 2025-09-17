import {
  registrarMovimiento,
  obtenerMovimientos,
  obtenerInsumosStockBajo,
  obtenerConsumoPorPeriodo,
} from "../models/insumosMovimientos.model.js";

console.log({
  registrarMovimiento,
  obtenerMovimientos,
  obtenerInsumosStockBajo,
  obtenerConsumoPorPeriodo,
});


// Registrar entrada o salida de insumo
export const registrarMovimientoController = async (req, res) => {
  try {
    const { id } = req.params; // ID del insumo
    const { tipo, cantidad, descripcion } = req.body;

    if (!tipo || !cantidad) {
      return res.status(400).json({ message: "Tipo y cantidad son requeridos" });
    }
    if (!["entrada", "salida"].includes(tipo)) {
      return res.status(400).json({ message: "Tipo inválido (entrada o salida)" });
    }

    await registrarMovimiento(id, tipo, cantidad, descripcion || "");
    res.status(201).json({ message: "Movimiento registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar movimiento:", error);
    res.status(500).json({ message: "Error al registrar movimiento" });
  }
};

// Obtener historial de movimientos de un insumo
export const obtenerMovimientosController = async (req, res) => {
  try {
    const { id } = req.params;
    const movimientos = await obtenerMovimientos(id);
    res.json(movimientos);
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    res.status(500).json({ message: "Error al obtener movimientos" });
  }
};

// Insumos con stock bajo
export const stockBajoController = async (req, res) => {
  try {
    const limite = req.query.limite || 5;
    const insumos = await obtenerInsumosStockBajo(limite);
    res.json(insumos);
  } catch (error) {
    console.error("Error al obtener insumos con stock bajo:", error);
    res.status(500).json({ message: "Error al obtener stock bajo" });
  }
};

// Reporte de consumo en un periodo
export const consumoPeriodoController = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    if (!desde || !hasta) {
      return res.status(400).json({ message: "Se requieren las fechas 'desde' y 'hasta'" });
    }

    const consumo = await obtenerConsumoPorPeriodo(desde, hasta);
    res.json(consumo);
  } catch (error) {
    console.error("Error al obtener reporte de consumo:", error);
    res.status(500).json({ message: "Error al obtener reporte de consumo" });
  }
};
