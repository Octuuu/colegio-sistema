import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MatriculaDetail = () => {
  const { token } = useContext(AuthContext);
  const { matriculaId } = useParams();
  const navigate = useNavigate();
  const [pagos, setPagos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/matriculas/${matriculaId}/pagos`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPagos(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener pagos");
      }
    };
    fetchPagos();
  }, [matriculaId, token]);

  if (error) return <div className="text-red-600 p-4">{error}</div>;
  if (pagos.length === 0) return <div className="p-4">No se encontraron pagos.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Detalle de Pago de Matrícula
      </h2>

      {pagos.map((pago) => (
        <div key={pago.id} className="border border-gray-300 dark:border-gray-600 rounded p-4 mb-4 bg-gray-50 dark:bg-gray-700">
          <p><span className="font-semibold">Alumno:</span> {pago.alumno_nombre} {pago.alumno_apellido}</p>
          <p><span className="font-semibold">Curso:</span> {pago.curso_anio}° {pago.curso_bachillerato}</p>
          <p><span className="font-semibold">Fecha Pago:</span> {new Date(pago.fecha_pago).toLocaleDateString()}</p>
          <p><span className="font-semibold">Monto:</span> {pago.monto} Gs.</p>
          <p><span className="font-semibold">Método de Pago:</span> {pago.metodo_pago}</p>
          <p><span className="font-semibold">Recibido por:</span> {pago.recibido_por || "N/A"}</p>
        </div>
      ))}

      <button
        onClick={() => navigate(-1)}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mt-4"
      >
        Volver
      </button>
    </div>
  );
};

export default MatriculaDetail;
