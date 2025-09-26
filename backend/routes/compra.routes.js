import { Router } from 'express';
import * as compraController from '../controllers/compra.controller.js';
import { generarFacturaCompraPDF } from '../controllers/facturaCompra.controller.js';

const router = Router();

router.post('/', compraController.crearCompraController);
router.get('/', compraController.obtenerComprasController);
router.get('/:id', compraController.obtenerCompraController);
router.get('/facturas/:id/descargar', generarFacturaCompraPDF);

export default router;
