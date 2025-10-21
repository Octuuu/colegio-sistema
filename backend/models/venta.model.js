import pool from '../config/db.js';

export const crearVenta = async ({ alumno_id, tutor_id, productos, fecha, metodo_pago, registrado_por }) => {
  let totalVenta = 0;

  // 🔹 Asegurar fecha válida
  const fechaVenta = fecha || new Date().toISOString().slice(0, 19).replace('T', ' ');

  // 🔹 1. Insertar la venta base
  const [ventaResult] = await pool.query(
    'INSERT INTO ventas (alumno_id, tutor_id, fecha, total, metodo_pago) VALUES (?, ?, ?, ?, ?)',
    [alumno_id, tutor_id, fechaVenta, 0, metodo_pago]
  );
  const ventaId = ventaResult.insertId;

  // 🔹 2. Recorrer productos y registrar detalle + actualizar stock
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

    // 🔹 Actualizar stock automáticamente
    if (item.producto_id) {
      await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, item.producto_id]);
    }
    if (item.insumo_id) {
      await pool.query('UPDATE insumos SET stock = stock - ? WHERE id = ?', [cantidad, item.insumo_id]);
    }
  }

  // 🔹 3. Actualizar el total de la venta
  await pool.query('UPDATE ventas SET total = ? WHERE id = ?', [totalVenta, ventaId]);

  // 🔹 4. Generar factura
  const [facturaResult] = await pool.query(
    'INSERT INTO facturas_ventas (venta_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
    [ventaId, `FV-${ventaId.toString().padStart(6, '0')}`, fechaVenta, totalVenta, 'pagada']
  );
  const facturaId = facturaResult.insertId;

  // 🔹 5. Insertar detalle de factura
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

  // 🔹 6. Obtener la caja abierta (si existe)
  const [cajaActivaRows] = await pool.query(
    'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
  );
  const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

  // 🔹 7. Registrar movimiento de caja (INGRESO)
  await pool.query(
    `INSERT INTO caja 
       (fecha, tipo_movimiento, descripcion, venta_id, monto, registrado_por, caja_apertura_id)
     VALUES (?, 'ingreso', ?, ?, ?, ?, ?)`,
    [
      fechaVenta,
      `Venta N° ${ventaId}`,
      ventaId,
      totalVenta,
      registrado_por || null, // Puedes pasar desde req.user.id
      cajaAperturaId
    ]
  );

  return { ventaId, facturaId, total: totalVenta };
};

// 🔹 Obtener todas las ventas
export const obtenerVentas = async () => {
  const [rows] = await pool.query('SELECT * FROM ventas');
  return rows;
};

// 🔹 Obtener venta por ID
export const obtenerVentaPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
  return rows[0];
};
