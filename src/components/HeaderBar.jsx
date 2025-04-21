import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faBook,
  faHome,
  faGlobe,
  faEnvelope,
  faShieldHalved // KVKK için ikon
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { useLanguage } from "../context/LanguageContext";

export default function HeaderBar() {
  const [copied, setCopied] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const handleCopy = () => {
    if (isMobileDevice()) {
      window.location.href = "tel:+903122851420";
    } else {
      navigator.clipboard.writeText("+90 312 285 1420");
      setCopied(true);
    }
  };

  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
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

          <NavLink
            to="/kvkk"
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none"
          >
            <FontAwesomeIcon className="text-xl md:text-base" icon={faShieldHalved} />
            <span className="hidden md:inline">KVKK</span>
          </NavLink>
        </div>

        <div className="flex items-center space-x-6">
          {/* <div
            onClick={toggleLanguage}
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-300 transition"
            title="Change Language"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-xl text-white" />
            <span className="text-white text-sm">
              {language === "tr" ? "TR" : "EN"}
            </span>
          </div> */}

          <HashLink smooth to="/#contact-form" className="flex items-center space-x-2 hover:opacity-80 focus:outline-none cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl md:text-base" />
            <span className="hidden md:inline">info@gnssteknik.com.tr</span>
          </HashLink>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 hover:opacity-80 focus:outline-none cursor-pointer"
          >
            <FontAwesomeIcon className="text-2xl md:text-base" icon={faPhone} />
            <span className="hidden md:inline">+90 312 285 1420</span>
          </button>
        </div>
      </div>

      {copied && (
        <div className="absolute right-5 top-3 bg-green-600 text-white px-3 py-1 rounded-xl text-xs shadow-md transition-all">
          {language === "tr" ? "Kopyalandı!" : "Copied!"}
        </div>
      )}
    </div>
  );
}
