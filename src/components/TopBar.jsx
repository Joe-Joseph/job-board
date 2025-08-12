import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { useNavigate, Navigate } from 'react-router-dom';
import { ToggleMode } from './ToggleMode';
import { logout } from '../store/slice/authSlice';
import { useState } from 'react';

export const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const storedUser = localStorage.getItem('user');

  // Convert back to object
  const user = storedUser ? JSON.parse(storedUser) : null;

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : '??';

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    return navigate('/auth');
  };
  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-white border-b shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <h1 className="font-semibold text-gray-900 text-md dark:text-white">
              Job Board
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ToggleMode />

            {/* Avatar with dropdown */}
            <div className="relative">
              <div
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center w-10 h-10 font-semibold text-white rounded-full cursor-pointer select-none dark:border dark:border-gray-800 bg-sky-800 dark:bg-gray-900"
              >
                {initials}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
