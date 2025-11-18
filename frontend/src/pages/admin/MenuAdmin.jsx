import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, BookOpen, GraduationCap, CreditCard, 
  DollarSign, Truck, Package, Wrench, Boxes, ShoppingCart, Wallet, 
  FileText, Settings, Menu, X
} from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';

const MenuAdmin = () => {
  useEffect(() => {
    document.title = 'Menú Admin';
  }, []);

  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-violet-600 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay para móvil */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Menú lateral */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-screen 
        w-64 bg-gray-50 dark:bg-gray-800 p-2 flex flex-col 
        border-r border-gray-300 dark:border-gray-700
        transform transition-transform duration-300 ease-in-out z-40
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del menú */}
        <div className="flex items-center justify-between mb-2 mt-1 px-3 py-2 border-b border-gray-300 dark:border-gray-600">
          <h1 className="text-xl font-bold dark:text-blue-200 text-center flex-1">
            Administrador
          </h1>
        
        </div>

        <nav className="flex-1 lg:overflow-hidden">
          <div className="flex flex-col gap-1 h-full">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={`flex items-center gap-3 px-3 text-sm font-medium py-2 rounded-md transition
                  ${location.pathname === link.path
                    ? 'bg-violet-200 text-violet-800 dark:bg-violet-700 dark:text-violet-100'
                    : 'text-gray-800 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-gray-700 hover:text-violet-700 dark:hover:text-violet-300'
                  }`}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </div>
        </nav>

       
      </div>

      {/* Espacio para el contenido principal (solo en móvil) */}
      <div className="lg:hidden min-h-screen pt-16">
        {/* Este div asegura que el contenido no quede detrás del menú fijo */}
      </div>
    </>
  );
};

export default MenuAdmin;