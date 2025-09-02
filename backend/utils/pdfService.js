import PDFDocument from "pdfkit";
import { getHistorialAsistencias } from "../models/asistencia.model.js";

const formateaFechaLindo = (isoDate) => {
  try {
    const d = new Date(isoDate);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${dd}/${mm}/${yy}`;
  } catch {
    return isoDate;
  }
};

export const generarPDFHistorialHandler = async (req, res) => {
  try {
    const profesor = `${req.user.nombre} ${req.user.apellido}`;
    const { materiaId } = req.params;

    const historial = await getHistorialAsistencias(req.user.profesor_id, materiaId);
    if (!historial.length) return res.status(404).json({ message: "No hay asistencias" });

    // Agrupar alumnos y fechas
    const alumnosMap = [];
    const fechasSet = new Set();

    historial.forEach((r) => {
      if (!r.fecha) return; // ignorar registros sin fecha
      const fechaStr = new Date(r.fecha).toISOString().split("T")[0];
      fechasSet.add(fechaStr);

      let alumno = alumnosMap.find(a => a.alumno_id === r.alumno_id);
      if (!alumno) {
        alumno = { alumno_id: r.alumno_id, nombre: r.nombre, apellido: r.apellido, asistencias: {} };
        alumnosMap.push(alumno);
      }
      alumno.asistencias[fechaStr] = Number(r.presente) === 1 ? "Presente" : "Ausente";
    });

    const fechas = Array.from(fechasSet).sort();

    // Configurar respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Historial_Materia_${materiaId}.pdf`);

    const doc = new PDFDocument({ margin: 40, size: "A4" });
    doc.pipe(res);

    // Título
    doc.fontSize(20).text("Historial de Asistencias", { align: "center" });
    doc.moveDown();

    // Profesor y materia
    doc.fontSize(12).text(`Profesor: ${profesor}`);
    doc.text(`Materia: ${historial[0].materia || "Materia"}`);
    doc.moveDown(1.5);

    // Tabla
    const startX = doc.x;
    let y = doc.y;
    const rowHeight = 20;
    const colWidths = [150, ...fechas.map(() => 60)];

    // Encabezado
    doc.font("Helvetica-Bold");
    doc.rect(startX, y, colWidths.reduce((a,b)=>a+b,0), rowHeight).fill("#d9d9d9").stroke();
    doc.fillColor("black").text("Alumno", startX + 5, y + 5, { width: colWidths[0], align: "left" });
    fechas.forEach((f, i) => {
      const x = startX + colWidths[0] + colWidths.slice(1, i+1).reduce((a,b)=>a+b,0);
      doc.text(formateaFechaLindo(f), x + 5, y + 5, { width: colWidths[i+1], align: "center" });
    });

    // Filas de alumnos
    y += rowHeight;
    doc.font("Helvetica");

    alumnosMap
      .sort((a,b) => a.apellido.localeCompare(b.apellido))
      .forEach((alumno, idx) => {
        // Fondo alternado
        if (idx % 2 === 0) {
          doc.rect(startX, y, colWidths.reduce((a,b)=>a+b,0), rowHeight).fill("#f2f2f2").stroke();
          doc.fillColor("black");
        }

        doc.text(`${alumno.apellido}, ${alumno.nombre}`, startX + 5, y + 5, { width: colWidths[0], align: "left" });

        fechas.forEach((fecha, i) => {
          const x = startX + colWidths[0] + colWidths.slice(1, i+1).reduce((a,b)=>a+b,0);
          const val = alumno.asistencias[fecha] || "-";
          doc.text(val, x + 5, y + 5, { width: colWidths[i+1], align: "center" });
        });

        y += rowHeight;
      });

    doc.end();

  } catch (error) {
    console.error("Error generando PDF:", error);
    res.status(500).json({ error: error.message });
  }
};
