import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import './ThemeSwitcher.css';


export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [boton, setBoton] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === 'light') {
      setBoton(
        <button onClick={() => setTheme('dark')} className="p-1 theme-icon">
          <i className="bi bi-moon-stars"></i>
        </button>
      );
    } else {
      setBoton(
        <button onClick={() => setTheme('light')} className="p- theme-icon">
          <i className="bi bi-brightness-high"></i>
        </button>
      );
    }
  }, [theme, mounted, setTheme]);

  if (!mounted) return null;

  return <div>{boton}</div>;
}
