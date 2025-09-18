import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useActiveNav } from "../context/ActiveNavContext";
import CategoryDetail from "../components/categorypage/CategoryDetail";
import SideBySideCards from "../components/categorypage/SideBySideCards";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage() {
  const { category } = useParams();
  const location = useLocation();
  const { activeMainPath } = useActiveNav();

  const {
    language,
    data,
    selectedCategory,
    setSelectedCategory,
    setSelectedBrand,
  } = useLanguage();

  const { mainNavbar } = data;
  const allCategories = mainNavbar || [];

  const info = category
    ? allCategories.find((item) => item.path === `/${category}`)
    : null;

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      setSelectedBrand(null); // Marka sıfırlansın
    }
  }, [category, setSelectedCategory, setSelectedBrand]);

  if (location.pathname === "/category" && !activeMainPath) {
    return (
      <div className="w-10/12 mx-auto py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          {language === "tr"
            ? "Keşfetmeye Değer Kategoriler!"
            : "Categories Worth Exploring"}
        </h1>
        <div className="w-4/5 mx-auto">
          {allCategories.map((item, index) => (
            <CategoryDetail
              key={index}
              title={item.title}
              description={item.description}
              photo={item.photo}
              lazy={true}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="w-10/12 mx-auto py-10 text-center text-gray-600">
        {language === "tr"
          ? "Bu kategoriye ait bilgi bulunmamaktadır."
          : "No information available for this category."}
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto py-10">
      <div className="w-4/5 mx-auto">
        <CategoryDetail
          title={info.title}
          description={info.description}
          photo={info.photo}
          lazy={true}
        />
        <SideBySideCards />
      </div>
    </div>
  );
}
