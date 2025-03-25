// src/components/SideBySideCards.jsx
import { useData } from "../../context/DataContext";
import { useParams } from "react-router-dom";

const SideBySideCards = () => {
  const { sideBySideCards } = useData(); // 📌 data.json'dan veri çek
  const { category } = useParams(); // 📌 URL'den kategori bilgisi al

  const data = sideBySideCards.find((item) => item.category === category);

  if (!data) {
    return <div className="text-center py-10">Veri bulunamadı.</div>;
  }

  return (
    <div className="w-full mx-auto py-10 space-y-10">
      {/* ✅ Sola yaslı çizgi ve içerik boşluğu için dış div */}
      <div className="border-l-4 border-gray-800 pl-6">
        {data.left.map((leftItem, index) => (
          <div
            key={index}
            className="w-4/5 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-800 pb-10 mb-10 ml-auto"
          >
            {/* Sol Kart - Kart sağa yaslı, metin sola yaslı */}
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-2xl ml-auto">
              <img
                src={leftItem.leftImg}
                alt={leftItem.title}
                className="w-40 h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {leftItem.title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {leftItem.slogan}
              </h3>
              <p className="text-sm text-gray-600">{leftItem.text}</p>
            </div>

            {/* Sağ Kart - Kart sağa yaslı, metin sola yaslı */}
            <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-start text-left transform transition duration-300 hover:scale-105 hover:shadow-2xl ml-auto">
              <img
                src={data.right[index].rightImg}
                alt={data.right[index].title}
                className="w-40 h-40 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {data.right[index].title}
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {data.right[index].sectors.join(", ")}
              </h3>
              <p className="text-sm text-gray-600">{data.right[index].text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBySideCards;
