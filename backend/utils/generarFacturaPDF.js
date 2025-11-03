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

    // Detalle
    const [detalleRows] = await pool.query(
      'SELECT * FROM detalle_factura_venta WHERE factura_id = ?',
      [facturaId]
    );

    // Alumno y tutor
    const [alumnoRows] = await pool.query('SELECT nombre FROM alumnos WHERE id = ?', [factura.alumno_id]);
    const [tutorRows] = await pool.query('SELECT nombre FROM tutores WHERE id = ?', [factura.tutor_id]);

    const alumno = alumnoRows[0]?.nombre || 'No registrado';
    const tutor = tutorRows[0]?.nombre || 'No registrado';

    // Configuración PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${factura.numero_factura}.pdf`);

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    doc.pipe(res);

    // === ENCABEZADO INSTITUCIONAL ===
    doc.fontSize(14).font('Helvetica-Bold').text('UNIVERSIDAD CATÓLICA', { align: 'center' });
    doc.text('"NUESTRA SEÑORA DE LA ASUNCIÓN"', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).font('Helvetica')
      .text('Unidad Pedagógica San Ignacio Misiones', { align: 'center' })
      .text('Av. Defensores del Chaco c/ Teodoro Dirusquel', { align: 'center' })
      .text('Teléfono: (0782) 232351', { align: 'center' })
      .text('R.U.C.: 80107202-6', { align: 'center' })
      .moveDown(1);

    // === DATOS FACTURA ===
    doc.fontSize(10);
    doc.text(`Timbrado: 15923130`);
    doc.text(`Validez: 31/10/2023`);
    doc.text(`Factura: CONTADO ${factura.numero_factura}`);
    doc.text(`Fecha: ${new Date(factura.fecha_venta).toLocaleDateString()} ${new Date(factura.fecha_venta).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    doc.text(`Cliente: ${alumno}`);
    doc.text(`RUC: ${factura.ruc_cliente || '---'}`);
    doc.moveDown(1);

    // === TABLA DETALLE ===
    doc.font('Helvetica-Bold').text('Concepto', 50, doc.y);
    doc.text('Importe', 400, doc.y);
    doc.moveDown(0.5);
    doc.font('Helvetica');

    let total = 0;
    detalleRows.forEach((item) => {
      doc.text(item.producto_servicio, 50, doc.y);
      doc.text(`${item.subtotal.toLocaleString()} Gs`, 400, doc.y);
      total += Number(item.subtotal);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);
    doc.font('Helvetica-Bold');
    doc.text(`Total (Guaraníes): ${total.toLocaleString()} Gs`, { align: 'left' });
    doc.font('Helvetica').text(`( ${numeroAGuaranies(total)} )`, { align: 'left' });

    // === RESUMEN DE IVA ===
    doc.moveDown(0.5);
    doc.text('Exento:', 50);
    doc.text(`${total.toLocaleString()} Gs`, 150);
    doc.text('Gravado 5%: 0', 250);
    doc.text('Gravado 10%: 0', 350);
    doc.text('IVA: 0', 450);
    doc.moveDown(1);

    // === PAGO ===
    doc.text(`Efectivo: ${total.toLocaleString()} Gs`);
    doc.text(`Total Recibido: ${total.toLocaleString()} Gs`);
    doc.text(`Total Factura: ${total.toLocaleString()} Gs`);
    doc.text('Vuelto: 0');
    doc.moveDown(1);

    // === PIE DE FACTURA ===
    doc.text(`Cobranza: ${factura.id}`);
    doc.text(`Cajero: ${tutor}`);
    doc.moveDown(1);
    doc.font('Helvetica-Bold').text('***Gracias por su pago***', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generando PDF:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de factura' });
  }
};

// 🔤 Convierte número a texto en guaraníes (simple)
function numeroAGuaranies(num) {
  const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const miles = Math.floor(num / 1000);
  return miles > 0 ? `${miles} mil guaraníes` : `${num} guaraníes`;
}
