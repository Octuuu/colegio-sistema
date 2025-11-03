import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import ListaGenerica from "../../../components/ListaGenerica.jsx";
import Notification from "../../../components/Notification.jsx";

const MatriculaList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // 🔹 Cargar pagos
  const fetchPagos = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/matriculas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPagos(res.data);
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al obtener pagos", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [token]);

  // 🔹 Eliminar pago
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que desea eliminar este pago?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/matriculas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotification({ message: "Pago eliminado correctamente ✅", type: "success" });
      fetchPagos();
    } catch (err) {
      console.error(err);
      setNotification({ message: "Error al eliminar pago", type: "error" });
    }
  };

  useEffect(() => {
    fetchPagos();
  }, [fetchPagos]);

  if (loading) return <p className="text-center">Cargando pagos...</p>;

  return (
    <div className="p-6">
      {/* 🔸 Notificación */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Lista de Pagos</h2>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-50 px-3 py-1 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
        >
          Volver al tablero
        </button>
      </div>

      {/* 🔹 Lista genérica */}
      <ListaGenerica
        title=""
        columns={[
          { key: "alumno_nombre", label: "Nombre" },
          { key: "alumno_apellido", label: "Apellido" },
          {
            key: "fecha_pago",
            label: "Fecha",
            render: (fecha) => new Date(fecha).toLocaleDateString(),
          },
          { key: "monto", label: "Monto" },
          { key: "metodo_pago", label: "Método" },
          { key: "estado", label: "Estado" },
        ]}
        data={pagos}
        renderActions={(pago) => (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleDelete(pago.id)}
              className="bg-red-100 text-red-700 font-medium px-2 py-1 rounded hover:bg-red-200"
            >
              Eliminar
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default MatriculaList;
