import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { crearAlumno } from '../../../services/alumnoService';
import Notification from '../../../components/Notification.jsx';

const AlumnoForm = ({ onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    fecha_nacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
  });

  const [notification, setNotification] = useState(null); 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearAlumno(formData, token);
      setNotification({ message: '✅ Alumno creado con éxito', type: 'success' });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error al crear alumno:', err);
      setNotification({ 
        message: err.response?.data?.error || '❌ Error al crear alumno', 
        type: 'error' 
      });
    }
  };

  const inputClass = "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="space-y-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className={inputClass} />
        <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required className={inputClass} />
        <input name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required className={inputClass} />
        <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required className={inputClass} />
        <input name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} className={inputClass} />
        <input name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} className={inputClass} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className={inputClass} />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Crear Alumno
        </button>
      </form>
    </div>
  );
};

export default AlumnoForm;
