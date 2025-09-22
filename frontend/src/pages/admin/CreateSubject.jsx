import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearMateria } from '../../services/crearMateria';

const CreateSubject = ({ onSuccess }) => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearMateria(formData, token);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      alert('❌ Error al crear materia');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-white">
        Crear materia
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre de la materia"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <input
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar materia
        </button>
      </form>
    </div>
  );
};

export default CreateSubject;
