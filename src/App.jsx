import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ActiveNavProvider } from "./context/ActiveNavContext";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";

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
import SectorsPage from "./pages/SectorsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SectorDetailPage from "./pages/SectorDetailPage";
import SensorBenewakePage from "./pages/SensorBenewakePage";

import ScrollToTop from "./components/ScrollToTop";
import KvkkPage from "./pages/KvkkPage"; // 👈 KVKK sayfanı içe aktar
import BenewakeApplicationsPage from "./pages/BenewakeApplicationsPage";
import DjiMainPage from "./pages/DjiMainPage";
import ThreeDSurveyPage from "./pages/ThreeDSurveyPage";


function AppContent() {
  // 🔥 Arama aktifse navbar sabitliği iptal
  const [searching, setSearching] = useState(false);

  // SEO dostu URL'ler için düzenlemeler
  const categoryPath = "/category";
  const categoryWithParamPath = `${categoryPath}/:category`;  // Kategori URL'si
  const productListPath = `${categoryPath}/:category/:brand`;  // Marka URL'si
  const productDetailPath = `${categoryPath}/:category/:brand/:productName`;  // Ürün URL'si ismiyle düzenlendi

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <HeaderBar />
      <TopBar setSearching={setSearching} /> {/* 🔥 props olarak gönder */}
      <NavbarMain searching={searching} />    {/* 🔥 arama varsa sabitlik iptal */}
      <NavbarSecondary />
      <CompareButton />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/kvkk" element={<KvkkPage />} /> {/* 👈 KVKK route'u burada */}

        {/* SEO Dostu URL'ler Eklenmiştir */}
        <Route path="/category/yazilim/3dsurvey" element={<ThreeDSurveyPage />} /> {/* SEO dostu URL, boşluk yerine "-" kullanıldı */}

        {/* Kategori sayfası URL'si */}
        <Route path={categoryPath} element={<CategoryPage />} />
        <Route path={categoryWithParamPath} element={<CategoryPage />} />
        <Route path={productDetailPath} element={<ProductDetailPage />} />  {/* Ürün ID yerine ürün ismiyle düzenlendi */}
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/customers" element={<CustomersPage />} />

        {/* Özel sayfa (Senceive tanıtım) */}
        <Route path="/category/sensor/senceive" element={<SenceiveSensorPage />} />
        <Route path="/category/sensor/benewake" element={<SensorBenewakePage />} />
        <Route path="/category/iha/dji" element={<DjiMainPage />} />

        {/* Ürün listeleme (flatmesh/geowan tıklanınca) */}
        <Route path="/products/senceive" element={<ProductListPage />} />
        <Route path="/products/benewake" element={<ProductListPage />} />

        {/* Genel ürün listesi */}
        <Route path={productListPath} element={<ProductListPage />} />
        <Route path="/sectors" element={<SectorsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/benewake-applications" element={<BenewakeApplicationsPage />} />
        <Route path="/sector/:id" element={<SectorDetailPage />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ActiveNavProvider>
          <CompareProvider>
            <ThemeProvider>
              <AppContent />
            </ThemeProvider>
          </CompareProvider>
        </ActiveNavProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
