const FeaturedSection = ({ title, description, imageLeft, imageRight, bottomText }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center my-40">
      <div className="w-10/12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Sol taraf (Başlık + Açıklama + Resim) */}
        <div className="flex flex-col justify-between space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-3xl md:text-6xl font-bold mb-4 text-gray-900">{title}</h1>
            <p className="text-sm md:text-lg text-gray-600">{description}</p>
          </div>
          <div className="relative group">
            <img
              src={imageLeft}
              alt="Featured Left"
              className="w-full h-[450px] object-cover rounded-lg shadow-lg transform transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div>
          </div>
        </div>

        {/* Sağ taraf (Resim + Altındaki Yazı) */}
        <div className="relative group">
          <img
            src={imageRight}
            alt="Featured Right"
            className="w-full h-[450px] object-cover rounded-lg shadow-lg transform transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div>
          <p className="text-center mt-4 text-sm text-gray-700">{bottomText}</p> {/* ✅ Altındaki p */}
        </div>

      </div>
    </div>
  );
};

export default FeaturedSection;
