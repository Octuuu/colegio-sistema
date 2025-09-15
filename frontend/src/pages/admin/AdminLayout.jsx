import MenuAdmin from './MenuAdmin';
import ThemeToggle from '../../components/ThemeToggle';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen  dark:bg-gray-900 text-gray-900 dark:text-white ">
      <MenuAdmin />

      <div className="flex-1 p-7 ">
        <div className="flex items-center justify-between mb-4 border-b mt-4 dark:bg-gray-900">
          <h1 className='text-xl'>Sistema escolar</h1>

          <div className='flex gap-x-10'>
            <h1 className='border shadow-sm hover:bg-gray-50 p-4 rounded-full mb-2'>👤</h1>
            <ThemeToggle />
          </div>
      
          
        </div>
    
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
