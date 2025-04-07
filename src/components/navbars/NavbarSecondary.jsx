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
  }, [location.pathname]);

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
              onClick={() => handleSecondaryNavClick(item.path)}
              className={`text-sm lg:text-base w-full h-full flex flex-col items-center justify-center rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-yellow-50 text-yellow-600 border-2 border-yellow-400 shadow"
                  : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
              }`}
            />
          );
        })}
      </div>

      {/* SM ve altı için düğmeler */}
      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 lg:hidden">
        {filteredBrands.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSecondaryNavClick(item.path)}
            className={`text-xs text-center py-2 px-1 rounded-md border border-gray-200 ${
              activeSecondaryPath === item.path
                ? "bg-yellow-100 text-yellow-600"
                : "text-gray-700 hover:text-yellow-500 hover:bg-yellow-50"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
