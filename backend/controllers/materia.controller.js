import {
  getAllMaterias,
  getMateriaById,
  createMateria,
  updateMateria,
  deleteMateria,
  getMateriasByProfesor,
} from '../models/materia.model.js';

// Obtener todos las materias
export const getMaterias = async (req, res) => {
  try {
    const materias = await getAllMaterias();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un materia por ID
export const getMateria = async (req, res) => {
  try {
    const materia = await getMateriaById(req.params.id);
    if (!materia) return res.status(404).json({ error: 'materia no encontrada' });
    res.json(materia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo materia
export const createMateriaHandler = async (req, res) => {
  try {
    const id = await createMateria(req.body);
    res.status(201).json({ id, message: 'materia creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar materia
export const updateMateriaHandler = async (req, res) => {
  try {
    await updateMateria(req.params.id, req.body);
    res.json({ message: 'materia actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar materia
export const deleteMateriaHandler = async (req, res) => {
  try {
    await deleteMateria(req.params.id);
    res.json({ message: 'materia eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// obtener materias de un profesor
export const getMateriasProfesor = async (req, res) => {
  try {
    const profesorId = req.user.profesor_id; 
    if (!profesorId) {
      return res.status(400).json({ error: "El usuario no está asociado a un profesor" });
    }
    const materias = await getMateriasByProfesor(profesorId);
    res.json(materias);
  } catch (error) {
    console.error("Error en getMateriasProfesor:", error);
    res.status(500).json({ error: error.message });
  }
};

import { getAlumnosPorMateria } from "../models/materia.model.js";

// Obtener alumnos de una materia
export const getAlumnosPorMateriaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const alumnos = await getAlumnosPorMateria(id);
    res.json(alumnos);
  } catch (error) {
    console.error("Error en getAlumnosPorMateriaHandler:", error);
    res.status(500).json({ error: error.message });
  }
};
