import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ActiveNavProvider } from "./context/ActiveNavContext";
import { DataProvider } from "./context/DataContext";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "./context/ThemeContext"; // ThemeProvider'ı import et

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
export default function App() {
  return (
    <DataProvider>
      <ActiveNavProvider>
        <CompareProvider>
          <ThemeProvider> {/* ThemeProvider ile sarmayı ekledik */}
            <Router>
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
              <HeaderBar />
              <TopBar />
              <NavbarMain />
              <NavbarSecondary />
              <CompareButton />

              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutUsPage />} />
                <Route path="/kategori/:category" element={<CategoryPage />} />
                <Route path="/kategori" element={<CategoryPage />} /> 
                <Route path="/kategori/:category/:brand" element={<ProductListPage />} />
                <Route path="/:category/:brand/:productId" element={<ProductDetailPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/customers" element={<CustomersPage />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </CompareProvider>
      </ActiveNavProvider>
    </DataProvider>
  );
}
