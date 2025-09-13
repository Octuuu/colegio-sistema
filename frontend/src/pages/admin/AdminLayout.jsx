import MenuAdmin from './MenuAdmin';
import ThemeToggle from '../../components/ThemeToggle';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white ">
      <MenuAdmin />

      <div className="flex-1 p-8 ">
        <div className="flex justify-end mb-4 bg-gray-100 dark:bg-gray-900">
          <h1>Ver perfil</h1>
          <ThemeToggle />
          
        </div>
    
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
