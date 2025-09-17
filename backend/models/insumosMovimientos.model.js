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

// Obtener consumo por periodo (sumatoria de salidas por insumo entre fechas)
export const obtenerConsumoPorPeriodo = async (desde, hasta) => {
  const [rows] = await pool.query(
    `SELECT i.id AS insumo_id, i.nombre AS insumo, SUM(m.cantidad) AS total_consumido
     FROM insumos_movimientos m
     JOIN insumos i ON m.insumo_id = i.id
     WHERE m.tipo = 'salida' AND m.fecha BETWEEN ? AND ?
     GROUP BY i.id, i.nombre`,
    [desde, hasta]
  );
  return rows;
};

// Insumos con stock bajo
export const obtenerInsumosStockBajo = async (limite = 5) => {
  const [rows] = await pool.query(
    `SELECT id, nombre, cantidad, unidad
     FROM insumos
     WHERE cantidad <= ?
     ORDER BY cantidad ASC`,
    [limite]
  );
  return rows;
};
