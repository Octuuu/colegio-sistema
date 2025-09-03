import {
  registrarCalificacion,
  obtenerCalificacionesPorAlumno,
  alumnoPerteneceProfesor,
  profesorDictaMateria
} from "../modelscalificacion.model.js";

/**
 * Registrar calificación final de un alumno
 */
export const registrarCalificacionHandler = async (req, res) => {
  try {
    const { alumno_id, materia_id, nota } = req.body;
    const profesor_id = req.user.profesor_id; // asumimos que viene del token

    if (!alumno_id || !materia_id || nota == null) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const id = await registrarCalificacion({ profesor_id, alumno_id, materia_id, nota });
    res.status(201).json({ id, message: "Calificación registrada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Obtener todas las calificaciones de un alumno
 */
export const obtenerCalificacionesAlumnoHandler = async (req, res) => {
  try {
    const alumno_id = req.params.alumnoId;

    // opcional: validar que el profesor tiene permiso
    const profesor_id = req.user.profesor_id;
    const pertenece = await alumnoPerteneceProfesor(profesor_id, alumno_id);

    if (!pertenece) {
      return res.status(403).json({ error: "No tienes permisos sobre este alumno" });
    }

    const calificaciones = await obtenerCalificacionesPorAlumno(alumno_id);
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
