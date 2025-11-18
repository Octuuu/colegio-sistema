import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPagosMatricula } from "../../../services/matriculaService";

const MatriculaDetail = () => {
  const { token } = useContext(AuthContext);
  const { alumnoId } = useParams();
  const navigate = useNavigate();
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagosAlumno = async () => {
      try {
        const todosPagos = await obtenerPagosMatricula(token);
        const pagosFiltrados = todosPagos.filter(pago => 
          pago.alumno_id === parseInt(alumnoId)
        );
        setPagos(pagosFiltrados);
      } catch (err) {
        console.error("Error obteniendo pagos:", err);
        alert("Error al obtener pagos del alumno");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPagosAlumno();
  }, [alumnoId, token]);

  if (loading) return <div className="text-center p-4">Cargando...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial de Pagos de Matrícula
      </h2>

      {pagos.length === 0 ? (
        <div className="text-center p-8 text-gray-500 dark:text-gray-400">
          No se encontraron pagos para este alumno.
        </div>
      ) : (
        <div className="space-y-4">
          {pagos.map((pago) => (
            <div key={pago.id} className="border border-gray-300 dark:border-gray-600 rounded p-4 bg-gray-50 dark:bg-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Fecha:</p>
                  <p>{new Date(pago.fecha_pago).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold">Monto:</p>
                  <p className="text-green-600 dark:text-green-400 font-bold">
                    ₲ {Number(pago.monto).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Método:</p>
                  <p className="capitalize">{pago.metodo_pago}</p>
                </div>
                <div>
                  <p className="font-semibold">Estado:</p>
                  <span className={`px-2 py-1 rounded text-xs ${
                    pago.anulado 
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  }`}>
                    {pago.anulado ? "Anulado" : "Pagado"}
                  </span>
                </div>
                {pago.concepto && (
                  <div className="col-span-2">
                    <p className="font-semibold">Concepto:</p>
                    <p>{pago.concepto}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Volver
      </button>
    </div>
  );
};

export default MatriculaDetail;