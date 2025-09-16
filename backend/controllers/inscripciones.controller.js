import {
    crearInscripcion,
    obtenerInscripcionesPorAlumno,
    obtenerAlumnosPorCurso,
    eliminarInscripcion
} from "../models/inscripciones.model.js";

export const nuevaInscripcion = async (req, res) => {
  try {
    const { alumnoId, cursoId, anioLectivo } = req.body;

    if (!alumnoId || !cursoId || !anioLectivo) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const id = await crearInscripcion(alumnoId, cursoId, anioLectivo);
    res.status(201).json({ message: 'Inscripción creada', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear inscripción' });
  }
};


export const getInscripcionesAlumno = async (req, res) => {
  try {
    const { alumnoId } = req.params;
    const inscripciones = await obtenerInscripcionesPorAlumno(alumnoId);
    res.json(inscripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener inscripciones' });
  }
};

export const getAlumnosCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const alumnos = await obtenerAlumnosPorCurso(cursoId);
    res.json(alumnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener alumnos del curso' });
  }
};

export const borrarInscripcion = async (req, res) => {
  try {
    const { id } = req.params;
    const filasAfectadas = await eliminarInscripcion(id);

    if (filasAfectadas === 0) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }

    res.json({ message: 'Inscripción eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar inscripción' });
  }
};