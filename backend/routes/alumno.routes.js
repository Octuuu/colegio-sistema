import { Router } from 'express';
import {
  getAlumnos,
  getAlumno,
  createAlumnoHandler,
  updateAlumnoHandler,
  deleteAlumnoHandler,
  getCursoConMaterias,
  getCursoConMateriasAlumno,
  buscarAlumnosPorCedula,
} from '../controllers/alumno.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js'; 

const router = Router();

const rolesPermitidos = ['admin', 'profesor'];
const alumno = ['alumno'];

// ----------------- RUTAS -----------------
router.get("/search", authenticate, authorize(rolesPermitidos), buscarAlumnosPorCedula); // <--- MOVER AQUÍ
router.get('/', authenticate, authorize(rolesPermitidos), getAlumnos);
router.get('/:id', authenticate, authorize(rolesPermitidos), getAlumno);
router.get('/yo/materias', authenticate, authorize(alumno), getCursoConMateriasAlumno);
router.get('/:id/curso-materias', authenticate, authorize(rolesPermitidos), getCursoConMaterias);

router.post(
  '/',
  authenticate,
  authorize(rolesPermitidos),
  auditar('CREAR ALUMNO', 'Se registró un nuevo alumno en el sistema'),
  createAlumnoHandler
);

router.put(
  '/:id',
  authenticate,
  authorize(rolesPermitidos),
  auditar('EDITAR ALUMNO', 'Se modificó la información de un alumno'),
  updateAlumnoHandler
);

router.delete(
  '/:id',
  authenticate,
  authorize(rolesPermitidos),
  auditar('ELIMINAR ALUMNO', 'Se eliminó un alumno del sistema'),
  deleteAlumnoHandler
);

export default router;
