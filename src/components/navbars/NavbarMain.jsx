import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useActiveNav } from "../../context/ActiveNavContext";
import { useLanguage } from "../../context/LanguageContext";
import NavbarLink from "./NavbarLink";

export default function NavbarMain({ searching }) {
  const { language, data } = useLanguage();
  const navbarItems = data?.mainNavbar || [];

  const {
    activeMainPath,
    setActiveMainPath,
    setActiveSecondaryPath,
    setFilteredProducts,
    navbarsVisible,
  } = useActiveNav();

  const navigate = useNavigate();
  const location = useLocation();

  // Sayfa yüklendiğinde localStorage'dan aktif yolu yükle
  useEffect(() => {
    const savedPath = localStorage.getItem("activeMainPath");
    if (savedPath) {
      setActiveMainPath(savedPath);
    }
  }, [setActiveMainPath]);

  // Başka bir sayfaya gidildiğinde seçimleri sıfırla
  useEffect(() => {
    if (!location.pathname.startsWith("/category")) {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      localStorage.removeItem("activeMainPath");
      localStorage.removeItem("activeSecondaryPath");
    }
  }, [location.pathname, setActiveMainPath, setActiveSecondaryPath]);

  const handleMainNavClick = (path) => {
    const basePath = "/category";
    const currentPath = location.pathname;

    // URL'yi oluştururken `activeMainPath`'i tekrar etmiyoruz
    const updatedPath = `${basePath}${path}`;

    if (activeMainPath === path) {
      navigate(basePath);
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      localStorage.removeItem("activeMainPath"); // Seçimi sıfırla
    } else {
      navigate(updatedPath);  // Sadece `path` ile yönlendir
      setActiveMainPath(path);
      setActiveSecondaryPath(null);
      localStorage.setItem("activeMainPath", path); // Seçimi kaydet
    }

    setFilteredProducts([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`${
        searching
          ? "relative z-0 shadow-none"
          : "sticky top-0 z-50 shadow-md bg-[rgba(255,255,255,0.9)]"
      } border-b border-gray-300 w-full font-medium`}
    >
      {/* 🔥 XL ÜSTÜ: Grid olarak ikon üstte yazı altta */}
      <div
        className="w-[80%] mx-auto hidden xl:grid py-2"
        style={{
          gridTemplateColumns: `repeat(${navbarItems.length}, minmax(0, 1fr))`,
        }}
      >
        {navbarItems.map((item, index) => {
          const isActive = activeMainPath === item.path;

          return (
            <NavbarLink
              key={index}
              icon={
                <img
                  src={import.meta.env.BASE_URL + item.icon}
                  alt={item.name}
                  className="w-12 h-12 object-contain transition-all"
                />
              }
              name={item.name}
              path={`/category${item.path}`}  // Path'i SEO dostu hale getirdim
              onClick={() => handleMainNavClick(item.path)}  // Buradaki path'i doğru şekilde yönlendiriyoruz
              className={`text-sm xl:text-lg transition-all w-full h-full flex flex-col items-center justify-center rounded-xl px-4 py-3 ${
                isActive
                  ? "bg-orange-50 text-orange-600 border-2 border-orange-400 shadow"
                  : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
              }`}
            />
          );
        })}
      </div>

      {/* 🔥 MD–XL ARASI: ikon solda yazı sağda */}
      <div className="w-[80%] mx-auto hidden md:grid xl:hidden grid-cols-5 gap-4 py-4 border-b">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              activeMainPath === item.path
                ? "text-orange-500 border-orange-500"
                : "text-gray-700 border-gray-300"
            }`}
          >
            <img
              src={`/${item.icon}`}
              alt={item.name}
              className="transition-all w-10 md:w-8 lg:w-6 md:inline-block sm:hidden"
            />
            <button
              onClick={() => handleMainNavClick(item.path)}
              className="transition-all w-full hover:text-orange-500 text-lg md:text-base sm:text-sm "
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>

      {/* 🔥 SM ALTI: sadece yazı */}
      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 md:hidden border-b">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            className={`text-center border-b ${
              activeMainPath === item.path
                ? "text-orange-500 border-orange-500"
                : "text-gray-700 border-gray-300"
            }`}
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
