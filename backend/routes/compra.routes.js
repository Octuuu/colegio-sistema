import { Router } from 'express';
import * as compraController from '../controllers/compra.controller.js';
import { generarFacturaCompraPDF } from '../controllers/facturaCompra.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'cajero'];

router.post('/', authenticate, authorize(rolesPermitidos), auditar('CREAR COMPRA', 'Se registró una nueva compra'), compraController.crearCompraController);
router.get('/', authenticate, authorize(rolesPermitidos), compraController.obtenerComprasController);
router.get('/:id', authenticate, authorize(rolesPermitidos), compraController.obtenerCompraController);
router.get('/facturas/:id/descargar', authenticate, authorize(rolesPermitidos), generarFacturaCompraPDF);

export default router;
