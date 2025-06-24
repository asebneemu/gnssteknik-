import { useParams, useLocation } from "react-router-dom";
import { useActiveNav } from "../context/ActiveNavContext";
import CategoryDetail from "../components/categorypage/CategoryDetail";
import SideBySideCards from "../components/categorypage/SideBySideCards";
// import FeaturedSection from "../components/categorypage/FeaturedSection";
import { useLanguage } from "../context/LanguageContext";

export default function CategoryPage() {
  const { category } = useParams();
  const { activeMainPath } = useActiveNav();
  const location = useLocation();
  const { language, data } = useLanguage();

  const { mainNavbar /*, customerStories*/ } = data;

  const allCategories = mainNavbar || [];
  const info = category
    ? allCategories.find((item) => item.path === `/${category}`)
    : null;

  // const filteredStories =
  //   customerStories?.filter((story) =>
  //     [story.type.toLowerCase(), story.brand.toLowerCase()].includes(category?.toLowerCase())
  //   ) || [];

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
              lazy={true} // ✅ Lazy yükleme bilgisi geçildi
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
          lazy={true} // ✅ Lazy yükleme bilgisi geçildi
        />

        <SideBySideCards />

        {/* <h2 className="text-3xl font-semibold text-left mb-8 text-gray-800 mt-16">
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
        )} */}
      </div>
    </div>
  );
}
