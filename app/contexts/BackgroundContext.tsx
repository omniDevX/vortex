import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
  currentBackgroundUrl: string | null;
  setCurrentBackgroundUrl: (url: string | null) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

interface BackgroundProviderProps {
  children: ReactNode;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({ children }) => {
  const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState<string | null>(null);

  return (
    <BackgroundContext.Provider value={{ currentBackgroundUrl, setCurrentBackgroundUrl }}>
      {children}
    </BackgroundContext.Provider>
  );
}; 