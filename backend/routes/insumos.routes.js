import { Router } from "express";
import {
  crearInsumoController,
  obtenerInsumosController,
  obtenerInsumoPorIdController,
  actualizarInsumoController,
  eliminarInsumoController,
} from "../controllers/insumos.controller.js";

const router = Router();

router.post("/", crearInsumoController);
router.get("/", obtenerInsumosController);
router.get("/:id", obtenerInsumoPorIdController);
router.put("/:id", actualizarInsumoController);
router.delete("/:id", eliminarInsumoController);

export default router;
