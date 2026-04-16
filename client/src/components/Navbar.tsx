import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-2">
      <Link to="/dashboard" className="text-lg sm:text-xl font-bold tracking-tight">
        DevTrack
      </Link>
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/stats" className="text-slate-300 hover:text-white text-sm">
          Stats
        </Link>
        <span className="text-slate-400 text-sm hidden sm:inline">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-slate-700 hover:bg-slate-600 text-sm px-3 py-1.5 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
