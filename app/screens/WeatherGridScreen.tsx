import React, { useState } from 'react';
import { View, Text, SafeAreaView, Switch } from 'react-native';
import { WeatherGrid } from '@/components/WeatherGrid';
import { WeatherData, HourlyForecast } from '@/types';
import { lightTheme, darkTheme } from '@/constants/theme';
import { getWeatherScreenStyles } from '@/constants/styles';

export const WeatherGridScreen: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getWeatherScreenStyles(currentTheme);

    // Generate sample weather data for 24 locations (8x3 grid)
    const generateSampleWeatherData = (): WeatherData[] => {
        const weatherTypes = [
            { description: 'Sunny', icon: '☀️', temp: 28 },
            { description: 'Partly Cloudy', icon: '⛅', temp: 24 },
            { description: 'Cloudy', icon: '☁️', temp: 20 },
            { description: 'Rainy', icon: '🌧️', temp: 18 },
            { description: 'Stormy', icon: '⛈️', temp: 16 },
            { description: 'Snowy', icon: '❄️', temp: -2 },
            { description: 'Foggy', icon: '🌫️', temp: 12 },
            { description: 'Windy', icon: '💨', temp: 22 },
        ];

        const sampleData: WeatherData[] = [];
        
        for (let i = 0; i < 24; i++) {
            const weatherType = weatherTypes[i % weatherTypes.length];
            const tempVariation = Math.floor(Math.random() * 10) - 5; // ±5 degrees
            
            sampleData.push({
                temperature: weatherType.temp + tempVariation,
                weatherDescription: weatherType.description,
                weatherIcon: weatherType.icon,
                humidity: 50 + Math.floor(Math.random() * 40),
                windSpeed: 5 + Math.floor(Math.random() * 20),
                pressure: 1000 + Math.floor(Math.random() * 30),
                visibility: 5 + Math.floor(Math.random() * 10),
                uvIndex: 1 + Math.floor(Math.random() * 10),
                feelsLike: weatherType.temp + tempVariation + Math.floor(Math.random() * 5) - 2,
                dewPoint: 10 + Math.floor(Math.random() * 15),
                cloudCover: Math.floor(Math.random() * 100),
                precipitationProbability: Math.floor(Math.random() * 100),
                sunrise: '06:30',
                sunset: '18:45',
                moonPhase: 'Waxing Crescent',
                airQuality: 'Good',
                pollenCount: 'Low',
                lastUpdated: new Date().toISOString()
            });
        }
        
        return sampleData;
    };

    // Generate sample hourly forecasts
    const generateSampleHourlyForecasts = (): HourlyForecast[][] => {
        const forecasts: HourlyForecast[][] = [];
        
        for (let i = 0; i < 24; i++) {
            const locationForecast: HourlyForecast[] = [];
            const baseTemp = 20 + Math.floor(Math.random() * 15);
            
            for (let hour = 0; hour < 24; hour++) {
                const tempVariation = Math.floor(Math.random() * 8) - 4;
                locationForecast.push({
                    time: new Date(Date.now() + hour * 60 * 60 * 1000).toISOString(),
                    temperature: baseTemp + tempVariation,
                    weatherIcon: ['☀️', '⛅', '☁️', '🌧️'][Math.floor(Math.random() * 4)],
                    precipitationProbability: Math.floor(Math.random() * 100),
                    humidity: 50 + Math.floor(Math.random() * 40),
                    windSpeed: 5 + Math.floor(Math.random() * 20)
                });
            }
            
            forecasts.push(locationForecast);
        }
        
        return forecasts;
    };

    const sampleWeatherData = generateSampleWeatherData();
    const sampleHourlyForecasts = generateSampleHourlyForecasts();

    const placeNames = [
        'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
        'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco',
        'Indianapolis', 'Seattle', 'Denver', 'Washington', 'Boston', 'El Paso', 'Nashville', 'Detroit'
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
            <View style={styles.header}>
                <Text style={styles.title}>Weather Grid (8×3)</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: currentTheme.colors.text, marginRight: 8 }}>Dark Mode</Text>
                    <Switch
                        value={theme === 'dark'}
                        onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
                        trackColor={{ false: '#767577', true: currentTheme.colors.primary }}
                        thumbColor={theme === 'dark' ? '#f4f3f4' : '#f4f3f4'}
                    />
                </View>
            </View>
            
            <WeatherGrid
                weatherData={sampleWeatherData}
                hourlyForecasts={sampleHourlyForecasts}
                theme={theme}
                placeNames={placeNames}
            />
        </SafeAreaView>
    );
}; 