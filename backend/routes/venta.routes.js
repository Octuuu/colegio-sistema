import { Router } from 'express';
import * as ventaController from '../controllers/venta.controller.js';

const router = Router();

// CRUD básico de ventas
router.post('/', ventaController.crearVentaController);
router.get('/', ventaController.obtenerVentasController);
router.get('/:id', ventaController.obtenerVentaController);

export default router;
