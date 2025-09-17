import pool from "../config/db.js";

export const crearServicio = async (nombre, tipo, descripcion, costo) => {
  const [result] = await pool.query(
    `INSERT INTO servicios (nombre, tipo, descripcion, costo) VALUES (?, ?, ?, ?)`,
    [nombre, tipo, descripcion, costo]
  );
  return result.insertId;
};

export const obtenerServicios = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM servicios ORDER BY created_at DESC`
  );
  return rows;
};

export const obtenerServicioPorId = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM servicios WHERE id = ?`, [id]);
  return rows[0];
};

export const actualizarServicio = async (id, nombre, tipo, descripcion, costo) => {
  const [result] = await pool.query(
    `UPDATE servicios SET nombre = ?, tipo = ?, descripcion = ?, costo = ? WHERE id = ?`,
    [nombre, tipo, descripcion, costo, id]
  );
  return result.affectedRows;
};

export const eliminarServicio = async (id) => {
  const [result] = await pool.query(`DELETE FROM servicios WHERE id = ?`, [id]);
  return result.affectedRows;
};
