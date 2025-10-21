import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const MatriculaList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPagos = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/matriculas", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPagos(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que desea eliminar este pago?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/matriculas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Pago eliminado ✅");
      fetchPagos();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar pago");
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  if (loading) return <p className="text-center">Cargando pagos...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Lista de Pagos
      </h2>

      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
          <tr>
            <th className="p-2 border">Alumno</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Monto</th>
            <th className="p-2 border">Método</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map(pago => (
            <tr key={pago.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="p-2 border">{pago.alumno_nombre} {pago.alumno_apellido}</td>
              <td className="p-2 border">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
              <td className="p-2 border">{pago.monto}</td>
              <td className="p-2 border">{pago.metodo_pago}</td>
              <td className="p-2 border">{pago.estado}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => handleDelete(pago.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
