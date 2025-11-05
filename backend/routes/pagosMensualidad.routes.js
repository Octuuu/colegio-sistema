import { Router } from "express";
import {
    nuevoPagoMensualidad,
    listarMensualidades,
    listarMensualidadesPendientes,
    pagarVariasMensualidades,
    listarTodosPagos,
    eliminarPago
} from "../controllers/pagosMensualidad.controller.js";
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';
import { generarFacturaMensualidadPDF } from "../controllers/pagosMensualidadPDF.controller.js";

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.get("/", authenticate, authorize(rolesPermitidos), listarTodosPagos);

router.post("/pagar", authenticate, authorize(rolesPermitidos), auditar('REGISTRAR PAGO', 'Se registró un pago de mensualidad'), nuevoPagoMensualidad);

router.get("/:alumnoId", authenticate, authorize(rolesPermitidos), listarMensualidades);

router.get("/pendientes/:alumnoId", authenticate, authorize(rolesPermitidos), listarMensualidadesPendientes);

router.post("/pagar-multiples", authenticate, authorize(rolesPermitidos), auditar('PAGAR VARIAS MENSUALIDADES', 'Se registraron pagos múltiples de mensualidades'), pagarVariasMensualidades);

router.delete("/:id", authenticate, authorize(rolesPermitidos), auditar('ELIMINAR PAGO', 'Se eliminó un pago de mensualidad'), eliminarPago);

router.get("/factura/:id", generarFacturaMensualidadPDF);

export default router;
