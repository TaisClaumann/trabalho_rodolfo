import { Link } from "react-router-dom";
import { useState } from "react";
import User from "@mui/icons-material/Person";
import Search from "@mui/icons-material/Search";
import List from "@mui/icons-material/List";
import Menu from "@mui/icons-material/Menu";
import X from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";
import Favorite from "@mui/icons-material/Favorite";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-purple-700 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              Minha Aplicação
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-600 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:space-x-6">
            <NavItem to="/share" icon={<Search />} label="Pesquisar ações" />
            <NavItem to="/shareList" icon={<List />} label="Listar ações" />
            <NavItem to="/shareFavList" icon={<Favorite />} label="Favoritadas" />
            <NavItem to="/CadastroUsuarios" icon={<User />} label="Cadastro" />
          </div>

          {/* Logout button */}
          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              <Logout className="mr-2 h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavItem to="/share" icon={<Search />} label="Pesquisar ações" isMobile />
          <NavItem to="/shareList" icon={<List />} label="Listar ações" isMobile />
          <NavItem to="/shareFavList" icon={<Favorite />} label="Favoritadas" isMobile />
          <NavItem to="/CadastroUsuarios" icon={<User />} label="Cadastro" isMobile />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  isMobile = false,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMobile?: boolean;
}) => (
  <Link
    to={to}
    className={`${
      isMobile ? "block" : "inline-flex"
    } items-center px-3 py-2 text-white hover:bg-purple-600 rounded-md text-sm font-medium`}
  >
    {icon}
    <span className={`${isMobile ? "ml-2" : "ml-2"}`}>{label}</span>
  </Link>
);

export default Navbar;
