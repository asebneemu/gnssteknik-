import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ActiveNavProvider } from "./context/ActiveNavContext";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sayfa Bileşenleri
import HeaderBar from "./components/HeaderBar";
import TopBar from "./components/TopBar";
import NavbarMain from "./components/navbars/NavbarMain";
import NavbarSecondary from "./components/navbars/NavbarSecondary";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import CategoryPage from "./pages/CategoryPage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ComparePage from "./pages/ComparePage";
import CompareButton from "./components/CompareButton";
import CustomersPage from "./pages/CustomersPage";

import { useState } from "react";
import SenceiveSensorPage from "./pages/SenceiveSensorPage";

function AppContent() {
  // 🔥 Arama aktifse navbar sabitliği iptal
  const [searching, setSearching] = useState(false);

  // Path'leri sabit tutuyoruz
  const categoryPath = "/category";
  const categoryWithParamPath = `${categoryPath}/:category`;
  const productListPath = `${categoryPath}/:category/:brand`;
  const productDetailPath = `${categoryPath}/:category/:brand/:productId`;

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <HeaderBar />
      <TopBar setSearching={setSearching} /> {/* 🔥 props olarak gönder */}
      <NavbarMain searching={searching} />    {/* 🔥 arama varsa sabitlik iptal */}
      <NavbarSecondary />
      <CompareButton />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path={categoryPath} element={<CategoryPage />} />
        <Route path={categoryWithParamPath} element={<CategoryPage />} />
        <Route path={productDetailPath} element={<ProductDetailPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/customers" element={<CustomersPage />} />

        {/* Özel sayfa (Senceive tanıtım) */}
        <Route path="/category/sensor/senceive" element={<SenceiveSensorPage />} />

        {/* Ürün listeleme (flatmesh/geowan tıklanınca) */}
        <Route path="/products/senceive" element={<ProductListPage />} />

        {/* Genel ürün listesi */}
        <Route path={productListPath} element={<ProductListPage />} />
   

              </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ActiveNavProvider>
        <CompareProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </CompareProvider>
      </ActiveNavProvider>
    </LanguageProvider>
  );
}
