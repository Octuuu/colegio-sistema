import pool from '../config/db.js';

// Todos las materias
export const getAllMaterias = async () => {
  const [rows] = await pool.query('SELECT * FROM materias');
  return rows;
};

// materia por ID
export const getMateriaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM materias WHERE id = ?', [id]);
  return rows[0];
};

// crea una materia
export const createMateria = async ({ nombre, descripcion }) => {
  const [result] = await pool.query(
    'INSERT INTO materias (nombre, descripcion) VALUES (?, ?)',
    [nombre, descripcion]
  );
  return result.insertId;
};

// Actualizar materia
export const updateMateria = async (id, { nombre, descripcion }) => {
  await pool.query(
    'UPDATE materias SET nombre = ?, descripcion = ? WHERE id = ?',
    [nombre, descripcion, id]
  );
};

// Eliminar materia
export const deleteMateria = async (id) => {
  await pool.query('DELETE FROM materias WHERE id = ?', [id]);
};
