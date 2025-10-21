import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaForm = () => {
  const { token } = useContext(AuthContext);

  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    alumnoId: "",
    cursoId: "",
    anioLectivo: new Date().getFullYear(),
    fechaPago: "",
    monto: "",
    metodoPago: "",
    recibidoPor: ""
  });
  const [error, setError] = useState(null);

  // Cargar alumnos y su curso asociado
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/alumnos", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAlumnos(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar datos de alumnos");
      }
    };
    fetchAlumnos();
  }, [token]);

  // Cuando se selecciona un alumno, asignar curso automáticamente
  const handleAlumnoChange = (e) => {
    const selectedAlumno = alumnos.find(a => a.id === Number(e.target.value));
    if (!selectedAlumno) return;

    setFormData({
      ...formData,
      alumnoId: Number(selectedAlumno.id),
      cursoId: Number(selectedAlumno.cursoId),
      anioLectivo: new Date().getFullYear()
    });
  };

  // Manejar cambios de inputs restantes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (
      !formData.alumnoId ||
      !formData.cursoId ||
      !formData.fechaPago ||
      !formData.monto ||
      !formData.metodoPago ||
      !formData.recibidoPor
    ) {
      alert("Todos los campos son requeridos");
      return;
    }

    // Preparar payload con tipos correctos
    const payload = {
      alumnoId: Number(formData.alumnoId),
      cursoId: Number(formData.cursoId),
      anioLectivo: Number(formData.anioLectivo),
      fechaPago: formData.fechaPago,
      monto: Number(formData.monto),
      metodoPago: formData.metodoPago,
      recibidoPor: formData.recibidoPor
    };

    try {
      await axios.post("http://localhost:3000/api/matriculas", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Pago registrado y matrícula creada correctamente ✅");

      // Resetear formulario
      setFormData({
        alumnoId: "",
        cursoId: "",
        anioLectivo: new Date().getFullYear(),
        fechaPago: "",
        monto: "",
        metodoPago: "",
        recibidoPor: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al registrar matrícula");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
        Registrar Pago de Matrícula
      </h2>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Selección de alumno */}
        <select
          name="alumnoId"
          value={formData.alumnoId}
          onChange={handleAlumnoChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map(a => (
            <option key={a.id} value={a.id}>
              {a.nombre} {a.apellido}
            </option>
          ))}
        </select>

        {/* Curso asignado automáticamente */}
        <input
          type="text"
          name="cursoId"
          value={formData.cursoId || ""}
          placeholder="Curso asignado automáticamente"
          readOnly
          className="border border-slate-500 h-[36px] pl-5 bg-gray-200"
        />

        {/* Año lectivo automático */}
        <input
          type="text"
          name="anioLectivo"
          value={formData.anioLectivo}
          readOnly
          className="border border-slate-500 h-[36px] pl-5 bg-gray-200"
        />

        <input
          type="date"
          name="fechaPago"
          value={formData.fechaPago}
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
          name="metodoPago"
          placeholder="Método de pago"
          value={formData.metodoPago}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        />
        <input
          type="text"
          name="recibidoPor"
          placeholder="Recibido por"
          value={formData.recibidoPor}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] pl-5"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar Matrícula
        </button>
      </form>
    </div>
  );
};

export default MatriculaForm;
