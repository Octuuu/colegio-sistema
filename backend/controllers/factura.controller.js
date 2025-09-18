import PDFDocument from 'pdfkit';
import pool from '../config/db.js';

export const descargarFacturaController = async (req, res) => {
  try {
    const { id: facturaId } = req.params;

    // 1️⃣ Obtener datos de la factura y venta
    const [facturaRows] = await pool.query(
      `SELECT fv.*, v.alumno_id, v.tutor_id, v.metodo_pago, v.fecha AS fecha_venta
       FROM facturas_ventas fv
       JOIN ventas v ON fv.venta_id = v.id
       WHERE fv.id = ?`,
      [facturaId]
    );
    if (facturaRows.length === 0) return res.status(404).json({ error: 'Factura no encontrada' });
    const factura = facturaRows[0];

    // 2️⃣ Obtener detalle de la factura
    const [detalleRows] = await pool.query(
      'SELECT * FROM detalle_factura_venta WHERE factura_id = ?',
      [facturaId]
    );

    // 3️⃣ Obtener datos de alumno y tutor
    const [alumnoRows] = await pool.query('SELECT id, nombre FROM alumnos WHERE id = ?', [factura.alumno_id]);
    const [tutorRows] = await pool.query('SELECT id, nombre FROM tutores WHERE id = ?', [factura.tutor_id]);

    const alumno = alumnoRows[0] || { nombre: 'No registrado' };
    const tutor = tutorRows[0] || { nombre: 'No registrado' };

    // 4️⃣ Configurar headers HTTP para descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${factura.numero_factura}.pdf`);

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(res);

    // -------------------------------
    // 5️⃣ Encabezado
    // -------------------------------
    doc.fontSize(22).text('Factura de Venta', { align: 'center' }).moveDown(1.5);

    doc.fontSize(12);
    doc.text(`Número de Factura: ${factura.numero_factura}`, { continued: true }).text(`   Fecha: ${new Date(factura.fecha_venta).toLocaleDateString()}`);
    doc.text(`Método de Pago: ${factura.metodo_pago}`).moveDown();

    // -------------------------------
    // 6️⃣ Datos del cliente
    // -------------------------------
    doc.fontSize(14).text('Datos del Cliente', { underline: true });
    doc.fontSize(12);
    doc.text(`Alumno: ${alumno.nombre}`);
    doc.text(`Tutor: ${tutor.nombre}`).moveDown(1);

    // -------------------------------
    // 7️⃣ Tabla de productos
    // -------------------------------
    const tableTop = doc.y;
    const itemX = 50;
    const qtyX = 300;
    const unitX = 370;
    const subtotalX = 470;

    // Encabezado de tabla
    doc.font('Helvetica-Bold');
    doc.text('Producto/Servicio', itemX, tableTop);
    doc.text('Cantidad', qtyX, tableTop);
    doc.text('Precio Unitario', unitX, tableTop);
    doc.text('Subtotal', subtotalX, tableTop);

    // Línea debajo del encabezado
    doc.moveTo(itemX, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    // Filas de detalle
    doc.font('Helvetica');
    let y = tableTop + 25;

    detalleRows.forEach((item) => {
      const precio = Number(item.precio_unitario) || 0;
      const subtotal = Number(item.subtotal) || 0;

      doc.text(item.producto_servicio, itemX, y);
      doc.text(item.cantidad, qtyX, y, { width: 50, align: 'center' });
      doc.text(precio.toFixed(2), unitX, y, { width: 70, align: 'right' });
      doc.text(subtotal.toFixed(2), subtotalX, y, { width: 70, align: 'right' });
      y += 20;
    });

    // Línea final de tabla
    doc.moveTo(itemX, y).lineTo(550, y).stroke();

    // -------------------------------
    // 8️⃣ Total
    // -------------------------------
    doc.moveDown(1);
    doc.fontSize(14).font('Helvetica-Bold');
    doc.text(`Total: ${Number(factura.total).toFixed(2)}`, { align: 'right' });

    // -------------------------------
    // 9️⃣ Pie de página
    // -------------------------------
    doc.fontSize(10).font('Helvetica')
       .text('Gracias por su compra. Escuela XYZ - Todos los derechos reservados.', 50, 770, { align: 'center', width: 500 });

    doc.end();

  } catch (error) {
    console.error('Error generando PDF:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de factura' });
  }
};
