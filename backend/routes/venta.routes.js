import { Router } from 'express';
import * as ventaController from '../controllers/venta.controller.js';
import { descargarFacturaController } from '../controllers/factura.controller.js';


const router = Router();

router.post('/', ventaController.crearVentaController);
router.get('/', ventaController.obtenerVentasController);
router.get('/:id', ventaController.obtenerVentaController);
router.get('/facturas/:id/descargar', descargarFacturaController);

export default router;
