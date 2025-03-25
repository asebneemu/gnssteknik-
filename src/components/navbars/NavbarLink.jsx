import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavbarLink({ icon, name, path, className, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (e) => {
    setIsActive(!isActive);
    if (onClick) onClick(e); // Ana fonksiyon çağrısı
  };

  return (
    <Link
      to={path}
      onClick={handleClick}
      className={`flex flex-row lg:flex-col items-center justify-center 
        ${isActive ? "gap-2" : "gap-4"} px-3 lg:px-2 xl:px-5 py-2 rounded-md transition-all duration-300 ${className}`}
      aria-label={name}
      title={name}
    >
      {/* İkon alanı */}
      {icon && <div className="w-10 h-10">{icon}</div>}

      {/* Başlık */}
      <span className="md:text-md text-md font-large">{name}</span>
    </Link>
  );
}
