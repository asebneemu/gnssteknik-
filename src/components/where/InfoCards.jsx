const InfoCards = ({ items }) => {
    return (
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img src={item.icon} alt={item.title} className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
export default InfoCards;
  