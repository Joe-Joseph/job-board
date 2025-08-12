import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ToggleMode = () => {
  const { darkMode, setDarkMode } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 dark:bg-yellow-400 bg-gray-800 dark:text-gray-900 text-yellow-400 dark:hover:bg-yellow-300 hover:bg-gray-700`}
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
