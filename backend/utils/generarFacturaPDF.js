import PDFDocument from 'pdfkit';
import pool from '../config/db.js';

export const generarFacturaPDF = async (facturaId, res) => {
  try {
    // Obtener datos de la factura
    const [facturaRows] = await pool.query(
      `SELECT fv.*, v.alumno_id, v.tutor_id, v.metodo_pago, v.fecha AS fecha_venta
       FROM facturas_ventas fv
       JOIN ventas v ON fv.venta_id = v.id
       WHERE fv.id = ?`,
      [facturaId]
    );

    if (facturaRows.length === 0) {
      if (!res.headersSent) res.status(404).json({ error: 'Factura no encontrada' });
      return;
    }

    const factura = facturaRows[0];

    // Detalle de la factura
    const [detalleRows] = await pool.query(
      'SELECT * FROM detalle_factura_venta WHERE factura_id = ?',
      [facturaId]
    );

    // Alumno y tutor
    const [alumnoRows] = await pool.query('SELECT id, nombre FROM alumnos WHERE id = ?', [factura.alumno_id]);
    const [tutorRows] = await pool.query('SELECT id, nombre FROM tutores WHERE id = ?', [factura.tutor_id]);

    const alumno = alumnoRows[0] || { nombre: 'No registrado' };
    const tutor = tutorRows[0] || { nombre: 'No registrado' };

    // Headers para forzar descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${factura.numero_factura}.pdf`);

    // Crear PDF
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    // Encabezado
    doc.fontSize(20).text('Factura de Venta', { align: 'center' }).moveDown();
    doc.fontSize(12)
      .text(`Número de Factura: ${factura.numero_factura}`)
      .text(`Fecha: ${new Date(factura.fecha_venta).toLocaleDateString()}`)
      .text(`Método de Pago: ${factura.metodo_pago}`)
      .moveDown();

    doc.text(`Alumno: ${alumno.nombre}`);
    doc.text(`Tutor: ${tutor.nombre}`).moveDown();

    // Tabla
    let y = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Producto/Servicio', 50, y);
    doc.text('Cantidad', 300, y);
    doc.text('Precio Unitario', 380, y);
    doc.text('Subtotal', 480, y);
    y += 20;
    doc.font('Helvetica');

    detalleRows.forEach((item) => {
      doc.text(item.producto_servicio, 50, y);
      doc.text(item.cantidad, 300, y);
      doc.text(item.precio_unitario.toFixed(2), 380, y);
      doc.text(item.subtotal.toFixed(2), 480, y);
      y += 20;
    });

    // Total
    doc.moveDown();
    doc.fontSize(14).font('Helvetica-Bold')
      .text(`Total: ${factura.total.toFixed(2)}`, { align: 'right' });

    doc.fontSize(10).font('Helvetica')
      .text('Gracias por su compra. Escuela XYZ', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generando PDF:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de factura' });
  }
};
