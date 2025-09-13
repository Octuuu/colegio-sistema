import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle';

const MenuAdmin = () => {
  useEffect(() => {
    document.title = 'Menú Admin';
  }, []);

  const location = useLocation();

  const links = [
    { title: 'Tablero', path: '/admin/dashboard' },
    { title: 'Incsribir alumno', path: '/admin/alumnos' },
    { title: 'Ver cursos', path: '/admin/cursosList' },
    { title: 'Ver materias', path: '/admin/materiasList' },
    { title: 'Ver profesores', path: '/admin/profesor' },
    { title: 'Acciones con profesor', path: '/admin/profesorList' },
    { title: 'Asignaciones', path: '/admin/asignarMateria' },
    { title: 'Crear Materias', path: '/admin/materias' },
    { title: 'Acciones con Materias', path: '/admin/materiasList' },
    { title: 'Acciones cursos y alum curso', path: '/admin/cursosList' },
    { title: 'Pago de matrícula', path: '/admin/matricula' },
    { title: 'Pago de mensualidad', path: '/admin/mensualidad' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-200 dark:bg-gray-800 p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
        Administrador
      </h1>

      <ThemeToggle />

      <nav className="flex flex-col gap-3 mt-6">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`px-3 py-2 rounded-md font-semibold transition 
              ${location.pathname === link.path 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuAdmin;
