import pool from '../config/db.js';

export const crearVenta = async ({ alumno_id, tutor_id, productos, fecha, metodo_pago, registrado_por }) => {
  let totalVenta = 0;
  const fechaVenta = fecha || new Date().toISOString().slice(0, 19).replace('T', ' ');
  const [ventaResult] = await pool.query(
    'INSERT INTO ventas (alumno_id, tutor_id, fecha, total, metodo_pago) VALUES (?, ?, ?, ?, ?)',
    [alumno_id, tutor_id, fechaVenta, 0, metodo_pago]
  );
  const ventaId = ventaResult.insertId;

  for (const item of productos) {
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;
    totalVenta += subtotal;

    await pool.query(
      `INSERT INTO detalle_venta 
       (venta_id, insumo_id, producto_id, servicio_id, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        ventaId,
        item.insumo_id || null,
        item.producto_id || null,
        item.servicio_id || null,
        cantidad,
        precioUnitario,
        subtotal
      ]
    );

    if (item.producto_id) {
      await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, item.producto_id]);
    }
    if (item.insumo_id) {
      await pool.query('UPDATE insumos SET stock = stock - ? WHERE id = ?', [cantidad, item.insumo_id]);
    }
  }

  await pool.query('UPDATE ventas SET total = ? WHERE id = ?', [totalVenta, ventaId]);

  const [facturaResult] = await pool.query(
    'INSERT INTO facturas_ventas (venta_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
    [ventaId, `FV-${ventaId.toString().padStart(6, '0')}`, fechaVenta, totalVenta, 'pagada']
  );
  const facturaId = facturaResult.insertId;

  for (const item of productos) {
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;

    await pool.query(
      `INSERT INTO detalle_factura_venta 
       (factura_id, producto_servicio, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [
        facturaId,
        item.producto_id || item.servicio_id || item.insumo_id,
        cantidad,
        precioUnitario,
        subtotal
      ]
    );
  }

  const [cajaActivaRows] = await pool.query(
    'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
  );
  const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

  await pool.query(
    `INSERT INTO caja 
       (fecha, tipo_movimiento, descripcion, venta_id, monto, registrado_por, caja_apertura_id)
     VALUES (?, 'ingreso', ?, ?, ?, ?, ?)`,
    [
      fechaVenta,
      `Venta N° ${ventaId}`,
      ventaId,
      totalVenta,
      registrado_por || null,
      cajaAperturaId
    ]
  );

  return { ventaId, facturaId, total: totalVenta };
};

export const obtenerVentas = async () => {
  const [rows] = await pool.query('SELECT * FROM ventas ORDER BY fecha DESC');
  return rows;
};

export const obtenerVentaPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
  return rows[0];
};

export const obtenerResumenVentas = async () => {
  const [hoy] = await pool.query(`SELECT IFNULL(SUM(total),0) AS total FROM ventas WHERE DATE(fecha) = CURDATE()`);
  const [semana] = await pool.query(`SELECT IFNULL(SUM(total),0) AS total FROM ventas WHERE YEARWEEK(fecha,1) = YEARWEEK(CURDATE(),1)`);
  const [mes] = await pool.query(`SELECT IFNULL(SUM(total),0) AS total FROM ventas WHERE MONTH(fecha) = MONTH(CURDATE()) AND YEAR(fecha) = YEAR(CURDATE())`);
  return { hoy: hoy[0].total, semana: semana[0].total, mes: mes[0].total };
};

export const obtenerResumenMensual = async () => {
  const [rows] = await pool.query(`
    SELECT 
      DATE_FORMAT(fecha, '%Y-%m') AS mes,
      SUM(total) AS total
    FROM ventas
    GROUP BY YEAR(fecha), MONTH(fecha)
    ORDER BY mes DESC
    LIMIT 12
  `);
  const labels = rows.map(r => r.mes);
  const ingresos = rows.map(r => r.total);
  return { labels, ingresos };
};

export const obtenerProductosMasVendidos = async (limit = 6) => {
  const [rows] = await pool.query(`
    SELECT 
      p.nombre,
      SUM(dv.cantidad) AS cantidad,
      SUM(dv.subtotal) AS total
    FROM detalle_venta dv
    INNER JOIN productos p ON p.id = dv.producto_id
    GROUP BY p.id
    ORDER BY cantidad DESC
    LIMIT ?
  `, [limit]);
  return rows;
};
