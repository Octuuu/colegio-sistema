import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  crearAsignacion,
  obtenerMaterias,
  obtenerCursos,
  obtenerProfesores
} from '../../services/asignacionesService';
import { useNavigate } from 'react-router-dom';

const CreateAsignacion = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [materias, setMaterias] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [formData, setFormData] = useState({
    materia_id: '',
    curso_id: '',
    profesor_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mats, curs, profs] = await Promise.all([
          obtenerMaterias(token),
          obtenerCursos(token),
          obtenerProfesores(token)
        ]);

        setMaterias(mats);
        setCursos(curs);
        setProfesores(profs);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearAsignacion(formData, token);
      alert('Asignación creada exitosamente');
      navigate('/admin/asignarMateria');
    } catch (error) {
      console.error(error);
      alert('Error al crear la asignación');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Asignar materia a profesor</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">

        <select
          name="materia_id"
          value={formData.materia_id}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Selecciona una materia</option>
          {materias.map(m => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </select>

        <select
          name="curso_id"
          value={formData.curso_id}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Selecciona un curso</option>
          {cursos.map(c => (
            <option key={c.id} value={c.id}>{c.bachillerato}</option>
          ))}
        </select>

        <select
          name="profesor_id"
          value={formData.profesor_id}
          onChange={handleChange}
          required
          className="border border-gray-400 rounded px-3 py-2"
        >
          <option value="">Selecciona un profesor</option>
          {profesores.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-bold">
          Asignar materia
        </button>
      </form>
    </div>
  );
};

export default CreateAsignacion;
