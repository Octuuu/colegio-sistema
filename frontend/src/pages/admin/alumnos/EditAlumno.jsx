import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerAlumnosPorId, actualizarAlumno } from '../../../services/alumnoService.js';
import Notification from '../../../components/Notification.jsx';

function EditarAlumnos({ onClose }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [fecha_nacimiento, setFecha_nacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(true);
  const [notification, setNotification] = useState(null);

  const { id } = useParams();

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

        setCargando(false);
      } catch (error) {
        console.error('❌ Error al obtener el alumno:', error);
        setNotification({ message: '⚠️ No autorizado. Iniciá sesión.', type: 'error' });
      }
    };
    fetchAlumno();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarAlumno(id, { nombre, apellido, cedula, fecha_nacimiento, telefono, direccion, email }, token);

      setNotification({ message: '✅ Alumno actualizado correctamente', type: 'success' });
      
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error('❌ Error al actualizar el alumno:', error);
      setNotification({ message: '❌ No se pudo actualizar el alumno', type: 'error' });
    }
  };

  if (cargando) return <p className="text-center mt-10">Cargando...</p>;

  const inputClass = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow space-y-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <h2 className="text-xl font-bold mb-4">Editar Alumno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} required placeholder="Nombre" />
        <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className={inputClass} required placeholder="Apellido" />
        <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} className={inputClass} placeholder="Cédula" />
        <input type="date" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} className={inputClass} placeholder="Fecha de nacimiento" />
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={inputClass} placeholder="Teléfono" />
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} className={inputClass} placeholder="Dirección" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="Email" />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditarAlumnos;
