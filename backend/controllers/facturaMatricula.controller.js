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

export const generarFacturaMatriculaPDF = async (req, res) => {
  try {
    const { id } = req.params;
    const [pagoRows] = await pool.query(
      `SELECT pm.*, a.nombre AS alumno_nombre, a.apellido AS alumno_apellido, a.cedula AS alumno_cedula,
              a.telefono AS alumno_telefono, a.direccion AS alumno_direccion, a.email AS alumno_email
       FROM pagos_matricula pm
       JOIN alumnos a ON pm.alumno_id = a.id
       WHERE pm.id = ?`,
      [id]
    );

    if (pagoRows.length === 0) return res.status(404).json({ error: 'Pago de matrícula no encontrado' });

    const pago = pagoRows[0];
    const nombreArchivo = `factura_matricula_${pago.id}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${nombreArchivo}`);

    const doc = new PDFDocument({ size: [230, 600], margin: 18 });
    doc.pipe(res);

    doc.font('Helvetica-Bold').fontSize(11).text('COLEGIO PRIVADO SAN MIGUEL ARCÁNGEL', { align: 'center' });
    doc.font('Helvetica').fontSize(9).text('Av. Las Palmas 457 - Barrio Norte', { align: 'center' });
    doc.text('Tel: (0984) 356-821 | RUC: 80195843-2', { align: 'center' });
    doc.text('San Ignacio - Misiones', { align: 'center' });
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').fontSize(10).text(`FACTURA DE MATRÍCULA Nº ${pago.id}`, { align: 'center' });
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    const fechaStr = pago.fecha_pago ? new Date(pago.fecha_pago).toLocaleDateString() : '-';
    doc.moveDown(0.3);
    doc.font('Helvetica').fontSize(9);
    doc.text(`Fecha: ${fechaStr}`);
    doc.text(`Alumno: ${pago.alumno_nombre} ${pago.alumno_apellido}`);
    doc.text(`Cédula: ${pago.alumno_cedula}`);
    doc.text(`Teléfono: ${pago.alumno_telefono || '-'}`);
    doc.text(`Dirección: ${pago.alumno_direccion || '-'}`);
    doc.text(`Email: ${pago.alumno_email || '-'}`);
    doc.text(`Método de pago: ${pago.metodo_pago}`);
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    const total = Number(pago.monto || 0);
    doc.moveDown(0.3);
    doc.font('Helvetica-Bold').text('Detalle del pago:', { align: 'left' });
    doc.moveDown(0.2);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();
    doc.font('Helvetica').fontSize(8).text(`Monto pagado: ${formatMoney(total)} Gs`);
    doc.text(`(${numberToWords(Math.round(total))} guaraníes)`);
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.4);
    doc.font('Helvetica').fontSize(9).text(`Estado: ${pago.estado || 'Completado'}`);
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    doc.moveDown(0.5);
    doc.font('Helvetica').fontSize(8).text(`Registrado por (ID usuario): ${pago.recibido_por}`);
    doc.moveDown(1);
    doc.text('__________________________', { align: 'center' });
    doc.text('Firma / Responsable', { align: 'center' });
    doc.moveDown(0.5);
    doc.font('Helvetica-Bold').fontSize(9).text('*** Gracias por su pago ***', { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('Error generando PDF de matrícula:', error);
    if (!res.headersSent) res.status(500).json({ error: 'Error generando PDF de matrícula' });
  }
};
