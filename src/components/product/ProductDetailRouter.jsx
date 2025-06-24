import { useParams } from "react-router-dom";
import StecProductDetailPage from "../../pages/StecProductDetailPage";
import DjiProductDetailPage from "../../pages/DjiProductDetailPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import { useLanguage } from "../../context/LanguageContext";

const slugify = (str) =>
  str
    ?.toString()
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default function ProductDetailRouter() {
  const { category, brand, slug } = useParams();
  const { data } = useLanguage();

  if (!data?.products?.length) return null;

  const product = data.products.find((p) => {
    return (
      slugify(p.category) === slugify(category) &&
      slugify(p.brand) === slugify(brand) &&
      slugify(p.name) === slugify(slug)
    );
  });

  if (!product) {
    return (
      <div className="w-10/12 mx-auto py-10 text-center text-red-600 text-xl">
        Ürün bulunamadı. URL'yi kontrol edin.
      </div>
    );
  }

  const brandSlug = slugify(product.brand);

  if (brandSlug === "stec") {
    return <StecProductDetailPage product={product} />;
  }

  if (brandSlug === "dji") {
    return <DjiProductDetailPage product={product} />;
  }

  return <ProductDetailPage product={product} />;
}
