import pool from "../config/db.js";

// Crear pago de matrícula y registrar en caja
export const crearPago = async ({ alumnoId, fechaPago, monto, metodoPago, recibidoPor, estado = 'pagado' }) => {
  // Validar fecha
  const fechaMysql = fechaPago || new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Validar monto
  const montoNumber = Number(monto);
  if (isNaN(montoNumber) || montoNumber <= 0) {
    throw new Error("Monto inválido");
  }

  // Insertar el pago en la tabla pagos_matricula
  const [result] = await pool.query(
    `INSERT INTO pagos_matricula 
       (alumno_id, fecha_pago, monto, metodo_pago, recibido_por, estado)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [alumnoId, fechaMysql, montoNumber, metodoPago, recibidoPor || null, estado]
  );

  const pagoMatriculaId = result.insertId;

  // Buscar la caja abierta actual
  const [cajaActivaRows] = await pool.query(
    'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
  );
  const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

  // Registrar el movimiento en caja
  await pool.query(
    `INSERT INTO caja 
       (fecha, tipo_movimiento, descripcion, pago_matricula_id, monto, caja_apertura_id, registrado_por)
     VALUES (?, 'ingreso', ?, ?, ?, ?, ?)`,
    [fechaMysql, `Pago de matrícula`, pagoMatriculaId, montoNumber, cajaAperturaId, recibidoPor || null]
  );

  return pagoMatriculaId;
};

// Listar todos los pagos con nombre y apellido del alumno
export const obtenerTodosPagos = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, p.estado,
      a.nombre AS alumno_nombre, a.apellido AS alumno_apellido
    FROM pagos_matricula p
    LEFT JOIN alumnos a ON p.alumno_id = a.id
    ORDER BY p.fecha_pago DESC
  `);
  return rows;
};

// Listar pagos por alumno (con nombre y apellido)
export const obtenerPagosPorAlumno = async (alumnoId) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, p.estado,
      a.nombre AS alumno_nombre, a.apellido AS alumno_apellido
    FROM pagos_matricula p
    LEFT JOIN alumnos a ON p.alumno_id = a.id
    WHERE p.alumno_id = ?
    ORDER BY p.fecha_pago DESC
  `, [alumnoId]);
  return rows;
};

// Eliminar pago y su movimiento en caja
export const eliminarPago = async (pagoId) => {
  // Eliminar movimiento en caja asociado
  await pool.query(`DELETE FROM caja WHERE pago_matricula_id = ?`, [pagoId]);

  // Eliminar pago
  const [result] = await pool.query(
    `DELETE FROM pagos_matricula WHERE id = ?`,
    [pagoId]
  );
  return result.affectedRows;
};
