import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaForm = ({ closeModal, onPagoRegistrado }) => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [formData, setFormData] = useState({
    alumno_id: "",
    alumno_nombre: "",
    fecha_pago: "",
    monto: "",
    metodo_pago: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔍 Buscar alumnos al escribir en tiempo real
  useEffect(() => {
    const fetchAlumnos = async () => {
      if (busqueda.trim() === "") {
        setAlumnos([]);
        return;
      }
      try {
        setLoading(true);
        const url = `http://localhost:3000/api/alumnos/search?q=${encodeURIComponent(busqueda)}`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlumnos(res.data);
      } catch (err) {
        console.error("Error buscando alumnos:", err);
        setError("No se pudieron cargar los alumnos");
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchAlumnos, 400); // ⏳ delay para evitar muchas peticiones
    return () => clearTimeout(delay);
  }, [busqueda, token]);

  // ✅ Cuando se selecciona un alumno de la lista
  const handleSelectAlumno = (alumno) => {
    setFormData((prev) => ({
      ...prev,
      alumno_id: alumno.id,
      alumno_nombre: `${alumno.nombre} ${alumno.apellido}`,
    }));
    setBusqueda(`${alumno.nombre} ${alumno.apellido}`);
    setAlumnos([]); // Ocultar sugerencias
  };

  // 🧠 Manejador de cambios del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 💾 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.alumno_id ||
      !formData.fecha_pago ||
      !formData.monto ||
      !formData.metodo_pago
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const payload = {
      alumnoId: Number(formData.alumno_id),
      fechaPago: new Date(formData.fecha_pago).toISOString().split("T")[0],
      monto: Number(formData.monto),
      metodoPago: formData.metodo_pago,
      recibidoPor: 2, // ID del usuario que registra el pago
    };

    try {
      await axios.post("http://localhost:3000/api/matriculas", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Matrícula registrada correctamente ✅");
      setFormData({
        alumno_id: "",
        alumno_nombre: "",
        fecha_pago: "",
        monto: "",
        metodo_pago: "",
      });
      setBusqueda("");
      if (onPagoRegistrado) onPagoRegistrado();
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar matrícula");
      alert(err.response?.data?.message || "Error al registrar matrícula");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96 relative">
        {/* Botón de cierre */}
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Registrar Matrícula
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 relative">
          {/* 🔍 Buscador con lista dinámica */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar alumno por nombre o cédula..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border border-slate-500 h-[36px] pl-3 w-full mb-2 rounded"
              autoComplete="off"
            />
            {loading && (
              <p className="text-sm text-gray-500 text-center">Buscando...</p>
            )}
            {alumnos.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-full max-h-40 overflow-y-auto shadow-md">
                {alumnos.map((a) => (
                  <li
                    key={a.id}
                    onClick={() => handleSelectAlumno(a)}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600"
                  >
                    {a.nombre} {a.apellido} — {a.cedula}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Fecha de pago */}
          <input
            type="date"
            name="fecha_pago"
            value={formData.fecha_pago}
            onChange={handleChange}
            required
            className="border border-slate-500 h-[36px] pl-3 rounded"
          />

          {/* Monto */}
          <input
            type="number"
            name="monto"
            placeholder="Monto"
            value={formData.monto}
            onChange={handleChange}
            required
            className="border border-slate-500 h-[36px] pl-3 rounded"
          />

          {/* Método de pago */}
          <input
            type="text"
            name="metodo_pago"
            placeholder="Método de pago"
            value={formData.metodo_pago}
            onChange={handleChange}
            required
            className="border border-slate-500 h-[36px] pl-3 rounded"
          />

          {/* Botón */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatriculaForm;
