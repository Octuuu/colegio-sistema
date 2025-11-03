import { Router } from 'express';
import {
  getMaterias,
  getMateria,
  createMateriaHandler,
  updateMateriaHandler,
  deleteMateriaHandler,
  getMateriasProfesor
} from '../controllers/materia.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();
const rolesPermitidos = ['admin', 'profesor'];

router.get('/', authenticate, authorize(rolesPermitidos), getMaterias);
router.get('/profesor/mis-materias', authenticate, authorize(rolesPermitidos), getMateriasProfesor);
router.get('/:id', authenticate, authorize(rolesPermitidos), getMateria);
router.post('/', authenticate, authorize(rolesPermitidos), auditar('CREAR MATERIA', 'Se creó una nueva materia'), createMateriaHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), auditar('ACTUALIZAR MATERIA', 'Se actualizó una materia'), updateMateriaHandler);
router.delete('/:id', authenticate, authorize(rolesPermitidos), auditar('ELIMINAR MATERIA', 'Se eliminó una materia'), deleteMateriaHandler);

export default router;
