import { Router } from 'express';
import {
  getCursos,
  getCurso,
  createCursoHandler,
  updateCursoHandler,
  deleteCursoHandler,
  obtenerAlumnosPorCurso,
} from '../controllers/curso.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.get('/', authenticate, authorize(rolesPermitidos), getCursos);
router.get('/:id', authenticate, authorize(rolesPermitidos), getCurso);
router.post('/', authenticate, authorize(rolesPermitidos), auditar('CREAR CURSO', 'Se creó un nuevo curso'), createCursoHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR CURSO', 'Se actualizó un curso'), updateCursoHandler);
router.delete('/:id', authenticate, authorize(rolesPermitidos), auditar('ELIMINAR CURSO', 'Se eliminó un curso'), deleteCursoHandler);
router.get('/:cursoId/alumnos', authenticate, authorize(rolesPermitidos), obtenerAlumnosPorCurso);

export default router;
