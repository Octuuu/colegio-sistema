import { Router } from "express";
import {
  registrarMovimientoController,
  obtenerMovimientosController,
  stockBajoController,
  consumoPeriodoController,
} from "../controllers/insumosMovimientos.controller.js";

const router = Router();

// Registrar movimiento (entrada/salida)
router.post("/:id/movimientos", registrarMovimientoController);

// Obtener historial de movimientos
router.get("/:id/movimientos", obtenerMovimientosController);

// Reporte: insumos con stock bajo
router.get("/reportes/stock-bajo", stockBajoController);

// Reporte: consumo por periodo
router.get("/reportes/consumo", consumoPeriodoController);

export default router;

