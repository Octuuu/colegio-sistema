import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { obtenerTodosPagos, eliminarPago } from "../../../services/mensualidadService";

const MensualidadesList = () => {
  const { token } = useContext(AuthContext);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await obtenerTodosPagos(token);
      setPagos(data || []);
    } catch (err) {
      console.error(err);
      alert("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar registro?")) return;
    try {
      await eliminarPago(id, token);
      fetch();
    } catch (err) {
      console.error(err);
      alert("Error eliminando");
    }
  };

  const totalPaginas = Math.ceil(pagos.length / porPagina);
  const pagosMostrados = pagos.slice((pagina - 1) * porPagina, pagina * porPagina);

  const cambiarPagina = (nueva) => {
    if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva);
  };

  if (loading) return <p>Cargando pagos...</p>;

  return (
    <div className="max-w-full bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-xl font-semibold mb-4">Pagos registrados</h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[70vh] border border-gray-200 rounded-lg">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-2 border text-left">Alumno</th>
              <th className="p-2 border text-left">Mes</th>
              <th className="p-2 border text-left">Fecha Pago</th>
              <th className="p-2 border text-left">Monto</th>
              <th className="p-2 border text-left">Método</th>
              <th className="p-2 border text-left">Estado</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagosMostrados.length === 0 ? (
              <tr><td className="p-4 text-center" colSpan="7">No hay pagos</td></tr>
            ) : (
              pagosMostrados.map((p, i) => (
                <tr key={p.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}>
                  <td className="p-2 border">{p.alumno_nombre} {p.alumno_apellido}</td>
                  <td className="p-2 border">{p.mes || p.month || "-"}</td>
                  <td className="p-2 border">{p.fecha_pago ? new Date(p.fecha_pago).toLocaleDateString() : "-"}</td>
                  <td className="p-2 border">{p.monto}</td>
                  <td className="p-2 border">{p.metodo_pago}</td>
                  <td className="p-2 border">
                    <span className={`px-3 py-1 rounded-full ${p.estado === "pagado" ? "bg-green-100 text-green-700 border border-green-300" : "bg-red-100 text-red-700 border border-red-300"}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => cambiarPagina(pagina - 1)}
          disabled={pagina === 1}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-700">
          Página {pagina} de {totalPaginas}
        </span>
        <button
          onClick={() => cambiarPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
          className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MensualidadesList;
