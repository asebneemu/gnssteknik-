export default function NavbarLink({ icon, name, path, className, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(); // ✅ sadece dışarıdan gelen tıklama çalışır
      }}
      className={`flex flex-col items-center justify-center gap-3 
        px-3 lg:px-2 xl:px-5 pb-2 rounded-md transition-all duration-300 ${className}`}
      aria-label={name}
      title={name}
    >
      {icon && <div className="w-10 h-10">{icon}</div>}
      <span className="md:text-sm text-sm font-large text-center">{name}</span>
    </button>
  );
}
