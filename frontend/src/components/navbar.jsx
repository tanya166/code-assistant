
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Code, History, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Code size={28} className="text-slate-900" />
            <span className="text-xl font-bold text-slate-900">CodeReview</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition font-medium"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition font-medium"
            >
              <History size={20} />
              <span>History</span>
            </Link>
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-slate-300">
              <span className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{user?.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;