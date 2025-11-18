import {
  crearPago,
  obtenerTodosPagos,
  obtenerPagosPorAlumno,
  eliminarPago,
  obtenerPagosPorCedula,
  verificarMatriculaPagada as verificarMatriculaPagadaModel
} from "../models/pagos_matricula.model.js";

// Registrar un nuevo pago
export const nuevoPago = async (req, res) => {
  try {
    const { 
      alumnoId, 
      fechaPago, 
      monto, 
      metodoPago, 
      recibidoPor,
      comprobanteNumero,
      concepto 
    } = req.body;
    
    // Validaciones básicas
    if (!alumnoId || !fechaPago || !monto || !metodoPago) {
      return res.status(400).json({ 
        message: "Todos los campos requeridos: alumnoId, fechaPago, monto, metodoPago" 
      });
    }

    // Validar ID de alumno
    const alumnoIdNumber = Number(alumnoId);
    if (isNaN(alumnoIdNumber) || alumnoIdNumber <= 0) {
      return res.status(400).json({ message: "ID de alumno inválido" });
    }

    // Validar monto
    const montoNumber = Number(monto);
    if (isNaN(montoNumber) || montoNumber <= 0) {
      return res.status(400).json({ message: "Monto inválido" });
    }

    // Validar método de pago
    const metodosValidos = ['efectivo', 'tarjeta', 'transferencia', 'cheque'];
    if (!metodosValidos.includes(metodoPago)) {
      return res.status(400).json({ 
        message: "Método de pago inválido", 
        metodosValidos 
      });
    }

    const insertId = await crearPago({
      alumnoId: alumnoIdNumber,
      fechaPago,
      monto: montoNumber,
      metodoPago,
      recibidoPor: recibidoPor || null,
      comprobanteNumero: comprobanteNumero || null,
      concepto: concepto || "Pago de matrícula"
    });

    res.status(201).json({ 
      id: insertId,
      message: "Pago de matrícula registrado correctamente"
    });

  } catch (err) {
    console.error('Error en nuevoPago:', err);
    
    if (err.message.includes("ya tiene una matrícula pagada")) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("No hay caja abierta")) {
      return res.status(400).json({ message: err.message });
    }
    if (err.message.includes("Alumno no encontrado")) {
      return res.status(404).json({ message: err.message });
    }
    
    res.status(500).json({ 
      message: "Error al registrar el pago",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Listar todos los pagos
export const listarPagos = async (req, res) => {
  try {
    const pagos = await obtenerTodosPagos();
    res.json({
      success: true,
      data: pagos,
      total: pagos.length
    });
  } catch (err) {
    console.error('Error en listarPagos:', err);
    res.status(500).json({ 
      message: "Error al obtener pagos",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Listar pagos de un alumno
export const listarPagosPorAlumno = async (req, res) => {
  try {
    const { alumnoId } = req.params;
    
    if (!alumnoId || isNaN(Number(alumnoId)) || Number(alumnoId) <= 0) {
      return res.status(400).json({ message: "ID de alumno inválido" });
    }

    const pagos = await obtenerPagosPorAlumno(alumnoId);
    
    res.json({
      success: true,
      data: pagos,
      total: pagos.length
    });
  } catch (err) {
    console.error('Error en listarPagosPorAlumno:', err);
    res.status(500).json({ 
      message: "Error al obtener pagos del alumno",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Eliminar pago
export const borrarPago = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ message: "ID de pago inválido" });
    }

    const result = await eliminarPago(id);
    
    if (result === 0) {
      return res.status(404).json({ message: "Pago no encontrado" });
    }
    
    res.json({ 
      success: true,
      message: "Pago eliminado correctamente",
      eliminado: result 
    });
  } catch (err) {
    console.error('Error en borrarPago:', err);
    
    res.status(500).json({ 
      message: "Error al eliminar pago",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Listar pagos por cédula
export const listarPagosPorCedula = async (req, res) => {
  try {
    const { cedula } = req.params;

    if (!cedula) {
      return res.status(400).json({ message: "Cédula requerida" });
    }

    const pagos = await obtenerPagosPorCedula(cedula);
    
    res.json({
      success: true,
      data: pagos,
      total: pagos.length
    });
  } catch (err) {
    console.error('Error en listarPagosPorCedula:', err);
    res.status(500).json({ 
      message: "Error al obtener pagos por cédula",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// Verificar si un alumno ya tiene matrícula pagada
export const verificarMatriculaPagada = async (req, res) => {
  try {
    const { alumnoId } = req.params;
    
    if (!alumnoId || isNaN(Number(alumnoId)) || Number(alumnoId) <= 0) {
      return res.status(400).json({ message: "ID de alumno inválido" });
    }

    const tieneMatricula = await verificarMatriculaPagadaModel(alumnoId);
    
    res.json({
      success: true,
      tieneMatriculaPagada: tieneMatricula,
      alumnoId: parseInt(alumnoId)
    });
  } catch (err) {
    console.error('Error en verificarMatriculaPagada:', err);
    res.status(500).json({ 
      message: "Error al verificar matrícula",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};