import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearInscripcion } from '../../services/inscripcionesService';
import axios from 'axios';

const InscripcionForm = () => {
  const { token } = useContext(AuthContext);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    alumno_id: '',
    curso_id: '',
    anio_lectivo: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/alumnos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAlumnos(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al obtener alumnos');
      }
    };

    const fetchCursos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cursos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCursos(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al obtener cursos');
      }
    };

    fetchAlumnos();
    fetchCursos();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.alumno_id || !formData.curso_id || !formData.anio_lectivo) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      await crearInscripcion(formData, token);
      alert('Alumno inscrito con éxito');
      setFormData({
        alumno_id: '',
        curso_id: '',
        anio_lectivo: '',
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al inscribir alumno');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
        Inscribir Alumno
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          name="alumno_id"
          value={formData.alumno_id}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre} {alumno.apellido}
            </option>
          ))}
        </select>

        <select
          name="curso_id"
          value={formData.curso_id}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        >
          <option value="">Seleccione un curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.anio}° - {curso.bachillerato}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="anio_lectivo"
          placeholder="Año lectivo"
          value={formData.anio_lectivo}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Inscribir Alumno
        </button>
      </form>
    </div>
  );
};

export default InscripcionForm;
