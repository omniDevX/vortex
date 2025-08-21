import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

import { DynamicBackground } from '../components/DynamicBackground';
import { WeatherCard } from '../components/WeatherCard';
import { darkTheme, lightTheme } from '../constants/theme';
import { useWeather } from '../hooks/useWeather';
import { getWeatherScreenStyles } from '../constants/styles';
import { useSettings } from '../contexts/SettingsContext';
import { useWeatherContext } from '../contexts/WeatherContext';
import { useBackground } from '../contexts/BackgroundContext';

export const WeatherScreen: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? 'dark' : 'light';
    const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
    const { settings } = useSettings();
    const [placeName, setPlaceName] = useState<string | null>(null);

    const { setLocation, setWeather } = useWeatherContext();
    const { setCurrentBackgroundUrl } = useBackground();

    const {
        currentWeather,
        forecast,
        hourlyForecast,
        location,
        loading,
        error,
        refreshWeather,
        refreshLocation,
    } = useWeather();

    const [refreshing, setRefreshing] = useState(false);

    // Function to change background image
    const changeBackgroundImage = async () => {
        try {
            const response = await fetch('https://api.github.com/repos/silkbeauty/ssart/contents/zzz');
            
            if (!response.ok) {
                throw new Error('Failed to fetch images from GitHub');
            }

            const files = await response.json();
            
            // Filter for image files and get their download URLs
            const imageFiles = files.filter((file: any) =>
                file.type === 'file' &&
                /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );

            const imageUrls = imageFiles.map((file: any) => file.download_url);
            
            if (imageUrls.length > 0) {
                // Pick a random image
                const randomIndex = Math.floor(Math.random() * imageUrls.length);
                setCurrentBackgroundUrl(imageUrls[randomIndex]);
            }
        } catch (error) {
            console.error('Error changing background image:', error);
        }
    };

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

    // Combined refresh function that updates both weather and background
    const handleRefresh = async () => {
        await refreshWeather();
        await changeBackgroundImage();
    };

    useEffect(() => {
        setLocation(location);
    }, [location, setLocation]);
    
    useEffect(() => {
        setWeather(currentWeather);
    }, [currentWeather, setWeather]);

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
                    
                    // Convert common full names to abbreviations
                    const abbreviations: { [key: string]: string } = {
                        'Ontario': 'ON',
                        'Quebec': 'QC',
                        'British Columbia': 'BC',
                        'Alberta': 'AB',
                        'Manitoba': 'MB',
                        'Saskatchewan': 'SK',
                        'Nova Scotia': 'NS',
                        'New Brunswick': 'NB',
                        'Newfoundland and Labrador': 'NL',
                        'Prince Edward Island': 'PE',
                        'Northwest Territories': 'NT',
                        'Nunavut': 'NU',
                        'Yukon': 'YT',
                        // US States
                        'California': 'CA',
                        'New York': 'NY',
                        'Texas': 'TX',
                        'Florida': 'FL',
                        'Illinois': 'IL',
                        'Pennsylvania': 'PA',
                        'Ohio': 'OH',
                        'Georgia': 'GA',
                        'North Carolina': 'NC',
                        'Michigan': 'MI',
                        'New Jersey': 'NJ',
                        'Virginia': 'VA',
                        'Washington': 'WA',
                        'Arizona': 'AZ',
                        'Massachusetts': 'MA',
                        'Tennessee': 'TN',
                        'Indiana': 'IN',
                        'Missouri': 'MO',
                        'Maryland': 'MD',
                        'Colorado': 'CO',
                        'Wisconsin': 'WI',
                        'Minnesota': 'MN',
                        'South Carolina': 'SC',
                        'Alabama': 'AL',
                        'Louisiana': 'LA',
                        'Kentucky': 'KY',
                        'Oregon': 'OR',
                        'Oklahoma': 'OK',
                        'Connecticut': 'CT',
                        'Utah': 'UT',
                        'Iowa': 'IA',
                        'Nevada': 'NV',
                        'Arkansas': 'AR',
                        'Mississippi': 'MS',
                        'Kansas': 'KS',
                        'New Mexico': 'NM',
                        'Nebraska': 'NE',
                        'West Virginia': 'WV',
                        'Idaho': 'ID',
                        'Hawaii': 'HI',
                        'New Hampshire': 'NH',
                        'Maine': 'ME',
                        'Montana': 'MT',
                        'Rhode Island': 'RI',
                        'Delaware': 'DE',
                        'South Dakota': 'SD',
                        'North Dakota': 'ND',
                        'Alaska': 'AK',
                        'District of Columbia': 'DC',
                        'Vermont': 'VT',
                        'Wyoming': 'WY',
                    };
                    
                    // Replace full names with abbreviations
                    Object.entries(abbreviations).forEach(([fullName, abbrev]) => {
                        name = name.replace(fullName, abbrev);
                    });
                    
                    setPlaceName(name);
                }
            });
        }
    }, [location]);

    // console.log('Rendering WeatherScreen with location:', currentTheme)
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
                            <Text style={styles.title}>
                                {placeName || 'Weather'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleRefresh}>
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
                            <WeatherCard 
                                weather={currentWeather} 
                                hourlyForecast={hourlyForecast}
                                theme={theme} 
                                location={location ?? undefined} 
                                placeName={placeName ?? undefined} 
                            />
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
                            <Text style={styles.title}>
                                {placeName || 'Weather'}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleRefresh}>
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
                            <WeatherCard 
                                weather={currentWeather} 
                                hourlyForecast={hourlyForecast}
                                theme={theme} 
                                location={location ?? undefined} 
                                placeName={placeName ?? undefined} 
                            />
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