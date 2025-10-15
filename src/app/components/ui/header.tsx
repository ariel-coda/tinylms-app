import { TextAlignEnd } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [ismenuvisible, setMenuvisible] = useState<boolean>(false);

  {
    /* Fonction du menu responsive */
  }
  const handleMobileMenu = () => {
    setMenuvisible(!ismenuvisible);
  };

  return (
    <div className="h-16 bg-white backdrop-blur-xl max-lg:backdrop-blur-none max-lg:bg-white fixed top-0 left-0 right-0 w-full py-11 px-20 max-lg:px-8 flex items-center justify-between">
      <div className="p-2 overflow-hidden">
        <img src="./tinydock.svg" alt="logo de tinydock" className="min-w-38" />
      </div>

      {/* Header de base */}
      <div className="menu">
        <ul className="list-menu flex items-center justify-between space-x-8 text-[15px] max-lg:hidden">
          <li className="onglet-menu hover:text-[#29abe2] transition">
            Accueil
          </li>
          {/* <li className="onglet-menu">A propos de nous</li>
          <li className="onglet-menu">Nos tarifs</li>*/}
          <li className="onglet-menu">Se connecter</li>
          <button className="btn-header">Commencez ici</button>
        </ul>
      </div>

      {/* Hamburger menu icon */}
      <div className="menu-icon lg:hidden">
        <button onClick={handleMobileMenu}>
          {" "}
          {ismenuvisible ? <TextAlignEnd size={30} className="text-[#29abe2]" /> : <TextAlignEnd size={30} /> }
        </button>
      </div>

      {/* Header responsive */}
      <div className= {ismenuvisible ? `menu-responsive min-h-screen absolute w-full bg-white backdrop-blur-md top-24 left-0 bottom-0 p-10 lg:hidden` : `hidden` }>
        <ul className="list-menu text-[15px] flex-col justify-center items-center text-center space-y-8">
          <li className="onglet-menu">
            Accueil
          </li>
          {/*<hr className="text-gray-100" />
          <li className="onglet-menu">A propos de nous</li>
          <hr className="text-gray-100" />
          <li className="onglet-menu">Nos tarifs</li>
          <hr className="text-gray-100" />*/}
          <button className="btn-header-responsive text-center w-full">
            Commencez ici
          </button>
          <li className="not-onglet-menu">
            Vous avez déjà un compte ? <a href="#" className="text-[#29abe2] hover:underline">Connectez-vous</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
