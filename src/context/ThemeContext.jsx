import React, { createContext, useState, useContext, useEffect } from "react";

// Tema context'i oluşturuyoruz
const ThemeContext = createContext();

// Tema sağlayıcı bileşeni
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode bilgisini localStorage'dan alıyoruz (önceki seçim kaybolmasın diye)
  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Dark mode değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Seçilen temayı localStorage'da tutuyoruz
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Tema context'ini kullanma hook'u
export const useTheme = () => useContext(ThemeContext);
