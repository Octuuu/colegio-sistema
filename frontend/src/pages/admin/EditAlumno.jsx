import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerAlumnosPorId, actualizarAlumno } from '../../services/alumnoService.js';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.js';

function EditarAlumnos() {
  const { token } = useContext(AuthContext);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [curso_id, setCurso_id] = useState('');
  const [cursos, setCursos] = useState('');
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlumno = async () => {
      try {

        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token');

        const alumno = await obtenerAlumnosPorId(id, token);
        setNombre(alumno.nombre);
        setApellido(alumno.apellido);
        setCedula(alumno.cedula);
        setFecha_nacimiento(alumno.fecha_nacimiento);
        setTelefono(alumno.telefono);
        setDireccion(alumno.direccion);
        setEmail(alumno.email);
        setCurso_id(alumno.curso_id);

        setCargando(false);
      } catch (error) {
        console.error('❌ Error al obtener el alumno:', error);
        alert('⚠️ No autorizado. Iniciá sesión.');
        navigate('/login');
      }
    };

    fetchAlumno();
  }, [id, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');
      
      await actualizarAlumno(id, {
        nombre,
        apellido,
        cedula,
        fecha_nacimiento,
        telefono,
        direccion,
        email,
        curso_id
      }, token);

      alert('✅ Alumno actualizado correctamente');
      navigate('/admin/alumnos');
    } catch (error) {
      console.error('❌ Error al actualizar el alumno:', error);
      alert('❌ No se pudo actualizar el alumno');
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Alumno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Cédula</label>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Fecha de nacimiento</label>
          <input
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFecha_nacimiento(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Dirección</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Curso</label>
          <select
            name="curso_id"
            value={curso_id}
            onChange={(e) => setCurso_id(e.target.value)}
            required
            className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-1 focus:ring-blue-500 hover:border-blue-500"
          >
            <option value="">Seleccione un curso</option>
            {Array.isArray(cursos) &&
              cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.anio}° - {curso.bachillerato}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarAlumnos;
