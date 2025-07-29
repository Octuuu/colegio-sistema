import {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  getCursoYMateriasDeAlumno,
} from '../models/alumno.model.js';

// Obtener todos los alumnos
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await getAllAlumnos();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un alumno por ID
export const getAlumno = async (req, res) => {
  try {
    const alumno = await getAlumnoById(req.params.id);
    if (!alumno) return res.status(404).json({ error: 'Alumno no encontrado' });
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo alumno
export const createAlumnoHandler = async (req, res) => {
  try {
    const id = await createAlumno(req.body);
    res.status(201).json({ id, message: 'Alumno y usuario creados correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar alumno
export const updateAlumnoHandler = async (req, res) => {
  try {
    await updateAlumno(req.params.id, req.body);
    res.json({ message: 'Alumno actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar alumno
export const deleteAlumnoHandler = async (req, res) => {
  try {
    await deleteAlumno(req.params.id);
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener curso y materia de alumno
export const getCursoConMaterias = async (req, res) => {
  try {
    const alumnoId = req.params.id;
    const curso = await getCursoYMateriasDeAlumno(alumnoId);

    if (!curso) return res.status(404).json({ error: 'Alumno o curso no encontrado' });

    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCursoConMateriasAlumno = async (req, res) => {
  try {
    const alumnoId = req.user.alumno_id;
    if (!alumnoId) {
      return res.status(403).json({ error: 'Este usuario no está asociado a un alumno' });
    }
    const curso = await getCursoYMateriasDeAlumno(alumnoId);

    if (!curso) {
      return res.status(404).json({ error: 'No se encontraron curso ni materias' });
    }

    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};