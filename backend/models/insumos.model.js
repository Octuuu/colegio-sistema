import pool from "../config/db.js";

export const crearInsumo = async (nombre, descripcion, cantidad, unidad, proveedor_id) => {
  const [result] = await pool.query(
    `INSERT INTO insumos (nombre, descripcion, cantidad, unidad, proveedor_id) VALUES (?, ?, ?, ?, ?)`,
    [nombre, descripcion, cantidad, unidad, proveedor_id]
  );
  return result.insertId;
};

export const obtenerInsumos = async () => {
  const [rows] = await pool.query(
    `SELECT i.*, p.nombre AS proveedor
     FROM insumos i
     LEFT JOIN proveedores p ON i.proveedor_id = p.id
     ORDER BY i.created_at DESC`
  );
  return rows;
};

export const obtenerInsumoPorId = async (id) => {
  const [rows] = await pool.query(
    `SELECT i.*, p.nombre AS proveedor
     FROM insumos i
     LEFT JOIN proveedores p ON i.proveedor_id = p.id
     WHERE i.id = ?`,
    [id]
  );
  return rows[0];
};

export const actualizarInsumo = async (id, nombre, descripcion, cantidad, unidad, proveedor_id) => {
  const [result] = await pool.query(
    `UPDATE insumos SET nombre = ?, descripcion = ?, cantidad = ?, unidad = ?, proveedor_id = ? WHERE id = ?`,
    [nombre, descripcion, cantidad, unidad, proveedor_id, id]
  );
  return result.affectedRows;
};

export const eliminarInsumo = async (id) => {
  const [result] = await pool.query(`DELETE FROM insumos WHERE id = ?`, [id]);
  return result.affectedRows;
};
