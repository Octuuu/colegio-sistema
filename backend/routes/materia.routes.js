import { Router } from 'express';
import {
  getMaterias,
  getMateria,
  createMateriaHandler,
  updateMateriaHandler,
  deleteMateriaHandler,
} from '../controllers/materia.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

const rolesPermitidos = ['admin', 'profesor'];

router.get('/', authenticate, authorize(rolesPermitidos), getMaterias);
router.get('/:id', authenticate, authorize(rolesPermitidos), getMateria);
router.post('/', authenticate, authorize(rolesPermitidos), createMateriaHandler);
router.put('/:id', authenticate, authorize(rolesPermitidos), updateMateriaHandler);
router.delete('/:id', authenticate, authorize(rolesPermitidos), deleteMateriaHandler);

export default router;
