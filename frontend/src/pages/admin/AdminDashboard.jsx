import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, GraduationCap, Truck } from 'lucide-react';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Panel de Admin';
  }, []);

  const cards = [
    { title: 'Cursos', path: '/admin/cursos', cantidad: '20', color: 'bg-green-50', border: 'border-green-500', textColor: 'text-green-700', icon: <BookOpen size={22} /> },
    { title: 'Alumnos', path: '/admin/alumnos', cantidad: '145', color: 'bg-red-50', textColor: 'text-pink-700', border: 'border-pink-500', icon: <Users size={22} /> },
    { title: 'Materias', path: '/admin/profesor', cantidad: '30', color: 'bg-orange-50', textColor: 'text-yellow-700', border: 'border-yellow-500', icon: <GraduationCap size={22} /> },
    { title: 'Proveedores', cantidad: '12', path: '/admin/asignarMateria', color: 'bg-purple-50', textColor: 'text-purple-700', border: 'border-purple-500', icon: <Truck size={22} /> },
  ];

  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300 mb-8">Datos disponibles</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className={`p-5 rounded-2xl shadow-sm border ${card.border} bg-white dark:bg-gray-800 transition-all group`}
          >
            <div className="flex items-center">
              <div className={`mr-4 p-2 rounded-lg ${card.color} ${card.textColor}`}>
                {card.icon}
              </div>
              <h2 className={`inline-block text-lg font-semibold ${card.textColor}`}>
                {card.title}
              </h2>
            </div>

            <div className="text-xl font-medium flex justify-between mt-4 ml-1 items-center">
              <p className="text-2xl font-medium text-gray-800 dark:text-gray-200">{card.cantidad}</p>
              <span
                className={`text-3xl ${card.textColor} transform transition-transform duration-300 group-hover:translate-x-2`}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
