import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { setTheme } = useTheme();
  return (
    <footer className="flex justify-between md:max-w-7xl max-w-none mx-auto p-2">
      <label htmlFor="theme">Tema:</label>
      <select
        className="border bg-transparent border-black dark:border-white"
        onChange={(e) => {
          const theme = e.target.value as "LIGHT" | "DARK";
          setTheme(theme);
        }}
        name="theme"
        id="theme"
      >
        <option value="LIGHT">Claro</option>
        <option value="DARK">Oscuro</option>
      </select>
    </footer>
  );
}
