import {
  crearPagoMensualidad,
  obtenerMensualidadesPorAlumno,
  pagarMensualidades,
  obtenerTodosLosPagos,
  borrarPago
} from "../models/pagosMensualidad.model.js";

// Registrar pago individual
export const nuevoPagoMensualidad = async (req, res) => {
  try {
    const { alumnoId, mes, anio, monto, metodoPago, recibidoPor } = req.body;
    const id = await crearPagoMensualidad({ alumnoId, mes, anio, monto, metodoPago, recibidoPor });
    res.json({ message: "Pago registrado", id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Listar mensualidades de un alumno
export const listarMensualidades = async (req, res) => {
  try {
    const { alumnoId } = req.params;
    const mensualidades = await obtenerMensualidadesPorAlumno(alumnoId);
    res.json(mensualidades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Listar mensualidades pendientes (desde marzo hasta octubre)
export const listarMensualidadesPendientes = async (req, res) => {
  const { alumnoId } = req.params;

  try {
    const pagos = await obtenerMensualidadesPorAlumno(alumnoId);
    const mesesPagados = pagos.map(p => `${p.anio}-${p.mes.toString().padStart(2,'0')}`);

    const inicio = new Date("2025-03-01");
    const fin = new Date("2025-10-01");
    const pendientes = [];
    let actual = new Date(inicio);

    while (actual <= fin) {
      const mesStr = `${actual.getFullYear()}-${(actual.getMonth()+1).toString().padStart(2,'0')}`;
      if (!mesesPagados.includes(mesStr)) {
        pendientes.push({ month: mesStr, label: actual.toLocaleString('es-ES', { month: 'short', year: 'numeric' }) });
      }
      actual.setMonth(actual.getMonth() + 1);
    }

    res.json(pendientes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener mensualidades pendientes", error: error.message });
  }
};

// Pagar varias mensualidades
export const pagarVariasMensualidades = async (req, res) => {
  try {
    const { alumnoId, months, monto, metodoPago, recibidoPor } = req.body;

    // Mapear meses en objeto { mes, anio, monto }
    const mensualidades = months.map(m => {
      const [anio, mes] = m.split("-");
      return { mes: Number(mes), anio: Number(anio), monto };
    });

    await pagarMensualidades(alumnoId, mensualidades, metodoPago, recibidoPor);
    res.json({ message: "Mensualidades pagadas correctamente" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los pagos (admin)
export const listarTodosPagos = async (req, res) => {
  try {
    const pagos = await obtenerTodosLosPagos();
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un pago
export const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    await borrarPago(id);
    res.json({ message: "Pago eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
