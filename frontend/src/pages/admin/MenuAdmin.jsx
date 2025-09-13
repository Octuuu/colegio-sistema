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
    { title: 'Ver alumnos', path: '/admin/alumnosCursos' },
    { title: 'Ver cursos', path: '/admin/cursosList' },
    { title: 'Ver materias', path: '/admin/materiasList' },
    { title: 'Ver profesores', path: '/admin/profesorList' },
    { title: 'Crear Materias', path: '/admin/materias' },
    { title: 'Acciones con Materias', path: '/admin/materiasList' },
    { title: 'Acciones cursos y alum curso', path: '/admin/cursosList' },
    { title: 'Pago de matrícula', path: '/admin/matricula' },
    { title: 'Pago de mensualidad', path: '/admin/mensualidad' },
    { title: 'Inventario', path: '/admin/mensualidad' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-200 dark:bg-gray-800 p-2 flex flex-col">
      <h1 className="text-2xl font-bold dark:text-blue-200 mb-6 mt-6 text-center border-b-2">
        Administrador
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

export default MenuAdmin;
