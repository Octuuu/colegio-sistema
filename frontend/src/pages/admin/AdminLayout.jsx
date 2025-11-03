import MenuAdmin from './MenuAdmin';
import { Outlet } from 'react-router-dom';
import { User, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

const AdminLayout = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex min-h-screen dark:bg-gray-900 text-gray-900 dark:text-white">
      <MenuAdmin />

      <div className="flex-1 p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4 border-b mt-4 dark:bg-gray-900">
          <h1 className="text-xl flex items-center gap-2">
            Sistema escolar
          </h1>

          <div className="flex items-center gap-x-6">
            <button className="flex items-center justify-center border shadow-sm p-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition">
              <User className="w-5 h-5" />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center border shadow-sm p-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
