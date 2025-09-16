import { Router } from 'express';
import {
    nuevoProveedor,
    getProveedores,
    getProveedorPorId,
    editarProveedor,
    borrarProveedor
} from '../controllers/proveedores.controller.js';

const router = Router();

// Crear proveedor
router.post('/', nuevoProveedor);

// Obtener todos los proveedores
router.get('/', getProveedores);

// Obtener proveedor por ID
router.get('/:id', getProveedorPorId);

// Actualizar proveedor
router.put('/:id', editarProveedor);

// Eliminar proveedor
router.delete('/:id', borrarProveedor);

export default router;
