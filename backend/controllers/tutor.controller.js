import * as tutorModel from '../models/tutor.model.js';

// Obtener todos los tutores
export const getTutores = async (req, res) => {
  try {
    const tutores = await tutorModel.getAllTutores();
    res.json(tutores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tutores' });
  }
};

// Obtener tutor por ID
export const getTutor = async (req, res) => {
  try {
    const tutor = await tutorModel.getTutorById(req.params.id);
    if (!tutor) return res.status(404).json({ error: 'Tutor no encontrado' });
    res.json(tutor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tutor' });
  }
};

// Crear tutor y vincularlo a un alumno
export const createTutorController = async (req, res) => {
  try {
    const tutorId = await tutorModel.createTutor(req.body);
    res.json({ message: 'Tutor creado y vinculado al alumno', id: tutorId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear tutor' });
  }
};

// Actualizar tutor
export const updateTutorController = async (req, res) => {
  try {
    await tutorModel.updateTutor(req.params.id, req.body);
    res.json({ message: 'Tutor actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar tutor' });
  }
};

// Eliminar tutor
export const deleteTutorController = async (req, res) => {
  try {
    await tutorModel.deleteTutor(req.params.id);
    res.json({ message: 'Tutor eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar tutor' });
  }
};

// Obtener tutores de un alumno
export const getTutoresDeAlumnoController = async (req, res) => {
  try {
    const tutores = await tutorModel.getTutoresDeAlumno(req.params.alumnoId);
    res.json(tutores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener tutores del alumno' });
  }
};

export const vincularTutorAlumnoController = async (req, res) => {
  try {
    const { alumnoId, tutorId } = req.body;
    await tutorModel.vincularTutorAlumno(alumnoId, tutorId);
    res.json({ message: 'Tutor vinculado al alumno' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al vincular tutor al alumno' });
  }
};
