import { Router } from 'express';
import {
  getProfes,
  getProfe,
  createProfeHandler,
  updateProfeHandler,
  deleteProfeHandler,
  getAlumnosMateria,
} from '../controllers/profesor.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

const rolesPermitidos = ['admin'];

router.get('/', authenticate, authorize(rolesPermitidos), getProfes);
router.get('/:id', authenticate, authorize(rolesPermitidos), getProfe);
router.post('/', authenticate, authorize(rolesPermitidos), createProfeHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), updateProfeHandler);
router.delete('/:id', authenticate, authorize(rolesPermitidos), deleteProfeHandler);
router.get('/materia/:materiaId/alumnos', authenticate, authorize(['profesor']), getAlumnosMateria);
export default router;
