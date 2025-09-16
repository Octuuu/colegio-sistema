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


// obtener materias de un profesor
export const getMateriasByProfesor = async (profesorId) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.id, m.nombre, m.descripcion
       FROM materias_curso mc
       JOIN materias m ON mc.materia_id = m.id
       WHERE mc.profesor_id = ?`,
      [profesorId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getMateriasByProfesor:", error);
    throw error;
  }
};

// obtener alumnos de una materia
export const getAlumnosPorMateria = async (materiaId) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.id, a.nombre, a.apellido
       FROM alumnos a
       JOIN materias_curso mc ON a.curso_id = mc.curso_id
       WHERE mc.materia_id = ?`,
      [materiaId]
    );
    return rows;
  } catch (error) {
    console.error("Error en getAlumnosPorMateria:", error);
    throw error;
  }
};


