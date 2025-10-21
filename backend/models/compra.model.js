import pool from '../config/db.js';

export const crearCompra = async ({ proveedor_id, productos = [], insumos = [], fecha, estado, registrado_por }) => {
  let totalCompra = 0;

  // 🔹 1. Preparar fecha en formato SQL
  const fechaSQL = fecha
    ? new Date(fecha).toISOString().slice(0, 19).replace('T', ' ')
    : new Date().toISOString().slice(0, 19).replace('T', ' ');

  // 🔹 2. Insertar compra
  const [compraResult] = await pool.query(
    'INSERT INTO compras (proveedor_id, fecha, total, estado) VALUES (?, ?, ?, ?)',
    [Number(proveedor_id), fechaSQL, 0, estado || 'pagada']
  );
  const compraId = compraResult.insertId;

  // 🔹 3. Insertar productos comprados
  for (const item of productos) {
    const producto_id = Number(item.producto_id?.id ?? item.producto_id);
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;
    totalCompra += subtotal;

    await pool.query(
      `INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [compraId, producto_id, cantidad, precioUnitario, subtotal]
    );

    // Actualizar stock de productos
    await pool.query('UPDATE productos SET stock = stock + ? WHERE id = ?', [cantidad, producto_id]);
  }

  // 🔹 4. Insertar insumos comprados
  for (const item of insumos) {
    const insumo_id = Number(item.insumo_id?.id ?? item.insumo_id);
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;
    totalCompra += subtotal;

    await pool.query(
      `INSERT INTO detalle_compra (compra_id, insumo_id, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [compraId, insumo_id, cantidad, precioUnitario, subtotal]
    );

    // Actualizar stock de insumos
    await pool.query('UPDATE insumos SET cantidad = cantidad + ? WHERE id = ?', [cantidad, insumo_id]);
  }

  // 🔹 5. Actualizar total en la compra
  await pool.query('UPDATE compras SET total = ? WHERE id = ?', [totalCompra, compraId]);

  // 🔹 6. Insertar factura
  const numeroFactura = `FC-${String(compraId).padStart(6, '0')}`;
  const [facturaResult] = await pool.query(
    'INSERT INTO facturas_compras (compra_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
    [compraId, numeroFactura, fechaSQL, totalCompra, 'pagada']
  );
  const facturaId = facturaResult.insertId;

  // 🔹 7. Obtener la caja actualmente abierta
  const [cajaActivaRows] = await pool.query(
    'SELECT id FROM cajas_apertura_cierre WHERE estado = "abierta" ORDER BY id DESC LIMIT 1'
  );
  const cajaAperturaId = cajaActivaRows.length > 0 ? cajaActivaRows[0].id : null;

  // 🔹 8. Registrar movimiento en caja (EGRESO)
  await pool.query(
    `INSERT INTO caja (fecha, tipo_movimiento, descripcion, compra_id, monto, registrado_por, caja_apertura_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      fechaSQL,
      'egreso',
      `Compra N° ${compraId}`,
      compraId,
      totalCompra,
      registrado_por || null,
      cajaAperturaId
    ]
  );

  return { compraId, facturaId, total: totalCompra };
};
