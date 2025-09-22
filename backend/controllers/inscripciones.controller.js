import {
    crearInscripcion,
    obtenerInscripcionesPorAlumno,
    obtenerAlumnosPorCurso,
    eliminarInscripcion,
    obtenerTodasInscripciones,
    darDeBajaInscripcion,
    reactivarInscripcion,
    obtenerAlumnosPorCurso
} from "../models/inscripciones.model.js";

export const nuevaInscripcion = async (req, res) => {
  try {
    const { alumno_id, curso_id, anio_lectivo } = req.body;

    if (!alumno_id || !curso_id || !anio_lectivo) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const id = await crearInscripcion(alumno_id, curso_id, anio_lectivo);

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

export const getTodasInscripciones = async (req, res) => {
  try {
    const inscripciones = await obtenerTodasInscripciones();
    res.json(inscripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener todas las inscripciones' });
  }
};

// dar de baja
export const darDeBajaInscripcionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await darDeBajaInscripcion(id);
    if (result === 0) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    res.json({ message: 'Inscripción dada de baja' });
  } catch (error) {
    console.error('erorr al dar de baja la inscripcion', error);
    res.status(500).json({ message: 'Error al dar de baja la inscripción' });
  }
}

// reactivar inscripcion
export const reactivarInscripcionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await reactivarInscripcion(id);
    if (result === 0) {
      return res.status(404).json({ message: 'Inscripción no encontrada' });
    }
    res.json({ message: 'Inscripción reactivada' });
  } catch (error) {
    console.error('error al reactivar la inscripcion', error);
    res.status(500).json({ message: 'Error al reactivar la inscripción' });
  }
};

export const obtenerAlumnosInscritosHandler = async (req, res) => {
  try {
    const { cursoId } = req.params;
    const alumnos = await obtenerAlumnosPorCurso(cursoId);
    res.json(alumnos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener alumnos inscritos' });
  }
};