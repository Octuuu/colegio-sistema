import pool from '../config/db.js';

// Crear pago
export const crearPagoMatricula = async (matriculaId, fechaPago, monto, metodoPago, recibidoPor) => {
  const [result] = await pool.query(
    `INSERT INTO pagos_matricula (matricula_id, fecha_pago, monto, metodo_pago, recibido_por)
     VALUES (?, ?, ?, ?, ?)`,
    [matriculaId, fechaPago, monto, metodoPago, recibidoPor]
  );

  // Actualizar estado de la matrícula a pagada
  await pool.query(
    `UPDATE matriculas SET estado = 'pagada' WHERE id = ?`,
    [matriculaId]
  );

  return result.insertId;
};

// Obtener pagos por matrícula
export const obtenerPagosPorMatricula = async (matriculaId) => {
  const [rows] = await pool.query(
    `SELECT pm.*, m.anio_lectivo, a.nombre, a.apellido, c.anio, c.bachillerato
     FROM pagos_matricula pm
     JOIN matriculas m ON pm.matricula_id = m.id
     JOIN alumnos a ON m.alumno_id = a.id
     JOIN cursos c ON m.curso_id = c.id
     WHERE pm.matricula_id = ?
     ORDER BY pm.fecha_pago DESC`,
    [matriculaId]
  );
  return rows;
};

// Obtener todos los pagos
export const obtenerTodosLosPagos = async () => {
  const [rows] = await pool.query(
    `SELECT pm.*, a.nombre, a.apellido, c.anio, c.bachillerato, m.anio_lectivo
     FROM pagos_matricula pm
     JOIN matriculas m ON pm.matricula_id = m.id
     JOIN alumnos a ON m.alumno_id = a.id
     JOIN cursos c ON m.curso_id = c.id
     ORDER BY pm.fecha_pago DESC`
  );
  return rows;
};

// Eliminar pago (y volver matrícula a pendiente)
export const eliminarPagoMatricula = async (pagoId) => {
  // primero obtener la matrícula asociada
  const [rows] = await pool.query(
    `SELECT matricula_id FROM pagos_matricula WHERE id = ?`,
    [pagoId]
  );

  if (rows.length === 0) return 0;

  const matriculaId = rows[0].matricula_id;

  // eliminar pago
  const [result] = await pool.query(
    'DELETE FROM pagos_matricula WHERE id = ?',
    [pagoId]
  );

  // devolver matrícula a pendiente
  await pool.query(
    `UPDATE matriculas SET estado = 'pendiente' WHERE id = ?`,
    [matriculaId]
  );

  return result.affectedRows;
};
