import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async ({ gmail, password, rol_id, alumno_id = null, profesor_id = null }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO usuarios (gmail, password_hash, rol_id, alumno_id, profesor_id)
     VALUES (?, ?, ?, ?, ?)`,
    [gmail, hashedPassword, rol_id, alumno_id, profesor_id]
  );

  return result.insertId;
};

// verficar usuario durante el login
export const findUserByCredentials = async (email, password) => {
  const [rows] = await pool.query(
    `SELECT id, rol_id, password_hash FROM usuarios 
     WHERE gmail = ?`,
    [email]
  );

  const user = rows[0];
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password_hash)
  if (!isMatch) return null;

  return user;
};

