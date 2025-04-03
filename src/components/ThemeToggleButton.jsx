import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center space-x-2 cursor-pointer bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-xl shadow-md hover:scale-105 transition-transform"
      title={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? faSun : faMoon}
        className="text-xl text-yellow-500"
      />
      <span className="text-gray-700 dark:text-gray-100 text-sm hidden md:inline">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </span>
    </div>
  );
};

export default ThemeToggleButton;
