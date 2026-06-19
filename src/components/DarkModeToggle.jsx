import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggle = ({ collapsed }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme");
      return savedMode === "dark";
    }
    return false;
  });

  useEffect(() => {
    const currentTheme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const label = darkMode ? "Light mode" : "Dark mode";

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      title={collapsed ? label : undefined}
      aria-label={label}
      className="sidebar-link"
    >
      <span className="sidebar-icon">{darkMode ? <FiSun /> : <FiMoon />}</span>
      <span className="sidebar-label">{label}</span>
    </button>
  );
};

export default DarkModeToggle;
