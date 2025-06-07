import pool from '../config/db.js';
import { createUser } from './usuario.model.js';

// Todos los alumnos
export const getAllAlumnos = async () => {
  const [rows] = await pool.query('SELECT * FROM alumnos');
  return rows;
};

// Alumno por ID
export const getAlumnoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM alumnos WHERE id = ?', [id]);
  return rows[0];
};

// Crear alumno y su cuenta de usuario
export const createAlumno = async ({ nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email, curso_id }) => {
  const emailUsuario = `${cedula}@correo.com`;
  const password = cedula.split('').reverse().join('') + '.';

  // 1. Insertar alumno
  const [result] = await pool.query(
    'INSERT INTO alumnos (nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email, curso_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email, curso_id]
  );

  const alumnoId = result.insertId;

  // 2. Crear usuario vinculado
  await createUser({ gmail: emailUsuario, password, rol_id: 3 });

  return alumnoId;
};

// Actualizar alumno
export const updateAlumno = async (id, { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, curso_id }) => {
  await pool.query(
    'UPDATE alumnos SET nombre = ?, apellido = ?, cedula = ?, fecha_nacimiento = ?, telefono = ?, direccion = ?, email = ?, curso_id = ? WHERE id = ?',
    [nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email, curso_id, id]
  );
};

// Eliminar alumno
export const deleteAlumno = async (id) => {
  await pool.query('DELETE FROM alumnos WHERE id = ?', [id]);
};
