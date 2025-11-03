import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, CreditCard, 
  DollarSign, Truck, Package, Wrench, Boxes, ShoppingCart, Wallet, 
  FileText, Settings 
} from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

const MenuAdmin = () => {
  useEffect(() => {
    document.title = 'Menú Admin';
  }, []);

  const location = useLocation();

  const links = [
    { title: 'Tablero', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { title: 'Ver alumnos', path: '/admin/alumnosCursos', icon: <Users size={18} /> },
    { title: 'Ver cursos', path: '/admin/cursosList', icon: <BookOpen size={18} /> },
    { title: 'Ver materias', path: '/admin/materiasList', icon: <GraduationCap size={18} /> },
    { title: 'Ver profesores', path: '/admin/profesorList', icon: <Users size={18} /> },
    { title: 'Pago de matrícula', path: '/admin/matriculaForm', icon: <CreditCard size={18} /> },
    { title: 'Pago de mensualidad', path: '/admin/mensualidad', icon: <DollarSign size={18} /> },
    { title: 'Proveedores', path: '/admin/proveedoresList', icon: <Truck size={18} /> },
    { title: 'Productos', path: '/admin/productos', icon: <Package size={18} /> },
    { title: 'Servicios', path: '/admin/servicios', icon: <Wrench size={18} /> },
    { title: 'Insumos', path: '/admin/insumos', icon: <Boxes size={18} /> },
    { title: 'Ventas', path: '/admin/ventas', icon: <ShoppingCart size={18} /> },
    { title: 'Compras', path: '/admin/compras', icon: <DollarSign size={18} /> },
    { title: 'Caja', path: '/admin/caja', icon: <Wallet size={18} /> },
    { title: 'Auditoría', path: '/admin/auditoria', icon: <FileText size={18} /> },
    { title: 'Configuración', path:"/admin/configuracion", icon: <Settings size={18} /> },
  ];

  return (
    <div className="h-[98vh] ml-4 mt-2 w-64 bg-gray-50 dark:bg-gray-800 p-2 flex flex-col rounded-2xl border border-gray-300">
      <h1 className="text-2xl font-bold dark:text-blue-200 mb-2 mt-1 text-center border-b pb-2">
        Administrador
      </h1>

      <nav className="flex flex-col gap-1">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`flex items-center gap-3 px-3 text-sm font-medium py-2 rounded-md transition
              ${location.pathname === link.path
                ? 'bg-violet-200 text-violet-800'
                : 'text-gray-800 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-gray-700 hover:text-violet-700'
              }`}
          >
            {link.icon}
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuAdmin;
