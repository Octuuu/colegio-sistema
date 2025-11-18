import { FiUser, FiUsers } from "react-icons/fi";

const SeleccionarAlumnoTutor = ({ 
  alumnos, 
  selectedAlumno, 
  onAlumnoChange, 
  tutores, 
  selectedTutor, 
  onTutorChange 
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Selección de Alumno */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FiUser className="text-blue-600 dark:text-blue-400 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Seleccionar Alumno
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Elige el alumno para esta venta
              </p>
            </div>
          </div>

          <select
            className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            value={selectedAlumno || ""}
            onChange={(e) => onAlumnoChange(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Seleccionar alumno...</option>
            {alumnos.map((al) => (
              <option key={al.id} value={al.id}>
                {al.nombre} {al.apellido}
              </option>
            ))}
          </select>

          {selectedAlumno && (
            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300">
                Alumno seleccionado: <strong>{alumnos.find(a => a.id === selectedAlumno)?.nombre} {alumnos.find(a => a.id === selectedAlumno)?.apellido}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Selección de Tutor */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FiUsers className="text-purple-600 dark:text-purple-400 text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Seleccionar Tutor
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Elige el tutor responsable
              </p>
            </div>
          </div>

          <select
            className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            value={selectedTutor || ""}
            onChange={(e) => onTutorChange(e.target.value ? Number(e.target.value) : null)}
            disabled={tutores.length === 0}
          >
            {tutores.length === 0 ? (
              <option value="">Sin tutor asignado</option>
            ) : (
              tutores.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} {t.apellido}
                </option>
              ))
            )}
          </select>

          {selectedTutor && (
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Tutor seleccionado: <strong>{tutores.find(t => t.id === selectedTutor)?.nombre} {tutores.find(t => t.id === selectedTutor)?.apellido}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeleccionarAlumnoTutor;