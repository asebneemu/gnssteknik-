import { useActiveNav } from "../../context/ActiveNavContext";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarLink from "./NavbarLink";
import { useEffect } from "react";

export default function NavbarMain() {
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

  // Log navbarItems to debug
  console.log("Navbar Items:", navbarItems);

  const handleMainNavClick = (path) => {
    const basePath = "/category";
    if (activeMainPath === path) {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
      navigate(basePath);
    } else {
      setActiveMainPath(path);
      setActiveSecondaryPath(null);
      setFilteredProducts([]);
      navigate(`${basePath}${path}`);
    }
  };

  useEffect(() => {
    const basePath = "/category";
    if (!location.pathname.startsWith(basePath)) {
      setActiveMainPath(null);
      setActiveSecondaryPath(null);
    }
  }, [location.pathname, setActiveMainPath, setActiveSecondaryPath]);

  if (!navbarsVisible) return null;

  return (
    <nav className="bg-[rgba(255,255,255,0.9)] shadow-md border-b border-gray-300 sticky top-0 w-full z-50 font-medium">
      <div
  className={`w-[80%] mx-auto hidden xl:grid py-0`}
  style={{ gridTemplateColumns: `repeat(${navbarItems.length}, minmax(0, 1fr))` }}
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
        path={`/category${item.path}`}
        onClick={() => handleMainNavClick(item.path)}
        className={`text-sm xl:text-lg transition-all w-full h-full flex flex-col items-center justify-center ${
          isActive
            ? "border-2 border-orange-500 rounded-lg shadow-md"
            : "text-gray-700"
        } hover:text-orange-500`}
      />
    );
  })}
</div>


      <div className="w-[80%] mx-auto hidden md:grid xl:hidden grid-cols-5 gap-4 py-4 border-b">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
              activeMainPath === item.path ? "text-orange-500 border-orange-500" : "text-gray-700 border-gray-300"
            }`}
          >
            <img
              src={`/${item.icon}`}
              alt={item.name}
              className="transition-all w-10 md:w-8 lg:w-6 md:inline-block sm:hidden"
            />

            <button
              onClick={() => handleMainNavClick(item.path)}
              className="transition-all w-full hover:text-orange-500 text-lg md:text-base sm:text-sm"
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>

      <div className="w-[80%] mx-auto grid grid-cols-5 gap-4 py-4 md:hidden border-b">
        {navbarItems.map((item, index) => (
          <div
            key={index}
            className={`text-center border-b ${
              activeMainPath === item.path ? "text-orange-500 border-orange-500" : "text-gray-700 border-gray-300"
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
