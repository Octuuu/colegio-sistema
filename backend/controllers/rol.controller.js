import { getAllRoles, createRol } from '../models/rol.model.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    const id = await createRol(nombre);
    res.status(201).json({ id, nombre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};