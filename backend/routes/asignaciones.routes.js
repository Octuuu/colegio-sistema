import express from 'express';
import { 
    asignarMateria, 
    getAsignaciones,
    updateAsignacion,
    deleteAsignacion, 
} from '../controllers/asignaciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

const rolesPermitidos = ['admin'];

router.post('/', authenticate, authorize(rolesPermitidos), asignarMateria)
router.get('/', authenticate, authorize(rolesPermitidos), getAsignaciones);
router.put('/:id', authenticate, authorize(rolesPermitidos), updateAsignacion);
router.delete('/:id', authenticate, authorize(rolesPermitidos), deleteAsignacion)

export default router;


