import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerProfesorPorId, actualizarProfesor } from '../../services/profesorService';

function EditarProfesor() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [direccion, setDireccion] = useState('');
 
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfesor = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token');

        const profesor = await obtenerProfesorPorId(id, token);
        setNombre(profesor.nombre);
        setApellido(profesor.apellido);
        setTelefono(profesor.telefono);
        setCorreo(profesor.correo);
        setCedula(profesor.cedula);
        setDireccion(profesor.direccion);
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener al profesor:', error);
        alert('⚠️ No autorizado. Iniciá sesión.');
        navigate('/login');
      }
    };

    fetchProfesor();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarProfesor(id, { nombre, apellido, telefono, correo, cedula, direccion }, token);
      alert('Profesor actualizada correctamente');
      navigate('/admin/profesorList');
    } catch (error) {
      console.error('Error al actualizar al profesor:', error);
      alert('no se pudo actualizar al prfoesor');
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Materia</h2>
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
          <textarea
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Apellido</label>
          <textarea
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Apellido</label>
          <textarea
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Apellido</label>
          <textarea
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold">Apellido</label>
          <textarea
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          ></textarea>
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

export default EditarProfesor;
