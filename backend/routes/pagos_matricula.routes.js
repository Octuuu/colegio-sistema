import { Router } from "express";
import {
  nuevoPago,
  listarPagos,
  listarPagosPorAlumno,
  borrarPago
} from "../controllers/pagos_matricula.controller.js";

const router = Router();

// PAGOS
router.post("/", nuevoPago);                          
router.get("/", listarPagos);           
router.get("/alumno/:alumnoId", listarPagosPorAlumno); 
router.delete("/:id", borrarPago);             

export default router;
