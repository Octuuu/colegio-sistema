import { Router } from 'express';
import {
    nuevoProveedor,
    getProveedores,
    getProveedorPorId,
    editarProveedor,
    borrarProveedor
} from '../controllers/proveedores.controller.js';

const router = Router();


router.post('/', nuevoProveedor);
router.get('/', getProveedores);
router.get('/:id', getProveedorPorId);
router.put('/:id', editarProveedor);
router.delete('/:id', borrarProveedor);

export default router;
