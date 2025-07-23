import React, { createContext, useContext, useState } from 'react';
import { WeatherData, Location } from '../types';

interface WeatherContextType {
    location: Location | null;
    setLocation: (loc: Location | null) => void;
    weather: WeatherData | null;
    setWeather: (weather: WeatherData | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [location, setLocation] = useState<Location | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    return (
        <WeatherContext.Provider value={{ location, setLocation, weather, setWeather }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeatherContext = () => {
    const ctx = useContext(WeatherContext);
    if (!ctx) throw new Error('useWeatherContext must be used within a WeatherProvider');
    return ctx;
};
