import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useActiveNav } from "../context/ActiveNavContext";
import { useLanguage } from "../context/LanguageContext"; // useLanguage hook'u ekleniyor
import logo from "../assets/1x/logo.png";

export default function TopBar() {
  const { navbarsVisible, setNavbarsVisible } = useActiveNav();
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data, language, toggleLanguage } = useLanguage(); // Dil ve veri context'i alınıyor

  // Fallback veri ekliyoruz, eğer products yoksa boş bir dizi veririz
  const products = data?.products || [];

  // Arama sonuçları
  const filteredResults = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.typeTitle?.toLowerCase().includes(query)
    );
  });

  // Dil değiştirildiğinde sayfa yönlendirmesini doğru yapma
  const handleLanguageToggle = () => {
    toggleLanguage(); // Dil değiştiriliyor
    // Dil değiştiğinde, kategori yerine her zaman category kullanıyoruz
    const currentPath = window.location.pathname;
    if (currentPath.includes("category")) {
      navigate(currentPath); // Path zaten category ise değişiklik yapma
    }
  };

  return (
    <div className="relative flex flex-col lg:flex-row items-center py-4 border-b border-gray-300 z-50">
      <div className="w-full max-w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-1/3 mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-28 lg:h-32 object-contain" />
        </div>

        {/* Arama Kutusu */}
        <div className="w-full max-w-lg flex justify-center relative mb-4 md:mb-0">
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

          {/* Sonuçları Göster */}
          {searchActive && searchQuery && filteredResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] max-h-60 overflow-y-auto">
              {filteredResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    navigate(
                      `/category/${product.category}/${product.brand}/${product.id}`
                    );
                    setSearchActive(false);
                    setNavbarsVisible(true);
                  }}
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

          {/* Sonuç yoksa */}
          {searchActive && searchQuery && filteredResults.length === 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md z-[9999] p-3 text-gray-500">
              {language === "tr" ? "Sonuç bulunamadı." : "No results found."}
            </div>
          )}
        </div>

        {/* Denge div'i */}
        <div className="hidden md:block lg:w-1/3"></div>
      </div>
    </div>
  );
}
