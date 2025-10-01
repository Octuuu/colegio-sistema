import { Router } from "express";
import {
  nuevoPagoMatricula,
  getPagosPorMatricula,
  getTodosLosPagos,
  borrarPagoMatricula
} from "../controllers/pagos_matricula.controller.js";

const router = Router();

// Crear pago
router.post("/", nuevoPagoMatricula);

// Obtener pagos de una matrícula
router.get("/matricula/:matriculaId", getPagosPorMatricula);

// Obtener todos los pagos
router.get("/", getTodosLosPagos);

// Eliminar pago
router.delete("/:id", borrarPagoMatricula);

export default router;
