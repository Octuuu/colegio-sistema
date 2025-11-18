import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {
  crearMatricula,
  buscarAlumnosPorCedula,
  descargarFacturaMatriculaPDF,
  verificarMatriculaPagada
} from "../../../services/matriculaService";

const MatriculaForm = ({ closeModal, onPagoRegistrado }) => {
  const { token, user } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    alumnoId: "",
    alumnoNombre: "",
    fechaPago: new Date().toISOString().split('T')[0],
    monto: "",
    metodoPago: "efectivo",
    recibidoPor: user?.id || "",
    concepto: "Pago de matrícula"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [alumnoCargando, setAlumnoCargando] = useState(false);

  // Métodos de pago válidos
  const metodosPago = [
    { value: "efectivo", label: "Efectivo" },
    { value: "tarjeta", label: "Tarjeta" },
    { value: "transferencia", label: "Transferencia" },
    { value: "cheque", label: "Cheque" }
  ];

  // Buscar alumnos en tiempo real
  useEffect(() => {
    const fetchAlumnos = async () => {
      if (busqueda.trim().length < 2) {
        setAlumnos([]);
        return;
      }
      try {
        setAlumnoCargando(true);
        const res = await buscarAlumnosPorCedula(busqueda, token);
        // Ajusta según la estructura de respuesta de tu API
        setAlumnos(res.data || res || []);
      } catch (err) {
        console.error("Error buscando alumnos:", err);
        setAlumnos([]);
      } finally {
        setAlumnoCargando(false);
      }
    };

    const delay = setTimeout(fetchAlumnos, 400);
    return () => clearTimeout(delay);
  }, [busqueda, token]);

  // Seleccionar alumno y verificar si ya tiene matrícula
  const handleSelectAlumno = async (alumno) => {
    try {
      setLoading(true);
      
      // Verificar si ya tiene matrícula pagada
      const verificacion = await verificarMatriculaPagada(alumno.id, token);
      
      if (verificacion.tieneMatriculaPagada) {
        setError(`⚠️ El alumno ${alumno.nombre} ${alumno.apellido} ya tiene una matrícula pagada y activa.`);
        setAlumnos([]);
        setBusqueda("");
        return;
      }

      setFormData(prev => ({
        ...prev,
        alumnoId: alumno.id,
        alumnoNombre: `${alumno.nombre} ${alumno.apellido}`
      }));
      setBusqueda(`${alumno.nombre} ${alumno.apellido} - ${alumno.cedula}`);
      setAlumnos([]);
      setError("");
    } catch (err) {
      console.error("Error verificando matrícula:", err);
      setError("Error al verificar estado de matrícula");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "alumnoId") {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  // Validaciones
  if (!formData.alumnoId) {
    setError("Debe seleccionar un alumno");
    setLoading(false);
    return;
  }

  if (!formData.fechaPago || !formData.monto || !formData.metodoPago) {
    setError("Todos los campos son obligatorios");
    setLoading(false);
    return;
  }

  const montoNumber = Number(formData.monto);
  if (isNaN(montoNumber) || montoNumber <= 0) {
    setError("Monto debe ser un número positivo");
    setLoading(false);
    return;
  }

  try {
    const payload = {
      alumnoId: Number(formData.alumnoId),
      fechaPago: formData.fechaPago,
      monto: montoNumber,
      metodoPago: formData.metodoPago,
      recibidoPor: Number(formData.recibidoPor) || user?.id,
      concepto: formData.concepto
    };

    const resultado = await crearMatricula(payload, token);

    // Descargar factura automáticamente
    try {
      await descargarFacturaMatriculaPDF(resultado.id, token);
    } catch (pdfError) {
      console.warn("Error descargando PDF:", pdfError);
      // No bloquear el flujo si falla el PDF
    }

    alert("✅ Matrícula registrada correctamente");

    // Resetear formulario
    setFormData({
      alumnoId: "",
      alumnoNombre: "",
      fechaPago: new Date().toISOString().split('T')[0],
      monto: "",
      metodoPago: "efectivo",
      recibidoPor: user?.id || "",
      concepto: "Pago de matrícula"
    });
    setBusqueda("");
    
    if (onPagoRegistrado) onPagoRegistrado();
    closeModal();

  } catch (err) {
    console.error("Error registrando matrícula:", err);
    
    // Mostrar mensaje específico de caja cerrada
    if (err.response?.data?.message?.includes("No hay caja abierta")) {
      setError("No se puede registrar el pago porque no hay caja abierta. Por favor, abra una caja primero desde el módulo de Caja.");
    } else if (err.response?.data?.message?.includes("ya tiene una matrícula pagada")) {
      setError(`❌ ${err.response.data.message}`);
    } else if (err.response?.data?.message?.includes("Alumno no encontrado")) {
      setError(`${err.response.data.message}`);
    } else {
      const mensajeError = err.response?.data?.message || 
                          err.message || 
                          "Error al registrar matrícula";
      setError(mensajeError);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold"
        >
          ×
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Registrar Pago de Matrícula
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Búsqueda de alumno */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Buscar Alumno *
            </label>
            <input
              type="text"
              placeholder="Ingrese cédula o nombre del alumno..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              autoComplete="off"
              disabled={loading}
            />
            
            {alumnoCargando && (
              <div className="absolute right-3 top-9">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}

            {alumnos.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-full max-h-48 overflow-y-auto shadow-lg mt-1">
                {alumnos.map((alumno) => (
                  <li
                    key={alumno.id}
                    onClick={() => handleSelectAlumno(alumno)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-500 last:border-b-0"
                  >
                    <div className="font-medium">{alumno.nombre} {alumno.apellido}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cédula: {alumno.cedula}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Alumno seleccionado */}
          {formData.alumnoNombre && (
            <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded p-3">
              <p className="text-green-800 dark:text-green-200 font-medium">
                Alumno seleccionado: {formData.alumnoNombre}
              </p>
            </div>
          )}

          {/* Fecha de pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Pago *
            </label>
            <input
              type="date"
              name="fechaPago"
              value={formData.fechaPago}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Monto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monto *
            </label>
            <input
              type="number"
              name="monto"
              placeholder="Ingrese el monto"
              value={formData.monto}
              onChange={handleChange}
              required
              disabled={loading}
              min="1"
              step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Método de pago */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Método de Pago *
            </label>
            <select
              name="metodoPago"
              value={formData.metodoPago}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {metodosPago.map(metodo => (
                <option key={metodo.value} value={metodo.value}>
                  {metodo.label}
                </option>
              ))}
            </select>
          </div>

          {/* Concepto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Concepto
            </label>
            <input
              type="text"
              name="concepto"
              placeholder="Concepto del pago"
              value={formData.concepto}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 font-medium disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !formData.alumnoId}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registrando...
                </>
              ) : (
                "Registrar Pago"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatriculaForm;