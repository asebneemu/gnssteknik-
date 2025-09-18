import React, { createContext, useState, useEffect, useContext } from "react";
import dataEN from "../data-en.json";
import dataTR from "../data-tr.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "tr");
  const [data, setData] = useState(language === "tr" ? dataTR : dataEN);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    if (language === "en") {
      setData(dataEN);
    } else if (language === "tr") {
      setData(dataTR);
    }
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "tr" : "en"));
  };

  const resetSelections = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("selectedBrand");
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        data,
        toggleLanguage,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        resetSelections,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
export { LanguageContext };
