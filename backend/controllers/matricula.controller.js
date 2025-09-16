import {
    crearMatricula,
    obtenerMatriculasPorInscripcion,
    obtenerTodosLosPagos,
    eliminarMatricula
} from '../models/matricula.model.js';

// Crear pago de matrícula
export const nuevaMatricula = async (req, res) => {
    try {
        const { inscripcionId, fechaPago, monto, metodoPago, recibidoPor } = req.body;

        if (!inscripcionId || !monto || !metodoPago) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const id = await crearMatricula(
            inscripcionId,
            fechaPago || new Date(),
            monto,
            metodoPago,
            recibidoPor || null
        );

        res.status(201).json({ message: 'Pago registrado', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar pago' });
    }
};

// Obtener pagos por matrícula
export const getMatriculasPorInscripcion = async (req, res) => {
    try {
        const { inscripcionId } = req.params;
        const pagos = await obtenerMatriculasPorInscripcion(inscripcionId);
        res.json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener pagos' });
    }
};

// Obtener todos los pagos
export const getTodosLosPagos = async (req, res) => {
    try {
        const pagos = await obtenerTodosLosPagos();
        res.json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener pagos' });
    }
};

// Eliminar pago
export const borrarMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        const filasAfectadas = await eliminarMatricula(id);

        if (filasAfectadas === 0) {
            return res.status(404).json({ message: 'Pago no encontrado' });
        }

        res.json({ message: 'Pago eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar pago' });
    }
};
