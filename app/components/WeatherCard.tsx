import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WeatherData, HourlyForecast } from '../types';
import { lightTheme, darkTheme } from '../constants/theme';
import { getWeatherCardStyles } from '../constants/styles';
import { formatTemperature } from '../utils/helpers';

interface WeatherCardProps {
    weather: WeatherData;
    hourlyForecast?: HourlyForecast[];
    theme?: 'light' | 'dark';
    location?: { latitude: number; longitude: number };
    placeName?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    weather,
    hourlyForecast = [],
    theme = 'light',
    location,
    placeName
}) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getWeatherCardStyles(currentTheme);

    const formatHour = (timeString: string) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            hour12: true 
        });
    };

    return (
        <View style={[styles.gradient, { 
            backgroundColor: currentTheme.colors.surface,
            borderRadius: currentTheme.borderRadius.lg,
            margin: currentTheme.spacing.md,
        }]}>
            <View style={styles.header}>
                <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                        {formatTemperature(weather.temperature)}
                    </Text>
                    <Text style={styles.description}>
                        {weather.weatherDescription}
                    </Text>
                </View>
                <Text style={styles.weatherIcon}>
                    {weather.weatherIcon}
                </Text>
            </View>

            {hourlyForecast.length > 0 && (
                <View style={styles.hourlySection}>
                    <Text style={styles.hourlyTitle}>Next 24 Hours</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.hourlyScrollView}
                    >
                        {hourlyForecast.map((hour, index) => (
                            <View key={index} style={styles.hourlyItem}>
                                <Text style={styles.hourlyTime}>
                                    {formatHour(hour.time)}
                                </Text>
                                <Text style={styles.hourlyIcon}>
                                    {hour.weatherIcon}
                                </Text>
                                <Text style={styles.hourlyTemp}>
                                    {formatTemperature(hour.temperature)}
                                </Text>
                                {hour.precipitationProbability > 0 && (
                                    <Text style={styles.hourlyPrecipitation}>
                                        {hour.precipitationProbability}%
                                    </Text>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}; 