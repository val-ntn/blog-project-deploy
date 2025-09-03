//src/components/DarkModeToggle/DarkModeToggle.jsx

import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  // Update theme + persist to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      style={{ fontSize: "1.5rem", background: "none", border: "none" }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
}
