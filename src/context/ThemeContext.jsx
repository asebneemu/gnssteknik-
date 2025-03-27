import React, { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Theme Context Oluştur
const ThemeContext = createContext();

// 2️⃣ Provider Bileşeni
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3️⃣ Kullanım için hook
export const useTheme = () => useContext(ThemeContext);

// 4️⃣ Toggle Buton Örneği (kullanmak için):
// const { theme, toggleTheme } = useTheme();
// <button onClick={toggleTheme}>{theme === "dark" ? "🌙" : "☀️"}</button>

// 5️⃣ index.js / App.js içinde ThemeProvider ile sarmala
// <ThemeProvider>
//   <App />
// </ThemeProvider>
