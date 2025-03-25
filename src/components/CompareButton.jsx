import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import { FaBalanceScale } from "react-icons/fa";

export default function CompareButton() {
  const { compareList } = useCompare();
  const navigate = useNavigate();

  if (compareList.length === 0) return null; // ✅ Liste boşsa buton gözükmez

  return (
    <div className="fixed left-5 top-1/2 transform -translate-y-1/2 z-[999]">
      <button
        onClick={() => navigate("/compare")}
        className="relative group flex items-center p-3 bg-gray-800 text-white rounded-full shadow-lg transition-all hover:bg-gray-900"
      >
        {/* Butonun ikonu */}
        <FaBalanceScale className="text-2xl" />

        {/* Hover olunca görünen yazı */}
        <span className="absolute left-14 opacity-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg shadow-md transition-all group-hover:opacity-100 group-hover:translate-x-[-5px]">
          Karşılaştır
        </span>
      </button>
    </div>
  );
}
