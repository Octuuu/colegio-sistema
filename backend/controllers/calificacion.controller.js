import {
  registrarCalificacion,
  obtenerCalificacionesPorAlumno,
  alumnoPerteneceProfesor,
  profesorDictaMateria
} from "../models/calificacion.model.js";

/**
 * Registrar calificación final
 */
export const registrarCalificacionHandler = async (req, res) => {
  try {
    const { alumno_id, materia_id, nota } = req.body;
    const profesor_id = req.user.profesor_id;

    // Validaciones
    if (!(await alumnoPerteneceProfesor(profesor_id, alumno_id))) {
      return res.status(403).json({ error: "El alumno no corresponde a este profesor" });
    }

    if (!(await profesorDictaMateria(profesor_id, materia_id))) {
      return res.status(403).json({ error: "El profesor no dicta esta materia" });
    }

    const id = await registrarCalificacion({ profesor_id, alumno_id, materia_id, nota });
    res.status(201).json({ id, message: "Calificación registrada correctamente" });

  } catch (error) {
    console.error("Error en registrarCalificacionHandler:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Ver calificaciones de un alumno
 */
export const verCalificacionesAlumnoHandler = async (req, res) => {
  try {
    // Si es alumno, toma su propio ID, si es admin/profesor, puede pasar id por params
    const alumno_id = req.params.id || req.user.alumno_id;

    const calificaciones = await obtenerCalificacionesPorAlumno(alumno_id);
    res.json(calificaciones);

  } catch (error) {
    console.error("Error en verCalificacionesAlumnoHandler:", error);
    res.status(500).json({ error: error.message });
  }
};
