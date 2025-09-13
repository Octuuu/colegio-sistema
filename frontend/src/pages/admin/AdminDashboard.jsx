import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Panel de Admin';
  }, []);

  const cards = [
    { title: 'Cursos', path: '/admin/cursos', color: 'bg-green-100', textColor: 'text-green-700' },
    { title: 'Inscribir alumnos', path: '/admin/alumnos', color: 'bg-pink-100', textColor: 'text-pink-700' },
    { title: 'Crear profesor', path: '/admin/profesor', color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    { title: 'Asignaciones', path: '/admin/asignarMateria', color: 'bg-purple-100', textColor: 'text-purple-700' },
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
            <h2 className={`text-xl font-bold ${card.textColor} mb-2`}>
              {card.title}
            </h2>
            <Link
              to={card.path}
              className={`inline-block mt-2 text-sm font-bold ${card.textColor} hover:underline`}
            >
              Ir →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
