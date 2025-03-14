import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="sm:p-2 p-1 rounded-lg transition-all dark:hover:text-[#00FF9C] hover:text-red-900"
    >
      {theme === "light" ? <Moon size={32} /> : <Sun size={32} />}
    </button>
  );
};

export default ThemeToggle;
