import express from 'express';
import { 
  asignarMateria, 
  getAsignaciones,
  updateAsignacion,
  deleteAsignacion, 
} from '../controllers/asignaciones.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js'; 

const router = express.Router();

const rolesPermitidos = ['admin'];

router.get('/', authenticate, authorize(rolesPermitidos), getAsignaciones);

router.post(
  '/',
  authenticate,
  authorize(rolesPermitidos),
  auditar('CREAR ASIGNACIÓN', 'Se asignó una materia a un curso y profesor'),
  asignarMateria
);

router.put(
  '/:id',
  authenticate,
  authorize(rolesPermitidos),
  auditar('EDITAR ASIGNACIÓN', 'Se modificó una asignación de materia'),
  updateAsignacion
);

router.delete(
  '/:id',
  authenticate,
  authorize(rolesPermitidos),
  auditar('ELIMINAR ASIGNACIÓN', 'Se eliminó una asignación de materia'),
  deleteAsignacion
);

export default router;
