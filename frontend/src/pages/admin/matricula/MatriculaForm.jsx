import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaForm = () => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    alumno_id: "",
    fecha_pago: "",
    monto: "",
    metodo_pago: ""
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/alumnos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlumnos(res.data);
      } catch (err) {
        console.error("Error al cargar alumnos:", err);
        setError("No se pudieron cargar los alumnos");
      }
    };
    fetchAlumnos();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación simple
    if (!formData.alumno_id || !formData.fecha_pago || !formData.monto || !formData.metodo_pago) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Convertir tipos correctamente
    const payload = {
      alumnoId: Number(formData.alumno_id),
      fechaPago: new Date(formData.fecha_pago).toISOString().split("T")[0],
      monto: Number(formData.monto),
      metodoPago: formData.metodo_pago,
      recibidoPor: 2
    };

    console.log("Payload a enviar:", payload);

    try {
      const res = await axios.post("http://localhost:3000/api/matriculas", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Respuesta del servidor:", res.data);
      alert("Matrícula registrada correctamente");

      // Resetear formulario
      setFormData({
        alumno_id: "",
        fecha_pago: "",
        monto: "",
        metodo_pago: ""
      });
    } catch (err) {
      console.error("Error completo:", err);
      console.error("Error response:", err.response);
      setError(err.response?.data?.message || "Error al registrar matrícula");
      alert(err.response?.data?.message || "Error al registrar matrícula");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Registrar Matrícula
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          name="alumno_id"
          value={formData.alumno_id}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map(a => (
            <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
          ))}
        </select>

        <input
          type="date"
          name="fecha_pago"
          value={formData.fecha_pago}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={formData.monto}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        />

        <input
          type="text"
          name="metodo_pago"
          placeholder="Método de pago"
          value={formData.metodo_pago}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default MatriculaForm;
