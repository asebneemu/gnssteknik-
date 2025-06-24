import React, { createContext, useState, useEffect, useContext } from "react";
import dataEN from "../data-en.json";
import dataTR from "../data-tr.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Yerel depolamada dil varsa onu kullan, yoksa varsayılan olarak "tr" kullan
  const [language, setLanguage] = useState(localStorage.getItem("language") || "tr");
  const [data, setData] = useState(language === "tr" ? dataTR : dataEN);

  useEffect(() => {
    if (language === "en") {
      setData(dataEN);
    } else if (language === "tr") {
      setData(dataTR);
    }
    // Dil değişikliğini yerel depolamaya kaydet
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "tr" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, data, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
export { LanguageContext }; // bunu mutlaka ekle
