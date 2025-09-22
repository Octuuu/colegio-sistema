import express from 'express';
import { 
  nuevaInscripcion,
  getInscripcionesAlumno,
  getAlumnosCurso,
  borrarInscripcion,
  getTodasInscripciones,
  darDeBajaInscripcionHandler,
  reactivarInscripcionHandler,
  obtenerAlumnosInscritosHandler
} from '../controllers/inscripciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

const rolesPermitidos = ['admin'];

router.post('/', authenticate, authorize(rolesPermitidos), nuevaInscripcion);
router.get('/todasInscripciones', authenticate, authorize(rolesPermitidos), getTodasInscripciones);
router.get('/alumno/:alumnoId', authenticate, authorize(rolesPermitidos), getInscripcionesAlumno);
router.get('/curso/:cursoId', authenticate, authorize(rolesPermitidos), getAlumnosCurso);
router.delete('/:id', authenticate, authorize(rolesPermitidos), borrarInscripcion);
router.patch('/:id/baja', darDeBajaInscripcionHandler);
router.patch('/:id/reactivar', reactivarInscripcionHandler);
router.get('/curso/:cursoId', obtenerAlumnosInscritosHandler);


export default router;
