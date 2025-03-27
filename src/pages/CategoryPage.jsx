import { useParams, useLocation } from "react-router-dom";
import { useActiveNav } from "../context/ActiveNavContext";
import CategoryDetail from "../components/categorypage/CategoryDetail";
import SideBySideCards from "../components/categorypage/SideBySideCards";
import FeaturedSection from "../components/categorypage/FeaturedSection";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage() {
  const { category } = useParams(); // URL'den kategori parametresini alıyoruz
  const { activeMainPath } = useActiveNav();
  const location = useLocation();
  const { language, data } = useLanguage(); // useLanguage hook'u ile language ve data alıyoruz

  const { mainNavbar, customerStories } = data;

  // ✅ Tüm kategorileri al
  const allCategories = mainNavbar || [];
  const info = category
    ? allCategories.find((item) => item.path === `/${category}`) // `path` ile eşleştiriyoruz
    : null;

  // ✅ Kategoriye göre müşteri hikayeleri filtrele
  const filteredStories =
    customerStories?.filter((story) =>
      [story.type.toLowerCase(), story.brand.toLowerCase()].includes(category?.toLowerCase())
    ) || [];

  // ✅ Eğer sadece /category'deysek tüm kategorileri göster
  if (location.pathname === "/category" && !activeMainPath) {
    return (
      <div className="w-10/12 mx-auto py-10">
        <div className="w-4/5 mx-auto">
          {allCategories.map((item, index) => (
            <CategoryDetail
              key={index}
              title={item.title}
              description={item.description}
              photo={item.photo}
            />
          ))}
        </div>
      </div>
    );
  }

  // ✅ Seçili kategori yoksa veya bilgi bulunamazsa
  if (!info) {
    return (
      <div className="w-10/12 mx-auto py-10 text-center text-gray-600">
        {language === "tr"
          ? "Bu kategoriye ait bilgi bulunmamaktadır."
          : "No information available for this category."}
      </div>
    );
  }

  // ✅ Seçili kategori varsa: Detayları ve diğer içerikleri göster
  return (
    <div className="w-10/12 mx-auto py-10">
      <div className="w-4/5 mx-auto">
        <CategoryDetail
          title={info.title}
          description={info.description}
          photo={info.photo}
        />

        <SideBySideCards />

        <h2 className="text-3xl font-semibold text-left mb-8 text-gray-800 mt-16">
          {language === "tr" ? "Müşteri Hikayeleri" : "Customer Stories"}
        </h2>

        {filteredStories.length > 0 ? (
          filteredStories.map((story, index) => (
            <FeaturedSection
              key={index}
              title={story.title}
              description={story.description}
              imageLeft={story.imageLeft}
              imageRight={story.imageRight}
              bottomText={story.bottomText}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">
            {language === "tr"
              ? "Bu kategoriye ait müşteri hikayesi bulunmamaktadır."
              : "No customer stories available for this category."}
          </p>
        )}
      </div>
    </div>
  );
}
