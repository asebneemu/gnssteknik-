import React, { useState, useEffect } from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaWhatsapp, FaGlobe, FaFacebook } from "react-icons/fa";
import data from "../data.json";

const iconMap = {
  FaGlobe: FaGlobe,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaLinkedin: FaLinkedin,
  FaFacebook: FaFacebook,
  FaYoutube: FaYoutube,
  FaWhatsapp: FaWhatsapp,
};

const SocialSidebar = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    if (data.socialLinks) {
      setSocialLinks(data.socialLinks);
    }
  }, []);

  return (
    <div className="fixed bottom-10 right-5 flex flex-col gap-3 z-[999]">
      {socialLinks.map((link, index) => {
        const IconComponent = iconMap[link.icon] || FaGlobe;
        return (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex items-center"
          >
            {/* Açılan kutu - Normalde görünmez, hover ile açılır */}
            <span className="absolute right-12 opacity-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[-10px]">
              {link.name}
            </span>

            {/* Sosyal medya ikonu */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-xl transition-all hover:bg-gray-900">
              <IconComponent />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SocialSidebar;
