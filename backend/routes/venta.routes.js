import { Router } from 'express';
import * as ventaController from '../controllers/venta.controller.js';
import { descargarFacturaController } from '../controllers/factura.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();

router.post('/', authenticate, authorize(['admin']), auditar('CREAR VENTA', 'Se creó una venta'), ventaController.crearVentaController);
router.get('/', authenticate, authorize(['admin']), ventaController.obtenerVentasController);
router.get('/:id', authenticate, authorize(['admin']), ventaController.obtenerVentaController);
router.get('/facturas/:id/descargar', authenticate, authorize(['admin']), auditar('DESCARGAR FACTURA', 'Se descargó la factura de la venta'), descargarFacturaController);

router.get('/dashboard/resumen', authenticate, authorize(['admin']), ventaController.obtenerResumenVentasController);
router.get('/dashboard/resumen-mensual', authenticate, authorize(['admin']), ventaController.obtenerResumenMensualController);
router.get('/dashboard/productos-top', authenticate, authorize(['admin']), ventaController.obtenerProductosMasVendidosController);

export default router;
