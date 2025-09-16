import { Router } from 'express';
import {
    nuevaMatricula,
    getMatriculasPorInscripcion,
    getTodosLosPagos,
    borrarMatricula,
    getTodasMatriculas
} from '../controllers/pagos_matricula.controller.js';

const router = Router();

// Crear pago
router.post('/', nuevaMatricula);

// Obtener pagos de una inscripción
router.get('/inscripcion/:inscripcionId', getMatriculasPorInscripcion);

// Obtener todos los pagos
router.get('/', getTodosLosPagos);

// Eliminar pago
router.delete('/:id', borrarMatricula);

export default router;
