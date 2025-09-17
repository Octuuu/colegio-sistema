import pool from "../config/db.js";

export const registrarMovimiento = async (insumo_id, tipo, cantidad, descripcion) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Insertamos movimiento
    await conn.query(
      `INSERT INTO insumos_movimientos (insumo_id, tipo, cantidad, descripcion) 
       VALUES (?, ?, ?, ?)`,
      [insumo_id, tipo, cantidad, descripcion]
    );

    // Actualizamos stock
    if (tipo === "entrada") {
      await conn.query(`UPDATE insumos SET cantidad = cantidad + ? WHERE id = ?`, [cantidad, insumo_id]);
    } else if (tipo === "salida") {
      await conn.query(`UPDATE insumos SET cantidad = cantidad - ? WHERE id = ?`, [cantidad, insumo_id]);
    }

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

export const obtenerMovimientos = async (insumo_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM insumos_movimientos WHERE insumo_id = ? ORDER BY fecha DESC`,
    [insumo_id]
  );
  return rows;
};
