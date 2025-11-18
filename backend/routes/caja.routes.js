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
  corregirMovimientosIncorrectosController
} from '../controllers/caja.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'cajero'];

router.post('/abrir', authenticate, authorize(rolesPermitidos), auditar('ABRIR CAJA', 'Se abrió una nueva caja'), abrirCajaController);
router.post('/cerrar', authenticate, authorize(rolesPermitidos), auditar('CERRAR CAJA', 'Se cerró una caja'), cerrarCajaController);
router.get('/abierta', authenticate, authorize(rolesPermitidos), getCajaAbiertaController);
router.post('/movimiento', authenticate, authorize(rolesPermitidos), auditar('REGISTRAR MOVIMIENTO', 'Se registró un movimiento en caja'), registrarMovimientoController);
router.get('/movimientos', authenticate, authorize(rolesPermitidos), obtenerMovimientosController);
router.get('/balance', authenticate, authorize(rolesPermitidos), obtenerBalanceController);
router.get('/resumen/:fecha', authenticate, authorize(rolesPermitidos), obtenerResumenPorFechaController);
router.get('/', authenticate, authorize(rolesPermitidos), getCajaAbiertaController);
router.get('/detalle/:id', authenticate, authorize(rolesPermitidos), obtenerDetalleCajaController);
router.get('/todas', authenticate, authorize(rolesPermitidos), listarCajasController);
// Agrega esta ruta a tus routes
router.patch('/corregir/:caja_id', corregirMovimientosIncorrectosController);

export default router;