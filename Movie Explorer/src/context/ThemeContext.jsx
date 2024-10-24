import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const addToFavorites = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  const removeFromFavorites = (imdbID) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
  };

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      favorites,
      addToFavorites,
      removeFromFavorites
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};