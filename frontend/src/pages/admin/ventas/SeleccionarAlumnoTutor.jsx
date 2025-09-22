const SeleccionarAlumnoTutor = ({ alumnos, selectedAlumno, setSelectedAlumno, tutores, selectedTutor, setSelectedTutor }) => {
  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label>Alumno:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedAlumno || ""}
          onChange={(e) => setSelectedAlumno(e.target.value)}
        >
          <option value="">Seleccione un alumno</option>
          {alumnos.map((al) => (
            <option key={al.id} value={al.id}>{al.nombre} {al.apellido}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Tutor:</label>
        <select
          className="border p-2 rounded w-full"
          value={selectedTutor || ""}
          onChange={(e) => setSelectedTutor(e.target.value)}
        >
          {tutores.length === 0 ? (
            <option value="">Sin tutor asignado</option>
          ) : (
            tutores.map((t) => (
              <option key={t.id} value={t.id}>{t.nombre} {t.apellido}</option>
            ))
          )}
        </select>
      </div>
    </div>
  );
};

export default SeleccionarAlumnoTutor;
