import {
  getAllAlumnos,
  getAlumnoById,
  createAlumno,
  updateAlumno,
  deleteAlumno,
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
