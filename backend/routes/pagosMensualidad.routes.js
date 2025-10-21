import { Router } from "express";
import {
    nuevoPagoMensualidad,
    listarMensualidades,
    listarMensualidadesPendientes,
    pagarVariasMensualidades,
    listarTodosPagos, // 👈 nuevo controlador
    eliminarPago       // 👈 eliminar un pago
} from "../controllers/pagosMensualidad.controller.js";

const router = Router();

// Obtener todos los pagos (admin)
router.get("/", listarTodosPagos);  // 👈 esta ruta estaba faltando

// Registrar pago individual
router.post("/pagar", nuevoPagoMensualidad);

// Listar mensualidades de un alumno
router.get("/:alumnoId", listarMensualidades);

// Listar mensualidades pendientes
router.get("/pendientes/:alumnoId", listarMensualidadesPendientes);

// Pagar varias mensualidades
router.post("/pagar-multiples", pagarVariasMensualidades);

// Eliminar un pago
router.delete("/:id", eliminarPago);

export default router;
