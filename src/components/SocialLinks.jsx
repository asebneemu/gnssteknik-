// src/components/SocialSidebar.jsx
import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaGlobe,
  FaFacebook,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import data from "../data-tr.json";

const iconMap = {
  FaGlobe: FaGlobe,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaLinkedin: FaLinkedin,
  FaFacebook: FaFacebook,
  FaYoutube: FaYoutube,
  FaWhatsapp: FaWhatsapp,
};

export default function SocialSidebar() {
  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (data.socialLinks) setLinks(data.socialLinks);
  }, []);

  return (
    <>
      <style>
        {`
          /* Kapanırken butona doğru süpür */
          @keyframes sweep-out {
            0%   { opacity: 1; transform: translateX(0) scale(1); }
            50%  { opacity: 0.5; transform: translateX(1rem) scale(0.8); }
            100% { opacity: 0;   transform: translateX(2.5rem) scale(0.5); }
          }
          /* Açılırken butondan dışarı fırlayıp yerleş */
          @keyframes sweep-in {
            0%   { opacity: 0;   transform: translateX(2.5rem) scale(0.5); }
            50%  { opacity: 0.6; transform: translateX(1rem) scale(1.2); }
            100% { opacity: 1;   transform: translateX(0) scale(1); }
          }
        `}
      </style>

      <div
        className="fixed bottom-10 right-4 z-[999] flex flex-col items-end"
        style={{ gap: "0.5rem" }}
      >
        {/* Sosyal ikonlar */}
        {links.map((link, idx) => {
          const Icon = iconMap[link.icon] || FaGlobe;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-gray-800 shadow-lg"
              style={{
                animation: `${
                  open ? "sweep-in" : "sweep-out"
                } 400ms ease forwards`,
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <Icon size={20} />
            </a>
          );
        })}

        {/* Toggle Butonu */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full hover:bg-gray-700 transition"
        >
          {open ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>
    </>
  );
}
