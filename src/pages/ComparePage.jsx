import { useCompare } from "../context/CompareContext";
import { FaTimes } from "react-icons/fa";

export default function ComparePage() {
  const { compareList, removeFromCompare } = useCompare();

  return (
    <div className="w-10/12 mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Karşılaştırma</h1>
      
      {compareList.length === 0 ? (
        <p className="text-center text-gray-500">Henüz karşılaştırma listesine ürün eklenmedi.</p>
      ) : (
        <div className="grid gap-6 justify-center"
             style={{ gridTemplateColumns: `repeat(${compareList.length > 3 ? 3 : compareList.length}, minmax(250px, 1fr))` }}>
          {compareList.map((product) => (
            <div key={product.id} className="border border-gray-300 p-4 rounded-lg shadow-md relative bg-white">
              {/* Silme Butonu */}
              <button
                onClick={() => removeFromCompare(product.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <FaTimes size={18} />
              </button>
              
              {/* Ürün İçeriği */}
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-xl font-semibold text-center mt-3">{product.name}</h2>
              <p className="text-sm text-gray-600 text-center mt-2">{product.description}</p>
              <ul className="mt-4 text-sm text-gray-700">
                {product.specs?.map((spec, index) => (
                  <li key={index} className="border-b py-1">✅ {spec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
