import { useParams, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useActiveNav } from "../context/ActiveNavContext";
import CategoryDetail from "../components/categorypage/CategoryDetail";
import SideBySideCards from "../components/categorypage/SideBySideCards";
import FeaturedSection from "../components/categorypage/FeaturedSection";

export default function CategoryPage() {
  const { category } = useParams();
  const { mainNavbar, customerStories } = useData();
  const { activeMainPath } = useActiveNav();
  const location = useLocation();

  // ✅ Seçili kategoriye göre veri bul veya tüm kategorileri al
  const allCategories = mainNavbar || [];
  const info = category
    ? allCategories.find((item) => item.path === `/${category}`)
    : null;

  // ✅ Kategoriye göre müşteri hikayeleri filtrele
  const filteredStories = customerStories?.filter((story) =>
    [story.type.toLowerCase(), story.brand.toLowerCase()].includes(category?.toLowerCase())
  ) || [];

  // ✅ Eğer sadece /kategori'deysek tüm kategorileri göster
  if (location.pathname === "/kategori" && !activeMainPath) {
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
        Bu kategoriye ait bilgi bulunmamaktadır.
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

        <h2 className="text-3xl font-semibold text-left mb-8 text-gray-800">
          Neden Bu Teknoloji?
        </h2>
        <SideBySideCards />

        <h2 className="text-3xl font-semibold text-left mb-8 text-gray-800 mt-16">
          Müşteri Hikayeleri
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
            Bu kategoriye ait müşteri hikayesi bulunmamaktadır.
          </p>
        )}
      </div>
    </div>
  );
}
