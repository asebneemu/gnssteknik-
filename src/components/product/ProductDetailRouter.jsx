// src/pages/ProductDetailRouter.jsx
import { useParams } from "react-router-dom";
import ProductDetailPage from "../../pages/ProductDetailPage";
import StecProductDetailPage from "../../pages/StecProductDetailPage";

export default function ProductDetailRouter() {
  const { brand } = useParams();

  if (brand?.toLowerCase() === "stec") {
    return <StecProductDetailPage />;
  }

  return <ProductDetailPage />;
}
