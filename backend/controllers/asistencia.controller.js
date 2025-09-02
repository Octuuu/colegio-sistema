import {
  registrarAsistencia,
  obtenerAsistenciasPorAlumno,
  profesorDictaAlumno,
  profesorDictaMateria,
  getHistorialAsistencias
} from '../models/asistencia.model.js';

export const registrarAsistenciaMasiva = async (req, res) => {
  try {
    const { materia_id, asistencias } = req.body;

    if (req.user.rol_id === 2) { 
      const dicta = await profesorDictaMateria(Number(req.user.profesor_id), Number(materia_id));
      if (!dicta) {
        return res.status(403).json({ error: 'No puedes registrar asistencia para esta materia' });
      }
    }
    // Insertar cada asistencia
    const resultados = [];
    for (const a of asistencias) {
      const { alumno_id, fecha, presente } = a;
      const id = await registrarAsistencia({ alumno_id, materia_id, fecha, presente });
      resultados.push({ alumno_id, id });
    }

    res.status(201).json({
      message: 'Asistencias registradas correctamente',
      registros: resultados
    });

  } catch (error) {
    console.error('Error registrarAsistenciaMasiva:', error);
    res.status(500).json({ error: error.message });
  }
};

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

// traer el historial del asistencias
export const getHistorialAsistenciasHandler = async (req, res) => {
  try {
    const profesorId = req.user.profesor_id; 
    const { materiaId } = req.params;

    if (!profesorId) {
      return res.status(403).json({ error: "No tienes permisos de profesor" });
    }

    const historial = await getHistorialAsistencias(profesorId, materiaId);

    if (historial.length === 0) {
      return res.status(404).json({ message: "No hay asistencias registradas aún" });
    }

    res.json(historial);
  } catch (error) {
    console.error("❌ Error al obtener historial:", error);
    res.status(500).json({ error: error.message });
  }
};
