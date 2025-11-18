import { Router } from "express";
import {
  nuevoPago,
  listarPagos,
  listarPagosPorAlumno,
  borrarPago,
  listarPagosPorCedula,
  verificarMatriculaPagada
} from "../controllers/pagos_matricula.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';
import { generarFacturaMatriculaPDF } from "../controllers/facturaMatricula.controller.js";

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.post("/", authenticate, authorize(rolesPermitidos), auditar('CREAR PAGO', 'Se registró un nuevo pago'), nuevoPago);                          
router.get("/", authenticate, authorize(rolesPermitidos), listarPagos);           
router.get("/alumno/:alumnoId", authenticate, authorize(rolesPermitidos), listarPagosPorAlumno); 
router.delete("/:id", authenticate, authorize(rolesPermitidos), auditar('ELIMINAR PAGO', 'Se eliminó un pago'), borrarPago);   
router.get("/buscar/:cedula", authenticate, authorize(rolesPermitidos), listarPagosPorCedula);         
router.get("/verificar-matricula/:alumnoId", authenticate, authorize(rolesPermitidos), verificarMatriculaPagada);
router.get("/:id/pdf", generarFacturaMatriculaPDF);

export default router;