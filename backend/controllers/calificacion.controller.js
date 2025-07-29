import { 
    registrarCalificacion,
    obtenerCalificacionPorAlumno,
    profesorDictaAlumno,
    profesorDictaMateria
} from '../models/calificacion.model.js';

// registrar una calificacion
export const registrarCalificacionHandler = async (req, res) => {
  try {
    const { alumno_id, materia_id, tipo_evaluacion, nota } = req.body;

    // validar si el profesor realmente dicta esa materia
    if (req.user.rol_id === 2) { 
      const dicta = await profesorDictaMateria(req.user.id, materia_id);
      if (!dicta) {
        return res.status(403).json({ error: 'No puedes registrar la calificacion para una materia que no dictas' });
      }
    }

    const id = await registrarCalificacion({ alumno_id, materia_id, tipo_evaluacion, nota });
    res.status(201).json({ message: 'Calificacion registrada', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ver asistencias de un alumno (solo el mismo alumno o profesor)
export const verCalificacionAlumno = async (req, res) => {
  try {
    let alumno_id;

    if (req.user.rol_id === 3) {
      alumno_id = req.user.id;
    } else if (req.user.rol_id === 2) {
      alumno_id = req.params.id;

      const autorizado = await profesorDictaAlumno(req.user.id, alumno_id);
      if (!autorizado) {
        return res.status(403).json({ error: 'No tienes permiso para ver la calificacion de este alumno' });
      }
    } else {

      alumno_id = req.params.id;
    }

    const califcacion = await obtenerCalificacionPorAlumno(alumno_id);
    res.json(califcacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

