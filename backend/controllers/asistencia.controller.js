import {
  registrarAsistencia,
  obtenerAsistenciasPorAlumno,
  profesorDictaAlumno,
  profesorDictaMateria
} from '../models/asistencia.model.js';

// registrar una asistencia
export const registrarAsistenciaHandler = async (req, res) => {
  try {
    const { alumno_id, materia_id, fecha, presente } = req.body;

    // Validar si el profesor realmente dicta esa materia
    if (req.user.rol_id === 2) { // solo validar si es profesor
      const dicta = await profesorDictaMateria(req.user.id, materia_id);
      if (!dicta) {
        return res.status(403).json({ error: 'No puedes registrar asistencia para una materia que no dictas' });
      }
    }

    const id = await registrarAsistencia({ alumno_id, materia_id, fecha, presente });
    res.status(201).json({ message: 'Asistencia registrada', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ver asistencias de un alumno (solo el mismo alumno o profesor)
export const verAsistenciasAlumno = async (req, res) => {
  try {
    let alumno_id;

    if (req.user.rol_id === 3) {
      alumno_id = req.user.id;
    } else if (req.user.rol_id === 2) {
      alumno_id = req.params.id;

      const autorizado = await profesorDictaAlumno(req.user.id, alumno_id);
      if (!autorizado) {
        return res.status(403).json({ error: 'No tienes permiso para ver la asistencia de este alumno' });
      }
    } else {

      alumno_id = req.params.id;
    }

    const asistencias = await obtenerAsistenciasPorAlumno(alumno_id);
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

