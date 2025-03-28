import { useNavigate } from "react-router-dom";

export default function NavbarLink({ icon, name, path, className, onClick }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault(); // scroll olmasın
    if (onClick) onClick();
    if (path) navigate(path);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-3 
        px-3 lg:px-2 xl:px-5 pb-2 rounded-md transition-all duration-300 ${className}`}
      aria-label={name}
      title={name}
    >
      {/* İkon alanı */}
      {icon && <div className="w-10 h-10">{icon}</div>}

      {/* Başlık */}
      <span className="md:text-sm text-sm font-large text-center">{name}</span>
    </button>
  );
}
