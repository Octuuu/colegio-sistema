import pool from '../config/db.js';

export const crearCompra = async ({ proveedor_id, productos, fecha, estado }) => {
  let totalCompra = 0;

  // Validar fecha
  let fechaCompra = new Date();
  if (fecha) {
    const fechaTmp = new Date(fecha);
    if (!isNaN(fechaTmp.getTime())) fechaCompra = fechaTmp;
  }
  const fechaSQL = fechaCompra.toISOString().slice(0, 19).replace('T', ' ');

  try {
    // Insertar compra con total inicial 0
    const [compraResult] = await pool.query(
      'INSERT INTO compras (proveedor_id, fecha, total, estado) VALUES (?, ?, ?, ?)',
      [Number(proveedor_id), fechaSQL, 0, estado || 'pagada']
    );
    const compraId = compraResult.insertId;

    // Insertar detalle de compra y actualizar stock
    for (const item of productos) {
      // Asegurarse de que sea un número válido
      const producto_id = Number(item.producto_id?.id ?? item.producto_id);
      const cantidad = Number(item.cantidad) || 0;
      const precioUnitario = Number(item.precio_unitario) || 0;
      const subtotal = cantidad * precioUnitario;

      if (![producto_id, cantidad, precioUnitario, subtotal].every(Number.isFinite)) {
        throw new Error(`Valores inválidos en detalle_compra: ${JSON.stringify(item)}`);
      }

      await pool.query(
        `INSERT INTO detalle_compra 
         (compra_id, producto_id, cantidad, precio_unitario, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [compraId, producto_id, cantidad, precioUnitario, subtotal]
      );

      await pool.query('UPDATE productos SET stock = stock + ? WHERE id = ?', [cantidad, producto_id]);
      totalCompra += subtotal;
    }

    // Actualizar total de compra
    await pool.query('UPDATE compras SET total = ? WHERE id = ?', [totalCompra, compraId]);

    // Insertar factura de compra
    const numeroFactura = `FC-${String(compraId).padStart(6, '0')}`;
    const [facturaResult] = await pool.query(
      'INSERT INTO facturas_compras (compra_id, numero_factura, fecha, total, estado) VALUES (?, ?, ?, ?, ?)',
      [compraId, numeroFactura, fechaSQL, totalCompra, 'pagada']
    );
    const facturaId = facturaResult.insertId;

    // Insertar detalle de factura
    for (const item of productos) {
      const producto_id = Number(item.producto_id?.id ?? item.producto_id);
      const cantidad = Number(item.cantidad) || 0;
      const precioUnitario = Number(item.precio_unitario) || 0;
      const subtotal = cantidad * precioUnitario;

      if (![facturaId, producto_id, cantidad, precioUnitario, subtotal].every(Number.isFinite)) {
        throw new Error(`Valores inválidos en detalle_factura_compra: ${JSON.stringify(item)}`);
      }

      await pool.query(
        `INSERT INTO detalle_factura_compra 
         (factura_id, producto_id, cantidad, precio_unitario, subtotal)
         VALUES (?, ?, ?, ?, ?)`,
        [facturaId, producto_id, cantidad, precioUnitario, subtotal]
      );
    }

    return { compraId, facturaId, total: totalCompra };

  } catch (error) {
    console.error("ERROR al crear compra:", error);
    throw error;
  }
};

// Obtener todas las compras
export const obtenerCompras = async () => {
  const [rows] = await pool.query(`
    SELECT c.*, p.nombre AS proveedor 
    FROM compras c
    INNER JOIN proveedores p ON c.proveedor_id = p.id
    ORDER BY c.fecha DESC
  `);
  return rows;
};

// Obtener compra por ID
export const obtenerCompraPorId = async (id) => {
  const [rows] = await pool.query(
    `SELECT c.*, p.nombre AS proveedor 
     FROM compras c
     INNER JOIN proveedores p ON c.proveedor_id = p.id
     WHERE c.id = ?`,
    [Number(id)]
  );
  return rows[0];
};
