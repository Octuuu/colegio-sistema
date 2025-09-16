import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { crearProveedor } from '../../services/proveedorService';
import { useNavigate } from 'react-router-dom';

const CreateProveedor = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    telefono: '',
    correo: '',
    direccion: ''
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
      await crearProveedor(formData, token);
      alert('Proveedor creado con éxito');
      navigate('/admin/proveedorForm'); // Redirige a la lista de proveedores
    } catch (error) {
      console.error(error);
      alert('Error al crear proveedor');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-4xl text-center font-extrabold mb-12 text-gray-800 dark:text-white">
        Crear Proveedor
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <input
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          placeholder="Tipo (local, externo...)"
          required
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <input
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <input
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo"
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />
        <input
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="border border-slate-500 h-[36px] font-semibold pl-5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 font-bold"
        >
          Registrar Proveedor
        </button>
      </form>
    </div>
  );
};

export default CreateProveedor;
