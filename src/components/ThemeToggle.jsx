import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="absolute top-5 right-5 z-50">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full border hover:scale-110 transition-all duration-300"
      >
        {darkMode ? (
          <Sun size={22} className="text-yellow-400" />
        ) : (
          <Moon size={22} className="text-gray-800" />
        )}
      </button>
    </div>
  );
}
