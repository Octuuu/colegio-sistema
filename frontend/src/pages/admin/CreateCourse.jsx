import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearCurso } from '../../services/cursoService';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    anio: '',
    bachillerato: '',
  });

  // manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await crearCurso(formData, token);
      alert('Curso creado con éxito');
      navigate('/admin/cursos');
    } catch (error) {
      console.error(error);
      alert('Error al crear curso');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-800 dark:text-white">Crear curso</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="anio"
          value={formData.anio}
          onChange={handleChange}
          placeholder="Año"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
        />
        <input
          name="bachillerato"
          value={formData.bachillerato}
          onChange={handleChange}
          placeholder="Bachillerato"
          required
          className="input"
          class='border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500'
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

export default CreateCourse;