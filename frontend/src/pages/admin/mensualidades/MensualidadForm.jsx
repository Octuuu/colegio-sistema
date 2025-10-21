import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerMensualesPendientes, pagarMensualidad, pagarMultiples } from "../../../services/mensualidadService";
import axios from "axios";

const MensualidadForm = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [pendientes, setPendientes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState(new Set());
  const [fechaPago, setFechaPago] = useState(new Date().toISOString().split("T")[0]);
  const [monto, setMonto] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [recibidoPor, setRecibidoPor] = useState("");
  const [loadingPendientes, setLoadingPendientes] = useState(false);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/alumnos", { headers: { Authorization: `Bearer ${token}` } });
        setAlumnos(res.data || []);
      } catch (err) {
        console.error(err);
        alert("No se pudieron cargar alumnos");
      }
    };
    fetchAlumnos();
  }, [token]);

  useEffect(() => {
    if (!selectedAlumno) return setPendientes([]);

    const fetchPendientes = async () => {
      setLoadingPendientes(true);
      try {
        const data = await obtenerMensualesPendientes(selectedAlumno, token);
        setPendientes(data || []);
        setSelectedMonths(new Set());
      } catch (err) {
        console.error(err);
        alert("Error al obtener mensualidades pendientes");
      } finally {
        setLoadingPendientes(false);
      }
    };
    fetchPendientes();
  }, [selectedAlumno, token]);

  const toggleMonth = (month) => {
    setSelectedMonths(prev => {
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
        await pagarMensualidad({ alumnoId: Number(selectedAlumno), month: monthsArray[0], fechaPago, monto: Number(monto), metodoPago, recibidoPor }, token);
      } else {
        await pagarMultiples({ alumnoId: Number(selectedAlumno), months: monthsArray, fechaPago, monto: Number(monto), metodoPago, recibidoPor }, token);
      }

      alert("Pago/s registrado/s correctamente ✅");
      const data = await obtenerMensualesPendientes(selectedAlumno, token);
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
    <div>
      <h2 className="text-xl font-semibold mb-3">Pagar Mensualidad</h2>
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-2xl">
        <select value={selectedAlumno} onChange={e => setSelectedAlumno(e.target.value)} className="border p-2">
          <option value="">-- Seleccione un alumno --</option>
          {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
        </select>

        <div>
          <label className="font-semibold block mb-1">Mensualidades pendientes</label>
          {loadingPendientes ? <div>Cargando...</div> :
            pendientes.length === 0 ? <div className="text-sm text-gray-600">No hay mensualidades pendientes.</div> :
            <div className="grid grid-cols-2 gap-2">
              {pendientes.map(m => (
                <label key={m.month} className="inline-flex items-center gap-2 border rounded p-2">
                  <input type="checkbox" checked={selectedMonths.has(m.month)} onChange={() => toggleMonth(m.month)} />
                  <span>{m.label || m.month}</span>
                </label>
              ))}
            </div>
          }
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input type="date" value={fechaPago} onChange={e => setFechaPago(e.target.value)} className="border p-2 w-full" />
          <input type="number" value={monto} onChange={e => setMonto(e.target.value)} className="border p-2 w-full" placeholder="Monto" />
        </div>

        <input placeholder="Método de pago" value={metodoPago} onChange={e => setMetodoPago(e.target.value)} className="border p-2" />
        <input placeholder="Recibido por" value={recibidoPor} onChange={e => setRecibidoPor(e.target.value)} className="border p-2" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Pagar {selectedMonths.size > 1 ? `(${selectedMonths.size}) mensualidades` : "mensualidad"}
        </button>
      </form>
    </div>
  );
};

export default MensualidadForm;
