import React, { createContext, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: (isDark: boolean) => void;
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    warning: string;
    success: string;
    lightBg: string;
    darkBg: string;
    borderColor: string;
    textDark: string;
    textLight: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({
  isDarkMode: initialDarkMode,
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);

  const colors = {
    primary: '#3498db',
    secondary: '#2ecc71',
    danger: '#e74c3c',
    warning: '#f39c12',
    success: '#27ae60',
    lightBg: '#f8f9fa',
    darkBg: '#2c3e50',
    borderColor: '#ecf0f1',
    textDark: '#2c3e50',
    textLight: '#95a5a6',
  };

  const toggleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;