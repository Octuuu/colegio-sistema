import express from 'express';
import { registrarCalificacionHandler, verCalificacionAlumno } from '../controllers/calificacion.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

const rolesPermitidos = ['admin', 'profesor'];
const todosLosRoles = ['admin', 'profesor', 'alumno'];

// solo profesor o admin puede registrar calificacion
router.post('/', authenticate, authorize(rolesPermitidos), registrarCalificacionHandler);

// alumno puede ver sus calificacion | admin y profesor puede ver de cualquier alumno
router.get('/', authenticate, authorize(['alumno']), verCalificacionAlumno);
router.get('/:id', authenticate, authorize(rolesPermitidos), verCalificacionAlumno);

export default router;
