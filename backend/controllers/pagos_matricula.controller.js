import {
  crearPagoMatricula,
  obtenerPagosPorMatricula,
  obtenerTodosLosPagos,
  eliminarPagoMatricula
} from '../models/pagos_matricula.model.js';

// Crear nuevo pago
export const nuevoPagoMatricula = async (req, res) => {
  try {
    const { matriculaId, fechaPago, monto, metodoPago, recibidoPor } = req.body;

    if (!matriculaId || !monto || !metodoPago) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const id = await crearPagoMatricula(
      matriculaId,
      fechaPago || new Date(),
      monto,
      metodoPago,
      recibidoPor || null
    );

    res.status(201).json({ message: "Pago registrado correctamente", id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar pago" });
  }
};

// Obtener pagos de una matrícula
export const getPagosPorMatricula = async (req, res) => {
  try {
    const { matriculaId } = req.params;
    const pagos = await obtenerPagosPorMatricula(matriculaId);
    res.json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener pagos" });
  }
};

// Obtener todos los pagos
export const getTodosLosPagos = async (req, res) => {
  try {
    const pagos = await obtenerTodosLosPagos();
    res.json(pagos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener pagos" });
  }
};

// Eliminar pago
export const borrarPagoMatricula = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await eliminarPagoMatricula(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }

    res.json({ message: "Pago eliminado y matrícula actualizada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar pago" });
  }
};
