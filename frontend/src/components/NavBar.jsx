import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Home, MessageSquare, LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-200 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => navigate('/home')}
                className={`${
                  isActive('/home') 
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>

              <button
                onClick={() => navigate('/chatbot')}
                className={`${
                  isActive('/chatbot')
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chatbot
              </button>

              <button
                onClick={handleLogout}
                className="border-transparent text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className={`${
                  isActive('/') ? 'text-gray-900' : 'text-gray-500'
                } p-2 rounded-md hover:text-gray-900`}
              >
                <Home className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/chatbot')}
                className={`${
                  isActive('/chatbot') ? 'text-gray-900' : 'text-gray-500'
                } p-2 rounded-md hover:text-gray-900`}
              >
                <MessageSquare className="w-5 h-5" />
              </button>

              <button
                onClick={handleLogout}
                className="text-gray-500 p-2 rounded-md hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
