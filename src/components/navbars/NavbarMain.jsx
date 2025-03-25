import { useActiveNav } from "../../context/ActiveNavContext";
import { useData } from "../../context/DataContext";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import { useEffect } from "react";

export default function NavbarMain() {
  const { mainNavbar } = useData();

  console.log("NavbarMain - mainNavbar:", mainNavbar);  // Debug log
  
  const { 
    activeMainPath, 
    setActiveMainPath, 
    setActiveSecondaryPath, 
    setFilteredProducts, 
    navbarsVisible 
  } = useActiveNav();
  const navigate = useNavigate();
  const location = useLocation();

  if (!navbarsVisible) return null;

  // ✅ Kategori tıklama fonksiyonu
  const handleMainNavClick = (path) => {
    if (activeMainPath === path) {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
      setTimeout(() => {
        navigate("/kategori");
      }, 0);
    } else {
      setActiveMainPath(path);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
      navigate(`/kategori${path}`);
    }
  };

  // ✅ Anasayfaya dönüldüğünde seçimleri sıfırla
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
    }
  }, [location, setActiveMainPath, setActiveSecondaryPath, setFilteredProducts]);

  return (
    <nav className="bg-[rgba(255,255,255,0.9)] shadow-md border-b border-gray-300 sticky top-0 w-full z-50 font-medium">
      {/* 🔥 XL ve üstü: İkon üstte, yazı altta */}
      <div className="w-[80%] mx-auto hidden xl:grid gap-6 grid-cols-10 py-4">
        {mainNavbar.map((item, index) => {
          const isActive = activeMainPath === item.path;

          return (
            <div key={index} className="flex flex-col items-center">
              <NavbarLink
                icon={
                  <img src={import.meta.env.BASE_URL + item.icon} alt={item.name} className="w-12 h-12 object-contain transition-all" />

                }
                name={item.name}
                path={`/kategori${item.path}`}
                onClick={() => handleMainNavClick(item.path)}
                className={`text-sm xl:text-lg px-8 transition-all
                  ${isActive ? 'border-2 border-orange-500 rounded-lg shadow-md' : 'text-gray-700'}
                  hover:text-orange-500`}
              />
            </div>
          );
        })}
      </div>

      {/* 🔥 XL altı: İkon ve yazı yan yana olacak */}
      <div className="w-[80%] mx-auto hidden md:grid xl:hidden grid-cols-5 gap-4 py-4 border-b">
        {mainNavbar.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              activeMainPath === item.path ? 'text-orange-500 border-orange-500' : 'text-gray-700 border-gray-300'
            }`}
          >
            {/* 🔥 İkonun boyutu her aşamada küçülecek, bir noktada kaybolacak */}
            <img 
              src={`/${item.icon}`} 
              alt={item.name} 
              className="transition-all 
                w-10 md:w-8 lg:w-6
                md:inline-block sm:hidden"
            /> 

            {/* 🔥 Yazının boyutu da küçülecek */}
            <button 
              onClick={() => handleMainNavClick(item.path)} 
              className="transition-all w-full hover:text-orange-500
                text-lg md:text-base sm:text-sm"
            >
              {item.name}  
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 MD altı: İkon gizlenmiş, sadece yazı gösterilecek */}
      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 md:hidden border-b">
        {mainNavbar.map((item, index) => (
          <div 
            key={index} 
            className={`text-center border-b ${activeMainPath === item.path ? 'text-orange-500 border-orange-500' : 'text-gray-700 border-gray-300'}`}
          >
            <button 
              onClick={() => handleMainNavClick(item.path)} 
              className="text-xs transition-all w-full hover:text-orange-500"
            >
              {item.name}  
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}
