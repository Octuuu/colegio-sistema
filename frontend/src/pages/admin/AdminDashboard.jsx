import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Panel de admin';
  }, []);

  const cards = [
    {
      title: 'crear curso',
      description: '',
      path: '/admin/cursos',
      color: 'bg-green-100',
      textColor: 'text-green-700',
    },
    {
      title: 'Inscribir alumnos',
      description: '',
      path: '/admin/alumnos',
      color: 'bg-pink-100',
      textColor: 'text-pink-700',
    },
    {
      title: 'Crear profesor',
      description: '',
      path: '/admin/profesor',
      color: 'bg-pink-100',
      textColor: 'text-pink-700',
    },
    {
      title: 'Acciones con profesor',
      description: '',
      path: '/admin/profesorList',
      color: 'bg-pink-100',
      textColor: 'text-pink-700',
    },
    {
      title: 'Aginaciones',
      description: '',
      path: '/admin/asignarMateria',
      color: 'bg-pink-100',
      textColor: 'text-pink-700',
    },
    {
      title: 'Crear Materias',
      description: '',
      path: '/admin/materias',
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
    },
    {
      title: 'Acciones con las Materias',
      description: '',
      path: '/admin/materiasList',
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
    },
    {
      title: 'Acciones con los cursos y alumnos por curso',
      description: '',
      path: '/admin/cursosList',
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto rounded-md p-6">
        {/* Botón para cambiar tema */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-6">
          Sistema de alumnos
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Acciones disponibles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className={`${card.color} p-4 rounded shadow`}>
              <h2 className={`text-xl font-bold ${card.textColor} mb-2`}>
                {card.title}
              </h2>
              <p className="text-gray-600 mb-2">{card.description}</p>
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
    </div>
  );
};

export default AdminDashboard;

