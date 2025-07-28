import React from 'react';
import { View, ScrollView } from 'react-native';
import { WeatherCard } from './WeatherCard';
import { WeatherData, HourlyForecast } from '@/types';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getWeatherCardStyles } from '@/constants/styles';

interface WeatherGridProps {
    weatherData: WeatherData[];
    hourlyForecasts?: HourlyForecast[][];
    theme?: 'light' | 'dark';
    locations?: Array<{ latitude: number; longitude: number }>;
    placeNames?: string[];
}

export const WeatherGrid: React.FC<WeatherGridProps> = ({
    weatherData,
    hourlyForecasts = [],
    theme = 'light',
    locations = [],
    placeNames = []
}) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getWeatherCardStyles(currentTheme);

    // Create a grid layout with 8 columns and 3 rows
    const renderGrid = () => {
        const gridItems = [];
        const totalItems = 24; // 8 columns × 3 rows

        for (let i = 0; i < totalItems; i++) {
            const weather = weatherData[i] || createPlaceholderWeather();
            const hourlyForecast = hourlyForecasts[i] || [];
            const location = locations[i];
            const placeName = placeNames[i] || `Location ${i + 1}`;

            gridItems.push(
                <View key={i} style={styles.gridItem}>
                    <WeatherCard
                        weather={weather}
                        hourlyForecast={hourlyForecast}
                        theme={theme}
                        location={location}
                        placeName={placeName}
                    />
                </View>
            );
        }

        return gridItems;
    };

    const createPlaceholderWeather = (): WeatherData => ({
        temperature: 22,
        weatherDescription: 'Partly Cloudy',
        weatherIcon: '⛅',
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        visibility: 10,
        uvIndex: 5,
        feelsLike: 24,
        dewPoint: 15,
        cloudCover: 40,
        precipitationProbability: 20,
        sunrise: '06:30',
        sunset: '18:45',
        moonPhase: 'Waxing Crescent',
        airQuality: 'Good',
        pollenCount: 'Low',
        lastUpdated: new Date().toISOString()
    });

    return (
        <ScrollView 
            style={styles.gridContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.grid}>
                {renderGrid()}
            </View>
        </ScrollView>
    );
}; 