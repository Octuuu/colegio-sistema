import pool from "../config/db.js";

// Crear pago de mensualidad (individual) y registrar en caja
export const crearPagoMensualidad = async ({ alumnoId, mes, anio, monto, metodoPago, recibidoPor }) => {
  const montoNumber = Number(monto);
  if (isNaN(montoNumber) || montoNumber <= 0) {
    throw new Error("Monto inválido");
  }

  // Verificar si ya existe pago de ese mes
  const [rows] = await pool.query(
    `SELECT * FROM pagos_mensualidad WHERE alumno_id = ? AND mes = ? AND anio = ?`,
    [alumnoId, mes, anio]
  );
  if (rows.length > 0) throw new Error(`El alumno ya pagó la mensualidad de ${mes}/${anio}`);

  const fechaPago = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Insertar el pago en la tabla mensualidades
  const [result] = await pool.query(
    `INSERT INTO pagos_mensualidad 
       (alumno_id, mes, anio, monto, fecha_pago, metodo_pago, recibido_por, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'pagado')`,
    [alumnoId, mes, anio, montoNumber, fechaPago, metodoPago, recibidoPor || null]
  );

  const pagoMensualidadId = result.insertId;

  // Buscar la caja abierta actual
  const [cajaActivaRows] = await pool.query(
    'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
  );
  const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

  // Registrar el movimiento en caja
  await pool.query(
    `INSERT INTO caja 
       (fecha, tipo_movimiento, descripcion, pago_mensualidad_id, monto, caja_apertura_id, registrado_por)
     VALUES (?, 'ingreso', ?, ?, ?, ?, ?)`,
    [fechaPago, `Pago de mensualidad ${mes}/${anio}`, pagoMensualidadId, montoNumber, cajaAperturaId, recibidoPor || null]
  );

  return pagoMensualidadId;
};

// Listar mensualidades de un alumno
export const obtenerMensualidadesPorAlumno = async (alumnoId) => {
  const [rows] = await pool.query(
    `SELECT pm.*, a.nombre AS alumno_nombre, a.apellido AS alumno_apellido
     FROM pagos_mensualidad pm
     JOIN alumnos a ON pm.alumno_id = a.id
     WHERE pm.alumno_id = ?
     ORDER BY pm.anio DESC, pm.mes DESC`,
    [alumnoId]
  );
  return rows;
};

// Pagar varias mensualidades y registrar en caja
export const pagarMensualidades = async (alumnoId, mensualidades, metodoPago, recibidoPor) => {
  const hoy = new Date().toISOString().slice(0, 19).replace('T', ' ');

  for (const m of mensualidades) {
    const montoNumber = Number(m.monto);
    if (isNaN(montoNumber) || montoNumber <= 0) continue;

    // Verificar si ya existe pago de ese mes
    const [rows] = await pool.query(
      `SELECT * FROM pagos_mensualidad WHERE alumno_id = ? AND mes = ? AND anio = ?`,
      [alumnoId, m.mes, m.anio]
    );
    if (rows.length > 0) continue;

    // Insertar pago
    const [result] = await pool.query(
      `INSERT INTO pagos_mensualidad 
         (alumno_id, mes, anio, monto, fecha_pago, metodo_pago, recibido_por, estado)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pagado')`,
      [alumnoId, m.mes, m.anio, montoNumber, hoy, metodoPago, recibidoPor || null]
    );

    const pagoMensualidadId = result.insertId;

    // Buscar la caja abierta actual
    const [cajaActivaRows] = await pool.query(
      'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
    );
    const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

    // Registrar el movimiento en caja
    await pool.query(
      `INSERT INTO caja 
         (fecha, tipo_movimiento, descripcion, pago_mensualidad_id, monto, caja_apertura_id, registrado_por)
       VALUES (?, 'ingreso', ?, ?, ?, ?, ?)`,
      [hoy, `Pago de mensualidad ${m.mes}/${m.anio}`, pagoMensualidadId, montoNumber, cajaAperturaId, recibidoPor || null]
    );
  }
};

// Obtener todos los pagos
export const obtenerTodosLosPagos = async () => {
  const [rows] = await pool.query(
    `SELECT pm.*, a.nombre AS alumno_nombre, a.apellido AS alumno_apellido
     FROM pagos_mensualidad pm
     JOIN alumnos a ON pm.alumno_id = a.id
     ORDER BY pm.anio DESC, pm.mes DESC`
  );
  return rows;
};

// Eliminar un pago y opcionalmente su movimiento en caja
export const borrarPago = async (id) => {
  // Eliminar movimiento en caja
  await pool.query(`DELETE FROM caja WHERE pago_mensualidad_id = ?`, [id]);

  // Eliminar pago
  await pool.query(`DELETE FROM pagos_mensualidad WHERE id = ?`, [id]);
};
