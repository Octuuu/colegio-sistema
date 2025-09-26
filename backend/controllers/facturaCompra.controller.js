import PDFDocument from 'pdfkit';
import pool from '../config/db.js';

export const generarFacturaCompraPDF = async (facturaId, res) => {
  try {
    const [facturaRows] = await pool.query(
      `SELECT fc.*, c.proveedor_id, c.fecha AS fecha_compra, p.nombre AS proveedor_nombre, p.direccion, p.correo, p.telefono
       FROM facturas_compras fc
       JOIN compras c ON fc.compra_id = c.id
       JOIN proveedores p ON c.proveedor_id = p.id
       WHERE fc.id = ?`,
      [facturaId]
    );

    if (facturaRows.length === 0) {
      if (!res.headersSent) res.status(404).json({ error: 'Factura de compra no encontrada' });
      return;
    }

    const factura = facturaRows[0];

    const [detalleRows] = await pool.query(
      `SELECT dfc.*, pr.nombre AS producto_nombre
       FROM detalle_factura_compra dfc
       JOIN productos pr ON dfc.producto_id = pr.id
       WHERE dfc.factura_id = ?`,
      [facturaId]
    );

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_compra_${factura.numero_factura}.pdf`);

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    doc.fontSize(20).text('Factura de Compra', { align: 'center' }).moveDown();
    doc.fontSize(12)
      .text(`Número de Factura: ${factura.numero_factura}`)
      .text(`Fecha de Compra: ${new Date(factura.fecha_compra).toLocaleDateString()}`)
      .text(`Estado: ${factura.estado}`)
      .moveDown();

    doc.fontSize(14).font('Helvetica-Bold').text('Proveedor:', { underline: true });
    doc.fontSize(12).font('Helvetica')
      .text(`Nombre: ${factura.proveedor_nombre}`)
      .text(`Teléfono: ${factura.telefono || 'N/A'}`)
      .text(`Correo: ${factura.correo || 'N/A'}`)
      .text(`Dirección: ${factura.direccion || 'N/A'}`)
      .moveDown();

    let y = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Producto', 50, y);
    doc.text('Cantidad', 250, y);
    doc.text('Precio Unitario', 340, y);
    doc.text('Subtotal', 450, y);
    y += 20;
    doc.font('Helvetica');

    detalleRows.forEach((item) => {
      doc.text(item.producto_nombre, 50, y);
      doc.text(item.cantidad, 250, y);
      doc.text(item.precio_unitario.toFixed(2), 340, y);
      doc.text(item.subtotal.toFixed(2), 450, y);
      y += 20;
    });

    doc.moveDown();
    doc.fontSize(14).font('Helvetica-Bold')
      .text(`Total: ${factura.total.toFixed(2)} Gs.`, { align: 'right' });

    doc.moveDown();
    doc.fontSize(10).font('Helvetica')
      .text('Gracias por su confianza. Registro de compras al proveedor.', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generando PDF de factura de compra:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de factura de compra' });
  }
};
