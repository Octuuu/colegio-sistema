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

// Crear tutor
export const createTutor = async ({ nombre, apellido, telefono, correo, direccion }) => {
  const [result] = await pool.query(
    'INSERT INTO tutores (nombre, apellido, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, correo, direccion]
  );
  return result.insertId;
};

// Actualizar tutor
export const updateTutor = async (id, { nombre, apellido, telefono, correo, direccion }) => {
  await pool.query(
    'UPDATE tutores SET nombre = ?, apellido = ?, telefono = ?, correo = ?, direccion = ? WHERE id = ?',
    [nombre, apellido, telefono, correo, direccion, id]
  );
};

// Eliminar tutor
export const deleteTutor = async (id) => {
  await pool.query('DELETE FROM tutores WHERE id = ?', [id]);
};

// Vincular tutor a un alumno
export const vincularTutorAlumno = async (alumnoId, tutorId) => {
  await pool.query(
    'INSERT INTO alumno_tutor (alumno_id, tutor_id) VALUES (?, ?)',
    [alumnoId, tutorId]
  );
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

// Obtener alumnos de un tutor
export const getAlumnosDeTutor = async (tutorId) => {
  const [rows] = await pool.query(
    `SELECT a.*
     FROM alumnos a
     JOIN alumno_tutor at ON a.id = at.alumno_id
     WHERE at.tutor_id = ?`,
    [tutorId]
  );
  return rows;
};
