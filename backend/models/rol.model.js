import pool from '../config/db.js';

export const getAllRoles = async () => {
  const [rows] = await pool.query('SELECT * FROM roles');
  return rows;
};

export const createRol = async (nombre) => {
  const [result] = await pool.query(
    'INSERT INTO roles (nombre) VALUES (?)',
    [nombre]
  );
  return result.insertId;
};