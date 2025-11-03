import { Router } from "express";
import {
  crearServicioController,
  obtenerServiciosController,
  obtenerServicioPorIdController,
  actualizarServicioController,
  eliminarServicioController,
} from "../controllers/servicios.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();

router.post("/", authenticate, authorize(['admin']), auditar('CREAR SERVICIO', 'Se creó un servicio'), crearServicioController);
router.get("/", authenticate, authorize(['admin']),  obtenerServiciosController);
router.get("/:id", authenticate, authorize(['admin']), auditar('OBTENER SERVICIO', 'Se obtuvo un servicio por ID'), obtenerServicioPorIdController);
router.put("/:id", authenticate, authorize(['admin']), auditar('ACTUALIZAR SERVICIO', 'Se actualizó un servicio'), actualizarServicioController);
router.delete("/:id", authenticate, authorize(['admin']), auditar('ELIMINAR SERVICIO', 'Se eliminó un servicio'), eliminarServicioController);

export default router;
