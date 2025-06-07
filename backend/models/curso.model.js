import pool from '../config/db.js';

// todos los cursos
export const getAllCursos = async () => {
  const [rows] = await pool.query('SELECT * FROM cursos');
  return rows;
};

// curso por ID
export const getCursoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM cursos WHERE id = ?', [id]);
  return rows[0];
};

// crea una curso
export const createCurso = async ({ anio, bachillerato }) => {
  const [result] = await pool.query(
    'INSERT INTO cursos (anio, bachillerato) VALUES (?, ?)',
    [anio, bachillerato]
  );
  return result.insertId;
};

// actualizar curso
export const updateCurso = async (id, { anio, bachillerato }) => {
  await pool.query(
    'UPDATE cursos SET anio = ?, bachillerato = ? WHERE id = ?',
    [anio, bachillerato, id]
  );
};

// eliminar bachillerato
export const deleteCurso = async (id) => {
  await pool.query('DELETE FROM cursos WHERE id = ?', [id]);
};
