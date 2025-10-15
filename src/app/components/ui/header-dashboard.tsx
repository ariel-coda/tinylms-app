import { LogOut } from "lucide-react";

const HeaderDashboard = () => {
  const handleLogout = () => {
    console.log("Déconnexion...");
    // Logique de déconnexion ici
  };

  return (
    <header className="h-16 fixed top-0 left-0 right-0 w-full bg-white backdrop-blur-md z-50 max-lg:backdrop-blur-none max-lg:bg-white py-11 px-16 max-lg:px-8">
      <div className="h-full px-6 md:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="./tinydock.svg"
            alt="Logo TinyDock"
            className="min-w-38 object-contain"
          />
        </div>

        {/* Onglets centraux */}
        <nav className="hidden md:flex items-center gap-10 text-[15px] font-medium text-gray-700">
          <a
            href="#"
            className="hover:text-[#29abe2] transition-colors duration-200"
          >
            Accueil
          </a>
          <a
            href="#"
            className="hover:text-[#29abe2] transition-colors duration-200"
          >
            Comment ça marche
          </a>
        </nav>

        {/* Profil utilisateur et bouton déconnexion */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Profil */}
          <div className="flex items-center gap-3">
            <img
              src="./user-circles.png"
              alt="Avatar utilisateur"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800 leading-tight">
                Jean Dupont
              </p>
              <p className="text-xs text-gray-500">jean.dupont@email.com</p>
            </div>
          </div>

          {/* Bouton Déconnexion */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-colors duration-200 text-sm font-medium"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
