import { Router } from 'express';
import * as tutorController from '../controllers/tutor.controller.js';

const router = Router();

// CRUD tutores
router.get('/', tutorController.getTutores);
router.get('/:id', tutorController.getTutor);
router.post('/', tutorController.createTutorController);
router.put('/:id', tutorController.updateTutorController);
router.delete('/:id', tutorController.deleteTutorController);

// Consultas de vinculación
router.get('/alumno/:alumnoId', tutorController.getTutoresDeAlumnoController);
router.post('/vincular', tutorController.vincularTutorAlumnoController);


export default router;
