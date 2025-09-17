import { Router } from "express";
import {
  crearServicioController,
  obtenerServiciosController,
  obtenerServicioPorIdController,
  actualizarServicioController,
  eliminarServicioController,
} from "../controllers/servicios.controller.js";

const router = Router();

router.post("/", crearServicioController);
router.get("/", obtenerServiciosController);
router.get("/:id", obtenerServicioPorIdController);
router.put("/:id", actualizarServicioController);
router.delete("/:id", eliminarServicioController);

export default router;
