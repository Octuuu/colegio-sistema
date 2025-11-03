import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearMatricula } from '../../services/matriculaService';
import axios from 'axios';

const MatriculaForm = () => {
  const { token } = useContext(AuthContext);
  const [inscripciones, setInscripciones] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    inscripcionId: '',
    fechaPago: '',
    monto: '',
    metodoPago: '',
    recibidoPor: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inscripcionesRes = await axios.get(
          'http://localhost:3000/api/inscripciones/todasInscripciones',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInscripciones(inscripcionesRes.data);

        const usuariosRes = await axios.get(
          'http://localhost:3000/api/usuarios',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsuarios(usuariosRes.data);
      } catch (err) {
        console.error(err);
        setError('Error al obtener inscripciones o usuarios');
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.inscripcionId || !formData.fechaPago || !formData.monto || !formData.metodoPago || !formData.recibidoPor) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      await crearMatricula(formData, token);
      alert('Pago registrado con éxito');
      setFormData({
        inscripcionId: '',
        fechaPago: '',
        monto: '',
        metodoPago: '',
        recibidoPor: ''
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al registrar pago');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
        Registrar Pago de Matrículass
      </h2>
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select
          name="inscripcionId"
          value={formData.inscripcionId}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        >
          <option value="">Seleccione una inscripción</option>
          {inscripciones.map((i) => (
            <option key={i.id} value={i.id}>
              {i.alumno_nombre} {i.alumno_apellido} - {i.curso_anio}° {i.curso_bachillerato}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="fechaPago"
          value={formData.fechaPago}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />

        <input
          type="number"
          name="monto"
          placeholder="Monto"
          value={formData.monto}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />

        <input
          type="text"
          name="metodoPago"
          value={formData.metodoPago}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />

        <select
          name="recibidoPor"
          value={formData.recibidoPor}
          onChange={handleChange}
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        >
          <option value="">Seleccione usuario que recibe</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} {u.apellido}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar Pago
        </button>
      </form>
    </div>
  );
};

export default MatriculaForm;
