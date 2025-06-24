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
import ProductDetailRouter from "./components/product/ProductDetailRouter"; // 🔄 Yeni yönlendirme bileşeni
import ComparePage from "./pages/ComparePage";
import CompareButton from "./components/CompareButton";
import CustomersPage from "./pages/CustomersPage";
import SenceiveSensorPage from "./pages/SenceiveSensorPage";
import SectorsPage from "./pages/SectorsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import SectorDetailPage from "./pages/SectorDetailPage";
import SensorBenewakePage from "./pages/SensorBenewakePage";
import KvkkPage from "./pages/KvkkPage";
import BenewakeApplicationsPage from "./pages/BenewakeApplicationsPage";
import DjiMainPage from "./pages/DjiMainPage";
import ThreeDSurveyPage from "./pages/ThreeDSurveyPage";
import ScrollToTop from "./components/ScrollToTop";
import { useState } from "react";

function AppContent() {
  const [searching, setSearching] = useState(false);

  const categoryPath = "/category";
  const categoryWithParamPath = `${categoryPath}/:category`;
  const productListPath = `${categoryPath}/:category/:brand`;
  const productDetailPath = `${categoryPath}/:category/:brand/:id`;

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <HeaderBar />
      <TopBar setSearching={setSearching} />
      <NavbarMain searching={searching} />
      <NavbarSecondary />
      <CompareButton />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/kvkk" element={<KvkkPage />} />

        <Route path="/category/yazilim/3dsurvey" element={<ThreeDSurveyPage />} />
        <Route path={categoryPath} element={<CategoryPage />} />
        <Route path={categoryWithParamPath} element={<CategoryPage />} />
        <Route path="/:category/:brand/:slug" element={<ProductDetailRouter />} />
        <Route path="/category/:category/:brand/:slug" element={<ProductDetailRouter />} />

        <Route path="/compare" element={<ComparePage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/category/sensor/senceive" element={<SenceiveSensorPage />} />
        <Route path="/category/sensor/benewake" element={<SensorBenewakePage />} />
        <Route path="/category/iha/dji" element={<DjiMainPage />} />
        <Route path="/products/senceive" element={<ProductListPage />} />
        <Route path="/products/benewake" element={<ProductListPage />} />
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
