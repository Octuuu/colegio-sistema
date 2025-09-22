const VerAlumno = ({ alumno }) => {
  if (!alumno) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold mb-3">Datos del Alumno</h2>
      <p><strong>ID:</strong> {alumno.alumno_id}</p>
      <p><strong>Nombre:</strong> {alumno.alumno_nombre}</p>
      <p><strong>Apellido:</strong> {alumno.alumno_apellido}</p>
      <p><strong>Cédula:</strong> {alumno.cedula}</p>
      <p><strong>Fecha de nacimiento:</strong> {alumno.fecha_nacimiento}</p>
      <p><strong>Teléfono:</strong> {alumno.telefono}</p>
      <p><strong>Dirección:</strong> {alumno.direccion}</p>
      <p><strong>Email:</strong> {alumno.email}</p>
      <p><strong>Creado:</strong> {new Date(alumno.created_at).toLocaleString()}</p>
      <p><strong>Actualizado:</strong> {new Date(alumno.updated_at).toLocaleString()}</p>
      <p><strong>Estado inscripción:</strong> {alumno.estado}</p>
      <p><strong>Fecha de inscripción:</strong> {new Date(alumno.fecha_inscripcion).toLocaleDateString()}</p>
    </div>
  );
};

export default VerAlumno;
