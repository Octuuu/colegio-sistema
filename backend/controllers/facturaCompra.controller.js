import PDFDocument from "pdfkit";
import pool from "../config/db.js";

function formatMoney(num) {
  return Number(num).toLocaleString("de-DE");
}

function numberToWords(n) {
  const unidades = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const especiales = ["diez","once","doce","trece","catorce","quince","dieciseis","diecisiete","dieciocho","diecinueve"];
  const decenas = ["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"];
  const centenas = ["","ciento","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];
  
  if (n === 0) return "cero";
  if (n === 100) return "cien";

  function chunkToWords(num) {
    let words = "";
    if (num >= 100) {
      const c = Math.floor(num / 100);
      words += (centenas[c] ? centenas[c] + " " : "");
      num = num % 100;
    }
    if (num >= 10 && num <= 19) {
      words += especiales[num - 10] + " ";
    } else if (num >= 20 && num <= 29) {
      if (num === 20) words += "veinte ";
      else words += "veinti" + unidades[num - 20] + " ";
    } else {
      if (num >= 30) {
        const d = Math.floor(num / 10);
        words += decenas[d] + (num % 10 === 0 ? " " : " y ");
        if (num % 10 !== 0) words += unidades[num % 10] + " ";
      } else if (num > 0 && num < 10) {
        words += unidades[num] + " ";
      }
    }
    return words;
  }

  let result = "";
  if (n >= 1000000) {
    const m = Math.floor(n / 1000000);
    result += (m === 1 ? "un millón " : chunkToWords(m) + "millones ");
    n = n % 1000000;
  }
  if (n >= 1000) {
    const th = Math.floor(n / 1000);
    if (th === 1) result += "mil ";
    else result += chunkToWords(th) + "mil ";
    n = n % 1000;
  }
  if (n > 0) result += chunkToWords(n);
  return result.trim();
}

export const generarFacturaCompraPDF = async (req, res) => {
  try {
    const { id: facturaId } = req.params;

    const [facturaRows] = await pool.query(
      `SELECT fc.*, c.proveedor_id, c.fecha AS fecha_compra,
              p.nombre AS proveedor_nombre, p.direccion, p.correo, p.telefono
       FROM facturas_compras fc
       JOIN compras c ON fc.compra_id = c.id
       JOIN proveedores p ON c.proveedor_id = p.id
       WHERE fc.id = ?`,
      [facturaId]
    );

    if (facturaRows.length === 0)
      return res.status(404).json({ error: "Factura de compra no encontrada" });

    const factura = facturaRows[0];

    const [detalleRows] = await pool.query(
      `SELECT dfc.*, pr.nombre AS producto_nombre
       FROM detalle_factura_compra dfc
       JOIN productos pr ON dfc.producto_id = pr.id
       WHERE dfc.factura_id = ?`,
      [facturaId]
    );

    const nombreArchivo = `factura_compra_${factura.numero_factura || facturaId}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${nombreArchivo}`);

    const doc = new PDFDocument({ size: [230, 700 + detalleRows.length * 20], margin: 18 });
    doc.pipe(res);

    // ENCABEZADO
    doc.font("Helvetica-Bold").fontSize(11).text("COLEGIO PRIVADO SAN MIGUEL ARCÁNGEL", { align: "center" });
    doc.font("Helvetica").fontSize(9).text("Av. Las Palmas 457 - Barrio Norte", { align: "center" });
    doc.text("Tel: (0984) 356-821 | RUC: 80195843-2", { align: "center" });
    doc.text("San Ignacio - Misiones", { align: "center" });
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    // TÍTULO
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold").fontSize(10).text(`FACTURA DE COMPRA Nº ${factura.numero_factura}`, { align: "center" });
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    // DATOS
    const fechaStr = factura.fecha_compra ? new Date(factura.fecha_compra).toLocaleDateString() : "-";
    doc.moveDown(0.3);
    doc.font("Helvetica").fontSize(9);
    doc.text(`Fecha: ${fechaStr}`);
    doc.text(`Proveedor: ${factura.proveedor_nombre}`);
    doc.text(`Teléfono: ${factura.telefono || "N/A"}`);
    doc.text(`Correo: ${factura.correo || "N/A"}`);
    doc.text(`Dirección: ${factura.direccion || "N/A"}`);
    doc.moveDown(0.3);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    // DETALLE
    doc.moveDown(0.3);
    doc.font("Helvetica-Bold").text("Detalle de la factura:", { align: "left" });
    doc.moveDown(0.2);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    let total = 0;
    detalleRows.forEach((item) => {
      const precio = Number(item.precio_unitario || 0);
      const subtotal = Number(item.subtotal || 0);
      total += subtotal;
      doc.moveDown(0.3);
      doc.font("Helvetica").fontSize(8).text(`${item.producto_nombre || "Producto"}`, { width: 200 });
      doc.text(`Cant: ${item.cantidad} | Precio: ${formatMoney(precio)} | Subtotal: ${formatMoney(subtotal)}`);
      doc.moveDown(0.2);
      doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();
    });

    // TOTAL
    doc.moveDown(0.5);
    doc.font("Helvetica-Bold").fontSize(9).text(`Total: ${formatMoney(total)} Gs`, { align: "right" });
    doc.font("Helvetica").fontSize(8).text(`(${numberToWords(Math.round(total))} guaraníes)`, { align: "right" });
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    // PIE
    doc.moveDown(0.4);
    doc.font("Helvetica").fontSize(9);
    doc.text(`Total pagado: ${formatMoney(total)} Gs`);
    doc.text(`Total factura: ${formatMoney(total)} Gs`);
    doc.text("Vuelto: 0 Gs");
    doc.moveDown(0.4);
    doc.moveTo(10, doc.y).lineTo(220, doc.y).stroke();

    // FIRMA
    doc.moveDown(0.5);
    doc.font("Helvetica").fontSize(8).text(`Proveedor: ${factura.proveedor_nombre}`);
    doc.moveDown(1);
    doc.text("__________________________", { align: "center" });
    doc.text("Firma / Responsable", { align: "center" });
    doc.moveDown(0.5);
    doc.font("Helvetica-Bold").fontSize(9).text("*** Gracias por su compra ***", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generando PDF:", error);
    if (!res.headersSent)
      res.status(500).json({ error: "Error generando PDF de factura de compra" });
  }
};
