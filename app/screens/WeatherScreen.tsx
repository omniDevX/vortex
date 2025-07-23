import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

import { RootTabParamList } from '../types/navigation';
import { DynamicBackground } from '../components/DynamicBackground';
import { WeatherCard } from '../components/WeatherCard';
import { darkTheme, lightTheme } from '../constants/theme';
import { useWeather } from '../hooks/useWeather';
import { getWeatherScreenStyles } from '../constants/styles';
import { useSettings } from '../contexts/SettingsContext';

export const WeatherScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    console.log('WeatherScreen text color:', currentTheme.colors.text);
    console.log('WeatherScreen textSecondary color:', currentTheme.colors.textSecondary);
    const { settings } = useSettings();
    const [placeName, setPlaceName] = useState<string | null>(null);

    const {
        currentWeather,
        forecast,
        location,
        loading,
        error,
        refreshWeather,
        refreshLocation,
    } = useWeather();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await refreshLocation();
        } catch (err) {
            Alert.alert('Error', 'Failed to refresh weather data');
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        if (location) {
            Location.reverseGeocodeAsync({
                latitude: location.latitude,
                longitude: location.longitude,
            }).then((results) => {
                if (results.length > 0) {
                    const { city, region, country } = results[0];
                    let name = city || '';
                    if (region) name += (name ? ', ' : '') + region;
                    setPlaceName(name);
                }
            });
        }
    }, [location]);

    const styles = getWeatherScreenStyles(currentTheme);

    if (loading && !currentWeather) {
        if (settings.dynamicBackground) {
            return (
                <DynamicBackground weather={null}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading weather data...</Text>
                        </View>
                    </SafeAreaView>
                </DynamicBackground>
            );
        } else {
            return (
                <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.loadingContainer}>
                            <Text style={styles.loadingText}>Loading weather data...</Text>
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    }

    if (error && !currentWeather) {
        if (settings.dynamicBackground) {
            return (
                <DynamicBackground weather={null}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                            <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
                                <Text style={styles.retryButtonText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </DynamicBackground>
            );
        } else {
            return (
                <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                            <TouchableOpacity style={styles.retryButton} onPress={refreshLocation}>
                                <Text style={styles.retryButtonText}>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    }

    // Before rendering forecast
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Midnight UTC today
    const filteredForecast = forecast.filter(day => {
        const [year, month, dayNum] = day.date.split('-').map(Number);
        const dateObj = new Date(Date.UTC(year, month - 1, dayNum));
        return dateObj >= today;
    });

    if (settings.dynamicBackground) {
        return (
            <DynamicBackground weather={currentWeather}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Weather</Text>
                            {location && (
                                <View style={styles.locationContainer}>
                                    <Ionicons
                                        name="location"
                                        size={16}
                                        color={currentTheme.colors.textSecondary}
                                    />
                                    <Text style={styles.locationText}>
                                        {placeName ? `${placeName}, ` : ''}({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
                                    </Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity onPress={refreshWeather}>
                            <Ionicons
                                name="refresh"
                                size={24}
                                color={currentTheme.colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.content}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {currentWeather && (
                            <WeatherCard weather={currentWeather} theme={theme} location={location ?? undefined} placeName={placeName ?? undefined} />
                        )}

                        {filteredForecast.length > 0 && (
                            <View style={styles.forecastContainer}>
                                <Text style={styles.forecastTitle}>7-Day Forecast</Text>
                                {filteredForecast.map((day, index) => {
                                    // Parse as UTC to avoid timezone issues
                                    const [year, month, dayNum] = day.date.split('-').map(Number);
                                    const dateObj = new Date(Date.UTC(year, month - 1, dayNum));

                                    // Determine if today, tomorrow, or other
                                    const now = new Date();
                                    now.setUTCHours(0, 0, 0, 0);
                                    const tomorrow = new Date(now);
                                    tomorrow.setUTCDate(now.getUTCDate() + 1);
                                    let dateLabel = dateObj.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        timeZone: 'UTC',
                                    });
                                    if (dateObj.getTime() === now.getTime()) {
                                        dateLabel = 'Today';
                                    } else if (dateObj.getTime() === tomorrow.getTime()) {
                                        dateLabel = 'Tomorrow';
                                    }

                                    return (
                                        <View key={index} style={styles.forecastItem}>
                                            <Text style={styles.forecastDate}>
                                                {dateLabel}
                                            </Text>
                                            <View style={styles.forecastWeather}>
                                                <Text style={styles.forecastIcon}>{day.weatherIcon}</Text>
                                                <Text style={styles.forecastDescription}>
                                                    {day.weatherDescription}
                                                </Text>
                                            </View>
                                            <Text style={styles.forecastTemp}>
                                                {day.temperature.min.toFixed(0)}° / {day.temperature.max.toFixed(0)}°
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </DynamicBackground>
        );
    } else {
        return (
            <View style={[styles.container, { backgroundColor: currentTheme.colors.background }]}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Weather</Text>
                            {location && (
                                <View style={styles.locationContainer}>
                                    <Ionicons
                                        name="location"
                                        size={16}
                                        color={currentTheme.colors.textSecondary}
                                    />
                                    <Text style={styles.locationText}>
                                        {placeName ? `${placeName}, ` : ''}({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
                                    </Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity onPress={refreshWeather}>
                            <Ionicons
                                name="refresh"
                                size={24}
                                color={currentTheme.colors.primary}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.content}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    >
                        {currentWeather && (
                            <WeatherCard weather={currentWeather} theme={theme} location={location ?? undefined} placeName={placeName ?? undefined} />
                        )}

                        {filteredForecast.length > 0 && (
                            <View style={styles.forecastContainer}>
                                <Text style={styles.forecastTitle}>7-Day Forecast</Text>
                                {filteredForecast.map((day, index) => {
                                    // Parse as UTC to avoid timezone issues
                                    const [year, month, dayNum] = day.date.split('-').map(Number);
                                    const dateObj = new Date(Date.UTC(year, month - 1, dayNum));

                                    // Determine if today, tomorrow, or other
                                    const now = new Date();
                                    now.setUTCHours(0, 0, 0, 0);
                                    const tomorrow = new Date(now);
                                    tomorrow.setUTCDate(now.getUTCDate() + 1);
                                    let dateLabel = dateObj.toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                        timeZone: 'UTC',
                                    });
                                    if (dateObj.getTime() === now.getTime()) {
                                        dateLabel = 'Today';
                                    } else if (dateObj.getTime() === tomorrow.getTime()) {
                                        dateLabel = 'Tomorrow';
                                    }

                                    return (
                                        <View key={index} style={styles.forecastItem}>
                                            <Text style={styles.forecastDate}>
                                                {dateLabel}
                                            </Text>
                                            <View style={styles.forecastWeather}>
                                                <Text style={styles.forecastIcon}>{day.weatherIcon}</Text>
                                                <Text style={styles.forecastDescription}>
                                                    {day.weatherDescription}
                                                </Text>
                                            </View>
                                            <Text style={styles.forecastTemp}>
                                                {day.temperature.min.toFixed(0)}° / {day.temperature.max.toFixed(0)}°
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}; 