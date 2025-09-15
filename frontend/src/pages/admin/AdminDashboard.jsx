import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  useEffect(() => {
    document.title = 'Panel de Admin';
  }, []);

  const cards = [
    { title: 'Cursos', path: '/admin/cursos', cantidad : '20', color: 'bg-green-50', border: 'border-green-500', textColor: 'text-green-700' },
    { title: 'Alumnos', path: '/admin/alumnos',cantidad : '145', color: 'bg-red-50', textColor: 'text-pink-700', border: 'border-pink-500' },
    { title: 'Materias', path: '/admin/profesor', cantidad : '30', color: 'bg-orange-50', textColor: 'text-yellow-700', border: 'border-yellow-500' },
    { title: 'Proveedores', cantidad : '12', path: '/admin/asignarMateria', color: 'bg-purple-50', textColor: 'text-purple-700', border: 'border-purple-500' },
  ];

  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300 mb-8">
        Datos disponibles
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7">
        {cards.map((card, index) => (
          <div key={index} className={`p-5 rounded-2xl shadow-sm border `}>
            <div className='flex items-center'>
              <div className={`mr-4 p-2 rounded-lg ${card.color} `}>
                <img src="../../../public/info.svg" alt="" className='h-4' />
              </div>
              <Link
                to={card.path}
                className={`inline-block mb-2 text-sm ${card.textColor}  text-xl font-medium`}
              >
                {card.title}
              </Link>
            </div>
            
          
            <div className='text-xl font-medium flex justify-between mt-3 ml-1'>
              <p className='text-2xl font-medium'> {card.cantidad}</p>
              <h1 className={`text-3xl ${card.textColor}`}>
                →
              </h1>
            </div>
            


          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
