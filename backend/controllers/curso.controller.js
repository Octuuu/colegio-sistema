import {
  getAllCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso,
  getAlumnosPorCurso,
} from '../models/curso.model.js';

// Obtener todos los cursos
export const getCursos = async (req, res) => {
  try {
    const cursos = await getAllCursos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un curso por ID
export const getCurso = async (req, res) => {
  try {
    const curso = await getCursoById(req.params.id);
    if (!curso) return res.status(404).json({ error: 'curso no encontrad' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo curso
export const createCursoHandler = async (req, res) => {
  try {
    const id = await createCurso(req.body);
    res.status(201).json({ id, message: 'curso creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar curso
export const updateCursoHandler = async (req, res) => {
  try {
    await updateCurso(req.params.id, req.body);
    res.json({ message: 'curso actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar curso
export const deleteCursoHandler = async (req, res) => {
  try {
    await deleteCurso(req.params.id);
    res.json({ message: 'curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener alumnos por cursos 
export const obtenerAlumnosPorCurso = async (req, res) => {
  try {
    const cursoId = req.params.cursoId;
    const alumnos = await getAlumnosPorCurso(cursoId);
    res.json(alumnos);
  } catch (error) {
    console.error('Error al obtener alumnos por curso:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
