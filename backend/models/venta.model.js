import pool from '../config/db.js';

export const crearVenta = async ({ alumno_id, tutor_id, productos, fecha, metodo_pago }) => {
  let totalVenta = 0;

  const [ventaResult] = await pool.query(
    'INSERT INTO ventas (alumno_id, tutor_id, fecha, total, metodo_pago) VALUES (?, ?, ?, ?, ?)',
    [alumno_id, tutor_id, fecha, 0, metodo_pago]
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

    // actualizar stock automaticamente
    if (item.producto_id) {
      await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [cantidad, item.producto_id]);
    }
    if (item.insumo_id) {
      await pool.query('UPDATE insumos SET stock = stock - ? WHERE id = ?', [cantidad, item.insumo_id]);
    }
  }

  // actualizar total en la venta
  await pool.query('UPDATE ventas SET total = ? WHERE id = ?', [totalVenta, ventaId]);

  // generar factura
  const [facturaResult] = await pool.query(
    'INSERT INTO facturas_ventas (venta_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
    [ventaId, `FV-${ventaId.toString().padStart(6, '0')}`, fecha, totalVenta, 'pagada']
  );
  const facturaId = facturaResult.insertId;

  // insertar detalle de factura
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

  return { ventaId, facturaId, total: totalVenta };
};

// obtener todas las ventas
export const obtenerVentas = async () => {
  const [rows] = await pool.query('SELECT * FROM ventas');
  return rows;
};

// obtener venta por ID
export const obtenerVentaPorId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
  return rows[0];
};
