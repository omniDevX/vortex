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
        const rows = [];
        
        for (let row = 0; row < 3; row++) {
            const rowItems = [];
            
            for (let col = 0; col < 8; col++) {
                const hourIndex = row * 8 + col;
                const hour = hourlyForecast[hourIndex];
                
                if (hour) {
                    rowItems.push(
                        <View key={`${row}-${col}`} style={styles.hourlyGridItem}>
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
                    );
                }
            }
            
            // Apply different styles based on the row (time of day)
            let rowStyle: any = styles.hourlyGridRow;
            if (row === 0) {
                rowStyle = [styles.hourlyGridRow, styles.hourlyGridRowMorning];
            } else if (row === 1) {
                rowStyle = [styles.hourlyGridRow, styles.hourlyGridRowAfternoon];
            } else {
                rowStyle = [styles.hourlyGridRow, styles.hourlyGridRowEvening];
            }
            
            rows.push(
                <View key={row} style={rowStyle}>
                    {rowItems}
                </View>
            );
        }
        
        return rows;
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