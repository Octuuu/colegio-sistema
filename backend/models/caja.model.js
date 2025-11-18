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


export const cerrarCaja = async ({ caja_id, usuario_cierre_id = 1, descripcion = null }) => {
  const fecha_cierre = formatFechaMySQL();

  // 🧩 1️⃣ Obtener datos de la caja actual
  const [cajaRows] = await pool.query(`SELECT monto_apertura FROM cajas_apertura_cierre WHERE id = ?`, [caja_id]);
  if (cajaRows.length === 0) throw new Error('No se encontró la caja con ese ID.');
  const monto_apertura = Number(cajaRows[0].monto_apertura) || 0;

  // 🧮 2️⃣ Calcular ingresos y egresos reales
  const [balanceRows] = await pool.query(
    `SELECT 
       COALESCE(SUM(CASE WHEN tipo_movimiento='ingreso' THEN monto ELSE 0 END),0) AS total_ingresos,
       COALESCE(SUM(CASE WHEN tipo_movimiento='egreso' THEN monto ELSE 0 END),0) AS total_egresos
     FROM caja
     WHERE caja_apertura_id = ?`,
    [caja_id]
  );

  const total_ingresos = Number(balanceRows[0].total_ingresos) || 0;
  const total_egresos = Number(balanceRows[0].total_egresos) || 0;

  // ✅ 3️⃣ El saldo final incluye la apertura + ingresos - egresos
  const saldo_final = monto_apertura + total_ingresos - total_egresos;

  // 📝 4️⃣ Actualizar la caja
  const [res] = await pool.query(
    `UPDATE cajas_apertura_cierre
     SET fecha_cierre = ?, monto_cierre = ?, usuario_cierre_id = ?, estado = 'cerrada',
         descripcion = CONCAT(IFNULL(descripcion, ''), ?)
     WHERE id = ? AND estado='abierta'`,
    [fecha_cierre, saldo_final, usuario_cierre_id, `\nCierre: ${descripcion || ''}`, caja_id]
  );

  if (res.affectedRows !== 1) throw new Error('No se pudo cerrar la caja');

  // 🔙 5️⃣ Retornar la caja cerrada actualizada
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
// 📦 Registrar movimiento con tipo automático
export const registrarMovimiento = async ({
  fecha = new Date(),
  tipo_movimiento = 'ingreso', // ✅ RECIBIR el tipo del controller
  descripcion = null,
  pago_matricula_id = null,
  pago_mensualidad_id = null,
  venta_id = null,
  compra_id = null,
  monto = 0,
  registrado_por = null,
  caja_apertura_id = null
}) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const fechaFormateada = formatFechaMySQL(fecha);
    const montoValido = isNaN(Number(monto)) ? 0 : Number(monto);

    // 🔥 CORRECCIÓN: USAR el tipo_movimiento que viene del controller
    // NO determinar automáticamente basado en IDs
    let tipoFinal = tipo_movimiento?.toLowerCase() || 'ingreso';

    // ✅ Validar que el tipo sea válido
    if (!['ingreso', 'egreso'].includes(tipoFinal)) {
      tipoFinal = 'ingreso'; // Default seguro
    }

    console.log('🎯 TIPO DE MOVIMIENTO EN MODELO:');
    console.log('   - Tipo recibido:', tipo_movimiento);
    console.log('   - Tipo final:', tipoFinal);
    console.log('   - Descripción:', descripcion);

    // 🔹 Si no hay descripción, poner una por defecto
    if (!descripcion) {
      if (pago_matricula_id) descripcion = 'Pago de matrícula';
      else if (pago_mensualidad_id) descripcion = 'Pago de mensualidad';
      else if (venta_id) descripcion = 'Venta';
      else if (compra_id) descripcion = 'Compra';
      else descripcion = 'Movimiento de caja';
    }

    // 🔹 Si no hay caja_apertura_id, obtener la caja abierta actual
    let cajaId = caja_apertura_id;
    if (!cajaId) {
      const cajaAbierta = await getCajaAbierta();
      if (!cajaAbierta) {
        throw new Error('No hay caja abierta para registrar el movimiento');
      }
      cajaId = cajaAbierta.id;
    }

    const [res] = await connection.query(
      `INSERT INTO caja 
        (fecha, tipo_movimiento, descripcion, pago_matricula_id, pago_mensualidad_id, venta_id, compra_id, monto, registrado_por, caja_apertura_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fechaFormateada,
        tipoFinal, // ✅ USAR el tipo corregido
        descripcion,
        pago_matricula_id,
        pago_mensualidad_id,
        venta_id,
        compra_id,
        montoValido,
        registrado_por,
        cajaId
      ]
    );

    await connection.commit();
    
    console.log('✅ MOVIMIENTO REGISTRADO CORRECTAMENTE:');
    console.log('   - ID:', res.insertId);
    console.log('   - Tipo:', tipoFinal);
    console.log('   - Descripción:', descripcion);
    console.log('   - Monto:', montoValido);
    
    return { movimiento_id: res.insertId, tipo_movimiento: tipoFinal };

  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
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
  const [cajaRows] = await pool.query(`SELECT * FROM cajas_apertura_cierre WHERE id = ?`, [caja_id]);
  const caja = cajaRows[0];
  if (!caja) return null;

  const [movRows] = await pool.query(
    `SELECT fecha, tipo_movimiento AS tipo, descripcion, monto 
     FROM caja WHERE caja_apertura_id = ? ORDER BY fecha ASC`,
    [caja_id]
  );

  const [balanceRows] = await pool.query(
    `SELECT 
       COALESCE(SUM(CASE WHEN tipo_movimiento='ingreso' THEN monto ELSE 0 END),0) AS total_ingresos,
       COALESCE(SUM(CASE WHEN tipo_movimiento='egreso' THEN monto ELSE 0 END),0) AS total_egresos,
       COALESCE(SUM(CASE WHEN tipo_movimiento='ingreso' THEN monto ELSE -monto END),0) AS neto
     FROM caja
     WHERE caja_apertura_id = ?`,
    [caja_id]
  );

  const balance = balanceRows[0];
  return { caja, movimientos: movRows, balance };
};


export const listarCajas = async () => {
  const [rows] = await pool.query(`
    SELECT 
      cac.id,
      cac.fecha_apertura,
      cac.fecha_cierre,
      cac.monto_apertura,
      cac.monto_cierre,         -- ✅ AÑADIDO AQUÍ
      cac.estado,
      ua.gmail AS usuario_apertura,
      uc.gmail AS usuario_cierre,
      -- Total de ingresos y egresos
      (SELECT COALESCE(SUM(monto),0) FROM caja WHERE tipo_movimiento='ingreso' AND caja_apertura_id=cac.id) AS total_ingresos,
      (SELECT COALESCE(SUM(monto),0) FROM caja WHERE tipo_movimiento='egreso' AND caja_apertura_id=cac.id) AS total_egresos,
      -- Saldo real
      ((SELECT COALESCE(SUM(monto),0) FROM caja WHERE tipo_movimiento='ingreso' AND caja_apertura_id=cac.id) -
       (SELECT COALESCE(SUM(monto),0) FROM caja WHERE tipo_movimiento='egreso' AND caja_apertura_id=cac.id)) AS saldo_cierre
    FROM cajas_apertura_cierre cac
    LEFT JOIN usuarios ua ON cac.usuario_apertura_id = ua.id
    LEFT JOIN usuarios uc ON cac.usuario_cierre_id = uc.id
    ORDER BY cac.id DESC
  `);

  return rows;
};

export const corregirMovimientosIncorrectos = async (caja_apertura_id) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    console.log('🔄 CORRIGIENDO MOVIMIENTOS INCORRECTOS para caja:', caja_apertura_id);

    // Corregir saldo inicial
    const [result1] = await connection.execute(
      `UPDATE caja 
       SET tipo_movimiento = 'ingreso' 
       WHERE caja_apertura_id = ? 
       AND (descripcion LIKE '%saldo inicial%' OR descripcion LIKE '%Saldo inicial%')
       AND tipo_movimiento = 'egreso'`,
      [caja_apertura_id]
    );

    // Corregir pagos de mensualidades/matrículas
    const [result2] = await connection.execute(
      `UPDATE caja 
       SET tipo_movimiento = 'ingreso' 
       WHERE caja_apertura_id = ? 
       AND (descripcion LIKE '%pago de%' OR descripcion LIKE '%mensualidad%' OR descripcion LIKE '%matrícula%' OR descripcion LIKE '%matricula%')
       AND tipo_movimiento = 'egreso'`,
      [caja_apertura_id]
    );

    await connection.commit();

    console.log('✅ CORRECCIONES APLICADAS:');
    console.log('   - Saldos iniciales corregidos:', result1.affectedRows);
    console.log('   - Pagos corregidos:', result2.affectedRows);

    return {
      caja_apertura_id,
      saldos_iniciales_corregidos: result1.affectedRows,
      pagos_corregidos: result2.affectedRows,
      total_corregido: result1.affectedRows + result2.affectedRows
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};