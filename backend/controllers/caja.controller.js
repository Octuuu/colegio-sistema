import * as CajaModel from '../models/caja.model.js';

// 📦 APERTURA Y CIERRE
export const abrirCajaController = async (req, res) => {
  try {
    const { monto_apertura, usuario_apertura_id, descripcion } = req.body;
    
    if (monto_apertura === undefined || monto_apertura === null) {
      return res.status(400).json({ message: 'El monto de apertura es obligatorio.' });
    }

    if (isNaN(Number(monto_apertura)) || Number(monto_apertura) < 0) {
      return res.status(400).json({ message: 'El monto de apertura debe ser un número válido.' });
    }

    const caja = await CajaModel.abrirCaja({
      monto_apertura: Number(monto_apertura),
      usuario_apertura_id: usuario_apertura_id || req.user?.id || 1,
      descripcion
    });

    res.status(201).json({ 
      message: 'Caja abierta correctamente', 
      caja 
    });
  } catch (error) {
    console.error('Error en abrirCajaController:', error);
    res.status(500).json({ 
      message: 'Error al abrir la caja', 
      error: error.message 
    });
  }
};

export const cerrarCajaController = async (req, res) => {
  try {
    const { caja_id, usuario_cierre_id, descripcion } = req.body;
    
    if (!caja_id) {
      return res.status(400).json({ message: 'El ID de la caja es obligatorio.' });
    }

    const cajaCerrada = await CajaModel.cerrarCaja({
      caja_id: Number(caja_id),
      usuario_cierre_id: usuario_cierre_id || req.user?.id || 1,
      descripcion
    });

    res.json({ 
      message: 'Caja cerrada correctamente',
      caja: cajaCerrada 
    });
  } catch (error) {
    console.error('Error en cerrarCajaController:', error);
    res.status(500).json({ 
      message: 'Error al cerrar la caja', 
      error: error.message 
    });
  }
};

export const getCajaAbiertaController = async (req, res) => {
  try {
    const caja = await CajaModel.getCajaAbierta();
    res.status(200).json(caja || null);
  } catch (error) {
    console.error('Error en getCajaAbiertaController:', error);
    res.status(500).json({ 
      message: 'Error al obtener la caja abierta', 
      error: error.message 
    });
  }
};

// 🔥 CORREGIDO MEJORADO: Validar tipo de movimiento
export const registrarMovimientoController = async (req, res) => {
  try {
    const { tipo_movimiento, descripcion, monto, caja_apertura_id, registrado_por } = req.body;

    // 🔥 LOGS DE DIAGNÓSTICO DETALLADOS
    console.log('🎯 DATOS RECIBIDOS en registrarMovimientoController:');
    console.log('   - tipo_movimiento:', tipo_movimiento);
    console.log('   - descripcion:', descripcion);
    console.log('   - monto:', monto);
    console.log('   - caja_apertura_id:', caja_apertura_id);
    console.log('   - registrado_por:', registrado_por);

    // ✅ VALIDACIONES CRÍTICAS
    if (!tipo_movimiento) {
      return res.status(400).json({ 
        message: 'El tipo de movimiento es obligatorio.' 
      });
    }

    // Normalizar tipo (aceptar mayúsculas/minúsculas)
    const tipoNormalizado = tipo_movimiento.toLowerCase();
    
    if (!['ingreso', 'egreso'].includes(tipoNormalizado)) {
      return res.status(400).json({ 
        message: 'Tipo de movimiento inválido. Debe ser "Ingreso" o "Egreso".' 
      });
    }

    if (!descripcion || !monto || !caja_apertura_id) {
      return res.status(400).json({ 
        message: 'Descripción, monto y caja_apertura_id son obligatorios.' 
      });
    }

    if (isNaN(Number(monto)) || Number(monto) <= 0) {
      return res.status(400).json({ 
        message: 'El monto debe ser un número mayor a 0.' 
      });
    }

    // ✅ CORRECCIÓN AUTOMÁTICA: Ciertas descripciones deben ser siempre INGRESOS
    let tipoCorregido = tipoNormalizado;
    const descripcionLower = descripcion.toLowerCase();
    
    if (descripcionLower.includes('saldo inicial') || 
        descripcionLower.includes('pago de') || 
        descripcionLower.includes('matrícula') ||
        descripcionLower.includes('matricula') ||
        descripcionLower.includes('mensualidad')) {
      
      if (tipoNormalizado !== 'ingreso') {
        console.log(`✅ CORRECCIÓN AUTOMÁTICA: "${descripcion}" convertido de "${tipoNormalizado}" a "ingreso"`);
      }
      tipoCorregido = 'ingreso';
    }

    console.log('🎯 ENVIANDO AL MODELO:');
    console.log('   - tipo_movimiento:', tipoCorregido);

    const movimiento = await CajaModel.registrarMovimiento({
      tipo_movimiento: tipoCorregido, // ✅ Enviar tipo corregido
      descripcion,
      monto: Number(monto),
      caja_apertura_id: Number(caja_apertura_id),
      registrado_por: registrado_por || req.user?.id || 1
    });
    
    res.status(201).json({ 
      message: 'Movimiento registrado correctamente', 
      movimiento 
    });
  } catch (error) {
    console.error('❌ Error en registrarMovimientoController:', error);
    res.status(500).json({ 
      message: 'Error al registrar el movimiento', 
      error: error.message 
    });
  }
};

export const obtenerMovimientosController = async (req, res) => {
  try {
    const filtros = {
      desde: req.query.desde || null,
      hasta: req.query.hasta || null,
      caja_apertura_id: req.query.caja_apertura_id || null,
      tipo: req.query.tipo || null
    };
    
    console.log('🎯 FILTROS RECIBIDOS en obtenerMovimientosController:');
    console.log('   - desde:', filtros.desde);
    console.log('   - hasta:', filtros.hasta);
    console.log('   - caja_apertura_id:', filtros.caja_apertura_id);
    console.log('   - tipo:', filtros.tipo);

    const movimientos = await CajaModel.obtenerMovimientos(filtros);
    
    // 🔥 LOG PARA DEBUG: Mostrar tipos de movimientos
    console.log('📊 MOVIMIENTOS ENCONTRADOS:', movimientos.length);
    movimientos.slice(0, 5).forEach((mov, index) => {
      console.log(`   ${index + 1}. Tipo: ${mov.tipo_movimiento}, Desc: ${mov.descripcion}, Monto: ${mov.monto}`);
    });

    res.json(movimientos);
  } catch (error) {
    console.error('Error en obtenerMovimientosController:', error);
    res.status(500).json({ 
      message: 'Error al obtener los movimientos', 
      error: error.message 
    });
  }
};

// 📊 BALANCE
export const obtenerBalanceController = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    
    if (!desde || !hasta) {
      return res.status(400).json({ 
        message: 'Debe proporcionar fechas "desde" y "hasta".' 
      });
    }

    const balance = await CajaModel.obtenerBalanceEntreFechas({ desde, hasta });
    res.json(balance);
  } catch (error) {
    console.error('Error en obtenerBalanceController:', error);
    res.status(500).json({ 
      message: 'Error al obtener el balance', 
      error: error.message 
    });
  }
};

// ✅ RUTA RESUMEN POR FECHA
export const obtenerResumenPorFechaController = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    
    if (!fecha) {
      return res.status(400).json({ 
        message: 'La fecha es obligatoria.' 
      });
    }

    const desde = fecha + ' 00:00:00';
    const hasta = fecha + ' 23:59:59';
    
    const balance = await CajaModel.obtenerBalanceEntreFechas({ desde, hasta });
    res.json(balance);
  } catch (error) {
    console.error('Error en obtenerResumenPorFechaController:', error);
    res.status(500).json({ 
      message: 'Error al obtener resumen por fecha', 
      error: error.message 
    });
  }
};

export const obtenerDetalleCajaController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ 
        message: 'ID de caja inválido.' 
      });
    }

    const detalle = await CajaModel.obtenerDetalleCaja(Number(id));

    if (!detalle) {
      return res.status(404).json({ 
        message: 'No se encontró la caja.' 
      });
    }

    // Datos seguros para el frontend - USANDO gmail en lugar de nombre
    const cajaSeguro = {
      ...detalle.caja,
      usuario_apertura: detalle.caja.usuario_apertura_gmail || '-',
      usuario_cierre: detalle.caja.usuario_cierre_gmail || '-',
      monto_apertura: detalle.caja.monto_apertura ?? 0,
      monto_cierre: detalle.caja.monto_cierre ?? 0,
      fecha_apertura: detalle.caja.fecha_apertura || null,
      fecha_cierre: detalle.caja.fecha_cierre || null,
      estado: detalle.caja.estado || '-',
      descripcion: detalle.caja.descripcion || '-',
    };

    const movimientosSeguro = detalle.movimientos.map((mov, index) => ({
      id: mov.id ?? index,
      fecha: mov.fecha || null,
      tipo: mov.tipo || '-',
      descripcion: mov.descripcion || '-',
      monto: mov.monto ?? 0,
      registrado_por: mov.registrado_por || '-',
    }));

    res.json({ 
      caja: cajaSeguro, 
      movimientos: movimientosSeguro, 
      balance: detalle.balance 
    });
  } catch (error) {
    console.error('Error en obtenerDetalleCajaController:', error);
    res.status(500).json({ 
      message: 'Error al obtener el detalle de la caja', 
      error: error.message 
    });
  }
};

export const listarCajasController = async (req, res) => {
  try {
    const cajas = await CajaModel.listarCajas();
    res.json(cajas);
  } catch (error) {
    console.error('Error en listarCajasController:', error);
    res.status(500).json({ 
      message: 'Error al listar las cajas',
      error: error.message 
    });
  }
};

// 🔄 CORREGIR MOVIMIENTOS EXISTENTES (Para reparar datos incorrectos)
export const corregirMovimientosIncorrectosController = async (req, res) => {
  try {
    const { caja_id } = req.params;
    
    if (!caja_id || isNaN(Number(caja_id))) {
      return res.status(400).json({ 
        message: 'ID de caja inválido.' 
      });
    }

    const resultado = await CajaModel.corregirMovimientosIncorrectos(Number(caja_id));
    
    res.json({
      message: 'Movimientos corregidos correctamente',
      correcciones: resultado
    });
  } catch (error) {
    console.error('Error en corregirMovimientosIncorrectosController:', error);
    res.status(500).json({ 
      message: 'Error al corregir movimientos',
      error: error.message 
    });
  }
};