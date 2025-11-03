import { Router } from "express";
import {
  nuevoPago,
  listarPagos,
  listarPagosPorAlumno,
  borrarPago
} from "../controllers/pagos_matricula.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.post("/", authenticate, authorize(rolesPermitidos), auditar('CREAR PAGO', 'Se registró un nuevo pago'), nuevoPago);                          
router.get("/", authenticate, authorize(rolesPermitidos), listarPagos);           
router.get("/alumno/:alumnoId", authenticate, authorize(rolesPermitidos), listarPagosPorAlumno); 
router.delete("/:id", authenticate, authorize(rolesPermitidos), auditar('ELIMINAR PAGO', 'Se eliminó un pago'), borrarPago);             

export default router;
