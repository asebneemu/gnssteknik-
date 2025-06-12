import { useParams } from "react-router-dom";
import ProductDetailPage from "../../pages/ProductDetailPage";
import StecProductDetailPage from "../../pages/StecProductDetailPage";
import { useLanguage } from "../../context/LanguageContext";
import { Navigate } from "react-router-dom";

export default function ProductDetailRouter() {
  const { idSlug } = useParams();
  const { data } = useLanguage();

  const pureId = idSlug.split("-")[0];
  const product = data.products.find((p) => String(p.id) === pureId); // ✅ kritik düzeltme

  if (!product) {
    return <div>Ürün bulunamadı kankam.</div>;
  }

  if (product.brand.toLowerCase() === "stec") {
    return <StecProductDetailPage product={product} />;
  }

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
