import express from 'express';
import { registrarAsistenciaMasiva ,registrarAsistenciaHandler, verAsistenciasAlumno, getHistorialAsistenciasHandler } from '../controllers/asistencia.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { generarPDFHistorialHandler } from '../utils/pdfService.js';

const router = express.Router();

const rolesPermitidos = ['admin', 'profesor'];
const todosLosRoles = ['admin', 'profesor', 'alumno'];

router.post('/', authenticate, authorize(rolesPermitidos), registrarAsistenciaHandler);

router.get('/', authenticate, authorize(['alumno']), verAsistenciasAlumno);
router.get('/:id', authenticate, authorize(rolesPermitidos), verAsistenciasAlumno);
router.post('/masiva', authenticate, authorize(['profesor', 'admin']), registrarAsistenciaMasiva);
router.get('/materia/:materiaId/historial', authenticate, authorize(todosLosRoles), getHistorialAsistenciasHandler);
router.get('/materia/:materiaId/historial/pdf', authenticate, authorize(['profesor','admin']), generarPDFHistorialHandler);


export default router;
