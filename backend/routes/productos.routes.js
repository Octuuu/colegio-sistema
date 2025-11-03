import { Router } from 'express';
import {
    crearProductoController,
    obtenerProductosController,
    obtenerProductoPorIdController,
    actualizarProductoController,
    eliminarProductoController,
    actualizarStockController,
    productosBajoStockController
} from '../controllers/productos.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.post('/', authenticate, authorize(rolesPermitidos), auditar('CREAR PRODUCTO', 'Se creó un producto'), crearProductoController);
router.get('/', authenticate, authorize(rolesPermitidos), obtenerProductosController);
router.get('/:id', authenticate, authorize(rolesPermitidos), auditar('OBTENER PRODUCTO', 'Se obtuvo un producto por ID'), obtenerProductoPorIdController);
router.put('/:id', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR PRODUCTO', 'Se actualizó un producto'), actualizarProductoController);
router.delete('/:id', authenticate, authorize(rolesPermitidos), auditar('ELIMINAR PRODUCTO', 'Se eliminó un producto'), eliminarProductoController);
router.patch('/:id/stock', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR STOCK', 'Se actualizó el stock de un producto'), actualizarStockController);
router.get('/stock-bajo', authenticate, authorize(rolesPermitidos), auditar('PRODUCTOS BAJO STOCK', 'Se consultaron productos con stock bajo'), productosBajoStockController);

export default router;
