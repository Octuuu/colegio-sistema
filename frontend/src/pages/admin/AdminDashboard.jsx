import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Panel de Admin';
  }, []);

  const cards = [
    { title: 'Cursos', path: '/admin/cursos', color: '', textColor: 'text-green-700' },
    { title: 'Matricular alumno', path: '/admin/alumnos', color: '', textColor: 'text-pink-700' },
    { title: 'Crear profesor', path: '/admin/profesor', color: '', textColor: 'text-yellow-700' },
    { title: 'Asignaciones', path: '/admin/asignarMateria', color: '', textColor: 'text-purple-700' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">
        Sistema de alumnos
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Acciones disponibles en el panel
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className={`${card.color} p-4 rounded shadow`}>
            <Link
              to={card.path}
              className={`inline-block mb-2 text-sm ${card.textColor}  text-xl font-bold`}
            >
              {card.title} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
