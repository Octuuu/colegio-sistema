import { 
    crearAsignacion, 
    obetenerAsignaciones,
    editarAsignacion,
    eliminarAsignacion,
} from "../models/asignaciones.model.js";

// crear una asignacion 
export const asignarMateria = async (req, res) => {
    const { curso_id, materia_id, profesor_id } = req.body;

    try {
        const id = await crearAsignacion({ curso_id, materia_id, profesor_id });
        res.status(201).json({ mensaje: 'Asignacion creada', id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al crear la asignacion' });
    }
};

// obtener todas las asignaciones 
export const getAsignaciones = async (req, res) => {
    try {
        const asignaciones = await obetenerAsignaciones();
        res.json(asignaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al obetener las asignaciones' });
    }
};

// editar asignacion 
export const updateAsignacion = async (req, res) => {
    const { id } = req.params;
    const { curso_id, materia_id, profesor_id } = req.body;

    try {
        await editarAsignacion(id, { curso_id, materia_id, profesor_id });
        res.json({ mensaje: 'asignacion actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al actualizar' });
    }
};

// eliminar asignacion
export const deleteAsignacion = async (req, res) => {
    const { id } = req.params;

    try {
        await eliminarAsignacion(id)
        res.json({ mensaje: 'asignacion eliminada' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'error al eliminar asignacion' });
    }
};