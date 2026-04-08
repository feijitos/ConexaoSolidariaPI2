import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, LayoutDashboard, Info } from "lucide-react";

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white text-xs">
            icon
          </div>
          Conexão Solidária
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
            <Info size={18} />
            <span className="hidden sm:inline">Sobre</span>
          </Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Painel</span>
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600 flex items-center gap-1">
                <User size={18} />
                <span className="hidden sm:inline">Perfil</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 flex items-center gap-1 cursor-pointer"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className="text-indigo-600 font-medium hover:text-indigo-800"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
