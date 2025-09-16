import express from 'express';
import { 
  nuevaInscripcion,
  getInscripcionesAlumno,
  getAlumnosCurso,
  borrarInscripcion,
  getTodasInscripciones
} from '../controllers/inscripciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

const rolesPermitidos = ['admin'];

// Crear inscripción
router.post('/', authenticate, authorize(rolesPermitidos), nuevaInscripcion);

// Listar todas las inscripciones
router.get('/todasInscripciones', authenticate, authorize(rolesPermitidos), getTodasInscripciones);

// Obtener inscripciones de un alumno
router.get('/alumno/:alumnoId', authenticate, authorize(rolesPermitidos), getInscripcionesAlumno);

// Obtener alumnos de un curso
router.get('/curso/:cursoId', authenticate, authorize(rolesPermitidos), getAlumnosCurso);

// Eliminar inscripción
router.delete('/:id', authenticate, authorize(rolesPermitidos), borrarInscripcion);

export default router;
