import { useEffect } from 'react';

export default function Alumnos() {
  useEffect(() => {
    document.title = 'Lista de Alumnos';
  }, []);

  // Simulando datos de ejemplo
  const alumnos = [
    { id: 1, nombre: 'Juan Pérez', curso: 'Matemática' },
    { id: 2, nombre: 'María López', curso: 'Historia' },
    { id: 3, nombre: 'Carlos Gómez', curso: 'Biología' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-md shadow p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Lista de cursos</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Curso</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-blue-50">
                <td className="p-2 border">{alumno.id}</td>
                <td className="p-2 border">{alumno.nombre}</td>
                <td className="p-2 border">{alumno.curso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
