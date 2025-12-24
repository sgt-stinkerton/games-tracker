import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const localTheme = localStorage.getItem("site-theme");
        if (localTheme) {
          setTheme(localTheme);
        }

        // TODO: Replace this with your actual Backend GET call
        // const userSettings = await fetch('/api/user/settings');
        // const dbTheme = userSettings.theme;

        // Mocking a DB response for now:
        const dbTheme = "light"; // or 'dark', 'pink', 'green'
        if (dbTheme) setTheme(dbTheme);
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  // --- FUNCTION: Change Theme ---
  const changeTheme = (newTheme) => {
    setTheme(newTheme);

    // TODO: Fire-and-forget call to save to your Backend
    // userService.updateTheme(newTheme).catch(err => console.error(err));
    console.log(`Saved ${newTheme} to database (simulated)`);
  };

  if (isLoading) {
    return <div className="p-3">Loading preferences...</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};