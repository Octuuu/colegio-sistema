import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { obtenerTodosLosPagos, eliminarMatricula } from '../../services/matriculaService';

const MatriculaList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);

  const cargarPagos = async () => {
    try {
      const data = await obtenerTodosLosPagos(token);
      setPagos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    cargarPagos();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Eliminar este pago?')) {
      await eliminarMatricula(id, token);
      cargarPagos();
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Pagos de Matrícula</h2>
      <table className="w-full text-center border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-2 border">Alumno</th>
            <th className="p-2 border">Curso</th>
            <th className="p-2 border">Monto</th>
            <th className="p-2 border">Método</th>
            <th className="p-2 border">Recibido por</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td className="p-2 border">{pago.nombre} {pago.apellido}</td>
              <td className="p-2 border">{pago.anio}° {pago.bachillerato}</td>
              <td className="p-2 border">{pago.monto}</td>
              <td className="p-2 border">{pago.metodo_pago}</td>
              <td className="p-2 border">{pago.recibido_por}</td>
              <td className="p-2 border">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEliminar(pago.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatriculaList;
