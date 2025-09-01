import express from 'express';
import { registrarAsistenciaMasiva ,registrarAsistenciaHandler, verAsistenciasAlumno } from '../controllers/asistencia.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

const rolesPermitidos = ['admin', 'profesor'];
const todosLosRoles = ['admin', 'profesor', 'alumno'];

// solo profesor o admin puede registrar asistencia
router.post('/', authenticate, authorize(rolesPermitidos), registrarAsistenciaHandler);

// alumno puede ver sus asistencias | admin y profesor puede ver de cualquier alumno
router.get('/', authenticate, authorize(['alumno']), verAsistenciasAlumno);
router.get('/:id', authenticate, authorize(rolesPermitidos), verAsistenciasAlumno);
router.post('/masiva', authenticate, authorize(['profesor', 'admin']), registrarAsistenciaMasiva);

export default router;
