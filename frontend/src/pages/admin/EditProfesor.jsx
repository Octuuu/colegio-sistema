import { useState } from 'react';
import { actualizarProfesor } from '../../services/profesorService';

function EditarProfesor({ profesor, onSuccess }) {
  const [nombre, setNombre] = useState(profesor.nombre);
  const [apellido, setApellido] = useState(profesor.apellido);
  const [telefono, setTelefono] = useState(profesor.telefono);
  const [correo, setCorreo] = useState(profesor.correo);
  const [cedula, setCedula] = useState(profesor.cedula);
  const [direccion, setDireccion] = useState(profesor.direccion);
  const [estado, setEstado] = useState(profesor.estado ?? 1); // 🔹 por defecto Activo

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token');

      await actualizarProfesor(
        profesor.id,
        { nombre, apellido, telefono, correo, cedula, direccion, estado },
        token
      );
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('❌ Error al actualizar el profesor:', error);
      alert('❌ No se pudo actualizar el profesor');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Editar Profesor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          className="w-full border border-gray-300 p-2 rounded"
          required
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Apellido"
          className="w-full border border-gray-300 p-2 rounded"
          required
          pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
          title="Solo se permiten letras y espacios"
        />
        <input
          type="number"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Cédula"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Dirección"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        {/* 🔹 Selector de estado */}
        <select
          value={estado}
          onChange={(e) => setEstado(Number(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => onSuccess && onSuccess()}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarProfesor;
