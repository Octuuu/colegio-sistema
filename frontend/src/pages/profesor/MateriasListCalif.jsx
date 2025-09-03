import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { obtenerMaterias } from "../../services/asistenciaService";
import { Link } from "react-router-dom";

const MateriasList = () => {
  const { token } = useContext(AuthContext);
  const [materias, setMaterias] = useState([]);

  const cargarMaterias = useCallback(async () => {
    try {
      const data = await obtenerMaterias(token);
      setMaterias(data);
    } catch (err) {
      console.error("Error al obtener materias", err);
    }
  }, [token]);

  useEffect(() => {
    cargarMaterias();
  }, [cargarMaterias]);

  return (
    <div className="relative p-6">
      <h2 className="text-2xl font-bold mb-4">Tus materias</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Materia</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m, index) => (
            <tr className="text-center" key={`${m.id}-${index}`}>
              <td className="p-2">{m.nombre}</td>
              <td className="p-2">
                <Link
                  to={`/profesor/calificaciones/registrar`}
                  className="text-blue-600 hover:underline " 
                >
                  Ver alumnos
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MateriasList;
