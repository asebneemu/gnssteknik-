import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useActiveNav } from "../context/ActiveNavContext";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/1x/logo.png";
import { Link } from "react-router-dom";

export default function TopBar({ setSearching }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data, language, toggleLanguage } = useLanguage();

  const products = data?.products || [];

  const filteredResults = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.typeTitle?.toLowerCase().includes(query)
    );
  });

  // Arama kutusunun temizlenmesi için navigate sonrası sıfırlama işlemi ekliyoruz
  const handleSearchSelect = (product) => {
    navigate(`/category/${product.category}/${product.brand}/${product.id}`);
    setSearchQuery("");  // Arama kutusunu sıfırla
    setSearchActive(false);  // Arama aktiflik durumunu sıfırla
    setSearching(false);  // Navbar'ı geri getir
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center py-4 border-b border-gray-300 z-50 bg-white">
      <div className="w-full max-w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-1/3 mb-4 md:mb-0">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="h-28 lg:h-32 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Arama Kutusu */}
        <div className="w-full max-w-lg flex justify-center relative mb-4 md:mb-0 z-[9999]">
          <div className="relative w-full max-w-md">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="w-full py-3 px-4 pl-10 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={
                language === "tr"
                  ? "Ürün, kategori veya marka..."
                  : "Product, category or brand..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setSearchActive(true);
                setSearching(true); // ✅ SADECE BU — navbarsVisible false YOK ARTIK
              }}
              onBlur={() => {
                setTimeout(() => {
                  setSearchActive(false);
                  setSearching(false); // 🔙 sticky geri
                }, 200);
              }}
            />
          </div>

          {/* Arama Sonuçları */}
          {searchActive && searchQuery && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] max-h-60 overflow-y-auto">
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSearchSelect(product)} // ✅ searchResult'tan seçilince işlemi gerçekleştir
                  className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="text-gray-700">{product.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Sonuç Yok */}
          {searchActive && searchQuery && filteredResults.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] p-3 text-gray-500">
              {language === "tr" ? "Sonuç bulunamadı." : "No results found."}
            </div>
          )}
        </div>

        {/* Denge div’i */}
        <div className="hidden md:block lg:w-1/3" />
      </div>
    </div>
  );
}
