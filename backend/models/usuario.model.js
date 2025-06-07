import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async ({ gmail, password, rol_id }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO usuarios (gmail, password_hash, rol_id)
    VALUES (?,?,?)`,
    [gmail, hashedPassword, rol_id]
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


/*
async function createAdmin() {
  try {
    const email = 'admin@ejemplo.com';
    const password = '123456'; // Cambia por la contraseña que quieras
    const rol_id = 1; // ID del rol admin en tu tabla roles

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en la tabla usuarios
    const [result] = await pool.query(
      'INSERT INTO usuarios (email, password_hash, rol_id) VALUES (?, ?, ?)',
      [email, hashedPassword, rol_id]
    );

    console.log(`Admin creado con ID: ${result.insertId}`);

    process.exit(0); // Salir del script
  } catch (error) {
    console.error('Error al crear admin:', error);
    process.exit(1);
  }
}

createAdmin();
*/