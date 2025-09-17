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

const router = Router();

router.post('/', crearProductoController);
router.get('/', obtenerProductosController);
router.get('/:id', obtenerProductoPorIdController);
router.put('/:id', actualizarProductoController);
router.delete('/:id', eliminarProductoController);

// Rutas adicionales
router.patch('/:id/stock', actualizarStockController);
router.get('/stock-bajo', productosBajoStockController);

export default router;
