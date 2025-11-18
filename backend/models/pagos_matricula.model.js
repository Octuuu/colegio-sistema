import pool from "../config/db.js";

// Verificar si el alumno ya tiene matrícula pagada
export const verificarMatriculaPagada = async (alumnoId) => {
  const [rows] = await pool.query(
    `SELECT id FROM pagos_matricula 
     WHERE alumno_id = ? AND estado = 'pagado' AND anulado = false 
     LIMIT 1`,
    [alumnoId]
  );
  return rows.length > 0;
};

// Crear pago de matrícula con transacción y validación
export const crearPago = async ({
  alumnoId,
  fechaPago,
  monto,
  metodoPago,
  recibidoPor,
  comprobanteNumero = null,
  concepto = "Pago de matrícula",
  estado = "pagado"
}) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Validar monto
    const montoNumber = Number(monto);
    if (isNaN(montoNumber) || montoNumber <= 0) {
      throw new Error("Monto inválido");
    }

    // Verificar si el alumno ya tiene matrícula pagada
    const [matriculaExistente] = await connection.query(
      `SELECT id FROM pagos_matricula 
       WHERE alumno_id = ? AND estado = 'pagado' AND anulado = false`,
      [alumnoId]
    );

    if (matriculaExistente.length > 0) {
      throw new Error("El alumno ya tiene una matrícula pagada y activa");
    }

    // Verificar que el alumno exista
    const [alumno] = await connection.query(
      'SELECT id, nombre, apellido FROM alumnos WHERE id = ?',
      [alumnoId]
    );

    if (alumno.length === 0) {
      throw new Error("Alumno no encontrado");
    }

    // Fecha formateada
    const fechaMysql = fechaPago || new Date().toISOString().slice(0, 19).replace("T", " ");

    // 1️⃣ Insertar el pago en pagos_matricula
    const [result] = await connection.query(
      `INSERT INTO pagos_matricula 
         (alumno_id, fecha_pago, monto, metodo_pago, recibido_por, 
          comprobante_numero, concepto, estado, anulado, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, false, NOW(), NOW())`,
      [alumnoId, fechaMysql, montoNumber, metodoPago, recibidoPor || null, 
       comprobanteNumero, concepto, estado]
    );

    const pagoMatriculaId = result.insertId;

    // 2️⃣ Buscar caja abierta actual
    const [cajaActivaRows] = await connection.query(
      'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
    );

    if (cajaActivaRows.length === 0) {
      throw new Error("No hay caja abierta para registrar el pago");
    }

    const cajaAperturaId = cajaActivaRows[0].id;

    // 3️⃣ Registrar movimiento en caja (vinculado al pago)
    await connection.query(
      `INSERT INTO caja 
         (fecha, tipo_movimiento, descripcion, pago_matricula_id, monto, 
          caja_apertura_id, registrado_por, created_at, updated_at)
       VALUES (?, 'ingreso', ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        fechaMysql,
        `Pago de matrícula - ${alumno[0].nombre} ${alumno[0].apellido}`,
        pagoMatriculaId,
        montoNumber,
        cajaAperturaId,
        recibidoPor || null
      ]
    );

    await connection.commit();
    return pagoMatriculaId;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Listar todos los pagos con nombre y apellido del alumno
export const obtenerTodosPagos = async () => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, 
      p.estado, p.anulado, p.comprobante_numero, p.concepto, p.created_at,
      a.nombre AS alumno_nombre, a.apellido AS alumno_apellido, a.cedula
    FROM pagos_matricula p
    LEFT JOIN alumnos a ON p.alumno_id = a.id
    WHERE p.anulado = false
    ORDER BY p.fecha_pago DESC
  `);
  return rows;
};

// Listar pagos por alumno (con nombre y apellido)
export const obtenerPagosPorAlumno = async (alumnoId) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, 
      p.estado, p.anulado, p.comprobante_numero, p.concepto, p.created_at,
      a.nombre AS alumno_nombre, a.apellido AS alumno_apellido, a.cedula
    FROM pagos_matricula p
    LEFT JOIN alumnos a ON p.alumno_id = a.id
    WHERE p.alumno_id = ? AND p.anulado = false
    ORDER BY p.fecha_pago DESC
  `, [alumnoId]);
  return rows;
};

// Eliminar pago (manteniendo la función original)
export const eliminarPago = async (pagoId) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // 1️⃣ Eliminar movimiento en caja asociado
    await connection.query(`DELETE FROM caja WHERE pago_matricula_id = ?`, [pagoId]);

    // 2️⃣ Eliminar pago
    const [result] = await connection.query(
      `DELETE FROM pagos_matricula WHERE id = ?`,
      [pagoId]
    );

    await connection.commit();
    return result.affectedRows;

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

// Listar pagos por cédula
export const obtenerPagosPorCedula = async (cedula) => {
  const [rows] = await pool.query(`
    SELECT 
      p.id, p.alumno_id, p.fecha_pago, p.monto, p.metodo_pago, p.recibido_por, 
      p.estado, p.anulado, p.comprobante_numero, p.concepto, p.created_at,
      a.nombre AS alumno_nombre, a.apellido AS alumno_apellido, a.cedula
    FROM pagos_matricula p
    LEFT JOIN alumnos a ON p.alumno_id = a.id
    WHERE a.cedula = ? AND p.anulado = false
    ORDER BY p.fecha_pago DESC
  `, [cedula]);
  return rows;
};