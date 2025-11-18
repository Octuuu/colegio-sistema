import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { 
  obtenerMensualesPendientes, 
  pagarMensualidad, 
  pagarMultiples,
  descargarFacturaMensualidad
} from "../../../services/mensualidadService";
import { buscarAlumnosPorCedulaService } from "../../../services/alumnoService";

const MensualidadForm = () => {
  const { token, user } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [pendientes, setPendientes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(new Set());
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split("T")[0]);
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("efectivo");
  const [loadingPendientes, setLoadingPendientes] = useState(false);
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);
  const [loadingPago, setLoadingPago] = useState(false);
  const [error, setError] = useState("");

  // Métodos de pago válidos
  const metodosPago = [
    { value: "efectivo", label: "Efectivo" },
    { value: "tarjeta", label: "Tarjeta" },
    { value: "transferencia", label: "Transferencia" },
    { value: "cheque", label: "Cheque" }
  ];

  // Buscar alumnos
  useEffect(() => {
    if (!query || query.length < 2) {
      setResultados([]);
      return;
    }
    
    const delayDebounce = setTimeout(async () => {
      setLoadingBusqueda(true);
      setError("");
      try {
        const data = await buscarAlumnosPorCedulaService(query, token);
        setResultados(data || []);
      } catch (err) {
        console.error("Error buscando alumnos:", err);
        setResultados([]);
        setError("Error al buscar alumnos");
      } finally {
        setLoadingBusqueda(false);
      }
    }, 400);
    
    return () => clearTimeout(delayDebounce);
  }, [query, token]);

  // Cargar mensualidades pendientes
  useEffect(() => {
    if (!selectedAlumno) {
      setPendientes([]);
      return;
    }
    
    const fetchPendientes = async () => {
      setLoadingPendientes(true);
      setError("");
      try {
        const data = await obtenerMensualesPendientes(selectedAlumno.id, token);
        setPendientes(data || []);
        setSelectedMonths(new Set());
      } catch (err) {
        console.error("Error cargando pendientes:", err);
        setPendientes([]);
        setError("Error al cargar mensualidades pendientes");
      } finally {
        setLoadingPendientes(false);
      }
    };
    
    fetchPendientes();
  }, [selectedAlumno, token]);

  const toggleMonth = (month) => {
    setSelectedMonths((prev) => {
      const next = new Set(prev);
      next.has(month) ? next.delete(month) : next.add(month);
      return next;
    });
  };

  const selectAllMonths = () => {
    if (pendientes.length === 0) return;
    
    const allMonths = new Set(pendientes.map(m => m.month));
    setSelectedMonths(allMonths);
  };

  const clearSelection = () => {
    setSelectedMonths(new Set());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingPago(true);

    // Validaciones mejoradas
    if (!selectedAlumno) {
      setError("Debe seleccionar un alumno");
      setLoadingPago(false);
      return;
    }

    if (selectedMonths.size === 0) {
      setError("Seleccione al menos una mensualidad a pagar");
      setLoadingPago(false);
      return;
    }

    if (!monto || !metodoPago) {
      setError("Complete el monto y método de pago");
      setLoadingPago(false);
      return;
    }

    const montoNumber = Number(monto);
    if (isNaN(montoNumber) || montoNumber <= 0) {
      setError("El monto debe ser un número positivo");
      setLoadingPago(false);
      return;
    }

    try {
      const monthsArray = Array.from(selectedMonths);
      let pagoResult;

      if (monthsArray.length === 1) {
        const [anio, mes] = monthsArray[0].split("-").map(Number);
        pagoResult = await pagarMensualidad({ 
          alumnoId: selectedAlumno.id, 
          mes, 
          anio, 
          monto: montoNumber, 
          metodoPago, 
          recibidoPor: user?.id || 2,
          fechaPago
        }, token);
        
        if (pagoResult?.id) {
          await descargarFacturaMensualidad([pagoResult.id], token);
        }
      } else {
        pagoResult = await pagarMultiples({ 
          alumnoId: selectedAlumno.id, 
          months: monthsArray, 
          monto: montoNumber, 
          metodoPago, 
          recibidoPor: user?.id || 2,
          fechaPago
        }, token);
        
        if (Array.isArray(pagoResult) && pagoResult.length > 0) {
          const ids = pagoResult.map(p => p.id);
          await descargarFacturaMensualidad(ids, token);
        }
      }

      // Éxito - resetear formulario
      alert(`✅ ${monthsArray.length} mensualidad(es) pagada(s) correctamente`);

      // Recargar pendientes
      const data = await obtenerMensualesPendientes(selectedAlumno.id, token);
      setPendientes(data || []);
      
      // Resetear estado
      setSelectedMonths(new Set());
      setMonto("");
      setMetodoPago("efectivo");
      setQuery("");
      setSelectedAlumno(null);

    } catch (err) {
      console.error("Error registrando pago:", err);
      
      // Manejo específico de errores
      if (err.response?.data?.message?.includes("No hay caja abierta")) {
        setError("❌ No se puede registrar el pago porque no hay caja abierta. Abra una caja primero.");
      } else {
        setError(err.response?.data?.message || "Error al registrar el pago");
      }
    } finally {
      setLoadingPago(false);
    }
  };

  const handleSelectAlumno = (alumno) => {
    setSelectedAlumno(alumno);
    setQuery(`${alumno.nombre} ${alumno.apellido} - ${alumno.cedula}`);
    setResultados([]);
    setError("");
  };

  const calcularTotal = () => {
    return selectedMonths.size * Number(monto || 0);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Pagar Mensualidades
      </h2>

      {/* Mensaje de error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Búsqueda de alumno */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Buscar Alumno
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Ingrese cédula, nombre o apellido del alumno..."
            value={query}
            onChange={(e) => { 
              setQuery(e.target.value); 
              setSelectedAlumno(null);
              setError("");
            }}
            className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          
          {loadingBusqueda && (
            <div className="absolute right-3 top-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {!selectedAlumno && resultados.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-full max-h-48 overflow-y-auto shadow-lg mt-1">
              {resultados.map((alumno) => (
                <li
                  key={alumno.id}
                  onClick={() => handleSelectAlumno(alumno)}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-500 last:border-b-0"
                >
                  <div className="font-medium">{alumno.nombre} {alumno.apellido}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Cédula: {alumno.cedula}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Alumno seleccionado */}
      {selectedAlumno && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded p-4 mb-6">
          <p className="text-green-800 dark:text-green-200 font-medium">
            Alumno seleccionado: {selectedAlumno.nombre} {selectedAlumno.apellido}
          </p>
        </div>
      )}

      {/* Mensualidades pendientes */}
      {selectedAlumno && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mensualidades Pendientes
            </label>
            {pendientes.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllMonths}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Seleccionar todas
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                >
                  Limpiar
                </button>
              </div>
            )}
          </div>

          {loadingPendientes ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : pendientes.length === 0 ? (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 border rounded">
              No hay mensualidades pendientes
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border rounded">
              {pendientes.map((mensualidad) => (
                <label 
                  key={mensualidad.month}
                  className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors ${
                    selectedMonths.has(mensualidad.month) 
                      ? "bg-blue-50 border-blue-300 dark:bg-blue-900 dark:border-blue-700" 
                      : "bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedMonths.has(mensualidad.month)} 
                    onChange={() => toggleMonth(mensualidad.month)} 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {mensualidad.label || mensualidad.month}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Formulario de pago */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Fecha de Pago
            </label>
            <input 
              type="date" 
              value={fechaPago} 
              onChange={(e) => setFechaPago(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monto por Mes
            </label>
            <input 
              type="number" 
              value={monto} 
              onChange={(e) => setMonto(e.target.value)} 
              placeholder="Ingrese el monto"
              min="1"
              step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Método de Pago
            </label>
            <select 
              value={metodoPago} 
              onChange={(e) => setMetodoPago(e.target.value)} 
              className="w-full border border-gray-300 dark:border-gray-600 h-10 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            >
              {metodosPago.map(metodo => (
                <option key={metodo.value} value={metodo.value}>
                  {metodo.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Resumen del pago */}
        {selectedMonths.size > 0 && monto && (
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded p-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                Resumen del Pago:
              </span>
              <span className="text-blue-800 dark:text-blue-200 font-bold text-lg">
                {selectedMonths.size} mes(es) × ₲ {Number(monto).toLocaleString()} = ₲ {calcularTotal().toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Botón de envío */}
        <button 
          type="submit" 
          disabled={loadingPago || selectedMonths.size === 0 || !monto || !metodoPago}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loadingPago ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Procesando...
            </>
          ) : (
            `Pagar ${selectedMonths.size} Mensualidad(es)`
          )}
        </button>
      </form>
    </div>
  );
};

export default MensualidadForm;