import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"; // 🛠️ Toast için import

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    // ✅ İlk yüklemede localStorage'dan veriyi çek
    const savedList = localStorage.getItem("compareList");
    return savedList ? JSON.parse(savedList) : [];
  });

  // ✅ Liste değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // ✅ Ürün ekleme
  const addToCompare = (product) => {
    console.log("Ürün ekleniyor:", product); // 🛠️ Log Ekle
    if (!compareList.find((p) => p.id === product.id)) {
      const updatedList = [...compareList, product];
      setCompareList(updatedList);
      localStorage.setItem("compareList", JSON.stringify(updatedList));
      toast.success(`${product.name} karşılaştırmaya eklendi!`); // ✅ Toast mesajı
    } else {
      toast.warn(`${product.name} zaten karşılaştırmada!`); // ✅ Zaten varsa uyarı
    }
  };

  // ✅ Ürünü çıkarma
  const removeFromCompare = (productId) => {
    const updatedList = compareList.filter(
      (product) => product.id !== productId
    );
    setCompareList(updatedList);
    localStorage.setItem("compareList", JSON.stringify(updatedList)); // ✅ Güncelle

    const removedProduct = compareList.find((p) => p.id === productId);
    if (removedProduct) {
      toast.info(`${removedProduct.name} karşılaştırmadan çıkarıldı.`); // ✅ Çıkarma mesajı
    }
  };

  // ✅ Ürünün listede olup olmadığını kontrol etme
  const isInCompare = (productId) => {
    return compareList.some((product) => product.id === productId);
  };

  // ✅ Toggle: Ekliyse çıkar, yoksa ekle
  const toggleCompare = (product) => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
