import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const MenuProfesor = () => {
  useEffect(() => {
    document.title = 'Menu profesor';
  }, []);

  const location = useLocation();

  const links = [
    { title: 'Tablero', path: '/profesor/dashboard' },
    {
      title: 'Cargar Asistencia',
      path: '/profesor/asistencias',
    },
    {
      title: 'Ver asistencias',
      path: '/profesor/listaMaterias',
    },
    {
      title: 'Cargar Calificacion',
      path: '/profesor/calificaciones',
    },
    {
      title: 'Ver calificaciones',
      path: '/profesor/calificaciones',
    },
    {
      title: 'Ver mis Cursos',
      path: '/profesor/cursos',
    },
    {
      title: 'Ver mis Materias',
      path: '/profesor/materias',
    },
    {
      title: 'Ver mis alumnos',
      path: '/profesor/alumnos',
    },
    {
      title: 'Ver perfil',
      path: '/profesor/alumnos',
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-200 dark:bg-gray-800 p-2 flex flex-col">
      <h1 className="text-2xl font-bold dark:text-blue-200 mb-6 mt-6 text-center border-b-2">
        Profesores
      </h1>

      <nav className="flex flex-col gap- mt-6">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`px-3 font-medium py-2 transition 
              ${location.pathname === link.path 
                ? 'bg-blue-200 text-blue-800' 
                : 'text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuProfesor;
