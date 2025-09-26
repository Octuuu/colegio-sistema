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
    { title: 'Pago de matrícula', path: '/admin/matriculaForm' },
    { title: 'Pago de mensualidad', path: '/admin/mensualidad' },
    { title: 'Inventario', path: '/admin/mensualidad' },
    { title: 'Proveedores', path: '/admin/proveedoresList' },
    { title: 'Productos', path: '/admin/productos' },
    { title: 'Servicios', path: '/admin/servicios' },
    { title: 'Insumos', path: '/admin/insumos' },
    { title: 'Movimientos de insumos', path: '/admin/insumosMovimientos' },
    { title: 'Ventas', path: '/admin/ventas' },
    { title: 'Compras', path: '/admin/compras' },
  ];

  return (
    <div className="h-[96vh] ml-4 mt-4 w-64 bg-gray-50 dark:bg-gray-800 p-2 flex flex-col rounded-2xl border border-gray-300 ">
      <h1 className="text-2xl font-bold dark:text-blue-200 mb-6 mt-6 text-center border-b">
        Administrador
      </h1>

      <nav className="flex flex-col gap- mt-6">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`px-3 text-sm font-medium py-2 transition 
              ${location.pathname === link.path 
                ? 'bg-violet-200 text-violet-800 rounded-md' 
                : 'text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
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
