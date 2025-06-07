import pool from '../config/db.js';
import { createUser } from './usuario.model.js';

// todos los profes
export const getAllProfes = async () => {
  const [rows] = await pool.query('SELECT * FROM profesores');
  return rows;
};

// profe por ID
export const getProfeById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM profesores WHERE id = ?', [id]);
  return rows[0];
};

// crear profe y su cuenta de usuario
export const createProfe = async ({ nombre, apellido, telefono, correo, cedula, direccion }) => {
  const emailUsuario = `${cedula}@correo.com`;
  const password = cedula.split('').reverse().join('') + '.';

  // 1. Insertar profe
  const [result] = await pool.query(
    'INSERT INTO profesores (nombre, apellido, telefono, correo, cedula, direccion) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, correo, cedula, direccion]
  );

  const profeId = result.insertId;

  // 2. Crear usuario vinculado
  await createUser({ gmail: emailUsuario, password, rol_id: 2 });

  return profeId;
};

// Actualizar profe
export const updateProfe = async (id, { nombre, apellido, telefono, correo, cedula, direccion }) => {
  await pool.query(
    'UPDATE profesores SET nombre = ?, apellido = ?, telefono = ?, correo = ?, cedula = ?, direccion = ? WHERE id = ?',
    [nombre, apellido, telefono, correo, cedula, direccion, id]
  );
};

// Eliminar profe
export const deleteProfe = async (id) => {
  await pool.query('DELETE FROM profesores WHERE id = ?', [id]);
};
