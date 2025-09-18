import pool from '../config/db.js';

// Obtener todos los tutores
export const getAllTutores = async () => {
  const [rows] = await pool.query('SELECT * FROM tutores');
  return rows;
};

// Obtener tutor por ID
export const getTutorById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM tutores WHERE id = ?', [id]);
  return rows[0];
};

// Crear tutor y vincularlo a un alumno
export const createTutor = async ({ nombre, apellido, telefono, email, direccion, alumno_id }) => {
  // 1. Insertar tutor
  const [result] = await pool.query(
    'INSERT INTO tutores (nombre, apellido, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, email, direccion]
  );
  const tutorId = result.insertId;

  // 2. Vincular tutor al alumno (si se pasó alumno_id)
  if (alumno_id) {
    await pool.query(
      'INSERT INTO alumno_tutor (alumno_id, tutor_id) VALUES (?, ?)',
      [alumno_id, tutorId]
    );
  }

  return tutorId;
};

// Actualizar tutor
export const updateTutor = async (id, { nombre, apellido, telefono, email, direccion }) => {
  await pool.query(
    'UPDATE tutores SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?',
    [nombre, apellido, telefono, email, direccion, id]
  );
};

// Eliminar tutor
export const deleteTutor = async (id) => {
  await pool.query('DELETE FROM tutores WHERE id = ?', [id]);
};

// Obtener tutores de un alumno
export const getTutoresDeAlumno = async (alumnoId) => {
  const [rows] = await pool.query(
    `SELECT t.*
     FROM tutores t
     JOIN alumno_tutor at ON t.id = at.tutor_id
     WHERE at.alumno_id = ?`,
    [alumnoId]
  );
  return rows;
};

// Vincular un tutor existente a un alumno existente
export const vincularTutorAlumno = async (alumnoId, tutorId) => {
  await pool.query(
    'INSERT INTO alumno_tutor (alumno_id, tutor_id) VALUES (?, ?)',
    [alumnoId, tutorId]
  );
};
