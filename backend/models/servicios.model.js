import pool from "../config/db.js";

export const crearServicio = async (nombre, tipo, descripcion, costo, proveedor_id) => {
  const [result] = await pool.query(
    `INSERT INTO servicios (nombre, tipo, descripcion, costo, proveedor_id, created_at, updated_at) 
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [nombre, tipo, descripcion, costo, proveedor_id]
  );
  return result.insertId;
};

export const obtenerServicios = async () => {
  const [rows] = await pool.query(
    `SELECT s.*, p.nombre AS proveedor_nombre
     FROM servicios s
     LEFT JOIN proveedores p ON s.proveedor_id = p.id
     ORDER BY s.created_at DESC`
  );
  return rows;
};

export const obtenerServicioPorId = async (id) => {
  const [rows] = await pool.query(
    `SELECT s.*, p.nombre AS proveedor_nombre
     FROM servicios s
     LEFT JOIN proveedores p ON s.proveedor_id = p.id
     WHERE s.id = ?`,
    [id]
  );
  return rows[0];
};

export const actualizarServicio = async (id, nombre, tipo, descripcion, costo, proveedor_id) => {
  const [result] = await pool.query(
    `UPDATE servicios 
     SET nombre = ?, tipo = ?, descripcion = ?, costo = ?, proveedor_id = ?, updated_at = NOW()
     WHERE id = ?`,
    [nombre, tipo, descripcion, costo, proveedor_id, id]
  );
  return result.affectedRows;
};

export const eliminarServicio = async (id) => {
  const [result] = await pool.query(`DELETE FROM servicios WHERE id = ?`, [id]);
  return result.affectedRows;
};
