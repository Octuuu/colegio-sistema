import { obtenerAuditorias, obtenerAuditoriaPorId } from "../models/auditoria.model.js";
import PDFDocument from "pdfkit";

export const listarAuditorias = async (req, res) => {
  try {
    const filters = {
      usuario: req.query.usuario || "",
      evento: req.query.evento || "",
    };
    const auditorias = await obtenerAuditorias(filters);
    res.json({ items: auditorias, total: auditorias.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener auditorías" });
  }
};

export const verAuditoria = async (req, res) => {
  try {
    const auditoria = await obtenerAuditoriaPorId(req.params.id);
    if (!auditoria) return res.status(404).json({ error: "Auditoría no encontrada" });
    res.json(auditoria);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener auditoría" });
  }
};

export const descargarAuditoriaPDF = async (req, res) => {
  try {
    const filters = {
      usuario: req.query.usuario || "",
      evento: req.query.evento || "",
    };
    const auditorias = await obtenerAuditorias(filters);

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const filename = "Auditoria.pdf";

    // Headers de respuesta
    res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-type", "application/pdf");

    // Título
    doc
      .fillColor("#333")
      .fontSize(22)
      .text("Reporte de Auditoría", { align: "center" })
      .moveDown(1);

    // Fecha de generación
    doc
      .fontSize(10)
      .fillColor("#555")
      .text(`Fecha de generación: ${new Date().toLocaleString()}`, { align: "right" })
      .moveDown(1);

    // Definir tabla
    const tableTop = 100;
    const itemHeight = 25;

    // Encabezados de tabla
    doc
      .fillColor("#fff")
      .rect(50, tableTop, 500, itemHeight)
      .fill("#4f46e5"); // color azul oscuro

    doc
      .fillColor("#fff")
      .fontSize(12)
      .text("Usuario", 55, tableTop + 7, { width: 120 })
      .text("Evento", 180, tableTop + 7, { width: 120 })
      .text("Descripción", 305, tableTop + 7, { width: 150 })
      .text("Fecha", 460, tableTop + 7, { width: 90 });

    // Filas
    let y = tableTop + itemHeight;

    auditorias.forEach((a, i) => {
      // Color de fila alternado
      const fillColor = i % 2 === 0 ? "#f3f4f6" : "#ffffff";
      doc.rect(50, y, 500, itemHeight).fill(fillColor);

      doc
        .fillColor("#000")
        .fontSize(10)
        .text(a.usuario_nombre || "N/A", 55, y + 7, { width: 120 })
        .text(a.accion, 180, y + 7, { width: 120 })
        .text(a.descripcion, 305, y + 7, { width: 150 })
        .text(new Date(a.fecha).toLocaleString(), 460, y + 7, { width: 90 });

      y += itemHeight;

      // Saltar página si se alcanza el final
      if (y > 750) {
        doc.addPage();
        y = 50;
      }
    });

    // Footer
    doc
      .fontSize(10)
      .fillColor("#555")
      .text(
        "Sistema de Gestión Escolar - Auditoría",
        50,
        780,
        { align: "center", width: 500 }
      );

    // Enviar PDF
    doc.pipe(res);
    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al generar PDF de auditoría" });
  }
};
