// src/context/DataContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import dataJSON from "../data.json";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState({
    mainNavbar: [],
    newNavbar: [],
    products: [],
    socialLinks: [],
    infoCards: [],
    teamCards: [],
    testimonials: [],
    references: [],
    customStories: [],
    sideBySideCards: [],
    pageSections: [] 
  });

  useEffect(() => {
    setData(dataJSON);
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
