import { Router } from 'express';
import {
  abrirCajaController,
  cerrarCajaController,
  getCajaAbiertaController,
  registrarMovimientoController,
  obtenerMovimientosController,
  obtenerBalanceController,
  obtenerResumenPorFechaController,
  obtenerDetalleCajaController,
  listarCajasController,
} from '../controllers/caja.controller.js';

const router = Router();

// 📦 Caja
router.post('/abrir', abrirCajaController);
router.post('/cerrar', cerrarCajaController);
router.get('/abierta', getCajaAbiertaController);

// 💰 Movimientos
router.post('/movimiento', registrarMovimientoController);
router.get('/movimientos', obtenerMovimientosController);

// 📊 Balance
router.get('/balance', obtenerBalanceController);

// 📝 Resumen por fecha
router.get('/resumen/:fecha', obtenerResumenPorFechaController);

// ✅ Ruta general para frontend que pide /api/caja
router.get('/', getCajaAbiertaController);

router.get('/detalle/:id', obtenerDetalleCajaController);

router.get('/todas', listarCajasController);

export default router;
