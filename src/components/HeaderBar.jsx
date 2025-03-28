import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faBook, faHome, faUserFriends, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function HeaderBar() {
  const [copied, setCopied] = useState(false);
  const { language, toggleLanguage } = useLanguage(); // toggleLanguage eklendi

  const handleCopy = () => {
    navigator.clipboard.writeText("+90 312 285 1420");
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="w-full bg-gray-800 text-white text-sm relative">
      <div className="max-w-[80%] mx-auto flex items-center justify-between py-3">
        
        {/* 🔥 Sol Taraf - Anasayfa */}
        <div className="flex items-center space-x-2">
          <NavLink
            to="/"
            className="flex items-center space-x-4 md:space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faHome} />
            <span className="text-base md:text-sm">
              {language === "tr" ? "Anasayfa" : "Home"}
            </span>
          </NavLink>
        </div>

        {/* 🔥 Orta Taraf */}
        <div className="flex flex-grow justify-end md:justify-start items-center space-x-6 mx-4">
          <NavLink
            to="/aboutus"
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faBook} />
            <span className="hidden md:inline">
              {language === "tr" ? "Hakkımızda" : "About Us"}
            </span>
          </NavLink>
          
          {/* <NavLink
            to="/customers"
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faUserFriends} />
            <span className="hidden md:inline">
              {language === "tr" ? "Blog" : "Customer Stories"}
            </span>
          </NavLink> */}
          
        </div>

        {/* 🔥 Sağ Taraf - Tıklayınca Kopyala */}

         {/* 🔥 Sağ Taraf - Dil Butonu + Telefon */}
        <div className="flex items-center space-x-6">
          {/* 🌐 Dil Butonu */}
          <div
            onClick={toggleLanguage}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-300 transition"
            title="Change Language"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-xl text-white" />
            <span className="text-white text-sm">
              {language === "tr" ? "TR" : "EN"}
            </span>
          </div>

          {/* 📞 Telefon */}
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none cursor-pointer"
          >
            <FontAwesomeIcon className="text-2xl md:text-base" icon={faPhone} />
            <span className="hidden md:inline">+90 312 285 1420</span>
          </button>
        </div>
      </div>

      {/* ✅ Kopyalandı bildirimi */}
      {copied && (
        <div className="absolute right-5 top-3 bg-green-600 text-white px-3 py-1 rounded-xl text-xs shadow-md transition-all">
          {language === "tr" ? "Kopyalandı!" : "Copied!"}
        </div>
      )}
    </div>
  );
}
