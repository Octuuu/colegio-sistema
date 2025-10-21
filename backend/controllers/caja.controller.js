import * as CajaModel from '../models/caja.model.js';

// 📦 APERTURA Y CIERRE
export const abrirCajaController = async (req, res) => {
  try {
    const { monto_apertura, usuario_apertura_id, descripcion } = req.body;
    if (monto_apertura === undefined)
      return res.status(400).json({ message: 'El monto de apertura es obligatorio.' });

    const caja = await CajaModel.abrirCaja({
      monto_apertura,
      usuario_apertura_id: usuario_apertura_id || 1,
      descripcion
    });

    res.status(201).json({ message: 'Caja abierta correctamente', caja });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al abrir la caja', error: error.message });
  }
};

export const cerrarCajaController = async (req, res) => {
  try {
    const { caja_id, monto_cierre, usuario_cierre_id, descripcion } = req.body;
    if (!caja_id) return res.status(400).json({ message: 'El ID de la caja es obligatorio.' });

    const exito = await CajaModel.cerrarCaja({
      caja_id,
      monto_cierre,
      usuario_cierre_id: usuario_cierre_id || 1,
      descripcion
    });

    if (!exito) return res.status(404).json({ message: 'No se encontró caja abierta con ese ID.' });

    res.json({ message: 'Caja cerrada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al cerrar la caja', error: error.message });
  }
};

export const getCajaAbiertaController = async (req, res) => {
  try {
    const caja = await CajaModel.getCajaAbierta();
    res.status(200).json(caja || null);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la caja abierta', error: error.message });
  }
};

export const registrarMovimientoController = async (req, res) => {
  try {
    const movimiento = await CajaModel.registrarMovimiento(req.body);
    res.status(201).json({ message: 'Movimiento registrado correctamente', movimiento });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el movimiento', error: error.message });
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
    const movimientos = await CajaModel.obtenerMovimientos(filtros);
    res.json(movimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los movimientos', error: error.message });
  }
};

// 📊 BALANCE
export const obtenerBalanceController = async (req, res) => {
  try {
    const { desde, hasta } = req.query;
    if (!desde || !hasta)
      return res.status(400).json({ message: 'Debe proporcionar fechas "desde" y "hasta".' });

    const balance = await CajaModel.obtenerBalanceEntreFechas({ desde, hasta });
    res.json(balance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el balance', error: error.message });
  }
};

// ✅ RUTA RESUMEN POR FECHA
export const obtenerResumenPorFechaController = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const desde = fecha + ' 00:00:00';
    const hasta = fecha + ' 23:59:59';
    const balance = await CajaModel.obtenerBalanceEntreFechas({ desde, hasta });
    res.json(balance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener resumen por fecha', error: error.message });
  }
};

export const obtenerDetalleCajaController = async (req, res) => {
  try {
    const { id } = req.params;
    const detalle = await CajaModel.obtenerDetalleCaja(id);

    if (!detalle) return res.status(404).json({ message: 'No se encontró la caja.' });

    res.json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el detalle de la caja', error: error.message });
  }
};

