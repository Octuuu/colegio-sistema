import pool from '../config/db.js';

export const crearCompra = async ({ proveedor_id, productos, fecha, estado }) => {
  let totalCompra = 0;

  // total de la compra
  const [compraResult] = await pool.query(
    'INSERT INTO compras (proveedor_id, fecha, total, estado) VALUES (?, ?, ?, ?)',
    [proveedor_id, fecha, 0, estado || 'pagada']
  );
  const compraId = compraResult.insertId;

  for (const item of productos) {
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;
    totalCompra += subtotal;

    // insertar detalle de compra
    await pool.query(
      `INSERT INTO detalle_compra 
       (compra_id, producto_id, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [compraId, item.producto_id, cantidad, precioUnitario, subtotal]
    );

    // actualizar stock 
    await pool.query(
      'UPDATE productos SET stock = stock + ? WHERE id = ?',
      [cantidad, item.producto_id]
    );
  }

  // actualizar total en la compra
  await pool.query('UPDATE compras SET total = ? WHERE id = ?', [totalCompra, compraId]);

  // generar factura de compra
  const [facturaResult] = await pool.query(
    'INSERT INTO facturas_compras (compra_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
    [compraId, `FC-${compraId.toString().padStart(6, '0')}`, fecha, totalCompra, 'pagada']
  );
  const facturaId = facturaResult.insertId;

  // insertar detalle de factura de compra
  for (const item of productos) {
    const cantidad = Number(item.cantidad) || 0;
    const precioUnitario = Number(item.precio_unitario) || 0;
    const subtotal = cantidad * precioUnitario;

    await pool.query(
      `INSERT INTO detalle_factura_compra 
       (factura_id, producto_id, cantidad, precio_unitario, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [facturaId, item.producto_id, cantidad, precioUnitario, subtotal]
    );
  }

  return { compraId, facturaId, total: totalCompra };
};

export const obtenerCompras = async () => {
  const [rows] = await pool.query(`
    SELECT c.*, p.nombre AS proveedor 
    FROM compras c
    INNER JOIN proveedores p ON c.proveedor_id = p.id
    ORDER BY c.fecha DESC
  `);
  return rows;
};

export const obtenerCompraPorId = async (id) => {
  const [rows] = await pool.query(
    `SELECT c.*, p.nombre AS proveedor 
     FROM compras c
     INNER JOIN proveedores p ON c.proveedor_id = p.id
     WHERE c.id = ?`,
    [id]
  );
  return rows[0];
};
