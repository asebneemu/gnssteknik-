import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBook, faHome, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";

export default function HeaderBar() {
  return (
    <div className="w-full bg-gray-800 text-white text-sm">
      <div className="max-w-[80%] mx-auto flex items-center justify-between py-3">
        
        {/* 🔥 Sol Taraf - Anasayfa (Her zaman solda kalacak, yazı kaybolmayacak ve md altında büyüyecek) */}
        <div className="flex items-center space-x-2">
          <NavLink
            to="/"
            className="flex items-center space-x-4 md:space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faHome} />
            <span className="text-base md:text-sm">Anasayfa</span> {/* 🔥 md altında büyü, md üstü eski hali */}
          </NavLink>
        </div>

        {/* 🔥 Orta Taraf - Hakkımızda ve Müşteri Hikayeleri (md altında sağa yaslanacak) */}
        <div className="flex flex-grow justify-end md:justify-start items-center space-x-6 mx-4">
          <NavLink
            to="/aboutus"
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faBook} />
            <span className="hidden md:inline">Hakkımızda</span> {/* 🔥 md altı: Kaybol */}
          </NavLink>

          <NavLink
            to="/customers"
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faUserFriends} />
            <span className="hidden md:inline">Blog</span> {/* 🔥 md altı: Kaybol */}
          </NavLink>
        </div>

        {/* 🔥 Sağ Taraf - Telefon Bilgisi (Her zaman sağda sabit kalacak, space-x-6 ile eşit mesafe) */}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon className="text-2xl md:text-base" icon={faPhone} />
          <span className="hidden md:inline">+90 555 555 55 55</span> {/* 🔥 md altı: Kaybol */}
        </div>
      </div>
    </div>
  );
}
