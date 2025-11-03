import { Router } from "express";
import {
  crearInsumoController,
  obtenerInsumosController,
  obtenerInsumoPorIdController,
  actualizarInsumoController,
  eliminarInsumoController,
} from "../controllers/insumos.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin'];

router.post("/", authenticate, authorize(rolesPermitidos), auditar('CREAR INSUMO', 'Se creó un nuevo insumo'), crearInsumoController);
router.get("/", authenticate, authorize(rolesPermitidos), obtenerInsumosController);
router.get("/:id", authenticate, authorize(rolesPermitidos), obtenerInsumoPorIdController);
router.put("/:id", authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR INSUMO', 'Se actualizó un insumo'), actualizarInsumoController);
router.delete("/:id", authenticate, authorize(rolesPermitidos), auditar('ELIMINAR INSUMO', 'Se eliminó un insumo'), eliminarInsumoController);

export default router;

