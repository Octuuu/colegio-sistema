import express from 'express';
import { 
  nuevaInscripcion,
  getInscripcionesAlumno,
  getAlumnosCurso,
  borrarInscripcion,
  getTodasInscripciones,
  darDeBajaInscripcionHandler,
  reactivarInscripcionHandler,
  obtenerAlumnosInscritosHandler,
  actualizarInscripcionController
} from '../controllers/inscripciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = express.Router();
const rolesPermitidos = ['admin'];

router.post('/', authenticate, authorize(rolesPermitidos), auditar('NUEVA INSCRIPCIÓN', 'Se registró una nueva inscripción'), nuevaInscripcion);
router.get('/todasInscripciones', authenticate, authorize(rolesPermitidos), getTodasInscripciones);
router.get('/alumno/:alumnoId', authenticate, authorize(rolesPermitidos), getInscripcionesAlumno);
router.get('/curso/:cursoId', authenticate, authorize(rolesPermitidos), getAlumnosCurso);
router.delete('/:id', authenticate, authorize(rolesPermitidos), auditar('ELIMINAR INSCRIPCIÓN', 'Se eliminó una inscripción'), borrarInscripcion);
router.patch('/:id/baja', authenticate, authorize(rolesPermitidos), auditar('DAR DE BAJA INSCRIPCIÓN', 'Se dio de baja una inscripción'), darDeBajaInscripcionHandler);
router.patch('/:id/reactivar', authenticate, authorize(rolesPermitidos), auditar('REACTIVAR INSCRIPCIÓN', 'Se reactivó una inscripción'), reactivarInscripcionHandler);
router.get('/curso/:cursoId/inscritos', authenticate, authorize(rolesPermitidos), obtenerAlumnosInscritosHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR INSCRIPCIÓN', 'Se actualizó una inscripción'), actualizarInscripcionController);

export default router;
