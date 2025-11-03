import { Router } from 'express';
import * as tutorController from '../controllers/tutor.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { auditar } from '../middlewares/auditoria.middleware.js';

const router = Router();

router.get('/', authenticate, authorize(['admin']), tutorController.getTutores);
router.get('/:id', authenticate, authorize(['admin']), tutorController.getTutor);
router.post('/', authenticate, authorize(['admin']), auditar('CREAR TUTOR', 'Se creó un tutor'), tutorController.createTutorController);
router.put('/:id', authenticate, authorize(['admin']), auditar('ACTUALIZAR TUTOR', 'Se actualizó un tutor'), tutorController.updateTutorController);
router.delete('/:id', authenticate, authorize(['admin']), auditar('ELIMINAR TUTOR', 'Se eliminó un tutor'), tutorController.deleteTutorController);

router.get('/alumno/:alumnoId', authenticate, authorize(['admin', 'profesor']), tutorController.getTutoresDeAlumnoController);
router.post('/vincular', authenticate, authorize(['admin']), auditar('VINCULAR TUTOR', 'Se vinculó un tutor a un alumno'), tutorController.vincularTutorAlumnoController);

export default router;

