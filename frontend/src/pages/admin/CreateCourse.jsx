import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearCurso } from '../../services/cursoService';

const CrearCurso = ({ onSuccess }) => {
  const { token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    anio: '',
    bachillerato: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCurso(formData, token);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error al crear curso:', error);
      alert('❌ Error al crear curso');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl text-center font-bold mb-6 text-gray-800 dark:text-white">
        Crear curso
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="anio"
          value={formData.anio}
          onChange={handleChange}
          placeholder="Año"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
          type="number"
        />
        <input
          name="bachillerato"
          value={formData.bachillerato}
          onChange={handleChange}
          placeholder="Bachillerato"
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Crear curso
        </button>
      </form>
    </div>
  );
};

export default CrearCurso;
