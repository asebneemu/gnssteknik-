import React from "react";

const applications = [
  { icon: "/icons/rail-track.png", name: "Ray Hatları" },
  { icon: "/icons/rockfall.png", name: "Kaya Düşmeleri" },
  { icon: "/icons/tunnel.png", name: "Tüneller" },
  { icon: "/icons/emergency.png", name: "Acil Durum İzleme" },
  { icon: "/icons/slope.png", name: "Eğim Alanları" },
  { icon: "/icons/bridge.png", name: "Köprüler" },
  { icon: "/icons/pipeline.png", name: "Boru Hatları" },
  { icon: "/icons/drainage.png", name: "Drenaj Sistemleri" },
];

const ApplicationsPage = () => {
  return (
    <div className="w-10/12 mx-auto py-10">
      <h1 className="text-5xl font-bold text-center text-orange-600 mb-10">Uygulama Alanları</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {applications.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center border rounded-xl shadow hover:shadow-lg p-6 transition"
          >
            <img src={item.icon} alt={item.name} className="w-16 h-16 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
