import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGlobe, faSun } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useActiveNav } from "../context/ActiveNavContext";
import data from "../data.json";
import logo from "../assets/1x/logo.png";

export default function TopBar() {
  const { navbarsVisible, setNavbarsVisible } = useActiveNav();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredResults = data.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex flex-col lg:flex-row items-center my-8 py-4 border-b border-gray-300 z-50">
      {/* 🔥 Yüzde 80 genişlikte ana kapsayıcı */}
      <div className="w-full max-w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between relative">
        
        {/* 🔥 Logo (Sola Yaslandı, md altı için ortalanacak) */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-1/3 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-28 lg:h-32 object-contain" />
        </div>

        {/* 🔎 Arama Kutusu (Ortada, md altı için alt alta) */}
        <div className="w-full max-w-lg flex justify-center relative mb-4 md:mb-0">
          <div className="relative w-full max-w-md">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="w-full py-3 px-4 pl-10 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ürün, kategori veya marka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setSearchActive(true);
                setNavbarsVisible(false);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSearchActive(false);
                  setNavbarsVisible(true);
                }, 200);
              }}
            />
          </div>

          {/* 🔥 Sonuçları Göster */}
          {searchActive && searchQuery && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] max-h-60 overflow-y-auto">
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(`/${product.category}/${product.brand}/${product.id}`);
                    setSearchActive(false);
                    setNavbarsVisible(true);
                  }}
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-gray-700">{product.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* 🔴 Eğer sonuç yoksa boş mesaj göster */}
          {searchActive && searchQuery && filteredResults.length === 0 && (
            <div
              className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] p-3 text-gray-500"
            >
              Sonuç bulunamadı.
            </div>
          )}
        </div>

        {/* 🔥 Dil & Tema Butonları (Yüzde 80 genişlik içinde sağda ve tam üste yaslandı) */}
        <div className="absolute top-0 right-0 flex items-center space-x-4 justify-end lg:w-1/3 transform -translate-y-8">
          <div className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faGlobe} className="text-xl text-gray-700" />
            <span className="text-gray-700 text-sm">TR</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faSun} className="text-xl text-gray-700" />
            <span className="text-gray-700 text-sm">Light Mode</span>
          </div>
        </div>

        {/* 🔥 Boş Div (Dengelemek için) */}
        <div className="hidden md:block lg:w-1/3"></div>
      </div>
    </div>
  );
}
