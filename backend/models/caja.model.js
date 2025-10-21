import pool from '../config/db.js';

// 🔹 Formatea fecha a formato compatible con MySQL (YYYY-MM-DD HH:mm:ss)
const formatFechaMySQL = (fecha) => {
  let f;

  // Si no se envía fecha, usamos la actual
  if (!fecha) f = new Date();
  else if (fecha instanceof Date) f = fecha;
  else if (typeof fecha === 'string' || typeof fecha === 'number') {
    // Si es string o timestamp, intentar convertir
    f = new Date(fecha);
    // Si la conversión falla, usar fecha actual
    if (isNaN(f.getTime())) f = new Date();
  } else {
    // Si llega un tipo raro (objeto, null, undefined, etc.)
    f = new Date();
  }

  // Convertimos a formato MySQL (YYYY-MM-DD HH:mm:ss)
  return f.toISOString().slice(0, 19).replace('T', ' ');
};



// ============================================================
// 📦 APERTURA Y CIERRE DE CAJA
// ============================================================
export const abrirCaja = async ({ monto_apertura = 0, usuario_apertura_id = 1, descripcion = null }) => {
  // 1️⃣ Verificar si hay caja abierta
  const [abiertas] = await pool.query(`SELECT * FROM cajas_apertura_cierre WHERE estado='abierta'`);
  if (abiertas.length > 0) {
    throw new Error('Ya hay una caja abierta. Cierra la caja actual antes de abrir otra.');
  }

  const fecha_apertura = formatFechaMySQL();
  const montoValido = isNaN(Number(monto_apertura)) ? 0 : Number(monto_apertura);

  // 2️⃣ Crear registro de apertura
  const [result] = await pool.query(
    `INSERT INTO cajas_apertura_cierre 
      (fecha_apertura, monto_apertura, usuario_apertura_id, estado, descripcion)
     VALUES (?, ?, ?, 'abierta', ?)`,
    [fecha_apertura, montoValido, usuario_apertura_id, descripcion || 'Apertura de caja']
  );

  const caja_id = result.insertId;

  // 3️⃣ Registrar movimiento de apertura automáticamente
  await pool.query(
    `INSERT INTO caja 
      (fecha, tipo_movimiento, descripcion, monto, registrado_por, caja_apertura_id)
     VALUES (?, 'ingreso', 'Saldo inicial', ?, ?, ?)`,
    [fecha_apertura, montoValido, usuario_apertura_id, caja_id]
  );

  return { caja_id };
};


export const cerrarCaja = async ({ caja_id, monto_cierre = 0, usuario_cierre_id = 1, descripcion = null }) => {
  const fecha_cierre = formatFechaMySQL();
  const montoValido = isNaN(Number(monto_cierre)) ? 0 : Number(monto_cierre);

  // Solo actualizar la caja que se pasa
  const [res] = await pool.query(
    `UPDATE cajas_apertura_cierre
     SET fecha_cierre = ?, monto_cierre = ?, usuario_cierre_id = ?, estado = 'cerrada',
         descripcion = CONCAT(IFNULL(descripcion, ''), ?)
     WHERE id = ? AND estado='abierta'`,
    [fecha_cierre, montoValido, usuario_cierre_id, `\nCierre: ${descripcion || ''}`, caja_id]
  );

  if (res.affectedRows !== 1) throw new Error('No se pudo cerrar la caja');

  // Retornar la caja cerrada
  const [rows] = await pool.query(`SELECT * FROM cajas_apertura_cierre WHERE id = ?`, [caja_id]);
  return rows[0];
};



export const getCajaAbierta = async () => {
  const [rows] = await pool.query(
    `SELECT * FROM cajas_apertura_cierre 
     WHERE estado = 'abierta' 
     ORDER BY id DESC 
     LIMIT 1`
  );
  return rows[0] || null;
};

// ============================================================
// 💰 MOVIMIENTOS
// ============================================================
export const registrarMovimiento = async ({
  fecha = new Date(),
  tipo_movimiento,
  descripcion = null,
  pago_matricula_id = null,
  pago_mensualidad_id = null,
  venta_id = null,
  compra_id = null,
  monto = 0,
  registrado_por = null,
  caja_apertura_id = null
}) => {
  const fechaFormateada = formatFechaMySQL(fecha);
  const montoValido = isNaN(Number(monto)) ? 0 : Number(monto);

  const [res] = await pool.query(
    `INSERT INTO caja 
      (fecha, tipo_movimiento, descripcion, pago_matricula_id, pago_mensualidad_id, venta_id, compra_id, monto, registrado_por, caja_apertura_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fechaFormateada,
      tipo_movimiento,
      descripcion,
      pago_matricula_id,
      pago_mensualidad_id,
      venta_id,
      compra_id,
      montoValido,
      registrado_por,
      caja_apertura_id
    ]
  );

  return { movimiento_id: res.insertId };
};

export const obtenerMovimientos = async ({
  desde = null,
  hasta = null,
  caja_apertura_id = null,
  tipo = null
} = {}) => {
  let sql = `SELECT * FROM caja WHERE 1=1`;
  const params = [];

  if (desde) { sql += ' AND fecha >= ?'; params.push(desde); }
  if (hasta) { sql += ' AND fecha <= ?'; params.push(hasta); }
  if (caja_apertura_id) { sql += ' AND caja_apertura_id = ?'; params.push(caja_apertura_id); }
  if (tipo) { sql += ' AND tipo_movimiento = ?'; params.push(tipo); }

  sql += ' ORDER BY fecha DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
};

// ============================================================
// 📊 BALANCE
// ============================================================
export const obtenerBalanceEntreFechas = async ({ desde, hasta }) => {
  const [rows] = await pool.query(
    `SELECT 
       SUM(CASE WHEN tipo_movimiento = 'ingreso' THEN monto ELSE 0 END) AS total_ingresos,
       SUM(CASE WHEN tipo_movimiento = 'egreso' THEN monto ELSE 0 END) AS total_egresos,
       SUM(CASE WHEN tipo_movimiento = 'ingreso' THEN monto ELSE -monto END) AS neto
     FROM caja
     WHERE fecha BETWEEN ? AND ?`,
    [desde, hasta]
  );
  return rows[0];
};

// ============================================================
// 📋 DETALLE DE CAJA (apertura, movimientos y balance)
// ============================================================
export const obtenerDetalleCaja = async (caja_id) => {
  // 📦 Obtener datos de la caja
  const [cajaRows] = await pool.query(
    `SELECT * FROM cajas_apertura_cierre WHERE id = ?`,
    [caja_id]
  );
  const caja = cajaRows[0];
  if (!caja) return null;

  // 💰 Obtener movimientos de esa caja
  const [movRows] = await pool.query(
    `SELECT fecha, tipo_movimiento AS tipo, descripcion, monto 
     FROM caja 
     WHERE caja_apertura_id = ?
     ORDER BY fecha ASC`,
    [caja_id]
  );

  // 📊 Calcular balance de esa caja
  const [balanceRows] = await pool.query(
    `SELECT 
       SUM(CASE WHEN tipo_movimiento = 'ingreso' THEN monto ELSE 0 END) AS total_ingresos,
       SUM(CASE WHEN tipo_movimiento = 'egreso' THEN monto ELSE 0 END) AS total_egresos,
       SUM(CASE WHEN tipo_movimiento = 'ingreso' THEN monto ELSE -monto END) AS neto
     FROM caja
     WHERE caja_apertura_id = ?`,
    [caja_id]
  );

  const balance = balanceRows[0];

  return { caja, movimientos: movRows, balance };
};
