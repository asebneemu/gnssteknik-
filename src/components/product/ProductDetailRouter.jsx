import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProductDetailPage from "../../pages/ProductDetailPage";
import StecProductDetailPage from "../../pages/StecProductDetailPage";
import { useLanguage } from "../../context/LanguageContext";
import { Navigate, useSearchParams } from "react-router-dom";

export default function ProductDetailRouter() {
  const { idSlug } = useParams();
  const { data } = useLanguage();

  const pureId = idSlug.split("-")[0];
  const product = data.products.find((p) => p.id === Number(pureId));

  if (!product) {
    return <div>Ürün bulunamadı kankam.</div>;
  }

  // STec için özel sayfa
  if (product.brand.toLowerCase() === "stec") {
    return <StecProductDetailPage product={product} />;
  }

  // Diğer ürünler için yönlendirme: useParams ile çalışacak formatta URL üret
  const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const category = slugify(product.category);
  const brand = slugify(product.brand);
  const name = slugify(product.name);

  return <Navigate to={`/${category}/${brand}/${name}`} replace />;
}
