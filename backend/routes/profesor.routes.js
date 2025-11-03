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
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin'];

router.get('/', authenticate, authorize(rolesPermitidos), getProfes);
router.get('/:id', authenticate, authorize(rolesPermitidos), auditar('OBTENER PROFESOR', 'Se obtuvo un profesor por ID'), getProfe);
router.post('/', authenticate, authorize(rolesPermitidos), auditar('CREAR PROFESOR', 'Se creó un profesor'), createProfeHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR PROFESOR', 'Se actualizó un profesor'), updateProfeHandler);
router.delete('/:id', authenticate, authorize(rolesPermitidos), auditar('ELIMINAR PROFESOR', 'Se eliminó un profesor'), deleteProfeHandler);
router.get('/materia/:materiaId/alumnos', authenticate, authorize(['profesor']), getAlumnosMateria);
router.get('/mis-alumnos/:materiaId', authenticate, authorize(['profesor']), getAlumnosMateria);

export default router;
