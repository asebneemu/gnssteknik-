import { useActiveNav } from "../../context/ActiveNavContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import NavbarLink from "./NavbarLink";

export default function NavbarSecondary() {
  const {
    activeMainPath,
    activeSecondaryPath,
    setActiveSecondaryPath,
    setFilteredProducts,
    navbarsVisible,
    setActiveMainPath,
  } = useActiveNav();

  const [filteredBrands, setFilteredBrands] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useLanguage();
  const { newNavbar = [] } = data;

  // URL değiştiğinde activeMainPath ve activeSecondaryPath'i ayarla
  useEffect(() => {
    const basePath = `/category${activeMainPath || ""}`;
    if (location.pathname === "/") {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
    } else if (activeMainPath && location.pathname.startsWith(basePath)) {
      const pathParts = location.pathname.replace(basePath, "").split("/").filter(Boolean);
      const secondary = pathParts.length > 0 ? `/${pathParts[0]}` : null;
      setActiveSecondaryPath(secondary);
    }
  }, [location.pathname, activeMainPath, setActiveMainPath, setActiveSecondaryPath]);

  // activeMainPath değiştiğinde markaları filtrele
  useEffect(() => {
    if (activeMainPath) {
      setFilteredBrands(
        newNavbar.filter((brand) => brand.filter.includes(activeMainPath))
      );
    } else {
      setFilteredBrands([]);
    }
  }, [activeMainPath, newNavbar]);

  const handleSecondaryNavClick = (brandPath, brandName) => {
    if (activeMainPath) {
      // SEO dostu URL yapısı
      let targetPath = `/category${activeMainPath}/${brandName.toLowerCase().replace(/\s+/g, '-')}`;

      if (brandPath.includes(activeMainPath)) {
        targetPath = `/category${brandPath}/${brandName.toLowerCase().replace(/\s+/g, '-')}`;
      }

      const currentPath = location.pathname;

      if (currentPath === targetPath) {
        navigate(`/category${activeMainPath}`);
        setActiveSecondaryPath(null);
        sessionStorage.removeItem("activeSecondaryPath"); // Seçimi sıfırla
      } else {
        setActiveSecondaryPath(brandPath);
        sessionStorage.setItem("activeSecondaryPath", brandPath); // Seçimi kaydet
        navigate(targetPath);
      }

      setFilteredProducts([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!navbarsVisible || !activeMainPath || filteredBrands.length === 0) {
    return null;
  }

  return (
    <nav className="shadow-inner border-b border-gray-200 w-full font-medium bg-gradient-to-r from-[#f5f5f5] via-[#f0ead6] to-[#fce4e4]">
      {/* LG ve üstü için grid düzeni */}
      <div
        className="w-[80%] mx-auto hidden lg:grid py-2"
        style={{ gridTemplateColumns: `repeat(10, minmax(0, 1fr))` }}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          const item = filteredBrands[index];
          if (!item) return <div key={`empty-${index}`} />;

          const isActive = activeSecondaryPath === item.path;

          return (
            <NavbarLink
              key={index}
              icon={
                <img
                  src={`/${item.icon}`}
                  alt={item.name}
                  className="w-12 h-12 object-contain transition-all drop-shadow-sm"
                />
              }
              name={item.name}
              path={`/category${activeMainPath}${item.path}`}
              onClick={() => handleSecondaryNavClick(item.path, item.name)}
              className={`text-sm lg:text-base w-full h-full flex flex-col items-center justify-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-50 text-yellow-600 border-2 border-yellow-400 shadow"
                  : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
              }`}
            />
          );
        })}
      </div>

      {/* SM ve altı için düğmeler (yalnızca mobil) */}
<div className="w-[90%] mx-auto flex gap-3 py-4 px-2 overflow-x-auto lg:hidden">
  {filteredBrands.map((item, index) => (
    <button
      key={index}
      onClick={() => handleSecondaryNavClick(item.path, item.name)}
      className="
        flex-shrink-0
        whitespace-nowrap
        text-xs py-2 px-3
        rounded-md border border-gray-200
        transition-colors duration-200
        hover:text-yellow-500 hover:bg-yellow-50
        focus:outline-none
        {activeSecondaryPath === item.path 
          ? 'bg-yellow-100 text-yellow-600' 
          : 'text-gray-700'}
      "
    >
      {item.name}
    </button>
  ))}
</div>

    </nav>
  );
}
