import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaForm = ({ closeModal }) => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    alumno_id: "",
    fecha_pago: "",
    monto: "",
    metodo_pago: "",
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
        console.error(err);
        setError("No se pudieron cargar los alumnos");
      }
    };
    fetchAlumnos();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.alumno_id || !formData.fecha_pago || !formData.monto || !formData.metodo_pago) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const payload = {
      alumnoId: Number(formData.alumno_id),
      fechaPago: formData.fecha_pago,
      monto: Number(formData.monto),
      metodoPago: formData.metodo_pago,
    };

    try {
      await axios.post("http://localhost:3000/api/matriculas", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pago registrado correctamente ✅");
      setFormData({ alumno_id: "", fecha_pago: "", monto: "", metodo_pago: "" });
      closeModal();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al registrar matrícula");
      alert(err.response?.data?.message || "Error al registrar matrícula");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
          Registrar Pago de Matrícula
        </h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-3">
          <select
            name="alumno_id"
            value={formData.alumno_id}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded px-2 h-10"
          >
            <option value="">Seleccione un alumno</option>
            {alumnos.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre} {a.apellido}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="fecha_pago"
            value={formData.fecha_pago}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded px-2 h-10"
          />

          <input
            type="number"
            name="monto"
            placeholder="Monto"
            value={formData.monto}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded px-2 h-10"
          />

          <input
            type="text"
            name="metodo_pago"
            placeholder="Método de pago"
            value={formData.metodo_pago}
            onChange={handleChange}
            required
            className="border border-gray-400 rounded px-2 h-10"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default MatriculaForm;
