import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-4 mb-2 mr-4 rounded-full border dark:bg-gray-700 hover:bg-gray-50 shadow-sm text-sm"
    >
      {theme === 'dark' ? '🌤️' : '🌑'}
    </button>
  );
};

export default ThemeToggle;
