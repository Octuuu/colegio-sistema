import { Router } from "express";
import {
  registrarMovimientoController,
  obtenerMovimientosController,
  stockBajoController,
  consumoPeriodoController,
} from "../controllers/insumosMovimientos.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin'];

router.post("/:id/movimientos", authenticate, authorize(rolesPermitidos), auditar('REGISTRAR MOVIMIENTO INSUMO', 'Se registró un movimiento de insumo'), registrarMovimientoController);
router.get("/:id/movimientos", authenticate, authorize(rolesPermitidos), obtenerMovimientosController);
router.get("/reportes/stock-bajo", authenticate, authorize(rolesPermitidos), stockBajoController);
router.get("/reportes/consumo", authenticate, authorize(rolesPermitidos), consumoPeriodoController);

export default router;
