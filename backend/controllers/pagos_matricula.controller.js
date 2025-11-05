import {
  crearPago,
  obtenerTodosPagos,
  obtenerPagosPorAlumno,
  eliminarPago
} from "../models/pagos_matricula.model.js";
import pool from "../config/db.js";

// Registrar un nuevo pago
export const nuevoPago = async (req, res) => {
  try {
    const { alumnoId, fechaPago, monto, metodoPago, recibidoPor } = req.body;
    
    if (!alumnoId || isNaN(Number(alumnoId)) || Number(alumnoId) <= 0) {
      return res.status(400).json({ message: "ID de alumno inválido" });
    }
    if (!monto || isNaN(Number(monto)) || Number(monto) <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }

    // Validaciones básicas
    if (!alumnoId || !fechaPago || !monto || !metodoPago) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const alumnoIdNumber = Number(alumnoId);
    if (isNaN(alumnoIdNumber) || alumnoIdNumber <= 0) {
      return res.status(400).json({ message: "ID de alumno inválido" });
    }

    const insertId = await crearPago({
      alumnoId: alumnoIdNumber,
      fechaPago,
      monto,
      metodoPago,
      recibidoPor: recibidoPor || null
    });

    res.status(201).json({ id: insertId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Listar todos los pagos
export const listarPagos = async (req, res) => {
  try {
    const pagos = await obtenerTodosPagos();
    res.json(pagos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener pagos" });
  }
};

// Listar pagos de un alumno
export const listarPagosPorAlumno = async (req, res) => {
  try {
    const pagos = await obtenerPagosPorAlumno(req.params.alumnoId);
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener pagos del alumno" });
  }
};

// Eliminar pago
export const borrarPago = async (req, res) => {
  try {
    const result = await eliminarPago(req.params.id);
    res.json({ eliminado: result });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar pago" });
  }
};

export const listarPagosPorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;

    const [rows] = await pool.query(`
      SELECT 
        p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, p.estado,
        a.nombre AS alumno_nombre, a.apellido AS alumno_apellido, a.cedula
      FROM pagos_matricula p
      LEFT JOIN alumnos a ON p.alumno_id = a.id
      WHERE a.cedula = ?
      ORDER BY p.fecha_pago DESC
    `, [cedula]);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener pagos por cédula" });
  }
};