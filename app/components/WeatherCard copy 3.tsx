import React from 'react';
import { View, Text } from 'react-native';
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

    const renderHourlyGrid = () => {
    // Pick top 3 hottest and bottom 3 coldest hours
    const sorted = [...hourlyForecast].sort((a, b) => b.temperature - a.temperature);
    const top3 = sorted.slice(0, 3);
    const bottom3 = sorted.slice(-3);
    const selected = [...top3, ...bottom3].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    return (
        <View style={styles.hourlyGridRow}>
            {selected.map((hour, idx) => {
                let marker = '';
                if (top3.includes(hour)) {
                    marker = '🔥';
                } else if (bottom3.includes(hour)) {
                    marker = '🧊';
                }

                return (
                    <View key={idx} style={styles.hourlyGridItem}>
                        <Text style={styles.hourlyTime}>{formatHour(hour.time)}</Text>
                        <Text style={styles.hourlyIcon}>{hour.weatherIcon}</Text>
                        <Text style={styles.hourlyTemp}>
                            {formatTemperature(hour.temperature)}
                        </Text>
                        {(
                            <Text style={styles.hourlyPrecipitation}>
                                {hour.precipitationProbability}%
                            </Text>
                        )}
                        {marker !== '' && (
                            <Text style={{ textAlign: 'center', marginTop: 2 }}>
                                {marker}
                            </Text>
                        )}
                    </View>
                );
            })}
        </View>
    );
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
                    <View style={styles.hourlyGrid}>
                        {renderHourlyGrid()}
                    </View>
                </View>
            )}
        </View>
    );
}; 