import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    // Check user preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return {
    setTheme: (theme: "LIGHT" | "DARK") => setDark(theme === "DARK"),
  };
}
