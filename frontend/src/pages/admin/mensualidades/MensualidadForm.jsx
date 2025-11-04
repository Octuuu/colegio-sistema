import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerMensualesPendientes, pagarMensualidad, pagarMultiples } from "../../../services/mensualidadService";
import { buscarAlumnosPorCedulaService } from "../../../services/alumnoService";

const MensualidadForm = () => {
  const { token } = useContext(AuthContext);

  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [pendientes, setPendientes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(new Set());
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split("T")[0]);
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [recibidoPor, setRecibidoPor] = useState("");
  const [loadingPendientes, setLoadingPendientes] = useState(false);
  const [loadingBusqueda, setLoadingBusqueda] = useState(false);

  useEffect(() => {
    if (!query) {
      setResultados([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoadingBusqueda(true);
      try {
        const data = await buscarAlumnosPorCedulaService(query, token);
        setResultados(data || []);
      } catch (err) {
        console.error(err);
        setResultados([]);
      } finally {
        setLoadingBusqueda(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, token]);

  useEffect(() => {
    if (!selectedAlumno) {
      setPendientes([]);
      return;
    }

    const fetchPendientes = async () => {
      setLoadingPendientes(true);
      try {
        const data = await obtenerMensualesPendientes(selectedAlumno.id, token);
        setPendientes(data || []);
        setSelectedMonths(new Set());
      } catch (err) {
        console.error(err);
        setPendientes([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAlumno || selectedMonths.size === 0 || !monto || !metodoPago || !recibidoPor) return alert("Completa todos los campos");

    const monthsArray = Array.from(selectedMonths);

    try {
      if (monthsArray.length === 1) {
        const [anio, mes] = monthsArray[0].split("-").map(Number);
        await pagarMensualidad({ alumnoId: selectedAlumno.id, mes, anio, monto: Number(monto), metodoPago, recibidoPor }, token);
      } else {
        await pagarMultiples({ alumnoId: selectedAlumno.id, months: monthsArray, monto: Number(monto), metodoPago, recibidoPor }, token);
      }

      alert("Pago/s registrado/s correctamente ✅");
      const data = await obtenerMensualesPendientes(selectedAlumno.id, token);
      setPendientes(data || []);
      setSelectedMonths(new Set());
      setMonto("");
      setMetodoPago("");
      setRecibidoPor("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error registrando pago");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Pagar Mensualidad</h2>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar alumno por cédula"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setSelectedAlumno(null); }}
          className="border p-2 w-full rounded"
        />
        {loadingBusqueda && <div className="absolute top-full left-0 bg-white w-full p-2 shadow z-20">Buscando...</div>}
        {!selectedAlumno && resultados.length > 0 && (
          <ul className="absolute top-full left-0 bg-white w-full shadow rounded max-h-60 overflow-auto z-20">
            {resultados.map((a) => (
              <li
                key={a.id}
                onClick={() => { setSelectedAlumno(a); setQuery(`${a.nombre} ${a.apellido} - ${a.cedula}`); setResultados([]); }}
                className="p-2 hover:bg-blue-50 cursor-pointer"
              >
                {a.nombre} {a.apellido} - Cédula: {a.cedula}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedAlumno && (
        <div className="mb-4">
          <label className="font-semibold block mb-2">
            Mensualidades pendientes de {selectedAlumno.nombre} {selectedAlumno.apellido}:
          </label>
          {loadingPendientes ? (
            <div>Cargando...</div>
          ) : pendientes.length === 0 ? (
            <div className="text-sm text-gray-600">No hay mensualidades pendientes.</div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {pendientes.map((m) => (
                <label key={m.month} className="inline-flex items-center gap-2 border rounded p-2 cursor-pointer">
                  <input type="checkbox" checked={selectedMonths.has(m.month)} onChange={() => toggleMonth(m.month)} />
                  <span>{m.label || m.month}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-3 max-w-2xl">
        <div className="grid grid-cols-2 gap-2">
          <input type="date" value={fechaPago} onChange={(e) => setFechaPago(e.target.value)} className="border p-2 w-full rounded" />
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} className="border p-2 w-full rounded" placeholder="Monto" />
        </div>
        <input placeholder="Método de pago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Recibido por" value={recibidoPor} onChange={(e) => setRecibidoPor(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Pagar {selectedMonths.size > 1 ? `(${selectedMonths.size}) mensualidades` : "mensualidad"}
        </button>
      </form>
    </div>
  );
};

export default MensualidadForm;
