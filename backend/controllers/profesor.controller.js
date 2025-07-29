import {
    getAllProfes,
    getProfeById,
    createProfe,
    updateProfe,
    deleteProfe
} from '../models/profesor.model.js';

// Obtener todos los profes
export const getProfes = async (req, res) => {
  try {
    const profes = await getAllProfes();
    res.json(profes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un profe por ID
export const getProfe = async (req, res) => {
  try {
    const profe = await getProfeById(req.params.id);
    if (!profe) return res.status(404).json({ error: 'profesor no encontrado' });
    res.json(profe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear nuevo profe 
export const createProfeHandler = async (req, res) => {
  try {
    const id = await createProfe(req.body);
    res.status(201).json({ id, message: 'profesor y usuario creados correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar profe
export const updateProfeHandler = async (req, res) => {
  try {
    await updateProfe(req.params.id, req.body);
    res.json({ message: 'profesor actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar profe
// Eliminar profe
export const deleteProfeHandler = async (req, res) => {
  try {
    await deleteProfe(req.params.id);
    res.json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar profesor:', error); 
    res.status(500).json({ error: error.message });
  }
};

