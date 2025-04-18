import React from "react";
import { useLanguage } from "../context/LanguageContext";
import ProductCard from "../components/product/ProductCard";
import ZenmuseSlider from "../components/ZemuseSlider";

const IhaDjiPage = () => {
  const { data } = useLanguage();

  const matrice4List = [200, 201, 202];
  const matrice30List = [190, 191];

  const typeGroups = {
    "Matrice 4 Serisi": matrice4List,
    "Matrice 30 Serisi": matrice30List,
  };

  const getProductsByIds = (ids) =>
    data.products.filter((item) => ids.includes(item.id));

  const getProductsByTypeTitle = (title) =>
    data.products.filter((item) => item.typeTitle === title);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-[80%] mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">DJI - IHA</h1>

      <h2 className="text-2xl font-semibold text-left mb-2">DJI KİMDİR</h2>
      <p className="text-left text-gray-700 mb-6">
        DJI, dünya çapında havadan görüntüleme sistemleri ve drone teknolojisi
        konusunda lider bir markadır. Özellikle haritalama, tarım, inşaat ve
        güvenlik gibi sektörlerde profesyonel çözümler sunar. İleri düzey kamera
        sistemleri, uzun menzilli iletişim özellikleri ve entegre yazılım
        altyapısı ile DJI İHA’ları sahada verimliliği ve güvenliği artırır.
      </p>

      <div className="h-[4px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mb-10"></div>

      {Object.entries(typeGroups).map(([droneTitle, payloadIds], index) => {
        const droneProducts = getProductsByTypeTitle(droneTitle);
        const payloadProducts = getProductsByIds(payloadIds);
        const rightTitle = payloadProducts[0]?.typeTitle;

        const rightNames = payloadProducts.map((p) => p.name);
        const joinedNames =
          rightNames.length > 1
            ? rightNames.slice(0, -1).join(", ") + " ve " + rightNames.slice(-1)
            : rightNames[0];

        return (
          <div key={index} className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Sol - Drone ürünleri */}
              <div>
                <h1 className="text-xl font-semibold text-left mb-4">
                  {droneTitle}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {droneProducts.map((product) => (
                    <div className="origin-left" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sağ - Kamera/Yük ürünleri */}
              <div>
                <h1 className="text-xl font-semibold text-right mb-4">
                  {rightTitle}
                </h1>

                {/* Mobilde Custom Slider */}
                <div className="lg:hidden">
                  <ZenmuseSlider products={payloadProducts} />
                </div>

                {/* Masaüstü için klasik düzen */}
                <div className="hidden lg:flex flex-row-reverse flex-wrap gap-2">
                  {payloadProducts.map((product) => (
                    <div className="w-[30%] origin-top" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Açıklama cümlesi */}
            <div className="mt-8 text-gray-700 text-lg text-center">
              <p>
                {droneTitle}, {joinedNames} adlı {rightTitle} ile birlikte
                kullanılmaktadır.
              </p>
            </div>

            {/* Alt çizgi */}
            <div className="h-[3px] w-full bg-gradient-to-r from-gray-400 to-orange-500 mt-6"></div>
          </div>
        );
      })}
    </div>
  );
};

export default IhaDjiPage;
