import express from 'express';
import { registrarCalificacionHandler, verCalificacionesAlumnoHandler } from '../controllers/calificaciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Roles
const rolesProfesorAdmin = ['admin', 'profesor'];
const rolesAlumno = ['alumno'];

// 📌 Registrar calificación (solo profesor o admin)
router.post(
  '/',
  authenticate,
  authorize(rolesProfesorAdmin),
  registrarCalificacionHandler
);

// 📌 Ver calificaciones
// Alumno ve sus propias calificaciones
router.get(
  '/mi-calificaciones',
  authenticate,
  authorize(rolesAlumno),
  verCalificacionesAlumnoHandler
);

// Profesor o admin puede ver calificaciones de cualquier alumno por ID
router.get(
  '/:alumnoId',
  authenticate,
  authorize(rolesProfesorAdmin),
  verCalificacionesAlumnoHandler
);

export default router;
