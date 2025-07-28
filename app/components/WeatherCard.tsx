import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WeatherData } from '../types';
import { lightTheme, darkTheme } from '../constants/theme';
import { getWeatherCardStyles } from '../constants/styles';
import {
    formatTemperature,
    formatWindSpeed,
    formatPressure,
    formatHumidity,
    formatVisibility,
    getWindDirection,
} from '../utils/helpers';

interface WeatherCardProps {
    weather: WeatherData;
    theme?: 'light' | 'dark';
    location?: { latitude: number; longitude: number };
    placeName?: string;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
    weather,
    theme = 'light',
    location,
    placeName
}) => {
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const styles = getWeatherCardStyles(currentTheme);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[currentTheme.colors.surface, currentTheme.colors.background]}
                style={styles.gradient}
            >
                <View style={styles.header}>
                    <Text style={styles.temperature}>
                        {formatTemperature(weather.temperature)}
                    </Text>
                    <Text style={styles.weatherIcon}>
                        {weather.weatherIcon}
                    </Text>
                </View>

                <Text style={styles.description}>
                    {weather.weatherDescription}
                </Text>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Feels Like</Text>
                        <Text style={styles.detailValue}>
                            {formatTemperature(weather.feelsLike)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Humidity</Text>
                        <Text style={styles.detailValue}>
                            {formatHumidity(weather.humidity)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Wind Speed</Text>
                        <Text style={styles.detailValue}>
                            {formatWindSpeed(weather.windSpeed)} {getWindDirection(weather.windDirection)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Pressure</Text>
                        <Text style={styles.detailValue}>
                            {formatPressure(weather.pressure)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Visibility</Text>
                        <Text style={styles.detailValue}>
                            {formatVisibility(weather.visibility)}
                        </Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Precipitation</Text>
                        <Text style={styles.detailValue}>
                            {weather.precipitation.toFixed(1)} mm
                        </Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}; 