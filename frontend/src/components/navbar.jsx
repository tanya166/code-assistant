// src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Code, History, Home } from 'lucide-react';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code size={28} />
            <span className="text-xl font-bold">Code Review Assistant</span>
          </Link>

          {/* Navigation Links */}
          {token ? (
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 hover:text-purple-200 transition"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/history"
                className="flex items-center space-x-1 hover:text-purple-200 transition"
              >
                <History size={20} />
                <span>History</span>
              </Link>
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-purple-400">
                <span className="text-sm">
                  Welcome, <span className="font-semibold">{user?.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;