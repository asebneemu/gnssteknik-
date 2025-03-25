import { createContext, useContext, useState } from "react";

const ActiveNavContext = createContext();

export const ActiveNavProvider = ({ children }) => {
  const [activeMainPath, setActiveMainPath] = useState(null);
  const [activeSecondaryPath, setActiveSecondaryPath] = useState(null);
  const [navbarsVisible, setNavbarsVisible] = useState(true); // 🔥 Yeni state
  const [filteredProducts, setFilteredProducts] = useState([]); // 🔥 Yeni state

  return (
    <ActiveNavContext.Provider
      value={{
        activeMainPath,
        setActiveMainPath,
        activeSecondaryPath,
        setActiveSecondaryPath,
        navbarsVisible,
        setNavbarsVisible, // ✅ Navbarları yönetmek için
        filteredProducts, // ✅ Yeni state
        setFilteredProducts, // ✅ Güncelleme fonksiyonu
      }}
    >
      {children}
    </ActiveNavContext.Provider>
  );
};

export const useActiveNav = () => useContext(ActiveNavContext);
