import { createContext, useContext, useState, useEffect } from "react";

const ActiveNavContext = createContext();

export const ActiveNavProvider = ({ children }) => {
  const [activeMainPath, setActiveMainPath] = useState(null);
  const [activeSecondaryPath, setActiveSecondaryPath] = useState(null);
  const [navbarsVisible, setNavbarsVisible] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Sayfa yüklendiğinde seçimleri sessionStorage'dan al
  useEffect(() => {
    const savedMainPath = sessionStorage.getItem("activeMainPath");
    const savedSecondaryPath = sessionStorage.getItem("activeSecondaryPath");

    if (savedMainPath) setActiveMainPath(savedMainPath);
    if (savedSecondaryPath) setActiveSecondaryPath(savedSecondaryPath);
  }, []);

  // Seçimler değiştiğinde sessionStorage'a kaydet
  useEffect(() => {
    if (activeMainPath) {
      sessionStorage.setItem("activeMainPath", activeMainPath);
    } else {
      sessionStorage.removeItem("activeMainPath");
    }

    if (activeSecondaryPath) {
      sessionStorage.setItem("activeSecondaryPath", activeSecondaryPath);
    } else {
      sessionStorage.removeItem("activeSecondaryPath");
    }
  }, [activeMainPath, activeSecondaryPath]);

  return (
    <ActiveNavContext.Provider
      value={{
        activeMainPath,
        setActiveMainPath,
        activeSecondaryPath,
        setActiveSecondaryPath,
        navbarsVisible,
        setNavbarsVisible,
        filteredProducts,
        setFilteredProducts,
      }}
    >
      {children}
    </ActiveNavContext.Provider>
  );
};

export const useActiveNav = () => useContext(ActiveNavContext);
