import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearAlumno } from '../../services/alumnoService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AlumnoForm = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cursos, setCursos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
    curso_id: '',
  });

  // obtener cursos del backend cuando carga el componente
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cursos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCursos(res.data);
      } catch (error) {
        console.error('Error al obtener cursos:', error.response?.data || error.message);
      }
    };

    fetchCursos();
  }, [token]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearAlumno(formData, token);
      alert('Alumno creado con éxito');
      navigate('/admin/alumnos');
    } catch (error) {
      console.error(error);
      alert('Error al crear alumno');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-800 dark:text-white">Registrar alumno con admin</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          name="cedula"
          value={formData.cedula}
          onChange={handleChange}
          placeholder="Cédula"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <select
          name="curso_id"
          value={formData.curso_id}
          onChange={handleChange}
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500'
        >
          <option value="">Seleccione un curso</option>
          {Array.isArray(cursos) &&
            cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {curso.anio}° - {curso.bachillerato}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar Alumno
        </button>
      </form>
    </div>
  );
};

export default AlumnoForm;