import { useParams } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const SideBySideCards = () => {
  const { data, language } = useLanguage();
  const { sideBySideCards } = data;
  const { category } = useParams();

  const categoryData = sideBySideCards.find((item) => item.category === category);

  if (!categoryData) {
    return <div className="text-center py-10"></div>;
  }

  return (
    <div className="w-full mx-auto py-10 space-y-10 touch-manipulation">
      <h2 className="text-3xl font-semibold text-left mb-8 text-gray-800">
        {language === "tr" ? "Neden Bu Teknoloji?" : "Why This Technology?"}
      </h2>
      <div className="border-l-4 border-gray-800 pl-6">
        {categoryData.left.map((leftItem, index) => (
          <div
            key={index}
            className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch border-b border-gray-800 pb-10 mb-10 ml-auto will-change-transform"
          >
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col h-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {leftItem.title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {leftItem.slogan}
              </h3>
              <p className="text-sm text-gray-600 mt-auto">{leftItem.text}</p>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col h-full text-left transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categoryData.right[index].title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {categoryData.right[index].sectors.join(", ")}
              </h3>
              <p className="text-sm text-gray-600 mt-auto">{categoryData.right[index].text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBySideCards;
