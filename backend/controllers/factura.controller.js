import PDFDocument from 'pdfkit';
import pool from '../config/db.js';

function formatMoney(num) {
  return Number(num).toLocaleString('de-DE');
}

function numberToWords(n) {
  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const especiales = ['diez','once','doce','trece','catorce','quince','dieciseis','diecisiete','dieciocho','diecinueve'];
  const decenas = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
  const centenas = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
  if (n === 0) return 'cero';
  if (n === 100) return 'cien';
  function chunkToWords(num) {
    let words = '';
    if (num >= 100) {
      const c = Math.floor(num / 100);
      words += (centenas[c] ? centenas[c] + ' ' : '');
      num = num % 100;
    }
    if (num >= 10 && num <= 19) {
      words += especiales[num - 10] + ' ';
    } else if (num >= 20 && num <= 29) {
      if (num === 20) words += 'veinte ';
      else words += 'veinti' + unidades[num - 20] + ' ';
    } else {
      if (num >= 30) {
        const d = Math.floor(num / 10);
        words += decenas[d] + (num % 10 === 0 ? ' ' : ' y ');
        if (num % 10 !== 0) words += unidades[num % 10] + ' ';
      } else if (num > 0 && num < 10) {
        words += unidades[num] + ' ';
      }
    }
    return words;
  }
  let result = '';
  if (n >= 1000000) {
    const m = Math.floor(n / 1000000);
    result += (m === 1 ? 'un millón ' : chunkToWords(m) + 'millones ');
    n = n % 1000000;
  }
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    if (th === 1) result += 'mil ';
    else result += chunkToWords(th) + 'mil ';
    n = n % 1000;
  }
  if (n > 0) result += chunkToWords(n);
  return result.trim();
}

export const descargarFacturaController = async (req, res) => {
  try {
    const { id: facturaId } = req.params;
    const [facturaRows] = await pool.query(
      `SELECT fv.*, v.alumno_id, v.tutor_id, v.metodo_pago, v.fecha AS fecha_venta
       FROM facturas_ventas fv
       JOIN ventas v ON fv.venta_id = v.id
       WHERE fv.id = ?`,
      [facturaId]
    );
    if (facturaRows.length === 0) return res.status(404).json({ error: 'Factura no encontrada' });
    const factura = facturaRows[0];

    const [detalleRows] = await pool.query('SELECT * FROM detalle_factura_venta WHERE factura_id = ?', [facturaId]);
    const [alumnoRows] = await pool.query('SELECT id, nombre FROM alumnos WHERE id = ?', [factura.alumno_id]);
    const [tutorRows] = await pool.query('SELECT id, nombre FROM tutores WHERE id = ?', [factura.tutor_id]);
    const alumno = alumnoRows[0]?.nombre || 'No registrado';
    const tutor = tutorRows[0]?.nombre || 'No registrado';

    const nombreArchivo = `factura_${factura.numero_factura || facturaId}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${nombreArchivo}`);

    const doc = new PDFDocument({ size: [230, 700 + detalleRows.length * 20], margin: 18 });
    doc.pipe(res);

    doc.font('Helvetica-Bold').fontSize(11).text('COLEGIO PRIVADO SAN MIGUEL ARCÁNGEL', { align: 'center' });
    doc.font('Helvetica').fontSize(9).text('Av. Las Palmas 457 - Barrio Norte', { align: 'center' });
    doc.text('Tel: (0984) 356-821 | RUC: 80195843-2', { align: 'center' });
    doc.text('San Ignacio - Misiones', { align: 'center' });
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(10).text(`FACTURA Nº ${factura.numero_factura}`, { align: 'center' });
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    const fechaStr = factura.fecha_venta ? new Date(factura.fecha_venta).toLocaleDateString() : '-';
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(9);
    doc.text(`Fecha: ${fechaStr}`);
    doc.text(`Alumno: ${alumno}`);
    doc.text(`Tutor: ${tutor}`);
    doc.text(`Método de pago: ${factura.metodo_pago}`);
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').text('Detalle de la factura:', { align: 'left' });
    doc.moveDown(0.2);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    let total = 0;
    detalleRows.forEach((item) => {
      const precio = Number(item.precio_unitario || 0);
      const subtotal = Number(item.subtotal || 0);
      total += subtotal;
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(8).text(`${item.producto_servicio || 'Item'}`, { width: 200 });
      doc.text(`Cant: ${item.cantidad} | Precio: ${formatMoney(precio)} | Subtotal: ${formatMoney(subtotal)}`);
      doc.moveDown(0.2);
      doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();
    });

    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(9).text(`Total: ${formatMoney(total)} Gs`, { align: 'right' });
    doc.font('Helvetica').fontSize(8).text(`(${numberToWords(Math.round(total))} guaraníes)`, { align: 'right' });
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(9);
    doc.text(`Efectivo: ${formatMoney(total)} Gs`);
    doc.text(`Total recibido: ${formatMoney(total)} Gs`);
    doc.text(`Total factura: ${formatMoney(total)} Gs`);
    doc.text('Vuelto: 0 Gs');
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(8).text(`Cajero: ${tutor}`);
    doc.moveDown(1);
    doc.text('__________________________', { align: 'center' });
    doc.text('Firma / Responsable', { align: 'center' });
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(9).text('*** Gracias por su compra ***', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generando PDF:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de factura' });
  }
};
