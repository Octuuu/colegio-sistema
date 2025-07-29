import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearProfesor } from '../../services/profesorService';
import { useNavigate } from 'react-router-dom';

const CreateTeacher = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    correo: '',
    cedula: '',
    direccion: '',
  });

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
      await crearProfesor(formData, token);
      alert('Profesor creado con éxito');
      navigate('/admin/profesor');
    } catch (error) {
      console.error(error);
      alert('Error al crear profesor');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-800 dark:text-white">Crear Profesor</h2>
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
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />

        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Email"
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
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar profesor
        </button>
      </form>
    </div>
  );
};

export default CreateTeacher;