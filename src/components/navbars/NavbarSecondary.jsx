import { useActiveNav } from "../../context/ActiveNavContext";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import data from "../../data.json";
import NavbarLink from "./NavbarLink";

export default function NavbarSecondary() {
  const { 
    activeMainPath, 
    activeSecondaryPath, 
    setActiveSecondaryPath, 
    setFilteredProducts, 
    navbarsVisible, 
    setActiveMainPath 
  } = useActiveNav();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Anasayfaya dönüldüğünde seçimleri sıfırla
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
    }
  }, [location]);

  // ✅ Seçilen ana kategoriye göre alt markaları filtrele
  useEffect(() => {
    if (activeMainPath) {
      setFilteredBrands(data.newNavbar.filter((brand) =>
        brand.filter.includes(activeMainPath)
      ));
    } else {
      setFilteredBrands([]);
    }
  }, [activeMainPath]);

  // ✅ Alt navbar tıklama fonksiyonu (MainNavbar mantığı ile)
  const handleSecondaryNavClick = (brandPath) => {
    if (activeMainPath) {
      const targetPath = `/kategori${activeMainPath}${brandPath}`;
      const currentPath = location.pathname;

      if (activeSecondaryPath === brandPath) {
        setActiveSecondaryPath(null);
        setFilteredProducts([]);
        setTimeout(() => {
          navigate(`/kategori${activeMainPath}`);
        }, 0);
      } else {
        setActiveSecondaryPath(brandPath);
        setFilteredProducts([]);
        navigate(targetPath);
      }
    }
  };

  // ✅ Navbar görünürlüğü ve marka kontrolü
  if (!navbarsVisible || filteredBrands.length === 0) return null;

  return (
    <nav className="bg-white shadow-md border-b border-gray-300 sticky top-[100px] md:top-[155px] lg:top-[150px] w-full z-50">

      {/* 🔥 md ve üstü: İkonlu ve normal görünüm */}
      <div className="w-[80%] mx-auto grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 py-4 hidden md:grid">
        {filteredBrands.map((item, index) => (
          <div key={index} className="flex flex-col items-start">
            <NavbarLink
              icon={
                <img
                  src={`/${item.icon}`}
                  alt={item.name}
                  className="w-12 h-12 object-contain transition-all"
                />
              }
              name={item.name}
              path={`/kategori${activeMainPath}${item.path}`}
              onClick={() => handleSecondaryNavClick(item.path)}
              className={`text-base lg:text-lg font-medium px-8 py-4 transition-all ${
                activeSecondaryPath === item.path
                  ? "hover:text-yellow-400 border-2 border-yellow-400 rounded-lg shadow-md"
                  : "text-gray-800"
              } hover:text-gray-600`}
            />
          </div>
        ))}
      </div>

      {/* 🔥 md altı: Beş sütun düzeni ve ikonsuz görünüm */}
      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 md:hidden">
        {filteredBrands.map((item, index) => (
          <button 
            key={index} 
            onClick={() => handleSecondaryNavClick(item.path)} 
            className={`text-xs text-center py-2 border-b border-gray-300 ${
              activeSecondaryPath === item.path ? 'text-yellow-400' : 'text-gray-700'
            } hover:text-gray-600`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
