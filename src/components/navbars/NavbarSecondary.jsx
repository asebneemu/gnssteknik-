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

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
    }
  }, [location, setActiveMainPath, setActiveSecondaryPath, setFilteredProducts]);

  useEffect(() => {
    if (activeMainPath) {
      setFilteredBrands(
        newNavbar.filter((brand) => brand.filter.includes(activeMainPath))
      );
    } else {
      setFilteredBrands([]);
    }
  }, [activeMainPath, newNavbar]);

  const handleSecondaryNavClick = (brandPath) => {
    if (activeMainPath) {
      const targetPath = `/category${activeMainPath}${brandPath}`;
      const currentPath = location.pathname;
  
      if (currentPath === targetPath) {
        // Zaten aynı alt kategorideysek bir üst dizine dön
        navigate(`/category${activeMainPath}`);
        setActiveSecondaryPath(null);
      } else {
        setActiveSecondaryPath(brandPath);
        navigate(targetPath);
      }
  
      setFilteredProducts([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // 🔥 Sayfa içi tıklanınca alt navbarı kapat
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isInsideNavbar =
        e.target.closest("nav") || e.target.closest("button") || e.target.closest("img");
      if (!isInsideNavbar) {
        setActiveMainPath(null);
        setActiveSecondaryPath(null);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setActiveMainPath, setActiveSecondaryPath]);
  

  if (!navbarsVisible || !activeMainPath || filteredBrands.length === 0) return null;

  return (
    <nav className="bg-white shadow-md border-b border-gray-300 w-full font-medium">
      <div
        className="w-[80%] mx-auto hidden xl:grid py-0"
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
                  className="w-12 h-12 object-contain transition-all"
                />
              }
              name={item.name}
              path={`/category${activeMainPath}${item.path}`}
              onClick={() => handleSecondaryNavClick(item.path)}
              className={`text-sm xl:text-lg transition-all w-full h-full flex flex-col items-center justify-center ${
                isActive
                  ? "border-2 border-yellow-400 rounded-lg shadow-md"
                  : "text-gray-700"
              } hover:text-yellow-400`}
            />
          );
        })}
      </div>

      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 md:hidden">
        {filteredBrands.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSecondaryNavClick(item.path)}
            className={`text-xs text-center py-2 border-b border-gray-300 ${
              activeSecondaryPath === item.path
                ? "text-yellow-400"
                : "text-gray-700"
            } hover:text-gray-600`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
