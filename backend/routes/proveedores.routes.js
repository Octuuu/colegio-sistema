import { Router } from 'express';
import {
    nuevoProveedor,
    getProveedores,
    getProveedorPorId,
    editarProveedor,
    borrarProveedor
} from '../controllers/proveedores.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();

router.post('/', authenticate, authorize(['admin']), auditar('CREAR PROVEEDOR', 'Se creó un proveedor'), nuevoProveedor);
router.get('/', authenticate, authorize(['admin']), getProveedores);
router.get('/:id', authenticate, authorize(['admin']), getProveedorPorId);
router.put('/:id', authenticate, authorize(['admin']), auditar('EDITAR PROVEEDOR', 'Se editó un proveedor'), editarProveedor);
router.delete('/:id', authenticate, authorize(['admin']), auditar('ELIMINAR PROVEEDOR', 'Se eliminó un proveedor'), borrarProveedor);

export default router;
