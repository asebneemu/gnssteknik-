import { Link } from "react-router-dom";

const SectorCard = ({ image, title, summary, id }) => {
  return (
    <div className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row overflow-hidden w-full">
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-orange-600 mb-2">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{summary}</p>
        <Link
          to={`/sector/${id}`}
          className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
        >
          Daha fazla oku →
        </Link>
      </div>
    </div>
  );
};

export default SectorCard;
